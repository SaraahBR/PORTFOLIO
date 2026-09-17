import { useEffect } from 'react'

export function useServiceWorker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          '/service-worker.js',
          { scope: '/' }
        )
        console.log('Service Worker registrado com sucesso:', registration)

        // Verificar atualizações a cada 1 hora
        setInterval(() => {
          registration.update()
        }, 60 * 60 * 1000)
      } catch (error) {
        console.log('Falha ao registrar Service Worker:', error)
      }
    }

    // Aguardar o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', registerServiceWorker)
      return () => document.removeEventListener('DOMContentLoaded', registerServiceWorker)
    } else {
      registerServiceWorker()
    }
  }, [])
}

// Funções de utilidade para IndexedDB
export const dbName = 'PortfolioCache'
export const storeName = 'images'
export const dbVersion = 1

let dbInstance: IDBDatabase | null = null

export async function initDB(): Promise<IDBDatabase> {
  if (dbInstance) {
    return dbInstance
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      dbInstance = request.result
      resolve(dbInstance)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'url' })
      }
    }
  })
}

export async function getCachedImage(url: string): Promise<Blob | null> {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(url)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const result = request.result
        resolve(result ? result.blob : null)
      }
    })
  } catch {
    return null
  }
}

export async function cacheImage(url: string, blob: Blob): Promise<void> {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put({ url, blob, timestamp: Date.now() })

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error('Erro ao cachear imagem:', error)
  }
}

export async function clearOldCache(): Promise<void> {
  try {
    const db = await initDB()
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.openCursor()

      request.onerror = () => reject(request.error)
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          if (cursor.value.timestamp < sevenDaysAgo) {
            cursor.delete()
          }
          cursor.continue()
        } else {
          resolve()
        }
      }
    })
  } catch (error) {
    console.error('Erro ao limpar cache antigo:', error)
  }
}
