const CACHE_NAME = 'portfolio-v1'
const ASSET_CACHE = 'portfolio-assets-v1'
const IMAGE_CACHE = 'portfolio-images-v1'

const urlsToCache = [
  '/',
  '/global.css',
  '/index.html'
]

// Instalar Service Worker e cachear recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName !== CACHE_NAME &&
              cacheName !== ASSET_CACHE &&
              cacheName !== IMAGE_CACHE
            )
          })
          .map((cacheName) => {
            return caches.delete(cacheName)
          })
      )
    })
  )
  self.clients.claim()
})

// Estratégia de cache para requisições
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return
  }

  // Cache primeiro para imagens
  if (
    url.pathname.includes('/public/') ||
    request.destination === 'image'
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response
          }
          return fetch(request).then((response) => {
            if (!response || response.status !== 200) {
              return response
            }
            cache.put(request, response.clone())
            return response
          })
        })
      })
    )
    return
  }

  // Network primeiro para documentos HTML, mas com cache fallback
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const cache = caches.open(CACHE_NAME)
            cache.then((c) => {
              c.put(request, response.clone())
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
    return
  }

  // Cache primeiro para assets (CSS, JS)
  event.respondWith(
    caches.open(ASSET_CACHE).then((cache) => {
      return cache.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone())
            }
            return response
          })
        )
      })
    })
  )
})
