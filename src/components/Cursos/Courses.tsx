'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCertificate } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

interface Course {
  title: string
  period: string
  description: string
}

export default function Courses() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, amount: 0.2 })

  const items: Course[] = t('courses.items')

  return (
    <section id="courses" className="relative py-20 px-4 sm:px-6 lg:px-8 section-blur section-divider">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">{t('courses.title')}</span>
          </h2>

          <div className="space-y-6">
            {items.map((course, i) => (
              <motion.div
                key={course.title + course.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-effect rounded-xl p-6 hover-glow flex items-start gap-4 glitter"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4b5a8] via-[#c4a199] to-[#b8968a] dark:from-[#f5f1ed] dark:to-[#e8dfd6] flex items-center justify-center flex-shrink-0">
                  <FaCertificate className="text-white dark:text-gray-800 text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-2">{course.description}</p>
                  <p className="text-[#b8968a] dark:text-[#f5f1ed] font-medium">{course.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

