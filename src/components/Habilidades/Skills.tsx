'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaPalette, FaServer, FaDatabase, FaBrain, FaUsers } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)

  const categorias = [
    {
      titulo: t('skills.programming'),
      icone: <FaCode className="text-4xl mb-4 text-primary" />,
      habilidades: t<string[]>('skills.lists.programming'),
    },
    {
      titulo: t('skills.frontend'),
      icone: <FaPalette className="text-4xl mb-4 text-secondary" />,
      habilidades: t<string[]>('skills.lists.frontend'),
    },
    {
      titulo: t('skills.backend'),
      icone: <FaServer className="text-4xl mb-4 text-primary" />,
      habilidades: t<string[]>('skills.lists.backend'),
    },
    {
      titulo: t('skills.database'),
      icone: <FaDatabase className="text-4xl mb-4 text-secondary" />,
      habilidades: t<string[]>('skills.lists.database'),
    },
    {
      titulo: t('skills.behavioral'),
      icone: <FaUsers className="text-4xl mb-4 text-secondary" />,
      habilidades: t<string[]>('skills.lists.behavioral'),
    },
    {
      titulo: t('skills.concepts'),
      icone: <FaBrain className="text-4xl mb-4 text-primary" />,
      habilidades: t<string[]>('skills.lists.concepts'),
    },
  ]

  return (
    <section id="skills" className="relative pt-6 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-blur section-divider">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10 sm:mb-16">
            <span className="text-gradient">{t('skills.title')}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <div
                key={categoria.titulo}
                className="glass-effect rounded-xl p-6 hover-glow glitter"
              >
                <div className="flex flex-col items-center text-center">
                  {categoria.icone}
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{categoria.titulo}</h3>
                  <ul className="space-y-2 w-full text-left">
                    {categoria.habilidades.map((habilidade) => (
                      <li
                        key={habilidade}
                        className="flex items-start text-gray-800 dark:text-gray-300"
                      >
                        <span className="text-primary mr-2 mt-[2px]">✓</span>
                        <span className="text-sm break-words whitespace-normal leading-snug">{habilidade}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
