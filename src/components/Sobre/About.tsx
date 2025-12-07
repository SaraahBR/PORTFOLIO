'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const estaVisivel = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="relative pt-12 pb-6 sm:py-20 px-4 sm:px-6 lg:px-8 section-blur section-divider">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-12">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>

          <div className="glass-effect rounded-2xl p-8 space-y-6 hover-glow glitter">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={estaVisivel ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed"
            >
              {t('about.paragraph1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={estaVisivel ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed"
            >
              {t('about.paragraph2')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={estaVisivel ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-[#a89583] dark:text-gray-300 italic font-semibold"
            >
              {t('about.paragraph3')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
