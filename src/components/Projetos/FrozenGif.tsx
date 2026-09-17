'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAccessibility } from '@/components/Acessibilidade/AccessibilityContext'

// Guarda o frame já capturado por URL para não recapturar ao trocar de aba/imagem
const frameCache = new Map<string, string>()

interface FrozenGifProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
}

export default function FrozenGif({ src, alt, fill, className, sizes, loading }: Readonly<FrozenGifProps>) {
  const { reduceMotion } = useAccessibility()
  const isGif = src.toLowerCase().endsWith('.gif')
  const [frozenSrc, setFrozenSrc] = useState<string | null>(() => (isGif ? frameCache.get(src) ?? null : null))

  useEffect(() => {
    if (!reduceMotion || !isGif || frameCache.has(src)) return

    const img = new window.Image()
    img.src = src
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      // Captura o quadro atual do GIF e "congela" a exibição para economizar CPU/GPU
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL('image/png')
      frameCache.set(src, dataUrl)
      setFrozenSrc(dataUrl)
    }
  }, [reduceMotion, isGif, src])

  if (isGif && reduceMotion) {
    return (
      <div className="group relative w-full h-full">
        {frozenSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- quadro estático em base64, next/image não se aplica
          <img
            src={frozenSrc}
            alt={alt}
            className={className}
            style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : undefined}
          />
        ) : (
          <Image src={src} alt={alt} fill={fill} className={className} sizes={sizes} loading={loading} unoptimized />
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
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      loading={loading}
      unoptimized={isGif}
    />
  )
}
