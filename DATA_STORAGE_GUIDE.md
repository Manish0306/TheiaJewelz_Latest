# 📊 Data Storage Guide - Theia Jewelz

## 🗄️ Where Your Data is Stored

### **Current Configuration**
- **Firebase Project**: `theiajewelz`
- **Database Type**: Firestore (NoSQL)
- **Location**: Google Cloud (Firebase)
- **Access**: https://console.firebase.google.com/

---

## 📍 Exact Storage Location

### **1. Firebase Console Path**
```
Firebase Console
└── Project: theiajewelz
    └── Firestore Database
        └── Collection: "sales"
            ├── Document: auto-generated-id-1
            ├── Document: auto-generated-id-2
            └── [More documents...]
```

### **2. Data Structure**
Each sale is stored as a document with these fields:

```json
{
  "id": 1701234567890,
  "itemName": "Gold Ring",
  "category": "rings, wedding",
  "categories": ["rings", "wedding"],
  "costPrice": 2500.00,
  "sellingPrice": 3000.00,
  "profit": 500.00,
  "saleDate": "2024-01-15",
  "customerName": "John Doe",
  "customerPhone": "+91 98765 43210",
  "customerAddress": "123 Main St",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "timestamp": "Firebase Server Timestamp"
}
```

---

## 🔍 How to Access Your Data

### **Method 1: Firebase Console (Recommended)**
1. **Go to**: https://console.firebase.google.com/
2. **Select**: `theiajewelz` project
3. **Click**: "Firestore Database" in sidebar
4. **Browse**: "sales" collection
5. **View**: Individual sale documents

### **Method 2: Export Data**
1. **In Firebase Console**: Go to Firestore Database
2. **Click**: "Export" at the top
3. **Select**: "sales" collection
4. **Download**: As JSON or other formats

### **Method 3: App Interface**
1. **Open**: jewelry_sales_final.html
2. **Go to**: Settings → Database tab
3. **Click**: "Download Backup" button
4. **Get**: Complete backup in JSON format

---

## 🔧 Database Configuration Options

### **Available Methods**
1. **Firebase Firestore** (Current)
   - ✅ Real-time sync
   - ✅ 50K reads/20K writes per day (free)
   - ✅ Accessible from anywhere
   - ✅ Automatic backups

2. **Google Sheets**
   - ✅ Completely free
   - ✅ Easy to view/edit
   - ✅ Familiar spreadsheet interface
   - ❌ Slower than Firebase

3. **Local Storage**
   - ✅ Works offline
   - ✅ No internet required
   - ❌ Data only on current device
   - ❌ Lost if browser data cleared

### **To Change Database Method**
1. Open the app
2. Click settings (⚙️) button
3. Go to "Database" tab
4. Select preferred method
5. Click "Save Settings"

---

## 🛡️ Data Security

### **Current Security**
- **Firebase Rules**: Allow read/write (for setup)
- **Access**: Anyone with project access
- **Encryption**: All data encrypted in transit and at rest

### **Recommended Production Security**
```javascript
// Update in Firebase Console → Firestore → Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sales/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📈 Usage Monitoring

### **Firebase Usage Dashboard**
- **Path**: Firebase Console → Usage and billing
- **Monitor**: Daily reads/writes
- **Alerts**: Set up quota alerts
- **Upgrade**: If you exceed free tier

### **Current Free Tier Limits**
- **Reads**: 50,000 per day
- **Writes**: 20,000 per day
- **Storage**: 1 GB
- **Network**: 10 GB per month

---

## 🚀 What Happens When You Add a Sale

### **Step-by-Step Process**
1. **You click**: "Add Sale Record"
2. **App validates**: Form data
3. **Local storage**: Saves to browser (backup)
4. **Firebase call**: Sends data to Firestore
5. **Document created**: In "sales" collection
6. **Success message**: Confirms save
7. **UI updates**: Shows new sale

### **Real-time Flow**
```
Your App → Firebase → Cloud Storage → Your Database
     ↓
Success confirmation ← Status update ← Document created
```

---

## 🔄 Backup Strategy

### **Automatic Backups**
- **Firebase**: Automatic daily backups
- **Local Storage**: Browser-based backup
- **Manual**: Download backup anytime

### **Manual Backup Steps**
1. **Settings** → **Database** tab
2. **Click**: "Download Backup"
3. **Save**: JSON file safely
4. **Schedule**: Regular downloads

---

## 📱 Multi-Device Access

### **Same Data Everywhere**
- **Desktop**: Full access
- **Mobile**: Same data
- **Tablet**: Synchronized
- **Any Browser**: Real-time updates

### **Offline Capabilities**
- **Firebase**: Caches data locally
- **Offline mode**: Works without internet
- **Auto-sync**: When connection restored

---

## 🆘 Troubleshooting

### **Data Not Saving?**
1. Check internet connection
2. Verify Firebase project ID
3. Check browser console for errors
4. Test database connection in settings

### **Data Not Loading?**
1. Check Firebase console for data
2. Verify project permissions
3. Clear browser cache
4. Check Firestore rules

### **Need Help?**
- **Firebase Console**: Check for alerts
- **Browser Console**: Look for error messages
- **Test Connection**: Use settings → test button
- **Backup**: Always download backups

---

## 🎯 Summary

**Your jewelry sales data is stored in:**
- **Primary**: Firebase Firestore (`theiajewelz`)
- **Backup**: Local browser storage
- **Access**: https://console.firebase.google.com/
- **Format**: JSON documents in "sales" collection
- **Security**: Encrypted, cloud-based storage

**You can access it through:**
- Firebase Console (web interface)
- App backup download
- Direct database exports
- Real-time in the app

**🎉 Your data is secure, backed up, and accessible from anywhere!**