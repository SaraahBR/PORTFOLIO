'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const estaVisivel = useInView(ref, { once: true, amount: 0.3 })

  const redesSociais = [
    {
      nome: 'Email',
      icone: <FaEnvelope className="text-3xl" />,
      link: 'mailto:vihernandesbr@gmail.com',
      texto: 'vihernandesbr@gmail.com',
      cor: 'from-red-500 to-orange-500',
    },
    {
      nome: 'LinkedIn',
      icone: <FaLinkedin className="text-3xl" />,
      link: 'https://www.linkedin.com/in/sarah-hernandes-290106247/',
      texto: 'Sarah Hernandes',
      cor: 'from-blue-600 to-blue-400',
    },
    {
      nome: 'GitHub',
      icone: <FaGithub className="text-3xl" />,
      link: 'https://github.com/SaraahBR',
      texto: 'SaraahBR',
      cor: 'from-gray-700 to-gray-500',
    },
    {
      nome: 'Instagram',
      icone: <FaInstagram className="text-3xl" />,
      link: 'https://www.instagram.com/saravihernandes/',
      texto: '@saravihernandes',
      cor: 'from-pink-600 to-purple-600',
    },
    {
      nome: 'Facebook',
      icone: <FaFacebook className="text-3xl" />,
      link: 'https://www.facebook.com/vihernandesBRLDR',
      texto: 'Sarah Hernandes',
      cor: 'from-blue-700 to-blue-500',
    },
  ]

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 section-blur">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            <span className="text-gradient">{t('contact.title')}</span>
          </h2>

          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 text-lg">
            {t('contact.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {redesSociais.map((rede, indice) => (
              <motion.a
                key={rede.nome}
                href={rede.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={estaVisivel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: indice * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect rounded-xl p-6 flex items-center space-x-4 hover-glow group glitter"
              >
                <div className={`p-4 rounded-full bg-gradient-to-br ${rede.cor} text-white group-hover:scale-110 transition-transform`}>
                  {rede.icone}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-800 dark:text-white font-bold text-lg break-words">{rede.nome}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm break-all">{rede.texto}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={estaVisivel ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-[#a89583] dark:text-[#f5f1ed] text-xl font-semibold">
              {t('contact.thankYou')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
