'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

interface Language {
  name: string
  level: string
}

export default function Languages() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, amount: 0.2 })

  const items: Language[] = t('languagesSection.items')

  return (
    <section id="languages" className="relative py-20 px-4 sm:px-6 lg:px-8 section-blur section-divider">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
            <span className="text-gradient">{t('languagesSection.title')}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {items.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="glass-effect rounded-xl p-6 flex items-center gap-4 hover-glow glitter"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4b5a8] via-[#c4a199] to-[#b8968a] dark:from-[#f5f1ed] dark:to-[#e8dfd6] flex items-center justify-center flex-shrink-0">
                  <FaGlobe className="text-white dark:text-gray-800 text-2xl" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white font-bold">{lang.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{lang.level}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

