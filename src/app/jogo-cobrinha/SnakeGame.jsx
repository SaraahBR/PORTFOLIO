'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function SnakeGame() {
  const { t } = useLanguage()
  const canvasRef = useRef(null)
  const [jogoRodando, setJogoRodando] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)

  // Refs para manter estado do jogo
  const jogoRodandoRef = useRef(false)
  const intervaloJogoRef = useRef(null)
  const intervaloDemoRef = useRef(null)
  const pontuacaoRef = useRef(0)
  const cobraRef = useRef([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ])
  const velocidadeRef = useRef({ x: 0, y: 0 })
  const comidaRef = useRef({ x: 15, y: 15 })

  // Estado da demonstração
  const cobraDemoRef = useRef([])
  const velocidadeDemoRef = useRef({ x: 1, y: 0 })
  const comidaDemoRef = useRef({ x: 15, y: 15 })
  const contadorFlashRef = useRef(0)

  const contagemQuadrados = 20
  const tamanhoQuadrado = 400 / contagemQuadrados

  // Helpers de desenho
  const desenharGradeFundo = (ctx) => {
    // Fundo
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, 400, 400)
    // Grade
    ctx.strokeStyle = '#222'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= contagemQuadrados; i++) {
      ctx.beginPath()
      ctx.moveTo(i * tamanhoQuadrado, 0)
      ctx.lineTo(i * tamanhoQuadrado, 400)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * tamanhoQuadrado)
      ctx.lineTo(400, i * tamanhoQuadrado)
      ctx.stroke()
    }
  }

  const desenharComida = (ctx, comida) => {
    // Comida com leve brilho
    ctx.fillStyle = contadorFlashRef.current % 8 < 4 ? '#ff4444' : '#ff6644'
    ctx.fillRect(
      comida.x * tamanhoQuadrado,
      comida.y * tamanhoQuadrado,
      tamanhoQuadrado,
      tamanhoQuadrado
    )
  }

  const desenharOjosELingua = (ctx, x, y, dir) => {
    const px = x * tamanhoQuadrado
    const py = y * tamanhoQuadrado
    const eyeR = Math.max(2, tamanhoQuadrado * 0.14)
    const pupilR = Math.max(1.2, eyeR * 0.45)
    const frontOff = tamanhoQuadrado * 0.22 // distância dos olhos da “frente”
    const sideOff = tamanhoQuadrado * 0.35  // afastamento lateral
    const tongueLen = Math.max(6, tamanhoQuadrado * 0.45)
    const fork = Math.max(3, tamanhoQuadrado * 0.14)

    // Olhos (brancos) e pupilas (pretas) + língua bifurcada, sempre na frente
    const drawEye = (cx, cy) => {
      ctx.fillStyle = '#ffffff'
      ctx.beginPath(); ctx.arc(cx, cy, eyeR, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#000000'
      ctx.beginPath(); ctx.arc(cx, cy, pupilR, 0, Math.PI * 2); ctx.fill()
    }

    const tongue = (fx, fy, dx, dy) => {
      if (contadorFlashRef.current % 6 >= 3) return
      ctx.fillStyle = '#ff1a1a'
      ctx.beginPath()
      // Desenha uma língua em “V” para frente
      if (dx === 1) {
        ctx.moveTo(fx, fy)
        ctx.lineTo(fx + tongueLen, fy - fork)
        ctx.lineTo(fx + tongueLen * 0.55, fy)
        ctx.lineTo(fx + tongueLen, fy + fork)
        ctx.closePath(); ctx.fill()
      } else if (dx === -1) {
        ctx.moveTo(fx, fy)
        ctx.lineTo(fx - tongueLen, fy - fork)
        ctx.lineTo(fx - tongueLen * 0.55, fy)
        ctx.lineTo(fx - tongueLen, fy + fork)
        ctx.closePath(); ctx.fill()
      } else if (dy === -1) {
        ctx.moveTo(fx, fy)
        ctx.lineTo(fx - fork, fy - tongueLen)
        ctx.lineTo(fx, fy - tongueLen * 0.55)
        ctx.lineTo(fx + fork, fy - tongueLen)
        ctx.closePath(); ctx.fill()
      } else {
        ctx.moveTo(fx, fy)
        ctx.lineTo(fx - fork, fy + tongueLen)
        ctx.lineTo(fx, fy + tongueLen * 0.55)
        ctx.lineTo(fx + fork, fy + tongueLen)
        ctx.closePath(); ctx.fill()
      }
    }

    if (dir.x === 1) {
      // frente à direita
      drawEye(px + tamanhoQuadrado - frontOff, py + sideOff)
      drawEye(px + tamanhoQuadrado - frontOff, py + tamanhoQuadrado - sideOff)
      tongue(px + tamanhoQuadrado, py + tamanhoQuadrado * 0.5, 1, 0)
    } else if (dir.x === -1) {
      drawEye(px + frontOff, py + sideOff)
      drawEye(px + frontOff, py + tamanhoQuadrado - sideOff)
      tongue(px, py + tamanhoQuadrado * 0.5, -1, 0)
    } else if (dir.y === -1) {
      drawEye(px + sideOff, py + frontOff)
      drawEye(px + tamanhoQuadrado - sideOff, py + frontOff)
      tongue(px + tamanhoQuadrado * 0.5, py, 0, -1)
    } else {
      // para baixo (inclui parado)
      drawEye(px + sideOff, py + tamanhoQuadrado - frontOff)
      drawEye(px + tamanhoQuadrado - sideOff, py + tamanhoQuadrado - frontOff)
      tongue(px + tamanhoQuadrado * 0.5, py + tamanhoQuadrado, 0, 1)
    }
  }

  const desenharCabecaArredondada = (ctx, x, y, r) => {
    const px = x * tamanhoQuadrado
    const py = y * tamanhoQuadrado
    const w = tamanhoQuadrado
    const h = tamanhoQuadrado
    const radius = Math.min(r, w / 2, h / 2)
    ctx.beginPath()
    ctx.moveTo(px + radius, py)
    ctx.lineTo(px + w - radius, py)
    ctx.quadraticCurveTo(px + w, py, px + w, py + radius)
    ctx.lineTo(px + w, py + h - radius)
    ctx.quadraticCurveTo(px + w, py + h, px + w - radius, py + h)
    ctx.lineTo(px + radius, py + h)
    ctx.quadraticCurveTo(px, py + h, px, py + h - radius)
    ctx.lineTo(px, py + radius)
    ctx.quadraticCurveTo(px, py, px + radius, py)
    ctx.closePath()
    ctx.fill()
  }

  const desenharCobra = (ctx, cobra, dir) => {
    // Corpo
    ctx.fillStyle = '#80cbc4'
    cobra.slice(1).forEach(segmento => {
      ctx.fillRect(
        segmento.x * tamanhoQuadrado,
        segmento.y * tamanhoQuadrado,
        tamanhoQuadrado,
        tamanhoQuadrado
      )
    })
    // Cabeça
    const cab = cobra[0]
    ctx.fillStyle = '#00cc00'
    desenharCabecaArredondada(ctx, cab.x, cab.y, tamanhoQuadrado * 0.25)
    desenharOjosELingua(ctx, cab.x, cab.y, dir)
  }

  // Gerar comida aleatória
  const gerarComida = (cobra) => {
    let novaComida
    do {
      novaComida = {
        x: Math.floor(Math.random() * contagemQuadrados),
        y: Math.floor(Math.random() * contagemQuadrados)
      }
    } while (cobra.some(segmento => segmento.x === novaComida.x && segmento.y === novaComida.y))
    return novaComida
  }

  // Iniciar demonstração (modo automático)
  const iniciarDemo = () => {
    cobraDemoRef.current = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ]
    velocidadeDemoRef.current = { x: 1, y: 0 }
    comidaDemoRef.current = gerarComida(cobraDemoRef.current)
    contadorFlashRef.current = 0

    intervaloDemoRef.current = setInterval(desenharDemo, 200)
  }

  // Desenhar demonstração (modo automático)
  const desenharDemo = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Se o jogo real estiver rodando, não desenhar demo
    if (jogoRodandoRef.current) return

    const cabeca = cobraDemoRef.current[0]
    let direcaoAlvo = { x: 0, y: 0 }

    // Lógica simples: ir em direção à comida
    if (cabeca.x < comidaDemoRef.current.x) direcaoAlvo = { x: 1, y: 0 }
    else if (cabeca.x > comidaDemoRef.current.x) direcaoAlvo = { x: -1, y: 0 }
    else if (cabeca.y < comidaDemoRef.current.y) direcaoAlvo = { x: 0, y: 1 }
    else if (cabeca.y > comidaDemoRef.current.y) direcaoAlvo = { x: 0, y: -1 }

    const proximoX = cabeca.x + direcaoAlvo.x
    const proximoY = cabeca.y + direcaoAlvo.y

    // Evitar paredes
    if (proximoX < 0 || proximoY < 0 || proximoX >= contagemQuadrados || proximoY >= contagemQuadrados) {
      const movimentosseguros = [
        { x: 0, y: -1 }, { x: 1, y: 0 },
        { x: 0, y: 1 }, { x: -1, y: 0 }
      ]
      for (const movimento of movimentosseguros) {
        const novoX = cabeca.x + movimento.x
        const novoY = cabeca.y + movimento.y
        const semParede = novoX >= 0 && novoX < contagemQuadrados && novoY >= 0 && novoY < contagemQuadrados
        const semCorpo = !cobraDemoRef.current.some(s => s.x === novoX && s.y === novoY)
        if (semParede && semCorpo) {
          direcaoAlvo = movimento
          break
        }
      }
    }

    // Se por algum motivo continuou zero, mantém a última direção
    if (direcaoAlvo.x === 0 && direcaoAlvo.y === 0) {
      direcaoAlvo = velocidadeDemoRef.current
    }

    const novaCabeca = {
      x: cabeca.x + direcaoAlvo.x,
      y: cabeca.y + direcaoAlvo.y
    }

    // Verificar colisão com próprio corpo
    if (cobraDemoRef.current.some(s => s.x === novaCabeca.x && s.y === novaCabeca.y)) {
      reiniciarDemo()
      return
    }

    cobraDemoRef.current.unshift(novaCabeca)

    // Verificar se comeu
    if (novaCabeca.x === comidaDemoRef.current.x && novaCabeca.y === comidaDemoRef.current.y) {
      comidaDemoRef.current = gerarComida(cobraDemoRef.current)
    } else {
      cobraDemoRef.current.pop()
    }

    // Atualizar a direção efetivamente usada para desenhar olhos/língua
    velocidadeDemoRef.current = direcaoAlvo

    // Desenhar com mesmo estilo do jogo real
    desenharGradeFundo(ctx)
    contadorFlashRef.current++
    desenharComida(ctx, comidaDemoRef.current)
    desenharCobra(ctx, cobraDemoRef.current, velocidadeDemoRef.current)
  }

  const reiniciarDemo = () => {
    if (intervaloDemoRef.current) {
      clearInterval(intervaloDemoRef.current)
      intervaloDemoRef.current = null
    }
    if (!jogoRodandoRef.current) {
      setTimeout(iniciarDemo, 300)
    }
  }

  // Desenhar jogo real
  const desenharJogo = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cabecaX = cobraRef.current[0].x + velocidadeRef.current.x
    const cabecaY = cobraRef.current[0].y + velocidadeRef.current.y

    if (velocidadeRef.current.x === 0 && velocidadeRef.current.y === 0) return

    // Verificar colisão com parede
    if (cabecaX < 0 || cabecaY < 0 || cabecaX >= contagemQuadrados || cabecaY >= contagemQuadrados) {
      finalizarJogo()
      return
    }

    // Verificar colisão com próprio corpo
    for (let i = 1; i < cobraRef.current.length; i++) {
      if (cobraRef.current[i].x === cabecaX && cobraRef.current[i].y === cabecaY) {
        finalizarJogo()
        return
      }
    }

    cobraRef.current.unshift({ x: cabecaX, y: cabecaY })

    // Verificar se comeu
    if (cabecaX === comidaRef.current.x && cabecaY === comidaRef.current.y) {
      comidaRef.current = gerarComida(cobraRef.current)
      pontuacaoRef.current += 10
      setPontuacao(prev => prev + 10)
    } else {
      cobraRef.current.pop()
    }

    // Desenhar fundo + grade
    desenharGradeFundo(ctx)
    contadorFlashRef.current++
    // Comida
    desenharComida(ctx, comidaRef.current)
    // Cobra com olhos e língua
    desenharCobra(ctx, cobraRef.current, velocidadeRef.current)
  }

  const finalizarJogo = () => {
    if (intervaloJogoRef.current) clearInterval(intervaloJogoRef.current)
    toast.error(`${t('snake.gameOver')} 😅`, {
      description: `${t('snake.finalScore')}: ${pontuacaoRef.current}`,
      duration: 3000,
    })
    reiniciarJogo()
  }

  const reiniciarJogo = () => {
    cobraRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ]
    velocidadeRef.current = { x: 0, y: 0 }
    comidaRef.current = gerarComida(cobraRef.current)
    jogoRodandoRef.current = false
    setJogoRodando(false)
    pontuacaoRef.current = 0
    setPontuacao(0)
    iniciarDemo()
  }

  const iniciarJogo = () => {
    // Parar e limpar completamente a demo
    if (intervaloDemoRef.current) {
      clearInterval(intervaloDemoRef.current)
      intervaloDemoRef.current = null
    }

    // Resetar a cobra do jogo
    cobraRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ]
    comidaRef.current = gerarComida(cobraRef.current)
    pontuacaoRef.current = 0
    setPontuacao(0)

    jogoRodandoRef.current = true
    setJogoRodando(true)
    velocidadeRef.current = { x: 1, y: 0 } // Começa indo para direita

    // Limpar qualquer intervalo anterior
    if (intervaloJogoRef.current) {
      clearInterval(intervaloJogoRef.current)
    }
    intervaloJogoRef.current = setInterval(desenharJogo, 100)
  }

  // Controles do teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!jogoRodandoRef.current) return

      const tecla = e.key.toLowerCase()

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(tecla) ||
          ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (velocidadeRef.current.x !== 1) velocidadeRef.current = { x: -1, y: 0 }
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (velocidadeRef.current.x !== -1) velocidadeRef.current = { x: 1, y: 0 }
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (velocidadeRef.current.y !== 1) velocidadeRef.current = { x: 0, y: -1 }
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          if (velocidadeRef.current.y !== -1) velocidadeRef.current = { x: 0, y: 1 }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Iniciar demo ao montar
  useEffect(() => {
    // Pequeno delay para garantir que o canvas está pronto
    const timer = setTimeout(() => {
      iniciarDemo()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (intervaloDemoRef.current) {
        clearInterval(intervaloDemoRef.current)
        intervaloDemoRef.current = null
      }
      if (intervaloJogoRef.current) {
        clearInterval(intervaloJogoRef.current)
        intervaloJogoRef.current = null
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-6 hover-glow"
    >
      <div className="text-center mb-4 px-2">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">🐍 {t('snake.title')}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
          {jogoRodando
            ? t('snake.instructions')
            : t('snake.description')}
        </p>
        {jogoRodando && (
          <div className="text-primary text-lg sm:text-xl font-bold mb-2">
            {t('snake.score')}: {pontuacao}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center px-2">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-primary/30 rounded-lg bg-[#1a1a1a] max-w-full h-auto"
          style={{ maxWidth: 'min(400px, 100%)' }}
        />
      </div>

      <div className="text-center mt-4">
        {!jogoRodando && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={iniciarJogo}
            className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#d4b5a8] via-[#c4a199] to-[#b8968a] dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white font-bold rounded-full hover-glow transition-all duration-300 border border-[#c4a199]/30 dark:border-gray-600"
          >
            {t('snake.start')}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
