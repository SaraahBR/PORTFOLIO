'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

interface Education {
  institution: string
  course: string
  period: string
  status: string
}

export default function Education() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const estaVisivel = useInView(ref, { once: true, amount: 0.3 })

  const formacoes: Education[] = t('education.items')

  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 section-blur section-divider">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">{t('education.title')}</span>
          </h2>

          <div className="space-y-6">
            {formacoes.map((formacao) => (
              <div
                key={formacao.institution + formacao.period}
                className="glass-effect rounded-xl p-6 hover-glow flex items-start space-x-4 glitter"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4b5a8] via-[#c4a199] to-[#b8968a] dark:from-[#f5f1ed] dark:to-[#e8dfd6] rounded-full flex items-center justify-center">
                    <FaGraduationCap className="text-2xl text-white dark:text-gray-800" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{formacao.institution}</h3>
                  <p className="text-[#8a6d63] dark:text-[#f5f1ed] font-medium mb-2">{formacao.course}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {formacao.period} • {formacao.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
