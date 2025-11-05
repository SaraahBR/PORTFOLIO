'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'
import { useThemeContext } from '@/components/Tema/ThemeContext'
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
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

export default function Navbar() {
  const { t, idioma, setIdioma } = useLanguage()
  const { theme, toggleTheme } = useThemeContext()
  const [rolagemAtiva, setRolagemAtiva] = useState(false)
  const [dropdownAberto, setDropdownAberto] = useState(false)
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [montado, setMontado] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuId = 'mobile-menu'

  useEffect(() => {
    setMontado(true)

    const handleScroll = () => {
      setRolagemAtiva(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar o dropdown ao clicar fora ou pressionar ESC
  useEffect(() => {
    if (!dropdownAberto) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAberto(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownAberto(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [dropdownAberto])

  // Evitar scroll de fundo ao abrir o menu mobile
  useEffect(() => {
    if (menuMobileAberto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuMobileAberto])

  const itensNavegacao = [
    { nome: t('nav.about'), href: '#about' },
    { nome: t('nav.skills'), href: '#skills' },
    { nome: t('nav.experience'), href: '#experience' },
    { nome: t('nav.education'), href: '#education' },
    { nome: t('nav.projects'), href: '#projects' },
    { nome: t('nav.courses'), href: '#courses' },
    { nome: t('nav.languages'), href: '#languages' },
    { nome: t('nav.contact'), href: '#contact' },
  ]

  const idiomaSelecionado = idiomas.find(i => i.codigo === idioma) || idiomas[0]
  const BandeiraAtual = idiomaSelecionado.Bandeira

  const handleThemeToggle = () => {
    toggleTheme()
  }

  const selecionarIdioma = (novoIdioma: typeof idiomas[0]) => {
    setIdioma(novoIdioma.codigo)
    setDropdownAberto(false)
  }

  const handleLinkClick = () => {
    setMenuMobileAberto(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          rolagemAtiva 
            ? 'bg-nude-50/95 dark:bg-gray-900 backdrop-blur-md shadow-lg' 
            : theme === 'dark' 
              ? 'bg-gray-900 shadow-lg' 
              : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Nome (Mobile) */}
            <div className="md:hidden">
              <span className="text-xl font-bold text-gradient">Sarah</span>
            </div>

            {/* Links de Navegação (Desktop) */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex space-x-8">
                {itensNavegacao.map((item, indice) => (
                  <motion.a
                    key={item.nome}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: indice * 0.1 }}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300 font-medium text-sm sm:text-base relative group"
                  >
                    {item.nome}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Botões de Idioma e Tema (Desktop e Mobile) */}
            {montado && (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Seletor de Idioma */}
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDropdownAberto(!dropdownAberto)}
                    className="p-2 bg-white dark:bg-black backdrop-blur-md rounded-full border border-[#e8dfd6]/50 dark:border-white/20 transition-colors flex items-center justify-center w-10 h-10 shadow-lg"
                    aria-label="Selecionar idioma"
                    aria-haspopup="menu"
                    aria-expanded={dropdownAberto}
                  >
                    <BandeiraAtual className="w-6 h-6 rounded-sm" />
                  </motion.button>

                  <AnimatePresence>
                    {dropdownAberto && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 glass-effect rounded-lg overflow-hidden border border-primary/30 min-w-[140px] sm:min-w-[160px]"
                        role="menu"
                      >
                        {idiomas.map((idiomaItem) => {
                          const Bandeira = idiomaItem.Bandeira
                          return (
                          <button
                            key={idiomaItem.codigo}
                            onClick={() => selecionarIdioma(idiomaItem)}
                            className={`w-full px-2 sm:px-3 py-2 flex items-center gap-2 hover:bg-[#f5f1ed]/60 dark:hover:bg-white/10 transition-colors text-xs sm:text-sm ${
                              idiomaSelecionado.codigo === idiomaItem.codigo ? 'bg-[#ebe5df]/40 dark:bg-white/5' : ''
                            }`}
                            role="menuitem"
                          >
                            <Bandeira className="w-5 h-4 rounded-sm" />
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
                  className="p-2 bg-white dark:bg-black backdrop-blur-md rounded-full border border-[#e8dfd6]/50 dark:border-white/20 transition-colors shadow-lg"
                  aria-label="Alternar tema"
                >
                  {theme === 'dark' ? (
                    <FaSun className="text-base sm:text-xl text-[#a89583] dark:text-white" />
                  ) : (
                    <FaMoon className="text-base sm:text-xl text-[#a89583] dark:text-white" />
                  )}
                </motion.button>

                {/* Botão Menu Hamburger (Mobile) */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuMobileAberto(!menuMobileAberto)}
                  className="md:hidden p-2 bg-white dark:bg-black backdrop-blur-md rounded-full border border-[#e8dfd6]/50 dark:border-white/20 transition-colors shadow-lg"
                  aria-label="Menu"
                  aria-controls={mobileMenuId}
                  aria-expanded={menuMobileAberto}
                >
                  {menuMobileAberto ? (
                    <FaTimes className="text-xl text-[#a89583] dark:text-white" />
                  ) : (
                    <FaBars className="text-xl text-[#a89583] dark:text-white" />
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuMobileAberto && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-16 right-0 left-0 bottom-0 bg-nude-50/98 dark:bg-gray-900 backdrop-blur-md z-40 md:hidden"
            id={mobileMenuId}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
              {itensNavegacao.map((item, indice) => (
                <motion.a
                  key={item.nome}
                  href={item.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: indice * 0.1 }}
                  className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  {item.nome}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
