'use client'

import { useEffect, useRef } from 'react'
import { useThemeContext } from './Tema/ThemeContext'

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useThemeContext()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    // Partículas de galáxia/estrelas
    const stars: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      twinkleSpeed: number
      color: string
    }> = []

    // Partículas de glitter
    const glitters: Array<{
      x: number
      y: number
      size: number
      life: number
      maxLife: number
      color: string
    }> = []

    const starCount = theme === 'dark' ? 80 : 30
    const isDark = theme === 'dark'

    // Cores para modo claro (prateado/dourado) e escuro (galáxia roxa/rosa)
    const lightColors = ['#C0C0C0', '#D4AF37', '#E5E4E2', '#FFD700', '#B8B8B8']
    const darkColors = ['#e879f9', '#f0abfc', '#c084fc', '#ec4899', '#d946ef']

    // Criar estrelas
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isDark ? 1.5 : 1) + 0.3,
        speedX: (Math.random() - 0.5) * (isDark ? 0.3 : 0.1),
        speedY: (Math.random() - 0.5) * (isDark ? 0.3 : 0.1),
        opacity: Math.random() * (isDark ? 0.6 : 0.4) + (isDark ? 0.3 : 0.2),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        color: isDark ? darkColors[Math.floor(Math.random() * darkColors.length)] : lightColors[Math.floor(Math.random() * lightColors.length)]
      })
    }

    let glitterTimer = 0

    function animate() {
      if (!canvas || !ctx) return

      // Limpar o canvas completamente para fundo transparente
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Animar estrelas
      for (const star of stars) {
        star.x += star.speedX
        star.y += star.speedY
        star.opacity += star.twinkleSpeed
        
        if (star.opacity > (isDark ? 1.5 : 0.4) || star.opacity < (isDark ? 0.5 : 0.05)) {
          star.twinkleSpeed *= -1
        }

        // Wraparound
        if (star.x > canvas.width) star.x = 0
        if (star.x < 0) star.x = canvas.width
        if (star.y > canvas.height) star.y = 0
        if (star.y < 0) star.y = canvas.height

        // Desenhar estrela com brilho
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2)
        const clampedOpacity = Math.max(0, Math.min(1, star.opacity))
        const hexOpacity = Math.floor(clampedOpacity * 255).toString(16).padStart(2, '0')
        gradient.addColorStop(0, `${star.color}${hexOpacity}`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Núcleo da estrela
        ctx.fillStyle = `${star.color}${hexOpacity}`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Criar glitter ocasionalmente
      glitterTimer++
      if (glitterTimer > (isDark ? 8 : 20)) {
        glitterTimer = 0
        glitters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isDark ? 3 : 1.5) + 1,
          life: 0,
          maxLife: Math.random() * 30 + 20,
          color: isDark ? darkColors[Math.floor(Math.random() * darkColors.length)] : lightColors[Math.floor(Math.random() * lightColors.length)]
        })
      }

      // Animar glitter
      for (let i = glitters.length - 1; i >= 0; i--) {
        const glitter = glitters[i]
        glitter.life++

        if (glitter.life > glitter.maxLife) {
          glitters.splice(i, 1)
          continue
        }

        const progress = glitter.life / glitter.maxLife
        const opacity = Math.sin(progress * Math.PI) * (isDark ? 0.5 : 0.3)
        const clampedOpacity = Math.max(0, Math.min(1, opacity))
        const hexOpacity = Math.floor(clampedOpacity * 255).toString(16).padStart(2, '0')

        // Efeito de cruz/sparkle
        ctx.strokeStyle = `${glitter.color}${hexOpacity}`
        ctx.lineWidth = isDark ? 1.5 : 0.5
        ctx.beginPath()
        ctx.moveTo(glitter.x - glitter.size, glitter.y)
        ctx.lineTo(glitter.x + glitter.size, glitter.y)
        ctx.moveTo(glitter.x, glitter.y - glitter.size)
        ctx.lineTo(glitter.x, glitter.y + glitter.size)
        ctx.stroke()

        // Brilho central
        const glitterGradient = ctx.createRadialGradient(glitter.x, glitter.y, 0, glitter.x, glitter.y, glitter.size)
        glitterGradient.addColorStop(0, `${glitter.color}${hexOpacity}`)
        glitterGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = glitterGradient
        ctx.beginPath()
        ctx.arc(glitter.x, glitter.y, glitter.size, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: theme === 'dark' ? 0.7 : 0.2, zIndex: -1 }}
    />
  )
}
