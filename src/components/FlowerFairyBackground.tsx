'use client'

import { useEffect, useRef } from 'react'

export default function FlowerFairyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Flores flutuantes
    const flowers: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      color: string
      petalCount: number
      opacity: number
    }> = []

    // Fadas (partículas brilhantes com trilha)
    const fairies: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      hue: number
      saturation: number
      lightness: number
      opacity: number
      trail: Array<{ x: number; y: number; opacity: number }>
      wingAngle: number
      wingSpeed: number
      targetFlowerIndex: number
      reachTime: number
    }> = []

    const flowerColors = ['#DC143C', '#FF0000', '#8B0000', '#FFFFFF', '#F8F8FF', '#FFFAFA', '#FFE4E1']
    const flowerCount = 60

    // Criar flores - distribuição equilibrada
    for (let i = 0; i < flowerCount; i++) {
      // Alternar entre lado esquerdo e direito para garantir equilíbrio
      let xPosition
      if (i % 2 === 0) {
        // Lado esquerdo (0% a 50%)
        xPosition = Math.random() * (canvas.width * 0.5)
      } else {
        // Lado direito (50% a 100%)
        xPosition = (canvas.width * 0.5) + Math.random() * (canvas.width * 0.5)
      }
      
      flowers.push({
        x: xPosition,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 6,
        speedX: (Math.random() - 0.5) * 0.08, // Velocidade horizontal reduzida
        speedY: Math.random() * 0.08 + 0.03,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        petalCount: Math.floor(Math.random() * 4) + 5,
        opacity: Math.random() * 0.2 + 0.1
      })
    }

    // Criar fadas com cores específicas
    const fairyColors = [
      { hue: 330, saturation: 70, lightness: 45, name: 'rosa escuro' },
      { hue: 0, saturation: 80, lightness: 40, name: 'vermelho' },
      { hue: 0, saturation: 0, lightness: 70, name: 'prata' },
      { hue: 45, saturation: 80, lightness: 50, name: 'dourado' },
      { hue: 280, saturation: 70, lightness: 50, name: 'roxo' }
    ]
    const fairyCount = 3
    for (let i = 0; i < fairyCount; i++) {
      const color = fairyColors[i]
      fairies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 2,
        speedX: 0,
        speedY: 0,
        hue: color.hue,
        saturation: color.saturation,
        lightness: color.lightness,
        opacity: Math.random() * 0.3 + 0.3,
        trail: [],
        wingAngle: 0,
        wingSpeed: 0.15 + Math.random() * 0.1,
        targetFlowerIndex: Math.floor(Math.random() * flowerCount),
        reachTime: 0
      })
    }

    let animationFrameId: number

    const drawFlower = (flower: typeof flowers[0]) => {
      ctx.save()
      ctx.translate(flower.x, flower.y)
      ctx.rotate(flower.rotation)
      ctx.globalAlpha = flower.opacity * 0.25 // Muito mais discreto

      const flowerType = flower.petalCount % 4 // 4 tipos diferentes

      if (flowerType === 0) {
        // Rosa clássica
        for (let i = 0; i < flower.petalCount; i++) {
          const angle = (Math.PI * 2 * i) / flower.petalCount
          ctx.save()
          ctx.rotate(angle)
          ctx.fillStyle = flower.color
          ctx.beginPath()
          ctx.ellipse(0, -flower.size * 0.6, flower.size * 0.35, flower.size * 0.5, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      } else if (flowerType === 1) {
        // Margarida/Girassol
        for (let i = 0; i < flower.petalCount; i++) {
          const angle = (Math.PI * 2 * i) / flower.petalCount
          ctx.save()
          ctx.rotate(angle)
          ctx.fillStyle = flower.color
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(-flower.size * 0.2, -flower.size * 0.8)
          ctx.lineTo(0, -flower.size * 0.9)
          ctx.lineTo(flower.size * 0.2, -flower.size * 0.8)
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        }
      } else if (flowerType === 2) {
        // Flor de cerejeira (5 pétalas arredondadas)
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5
          ctx.save()
          ctx.rotate(angle)
          ctx.fillStyle = flower.color
          ctx.beginPath()
          ctx.arc(0, -flower.size * 0.5, flower.size * 0.4, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      } else {
        // Tulipa/Flor simples
        ctx.fillStyle = flower.color
        ctx.beginPath()
        ctx.moveTo(0, -flower.size * 0.8)
        ctx.quadraticCurveTo(-flower.size * 0.5, -flower.size * 0.4, -flower.size * 0.3, 0)
        ctx.quadraticCurveTo(-flower.size * 0.1, flower.size * 0.2, 0, flower.size * 0.1)
        ctx.quadraticCurveTo(flower.size * 0.1, flower.size * 0.2, flower.size * 0.3, 0)
        ctx.quadraticCurveTo(flower.size * 0.5, -flower.size * 0.4, 0, -flower.size * 0.8)
        ctx.fill()
        
        // Pétalas laterais
        ctx.beginPath()
        ctx.arc(-flower.size * 0.4, -flower.size * 0.2, flower.size * 0.35, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(flower.size * 0.4, -flower.size * 0.2, flower.size * 0.35, 0, Math.PI * 2)
        ctx.fill()
      }

      // Centro da flor (menor e mais discreto)
      ctx.fillStyle = flower.color.includes('FFF') ? '#FFD4D4' : '#FFF8DC'
      ctx.beginPath()
      ctx.arc(0, 0, flower.size * 0.15, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawFairy = (fairy: typeof fairies[0]) => {
      ctx.save()
      ctx.translate(fairy.x, fairy.y)
      
      const scale = fairy.size * 1.2
      const wingFlap = Math.sin(fairy.wingAngle) * 0.35
      const baseOpacity = fairy.opacity * 0.7
      
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity})`
      ctx.strokeStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 10}%, ${baseOpacity * 0.8})`
      
      // Desenhar asas de libélula - abertura e fechamento
      const wingOpenness = Math.abs(wingFlap)
      
      // Asa superior esquerda
      ctx.save()
      ctx.translate(0, -scale * 0.3)
      ctx.rotate(-wingOpenness * 0.8)
      
      // Gradiente translúcido
      const wingGradient1 = ctx.createLinearGradient(0, 0, -scale * 3, -scale * 0.5)
      wingGradient1.addColorStop(0, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 30}%, ${baseOpacity * 0.7})`)
      wingGradient1.addColorStop(0.5, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 20}%, ${baseOpacity * 0.5})`)
      wingGradient1.addColorStop(1, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity * 0.3})`)
      ctx.fillStyle = wingGradient1
      
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-scale * 0.8, -scale * 0.2, -scale * 1.8, -scale * 0.3, -scale * 2.8, -scale * 0.4)
      ctx.bezierCurveTo(-scale * 3.2, -scale * 0.3, -scale * 3.3, 0, -scale * 3.2, scale * 0.3)
      ctx.bezierCurveTo(-scale * 2.5, scale * 0.5, -scale * 1.5, scale * 0.6, -scale * 0.5, scale * 0.4)
      ctx.closePath()
      ctx.fill()
      
      // Nervuras da asa superior esquerda
      ctx.strokeStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 20}%, ${baseOpacity * 0.6})`
      ctx.lineWidth = scale * 0.04
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-scale * (1 + i * 0.6), scale * (0.1 + i * 0.1))
        ctx.stroke()
      }
      ctx.restore()
      
      // Asa inferior esquerda
      ctx.save()
      ctx.translate(0, scale * 0.3)
      ctx.rotate(-wingOpenness * 0.6)
      
      const wingGradient2 = ctx.createLinearGradient(0, 0, -scale * 2.5, scale * 0.3)
      wingGradient2.addColorStop(0, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 30}%, ${baseOpacity * 0.6})`)
      wingGradient2.addColorStop(0.5, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 20}%, ${baseOpacity * 0.4})`)
      wingGradient2.addColorStop(1, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity * 0.2})`)
      ctx.fillStyle = wingGradient2
      
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-scale * 0.6, scale * 0.1, -scale * 1.4, scale * 0.2, -scale * 2.2, scale * 0.2)
      ctx.bezierCurveTo(-scale * 2.5, scale * 0.3, -scale * 2.6, scale * 0.6, -scale * 2.4, scale * 0.8)
      ctx.bezierCurveTo(-scale * 1.8, scale * 0.9, -scale * 1, scale * 0.8, -scale * 0.3, scale * 0.5)
      ctx.closePath()
      ctx.fill()
      
      // Nervuras da asa inferior esquerda
      ctx.strokeStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 20}%, ${baseOpacity * 0.6})`
      ctx.lineWidth = scale * 0.04
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-scale * (0.8 + i * 0.5), scale * (0.3 + i * 0.15))
        ctx.stroke()
      }
      ctx.restore()
      
      // Asa superior direita
      ctx.save()
      ctx.translate(0, -scale * 0.3)
      ctx.rotate(wingOpenness * 0.8)
      
      const wingGradient3 = ctx.createLinearGradient(0, 0, scale * 3, -scale * 0.5)
      wingGradient3.addColorStop(0, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 30}%, ${baseOpacity * 0.7})`)
      wingGradient3.addColorStop(0.5, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 20}%, ${baseOpacity * 0.5})`)
      wingGradient3.addColorStop(1, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity * 0.3})`)
      ctx.fillStyle = wingGradient3
      
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(scale * 0.8, -scale * 0.2, scale * 1.8, -scale * 0.3, scale * 2.8, -scale * 0.4)
      ctx.bezierCurveTo(scale * 3.2, -scale * 0.3, scale * 3.3, 0, scale * 3.2, scale * 0.3)
      ctx.bezierCurveTo(scale * 2.5, scale * 0.5, scale * 1.5, scale * 0.6, scale * 0.5, scale * 0.4)
      ctx.closePath()
      ctx.fill()
      
      // Nervuras da asa superior direita
      ctx.strokeStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 20}%, ${baseOpacity * 0.6})`
      ctx.lineWidth = scale * 0.04
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(scale * (1 + i * 0.6), scale * (0.1 + i * 0.1))
        ctx.stroke()
      }
      ctx.restore()
      
      // Asa inferior direita
      ctx.save()
      ctx.translate(0, scale * 0.3)
      ctx.rotate(wingOpenness * 0.6)
      
      const wingGradient4 = ctx.createLinearGradient(0, 0, scale * 2.5, scale * 0.3)
      wingGradient4.addColorStop(0, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 30}%, ${baseOpacity * 0.6})`)
      wingGradient4.addColorStop(0.5, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness + 20}%, ${baseOpacity * 0.4})`)
      wingGradient4.addColorStop(1, `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity * 0.2})`)
      ctx.fillStyle = wingGradient4
      
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(scale * 0.6, scale * 0.1, scale * 1.4, scale * 0.2, scale * 2.2, scale * 0.2)
      ctx.bezierCurveTo(scale * 2.5, scale * 0.3, scale * 2.6, scale * 0.6, scale * 2.4, scale * 0.8)
      ctx.bezierCurveTo(scale * 1.8, scale * 0.9, scale * 1, scale * 0.8, scale * 0.3, scale * 0.5)
      ctx.closePath()
      ctx.fill()
      
      // Nervuras da asa inferior direita
      ctx.strokeStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 20}%, ${baseOpacity * 0.6})`
      ctx.lineWidth = scale * 0.04
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(scale * (0.8 + i * 0.5), scale * (0.3 + i * 0.15))
        ctx.stroke()
      }
      ctx.restore()
      
      // Cabeça de perfil
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity})`
      ctx.beginPath()
      ctx.ellipse(scale * 0.1, -scale * 1.5, scale * 0.5, scale * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()
      
      // Rosto/nariz de perfil
      ctx.beginPath()
      ctx.moveTo(scale * 0.5, -scale * 1.5)
      ctx.lineTo(scale * 0.7, -scale * 1.45)
      ctx.lineTo(scale * 0.65, -scale * 1.3)
      ctx.lineTo(scale * 0.5, -scale * 1.35)
      ctx.closePath()
      ctx.fill()
      
      // Cabelo comprido fluindo para trás
      ctx.beginPath()
      ctx.moveTo(scale * 0.1, -scale * 2)
      ctx.bezierCurveTo(-scale * 0.3, -scale * 2.1, -scale * 0.8, -scale * 1.8, -scale * 1.2, -scale * 1.3)
      ctx.bezierCurveTo(-scale * 1.4, -scale * 0.8, -scale * 1.5, -scale * 0.2, -scale * 1.4, scale * 0.4)
      ctx.bezierCurveTo(-scale * 1.3, scale * 0.8, -scale * 1, scale * 1, -scale * 0.7, scale * 1)
      ctx.bezierCurveTo(-scale * 0.5, scale * 0.9, -scale * 0.3, scale * 0.6, -scale * 0.2, scale * 0.2)
      ctx.bezierCurveTo(-scale * 0.1, -scale * 0.2, 0, -scale * 0.8, scale * 0.1, -scale * 1.2)
      ctx.closePath()
      ctx.fill()
      
      // Coque atrás da cabeça
      ctx.beginPath()
      ctx.ellipse(-scale * 0.3, -scale * 1.8, scale * 0.5, scale * 0.6, -0.3, 0, Math.PI * 2)
      ctx.fill()
      
      // Pescoço de perfil
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity})`
      ctx.beginPath()
      ctx.moveTo(scale * 0.2, -scale * 0.9)
      ctx.lineTo(scale * 0.4, -scale * 0.9)
      ctx.lineTo(scale * 0.35, -scale * 0.6)
      ctx.lineTo(scale * 0.15, -scale * 0.6)
      ctx.closePath()
      ctx.fill()
      
      // Corpo de perfil (curvilíneo)
      ctx.beginPath()
      // Peito
      ctx.moveTo(scale * 0.15, -scale * 0.6)
      ctx.bezierCurveTo(scale * 0.6, -scale * 0.5, scale * 0.7, -scale * 0.2, scale * 0.7, 0)
      // Barriga/cintura
      ctx.bezierCurveTo(scale * 0.65, scale * 0.3, scale * 0.5, scale * 0.5, scale * 0.45, scale * 0.6)
      // Quadril
      ctx.bezierCurveTo(scale * 0.5, scale * 0.8, scale * 0.6, scale * 1, scale * 0.6, scale * 1.2)
      // Parte de trás (costas)
      ctx.lineTo(scale * 0.1, scale * 1.2)
      ctx.bezierCurveTo(scale * 0.05, scale * 1, 0, scale * 0.8, -scale * 0.05, scale * 0.5)
      ctx.bezierCurveTo(-scale * 0.1, scale * 0.2, -scale * 0.1, -scale * 0.1, -scale * 0.05, -scale * 0.4)
      ctx.bezierCurveTo(0, -scale * 0.55, scale * 0.05, -scale * 0.62, scale * 0.15, -scale * 0.6)
      ctx.closePath()
      ctx.fill()
      
      // Vestido fluindo de perfil
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity})`
      ctx.beginPath()
      ctx.moveTo(scale * 0.1, scale * 1.2)
      ctx.bezierCurveTo(scale * 0.2, scale * 1.4, scale * 0.3, scale * 1.7, scale * 0.3, scale * 2)
      ctx.bezierCurveTo(scale * 0.25, scale * 2.2, scale * 0.1, scale * 2.3, -scale * 0.1, scale * 2.3)
      ctx.bezierCurveTo(-scale * 0.3, scale * 2.2, -scale * 0.4, scale * 2, -scale * 0.4, scale * 1.7)
      ctx.bezierCurveTo(-scale * 0.35, scale * 1.4, -scale * 0.2, scale * 1.25, scale * 0.1, scale * 1.2)
      ctx.closePath()
      ctx.fill()
      
      // Detalhes do vestido (pregas)
      ctx.strokeStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 15}%, ${baseOpacity * 0.5})`
      ctx.lineWidth = scale * 0.05
      ctx.beginPath()
      ctx.moveTo(scale * 0.05, scale * 1.3)
      ctx.lineTo(-scale * 0.05, scale * 2.1)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(scale * 0.15, scale * 1.35)
      ctx.lineTo(scale * 0.1, scale * 2.15)
      ctx.stroke()
      ctx.lineWidth = 1
      
      // Braço de trás (esquerdo) - atrás do corpo
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 10}%, ${baseOpacity * 0.8})`
      ctx.beginPath()
      ctx.moveTo(-scale * 0.05, -scale * 0.4)
      ctx.lineTo(-scale * 0.15, -scale * 0.3)
      ctx.lineTo(-scale * 0.6, scale * 0.2)
      ctx.lineTo(-scale * 0.5, scale * 0.35)
      ctx.lineTo(-scale * 0.05, -scale * 0.1)
      ctx.closePath()
      ctx.fill()
      
      // Mão de trás
      ctx.beginPath()
      ctx.ellipse(-scale * 0.55, scale * 0.28, scale * 0.15, scale * 0.12, -0.5, 0, Math.PI * 2)
      ctx.fill()
      
      // Braço da frente (direito) - estendido para frente
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity})`
      ctx.beginPath()
      ctx.moveTo(scale * 0.5, -scale * 0.3)
      ctx.lineTo(scale * 0.6, -scale * 0.25)
      ctx.lineTo(scale * 1.3, -scale * 0.1)
      ctx.lineTo(scale * 1.25, scale * 0.05)
      ctx.lineTo(scale * 0.55, -scale * 0.1)
      ctx.lineTo(scale * 0.45, -scale * 0.2)
      ctx.closePath()
      ctx.fill()
      
      // Mão da frente
      ctx.beginPath()
      ctx.ellipse(scale * 1.27, -scale * 0.02, scale * 0.18, scale * 0.14, 0.2, 0, Math.PI * 2)
      ctx.fill()
      
      // Dedos da mão da frente
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.ellipse(scale * 1.35 + i * scale * 0.08, scale * 0.05 + i * scale * 0.05, scale * 0.06, scale * 0.1, 0.3, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Perna de trás (esquerda) - dobrada para trás
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness - 10}%, ${baseOpacity * 0.8})`
      
      // Coxa de trás
      ctx.beginPath()
      ctx.moveTo(scale * 0.05, scale * 1.2)
      ctx.lineTo(scale * 0.15, scale * 1.25)
      ctx.lineTo(scale * 0.1, scale * 2)
      ctx.lineTo(0, scale * 2.05)
      ctx.closePath()
      ctx.fill()
      
      // Canela de trás dobrada
      ctx.beginPath()
      ctx.moveTo(scale * 0.05, scale * 2)
      ctx.lineTo(scale * 0.15, scale * 2.05)
      ctx.lineTo(-scale * 0.1, scale * 2.7)
      ctx.lineTo(-scale * 0.2, scale * 2.65)
      ctx.closePath()
      ctx.fill()
      
      // Pé de trás
      ctx.beginPath()
      ctx.ellipse(-scale * 0.15, scale * 2.67, scale * 0.18, scale * 0.12, -0.4, 0, Math.PI * 2)
      ctx.fill()
      
      // Perna da frente (direita) - estendida
      ctx.fillStyle = `hsla(${fairy.hue}, ${fairy.saturation}%, ${fairy.lightness}%, ${baseOpacity})`
      
      // Coxa da frente
      ctx.beginPath()
      ctx.moveTo(scale * 0.5, scale * 1.2)
      ctx.lineTo(scale * 0.6, scale * 1.25)
      ctx.lineTo(scale * 0.85, scale * 2.3)
      ctx.lineTo(scale * 0.75, scale * 2.35)
      ctx.closePath()
      ctx.fill()
      
      // Canela da frente
      ctx.beginPath()
      ctx.moveTo(scale * 0.8, scale * 2.32)
      ctx.lineTo(scale * 0.9, scale * 2.37)
      ctx.lineTo(scale * 1.1, scale * 3.2)
      ctx.lineTo(scale * 1, scale * 3.25)
      ctx.closePath()
      ctx.fill()
      
      // Pé da frente (apontado)
      ctx.beginPath()
      ctx.moveTo(scale * 1.05, scale * 3.22)
      ctx.lineTo(scale * 1.3, scale * 3.4)
      ctx.lineTo(scale * 1.25, scale * 3.5)
      ctx.lineTo(scale * 1, scale * 3.32)
      ctx.closePath()
      ctx.fill()

      ctx.restore()
    }

    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Animar flores
      for (const flower of flowers) {
        flower.x += flower.speedX
        flower.y += flower.speedY
        flower.rotation += flower.rotationSpeed

        // Wraparound
        if (flower.x > canvas.width + flower.size) flower.x = -flower.size
        if (flower.x < -flower.size) flower.x = canvas.width + flower.size
        if (flower.y > canvas.height + flower.size) flower.y = -flower.size

        // Calcular fade out baseado na proximidade da área do Hero (centro da tela)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const distToCenterX = Math.abs(flower.x - centerX)
        const distToCenterY = Math.abs(flower.y - centerY)
        
        // Área de fade (raio em pixels) - área concentrada onde há conteúdo
        const fadeRadiusX = canvas.width * 0.30
        const fadeRadiusY = canvas.height * 0.40
        
        // Calcular opacidade baseado na distância com curva suave e evidente
        let fadeMultiplier = 1
        if (distToCenterX < fadeRadiusX && distToCenterY < fadeRadiusY) {
          const fadeX = distToCenterX / fadeRadiusX
          const fadeY = distToCenterY / fadeRadiusY
          const minFade = Math.min(fadeX, fadeY)
          // Aplicar curva quártica para transição mais suave e evidente
          fadeMultiplier = minFade * minFade * minFade * minFade
        }
        
        const originalOpacity = flower.opacity
        flower.opacity = originalOpacity * fadeMultiplier
        drawFlower(flower)
        flower.opacity = originalOpacity // Restaurar opacidade original
      }

      // Animar fadas
      for (const fairy of fairies) {
        // Atualizar batida de asas
        fairy.wingAngle += fairy.wingSpeed
        
        // Perseguir flores
        const targetFlower = flowers[fairy.targetFlowerIndex]
        
        // Calcular distância até a flor alvo
        const dx = targetFlower.x - fairy.x
        const dy = targetFlower.y - fairy.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Se chegou perto da flor, escolher nova flor alvo
        if (distance < 30) {
          fairy.reachTime++
          if (fairy.reachTime > 60) { // Fica 1 segundo na flor
            fairy.targetFlowerIndex = Math.floor(Math.random() * flowers.length)
            fairy.reachTime = 0
          }
          // Diminuir velocidade ao chegar perto
          fairy.speedX *= 0.95
          fairy.speedY *= 0.95
        } else {
          // Voar em direção à flor (mais devagar)
          const speed = 1.0
          fairy.speedX = (dx / distance) * speed
          fairy.speedY = (dy / distance) * speed
          fairy.reachTime = 0
        }
        
        fairy.x += fairy.speedX
        fairy.y += fairy.speedY
        
        // Atualizar trilha (mais longa para mostrar o caminho)
        fairy.trail.push({ x: fairy.x, y: fairy.y, opacity: 1 })
        if (fairy.trail.length > 25) fairy.trail.shift()
        
        // Reduzir opacidade da trilha
        for (const point of fairy.trail) {
          point.opacity *= 0.94
        }

        // Wraparound
        if (fairy.x > canvas.width + 50) fairy.x = -50
        if (fairy.x < -50) fairy.x = canvas.width + 50
        if (fairy.y > canvas.height + 50) fairy.y = -50
        if (fairy.y < -50) fairy.y = canvas.height + 50

        // Calcular fade out baseado na proximidade da área do Hero (centro da tela)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const distToCenterX = Math.abs(fairy.x - centerX)
        const distToCenterY = Math.abs(fairy.y - centerY)
        
        // Área de fade (raio em pixels) - área concentrada onde há conteúdo
        const fadeRadiusX = canvas.width * 0.30
        const fadeRadiusY = canvas.height * 0.40
        
        // Calcular opacidade baseado na distância com curva suave e evidente
        let fadeMultiplier = 1
        if (distToCenterX < fadeRadiusX && distToCenterY < fadeRadiusY) {
          const fadeX = distToCenterX / fadeRadiusX
          const fadeY = distToCenterY / fadeRadiusY
          const minFade = Math.min(fadeX, fadeY)
          // Aplicar curva quártica para transição mais suave e evidente
          fadeMultiplier = minFade * minFade * minFade * minFade
        }
        
        const originalOpacity = fairy.opacity
        fairy.opacity = originalOpacity * fadeMultiplier
        drawFairy(fairy)
        fairy.opacity = originalOpacity // Restaurar opacidade original
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}
