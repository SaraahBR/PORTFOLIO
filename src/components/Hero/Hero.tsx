'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'
import { useState } from 'react'

export default function Hero() {
  const { t, idioma } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 z-20">
      {/* Círculos Animados - Apenas Modo Claro */}
      <div className="absolute top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-[#f5f1ed]/40 dark:bg-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-[#ebe5df]/40 dark:bg-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 pb-24 sm:pb-20 text-center">
        {/* Fundo fixo com gradiente esfumado nas bordas - Modo Claro */}
        <div className="absolute inset-0 rounded-3xl dark:hidden" style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 235, 229, 0.95) 40%, rgba(245, 235, 229, 0.7) 70%, transparent 100%)',
        }}></div>
        {/* Fundo fixo com gradiente esfumado nas bordas - Modo Escuro */}
        <div className="absolute inset-0 rounded-3xl hidden dark:block" style={{
          background: 'radial-gradient(ellipse at center, rgba(10, 10, 20, 0.95) 40%, rgba(10, 10, 20, 0.7) 70%, transparent 100%)',
        }}></div>
        
        {/* Foto de Perfil - Fixa e Centralizada */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1.2 }}
            className="relative z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full blur-2xl opacity-50 animate-pulse" />
            
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white/90 dark:border-primary/50 shadow-2xl glow-effect">
              {/* Imagem Profissional (padrão) */}
              <Image
                src="images/SARAH_Profissional.jpg"
                alt="Sarah Hernandes - Profissional"
                fill
                style={{ objectPosition: 'center 20%' }}
                className={`object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                priority
              />
              
              {/* Imagem Neutra (hover) */}
              <Image
                src="images/SARAH_Neutra.jpg"
                alt="Sarah Hernandes - Neutra"
                fill
                className={`object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                priority
              />
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold px-6 relative z-10 inline-block text-center"
          >
            <span className="text-gradient">Sarah</span>
            <br />
            <span className="text-gray-800 dark:text-white">Hernandes</span>
          </motion.h1>
        </div>

        <div className="flex justify-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 dark:text-gray-300 px-6 relative z-10 inline-block text-center"
          >
            {t('hero.subtitle')}
          </motion.h2>
        </div>

        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="bg-black dark:bg-white/15 backdrop-blur-[1px] border border-gray-700 dark:border-white/5 shadow-sm rounded-lg p-3 relative z-10 w-[60%] sm:w-auto max-w-full"
          >
            <div className="font-mono text-[#C68E82] dark:text-[#CE9178] text-sm sm:text-base md:text-lg lg:text-xl px-2 min-h-[32px]">
              {(() => {
                const typing = t<string[]>('hero.typing')
                const sequence: (string | number)[] = []
                for (let i = 0; i < typing.length; i++) {
                  const text = typing[i]
                  sequence.push(text, 2000)
                  if (i < typing.length - 1) {
                    sequence.push('', 500)
                  }
                }
                return (
                  <TypeAnimation
                    key={idioma}
                    sequence={sequence}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="typing-cursor"
                  />
                )
              })()}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="relative z-10 inline-block"
        >
          <a
            href="#about"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#f5f1ed] via-[#ebe5df] to-[#e8dfd6] dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white font-bold rounded-full hover-glow transition-all duration-300 border border-[#d4c4b8]/30 dark:border-gray-600 shadow-lg"
          >
            {t('hero.cta')}
          </a>
        </motion.div>

        {/* Indicador de Rolagem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 sm:-bottom-3 md:-bottom-4 lg:bottom-2 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-[#c4b5a6] dark:border-gray-500 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-[#c4b5a6] dark:bg-gray-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
