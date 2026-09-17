// Cache optimization utilities
// Carregada automaticamente no layout.tsx
// Use this in the browser console to manage cache

declare global {
  interface Window {
    cacheUtils?: any
  }
}

if (typeof window !== 'undefined') {
  window.cacheUtils = {
    // 1. Check cache size
    async getCacheSize() {
      if (!navigator.storage || !navigator.storage.estimate) {
        console.log('Storage API não disponível')
        return
      }
      
      try {
        const estimate = await navigator.storage.estimate()
        const usage = estimate.usage ?? 0
        const quota = estimate.quota ?? 0
        const percentUsed = (usage / quota) * 100
        
        console.log(`Armazenamento usado: ${(usage / 1024 / 1024).toFixed(2)}MB`)
        console.log(`Quota total: ${(quota / 1024 / 1024).toFixed(2)}MB`)
        console.log(`Percentual usado: ${percentUsed.toFixed(2)}%`)
      } catch (error) {
        console.error('Erro ao verificar tamanho do cache:', error)
      }
    },

    // 2. List all caches
    async listCaches() {
      try {
        const cacheNames = await caches.keys()
        console.log('Caches armazenados:')
        cacheNames.forEach(name => {
          caches.open(name).then(cache => {
            cache.keys().then(keys => {
              console.log(`  ${name}: ${keys.length} arquivos`)
            })
          })
        })
      } catch (error) {
        console.error('Erro ao listar caches:', error)
      }
    },

    // 3. Clear all caches
    async clearAllCaches() {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(name => caches.delete(name)))
        console.log('✅ Todos os caches foram limpos')
      } catch (error) {
        console.error('Erro ao limpar caches:', error)
      }
    },

    // 4. Clear specific cache
    async clearCache(cacheName: string) {
      try {
        await caches.delete(cacheName)
        console.log(`✅ Cache '${cacheName}' foi limpo`)
      } catch (error) {
        console.error('Erro ao limpar cache:', error)
      }
    },

    // 5. Clear IndexedDB
    async clearIndexedDB() {
      return new Promise<boolean>((resolve, reject) => {
        try {
          const request = indexedDB.deleteDatabase('PortfolioCache')
          request.onsuccess = () => {
            console.log('✅ IndexedDB foi limpo')
            resolve(true)
          }
          request.onerror = () => {
            console.error('❌ Erro ao limpar IndexedDB')
            reject(request.error)
          }
        } catch (error) {
          reject(error)
        }
      })
    },

    // 6. Clear everything
    async clearEverything() {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(name => caches.delete(name)))
        await new Promise<boolean>((resolve, reject) => {
          const request = indexedDB.deleteDatabase('PortfolioCache')
          request.onsuccess = () => resolve(true)
          request.onerror = () => reject(request.error)
        })
        localStorage.removeItem('portfolio-cache-cleanup')
        console.log('✅ Todos os dados em cache foram limpos com sucesso!')
      } catch (error) {
        console.error('❌ Erro ao limpar cache:', error)
      }
    },

    // 7. Service Worker status
    async checkServiceWorkerStatus() {
      try {
        if (!navigator.serviceWorker) {
          console.log('❌ Service Worker não é suportado')
          return
        }
        
        const registrations = await navigator.serviceWorker.getRegistrations()
        console.log(`Service Workers registrados: ${registrations.length}`)
        
        registrations.forEach((reg, idx) => {
          console.log(`  ${idx + 1}. Escopo: ${reg.scope}`)
          console.log(`     Ativo: ${reg.active ? '✅' : '❌'}`)
          console.log(`     Aguardando: ${reg.waiting ? '⏳' : '❌'}`)
        })
      } catch (error) {
        console.error('Erro ao verificar Service Worker:', error)
      }
    }
  }
  
  // Log inicial
  console.log('🚀 Cache utilities carregadas! Use: cacheUtils.getCacheSize() ou cacheUtils.clearEverything()')
}

export {}
