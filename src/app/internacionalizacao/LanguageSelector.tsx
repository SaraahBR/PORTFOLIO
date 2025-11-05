'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGlobe } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'
import BR from 'country-flag-icons/react/3x2/BR'
import US from 'country-flag-icons/react/3x2/US'
import ES from 'country-flag-icons/react/3x2/ES'
import FR from 'country-flag-icons/react/3x2/FR'

const idiomas = [
  { codigo: 'pt-BR' as const, nome: 'Português', Bandeira: BR },
  { codigo: 'en' as const, nome: 'English', Bandeira: US },
  { codigo: 'es' as const, nome: 'Español', Bandeira: ES },
  { codigo: 'fr' as const, nome: 'Français', Bandeira: FR },
]

export default function LanguageSelector() {
  const { idioma, setIdioma } = useLanguage()
  const [aberto, setAberto] = useState(false)

  const idiomaSelecionado = idiomas.find(i => i.codigo === idioma) || idiomas[0]
  const BandeiraAtual = idiomaSelecionado.Bandeira

  const selecionarIdioma = (novoIdioma: typeof idiomas[0]) => {
    setIdioma(novoIdioma.codigo)
    setAberto(false)
  }

  return (
    <div className="fixed top-20 left-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAberto(!aberto)}
        className="p-3 bg-primary/20 hover:bg-primary/30 backdrop-blur-md rounded-full border border-primary/30 transition-colors flex items-center gap-2"
      >
        <BandeiraAtual className="w-6 h-5 rounded-sm" />
        <FaGlobe className="text-lg text-primary" />
      </motion.button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 glass-effect rounded-lg overflow-hidden border border-primary/30 min-w-[180px]"
          >
            {idiomas.map((item) => {
              const Bandeira = item.Bandeira
              return (
                <button
                  key={item.codigo}
                  onClick={() => selecionarIdioma(item)}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/20 transition-colors ${
                    idiomaSelecionado.codigo === item.codigo ? 'bg-primary/10' : ''
                  }`}
                >
                  <Bandeira className="w-6 h-5 rounded-sm" />
                  <span className="text-gray-900 dark:text-white font-medium">{item.nome}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
