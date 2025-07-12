/**
 * Theia Sales - Google Apps Script for Google Sheets Integration
 *
 * Setup Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Update SPREADSHEET_ID below with your Google Sheets ID
 * 5. Save and deploy as web app
 * 6. Copy the web app URL to use in your HTML file
 */

// CONFIGURATION - UPDATE THIS WITH YOUR GOOGLE SHEETS ID
const SPREADSHEET_ID = '1pbkOaE3RvY3WmiEz5X1PeLRwahaF-_JNGdnOcZ74T8U';
const SHEET_NAME = 'Theia Sales';

/**
 * Handle POST requests from the jewelry tracker
 */
function doPost(e) {
  try {
    console.log('doPost called with data:', e.postData.contents);
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);

    // Save to Google Sheets
    const result = saveToSheet(data);
    console.log('Save result:', result);

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests - for testing
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Theia Sales Google Apps Script is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Save jewelry sale data to Google Sheets
 */
function saveToSheet(data) {
  try {
    console.log('Opening spreadsheet with ID:', SPREADSHEET_ID);
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    console.log('Sheet found:', !!sheet);

    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log('Creating new sheet:', SHEET_NAME);
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      setupHeaders(sheet);
    }

    // Check if headers exist (first row should have data)
    if (sheet.getLastRow() === 0) {
      console.log('Setting up headers');
      setupHeaders(sheet);
    }

    // Prepare the data row
    const timestamp = new Date();
    const rowData = [
      timestamp,                    // A: Timestamp
      data.itemName,               // B: Item Name
      data.category,               // C: Category
      parseFloat(data.price),      // D: Price
      new Date(data.date),         // E: Sale Date
      data.customer,               // F: Customer
      data.phone || '',            // G: Phone
      data.id || timestamp.getTime() // H: Record ID
    ];

    // Add the row to the sheet
    console.log('Adding row data:', rowData);
    sheet.appendRow(rowData);

    // Format the new row
    const lastRow = sheet.getLastRow();
    console.log('New row added at position:', lastRow);
    formatRow(sheet, lastRow);

    const result = {
      success: true,
      message: 'Sale recorded successfully in Google Sheets',
      row: lastRow,
      spreadsheetUrl: spreadsheet.getUrl()
    };
    console.log('Returning success result:', result);
    return result;

  } catch (error) {
    console.error('Error saving to sheet:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Set up the header row
 */
function setupHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Item Name',
    'Category',
    'Price (₹)',
    'Sale Date',
    'Customer',
    'Phone',
    'Record ID'
  ];

  // Add headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  headerRange.setBorder(true, true, true, true, true, true);

  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 200); // Item Name
  sheet.setColumnWidth(3, 120); // Category
  sheet.setColumnWidth(4, 100); // Price
  sheet.setColumnWidth(5, 100); // Sale Date
  sheet.setColumnWidth(6, 150); // Customer
  sheet.setColumnWidth(7, 130); // Phone
  sheet.setColumnWidth(8, 100); // Record ID
}

/**
 * Format a data row
 */
function formatRow(sheet, rowNumber) {
  // Format price column (column D)
  const priceCell = sheet.getRange(rowNumber, 4);
  priceCell.setNumberFormat('₹#,##0.00');

  // Format date column (column E)
  const dateCell = sheet.getRange(rowNumber, 5);
  dateCell.setNumberFormat('dd/mm/yyyy');

  // Add borders to the entire row
  const rowRange = sheet.getRange(rowNumber, 1, 1, 8);
  rowRange.setBorder(true, true, true, true, false, true);

  // Alternate row coloring
  if (rowNumber % 2 === 0) {
    rowRange.setBackground('#f8f9fa');
  }
}

/**
 * Test function - run this manually to test the setup
 */
function testSetup() {
  const testData = {
    itemName: 'Test Gold Ring',
    category: 'rings',
    price: 999.99,
    date: '2024-01-15',
    customer: 'Test Customer',
    phone: '+91 98765 43210',
    id: Date.now()
  };

  const result = saveToSheet(testData);
  console.log('Test result:', result);
  return result;
}

/**
 * Verification function - check sheet status and data
 */
function verifySheetStatus() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet not found',
        spreadsheetUrl: spreadsheet.getUrl()
      };
    }
    
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    
    let recentData = null;
    if (lastRow > 1) {
      // Get the last row of data (excluding header)
      recentData = sheet.getRange(lastRow, 1, 1, lastColumn).getValues()[0];
    }
    
    return {
      success: true,
      message: 'Sheet verification complete',
      spreadsheetUrl: spreadsheet.getUrl(),
      totalRows: lastRow,
      totalColumns: lastColumn,
      hasData: lastRow > 1,
      recentEntry: recentData
    };
    
  } catch (error) {
    console.error('Error verifying sheet:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Get recent entries from the sheet
 */
function getRecentEntries(count = 5) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return { success: false, message: 'Sheet not found' };
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return { success: true, message: 'No data entries found', entries: [] };
    }
    
    const startRow = Math.max(2, lastRow - count + 1);
    const numRows = lastRow - startRow + 1;
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const data = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn()).getValues();
    
    const entries = data.map(row => {
      const entry = {};
      headers.forEach((header, index) => {
        entry[header] = row[index];
      });
      return entry;
    });
    
    return {
      success: true,
      message: `Retrieved ${entries.length} recent entries`,
      entries: entries,
      totalRows: lastRow - 1 // Excluding header
    };
    
  } catch (error) {
    console.error('Error getting recent entries:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}
