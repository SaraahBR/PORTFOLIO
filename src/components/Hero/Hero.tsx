'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function Hero() {
  const { t, idioma } = useLanguage()
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Círculos Animados */}
      <div className="absolute top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-[#f5f1ed]/40 dark:bg-gray-800/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-[#ebe5df]/40 dark:bg-gray-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 text-center">
        {/* Fundo preto com transição suave nas bordas - Menor no mobile */}
        <div className="absolute inset-0 bg-nude-100 dark:bg-black rounded-3xl opacity-0 sm:opacity-100 dark:opacity-70" style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'
        }}></div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="mb-8 relative inline-block z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full blur-2xl opacity-50 animate-pulse" />
          <Image
            src="images/FOTOMINHA.jpg"
            alt="Sarah Hernandes"
            width={200}
            height={200}
            className="relative rounded-full border-4 border-white/90 dark:border-primary/50 shadow-2xl glow-effect w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 px-4 relative z-10"
        >
          <span className="text-gradient">Sarah</span>
          <br />
          <span className="text-gray-800 dark:text-white">Hernandes</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 dark:text-gray-300 mb-8 px-4 relative z-10"
        >
          {t('hero.subtitle')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-black dark:bg-white/15 backdrop-blur-[1px] border border-gray-700 dark:border-white/5 shadow-sm rounded-lg p-4 inline-block mb-8 relative z-10"
        >
          <div className="font-mono text-[#C68E82] dark:text-[#CE9178] text-sm sm:text-base md:text-lg lg:text-xl px-2">
            {(() => {
              const typing = t<string[]>('hero.typing')
              const sequence: (string | number)[] = []
              typing.forEach((text, i) => {
                sequence.push(text)
                sequence.push(2000)
                if (i < typing.length - 1) {
                  sequence.push('')
                  sequence.push(500)
                }
              })
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10"
        >
          <a
            href="#about"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#f5f1ed] via-[#ebe5df] to-[#e8dfd6] dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white font-bold rounded-full hover-glow transition-all duration-300 border border-[#d4c4b8]/30 dark:border-gray-600"
          >
            {t('hero.cta')}
          </a>
        </motion.div>

        {/* Indicador de Rolagem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 2 }}
          className="absolute bottom-5 sm:bottom-13 md:bottom-1 left-1/2 -translate-x-1/2 z-10"
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
