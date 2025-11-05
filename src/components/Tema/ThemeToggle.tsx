'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useThemeContext } from '@/components/Tema/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
  }, [])

  if (!montado) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => toggleTheme()}
      className="fixed top-20 right-6 z-50 p-3 bg-primary/20 hover:bg-primary/30 backdrop-blur-md rounded-full border border-primary/30 transition-colors"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        <FaSun className="text-2xl text-primary" />
      ) : (
        <FaMoon className="text-2xl text-primary" />
      )}
    </motion.button>
  )
}
