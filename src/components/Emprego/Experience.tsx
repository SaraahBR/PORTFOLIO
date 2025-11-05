'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function Experience() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, amount: 0.2 })

  const items = t('experience.items') as Array<{
    company: string
    role: string
    period: string
    summary: string
    details: string[]
  }>

  return (
    <section id="experience" className="relative pt-14 pb-20 sm:py-20 px-4 sm:px-6 lg:px-8 section-blur">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">{t('experience.title')}</span>
          </h2>

          <div className="space-y-6">
            {items.map((job, i) => (
              <motion.div
                key={job.company + job.period}
                initial={{ opacity: 0, x: -40 }}
                animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-effect rounded-xl p-6 hover-glow w-full max-w-full overflow-hidden glitter"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4b5a8] via-[#c4a199] to-[#b8968a] dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-white dark:text-dark text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white break-words leading-snug">{job.role}</h3>
                    <p className="text-[#8a6d63] dark:text-gray-300 font-medium">{job.company} • {job.period}</p>
                    <p className="text-gray-800 dark:text-gray-300 mt-2 break-words">{job.summary}</p>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-800 dark:text-gray-300 break-words">
                      {job.details.map((d, idx) => (
                        <li key={idx} className="text-sm leading-snug">{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
