'use client'

import { useServiceWorker, clearOldCache } from '@/hooks/useServiceWorker'
import { useEffect } from 'react'
import '@/utils/cacheUtils'

export function ServiceWorkerInit() {
  useServiceWorker()

  // Limpar cache antigo a cada 24 horas
  useEffect(() => {
    const lastCleanup = localStorage.getItem('portfolio-cache-cleanup')
    const now = Date.now()
    const day = 24 * 60 * 60 * 1000

    if (!lastCleanup || now - parseInt(lastCleanup) > day) {
      clearOldCache().catch(console.error)
      localStorage.setItem('portfolio-cache-cleanup', now.toString())
    }
  }, [])

  return null
}
