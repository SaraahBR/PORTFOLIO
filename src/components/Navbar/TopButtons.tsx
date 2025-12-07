'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGlobe, FaSun, FaMoon } from 'react-icons/fa'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'
import { useThemeContext } from '@/components/Tema/ThemeContext'
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

export default function TopButtons() {
  const { idioma, setIdioma } = useLanguage()
  const { theme, toggleTheme } = useThemeContext()
  const [aberto, setAberto] = useState(false)
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
  }, [])

  const idiomaSelecionado = idiomas.find(i => i.codigo === idioma) || idiomas[0]
  const BandeiraAtual = idiomaSelecionado.Bandeira

  const selecionarIdioma = (novoIdioma: typeof idiomas[0]) => {
    setIdioma(novoIdioma.codigo)
    setAberto(false)
  }

  const handleThemeToggle = () => {
    toggleTheme()
  }

  if (!montado) return null

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-3">
      {/* Seletor de Idioma */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setAberto(!aberto)}
          className="p-3 bg-white dark:bg-black backdrop-blur-md rounded-full border border-[#e8dfd6]/50 dark:border-white/20 transition-colors flex items-center gap-2 shadow-lg"
          aria-label="Selecionar idioma"
        >
          <BandeiraAtual className="w-6 h-5 rounded-sm" />
          <FaGlobe className="text-lg text-[#a89583] dark:text-white" />
        </motion.button>

        <AnimatePresence>
          {aberto && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 glass-effect rounded-lg overflow-hidden border border-[#e8dfd6]/50 dark:border-primary/30 min-w-[180px]"
            >
              {idiomas.map((idiomaItem) => {
                const Bandeira = idiomaItem.Bandeira
                return (
                  <button
                    key={idiomaItem.codigo}
                    onClick={() => selecionarIdioma(idiomaItem)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f5f1ed]/60 dark:hover:bg-white/10 transition-colors ${
                      idiomaSelecionado.codigo === idiomaItem.codigo ? 'bg-[#ebe5df]/40 dark:bg-gray-700' : ''
                    }`}
                  >
                    <Bandeira className="w-6 h-5 rounded-sm" />
                    <span className="text-gray-800 dark:text-white font-medium">{idiomaItem.nome}</span>
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle de Tema */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleThemeToggle}
        className="p-3 bg-white dark:bg-black backdrop-blur-md rounded-full border border-[#e8dfd6]/50 dark:border-white/20 transition-colors shadow-lg"
        aria-label="Alternar tema"
      >
        {theme === 'dark' ? (
          <FaSun className="text-2xl text-[#a89583] dark:text-white" />
        ) : (
          <FaMoon className="text-2xl text-[#a89583] dark:text-white" />
        )}
      </motion.button>
    </div>
  )
}
