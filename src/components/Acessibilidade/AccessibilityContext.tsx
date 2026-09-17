'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface AccessibilityContextType {
  reduceMotion: boolean
  toggleReduceMotion: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const saved = localStorage.getItem('portfolio-reduce-motion') === 'true'
    setReduceMotion(saved)
    applyReduceMotion(saved)
  }, [])

  const applyReduceMotion = (value: boolean) => {
    document.documentElement.classList.toggle('reduce-motion', value)
  }

  const toggleReduceMotion = () => {
    const newValue = !reduceMotion
    setReduceMotion(newValue)
    applyReduceMotion(newValue)
    localStorage.setItem('portfolio-reduce-motion', String(newValue))
  }

  const value = React.useMemo(() => ({ reduceMotion, toggleReduceMotion }), [reduceMotion])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
