// Service Worker for Offline Support
const CACHE_NAME = 'katalog-lelang-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/kataloglelang.html',
    '/admin/login.html',
    '/admin/dashboard.html',
    '/admin/products.html',
    '/admin/add-product.html',
    '/admin/edit-product.html',
    '/database/db.js',
    '/assets/css/style.css',
    '/assets/js/app.js',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            // Don't cache POST requests
                            if (event.request.method === 'GET') {
                                cache.put(event.request, responseToCache);
                            }
                        });

                    return response;
                }).catch(error => {
                    // Return offline page for HTML requests
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }

                    // Return a generic error response
                    return new Response(
                        JSON.stringify({ error: 'Anda sedang offline. Coba lagi nanti.' }),
                        {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                });
            })
    );
});

// Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Sync data when back online
    return self.registration.sync.register('background-sync');
}

// Push notification handler
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Lihat Produk',
                icon: '/assets/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Tutup',
                icon: '/assets/images/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Katalog Lelang', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/kataloglelang.html')
        );
    }

    // Default behavior - open the app
    event.waitUntil(
        clients.matchAll().then(clientList => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

// Periodic background sync to check for updates
self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-check') {
        event.waitUntil(checkForUpdates());
    }
});

async function checkForUpdates() {
    try {
        // Check for updates to critical files
        const cache = await caches.open(CACHE_NAME);
        const urls = await cache.keys();

        for (const request of urls) {
            const response = await fetch(request.url);
            if (response.ok) {
                await cache.put(request, response);
            }
        }
    } catch (error) {
        console.log('Update check failed:', error);
    }
}