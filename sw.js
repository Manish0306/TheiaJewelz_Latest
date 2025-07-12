const CACHE_NAME = 'theia-jewelz-v1.0.0';
const urlsToCache = [
  './jewelry_sales_final.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Cache successful');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Found in cache', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Add to cache
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch((error) => {
          console.error('Service Worker: Fetch failed', error);
          
          // Return offline fallback if available
          if (event.request.destination === 'document') {
            return caches.match('./jewelry_sales_final.html');
          }
          
          throw error;
        });
      })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync-sales') {
    event.waitUntil(
      // Handle background sync for sales data
      syncSalesData()
    );
  }
});

// Push Notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from Theia Jewelz',
    icon: './icons/icon-192x192.png',
    badge: './icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: './icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: './icons/icon-192x192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Theia Jewelz', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('./jewelry_sales_final.html')
    );
  }
});

// Helper function for syncing sales data
async function syncSalesData() {
  try {
    console.log('Service Worker: Syncing sales data...');
    // This would typically sync with a backend server
    // For now, just log the action
    console.log('Service Worker: Sales data sync completed');
  } catch (error) {
    console.error('Service Worker: Sales data sync failed', error);
    throw error;
  }
}

// Share Target API (for sharing data to the app)
self.addEventListener('share', (event) => {
  console.log('Service Worker: Share received', event);
  
  event.waitUntil(
    clients.openWindow('./jewelry_sales_final.html?shared=true')
  );
});

// Periodic Background Sync (for future use)
self.addEventListener('periodicsync', (event) => {
  console.log('Service Worker: Periodic sync', event.tag);
  
  if (event.tag === 'sales-backup') {
    event.waitUntil(
      // Backup sales data periodically
      backupSalesData()
    );
  }
});

async function backupSalesData() {
  try {
    console.log('Service Worker: Backing up sales data...');
    // This would typically backup to cloud storage
    console.log('Service Worker: Sales backup completed');
  } catch (error) {
    console.error('Service Worker: Sales backup failed', error);
  }
}