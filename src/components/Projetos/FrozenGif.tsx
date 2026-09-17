'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useAccessibility } from '@/components/Acessibilidade/AccessibilityContext'
import { getCachedImage, cacheImage } from '@/hooks/useServiceWorker'

// Guarda o frame já capturado por URL para não recapturar ao trocar de aba/imagem
const frameCache = new Map<string, string>()

// Cache de imagens já carregadas
const loadedImagesCache = new Set<string>()

interface FrozenGifProps {
  src: string | undefined
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  onLoadingChange?: (isLoading: boolean) => void
}

export default function FrozenGif({ src, alt, fill, className, sizes, loading, onLoadingChange }: Readonly<FrozenGifProps>) {
  const { reduceMotion } = useAccessibility()
  
  // Validar se src é válido antes de usar
  const isValidSrc = !!(src && typeof src === 'string' && src.length > 0)
  const isGif = !!(isValidSrc && src && src.toLowerCase().endsWith('.gif'))
  const [frozenSrc, setFrozenSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const cacheTimeoutRef = useRef<NodeJS.Timeout>()

  // Inicializar o estado quando src muda
  useEffect(() => {
    if (isValidSrc) {
      if (isGif && frameCache.has(src)) {
        setFrozenSrc(frameCache.get(src) ?? null)
        setIsLoading(false)
      } else {
        setIsLoading(!loadedImagesCache.has(src))
      }
    }
  }, [isValidSrc, isGif, src])

  // Recuperar imagem em cache ou fazer fetch
  useEffect(() => {
    if (!isValidSrc || !isGif) return
    if (frameCache.has(src)) {
      setIsLoading(false)
      return
    }

    const processImage = async () => {
      try {
        // Tentar recuperar do IndexedDB
        const cachedBlob = await getCachedImage(`froze-${src}`)
        if (cachedBlob) {
          const url = URL.createObjectURL(cachedBlob)
          frameCache.set(src, url)
          setFrozenSrc(url)
          setIsLoading(false)
          loadedImagesCache.add(src)
          onLoadingChange?.(false)
          return
        }
      } catch (error) {
        console.error('Erro ao recuperar do cache:', error)
      }

      // Fazer fetch da imagem
      const img = new window.Image()
      img.src = src
      img.crossOrigin = 'anonymous'
      
      img.onload = async () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          setIsLoading(false)
          onLoadingChange?.(false)
          return
        }

        // Captura o quadro atual do GIF e "congela" a exibição
        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL('image/webp', 0.8) || canvas.toDataURL('image/png')
        frameCache.set(src, dataUrl)
        setFrozenSrc(dataUrl)
        setIsLoading(false)
        loadedImagesCache.add(src)
        onLoadingChange?.(false)

        // Armazenar no IndexedDB para futuras visitas
        try {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                cacheImage(`froze-${src}`, blob).catch(console.error)
              }
            },
            'image/webp',
            0.8
          )
        } catch (error) {
          console.error('Erro ao armazenar no cache:', error)
        }
      }

      img.onerror = () => {
        setIsLoading(false)
        onLoadingChange?.(false)
      }
    }

    if (reduceMotion) {
      processImage()
    }

    return () => {
      if (cacheTimeoutRef.current) {
        clearTimeout(cacheTimeoutRef.current)
      }
    }
  }, [isValidSrc, isGif, src, reduceMotion, onLoadingChange])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    if (isValidSrc) {
      loadedImagesCache.add(src)
    }
    onLoadingChange?.(false)
  }

  const handleLoadingStart = () => {
    if (isValidSrc && !loadedImagesCache.has(src)) {
      setIsLoading(true)
      onLoadingChange?.(true)
    }
  }

  // Se src for inválido, renderiza um container vazio
  if (!isValidSrc) {
    return fill ? <div className="absolute inset-0" /> : <div />
  }

  if (isGif && reduceMotion) {
    return (
      <div className="group relative w-full h-full">
        {frozenSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- quadro estático em base64, next/image não se aplica
          <img
            ref={imageRef}
            src={frozenSrc}
            alt={alt}
            className={className}
            style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : undefined}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Image 
            src={src} 
            alt={alt} 
            fill={fill} 
            className={className} 
            sizes={sizes} 
            loading={loading} 
            unoptimized
            decoding="async"
          />
        )}

        {/* Aviso ao passar o mouse explicando por que o GIF está parado */}
        <div className="pointer-events-none absolute inset-0 hidden group-hover:flex items-center justify-center text-center p-2 sm:p-3">
          <div className="bg-white/85 dark:bg-gray-900/85 border border-[#e8dfd6]/60 dark:border-white/20 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 max-w-[90%]">
            <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-800 dark:text-white leading-snug">
              Habilite as animações para ver o GIF em movimento
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Image
        ref={imageRef as any}
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        loading={loading || 'eager'}
        unoptimized={isGif}
        onLoadingComplete={handleLoadingComplete}
        onLoadStart={handleLoadingStart}
        priority={loading === 'eager'}
        decoding="async"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200/80 to-gray-300/80 dark:from-gray-900/80 dark:to-black/80 z-50">
          <div className="flex flex-col items-center gap-2">
            {/* Spinner animado */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <div className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-700"></div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#b8968a] dark:border-t-white animate-spin"></div>
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">Carregando...</p>
          </div>
        </div>
      )}
    </>
  )
}
