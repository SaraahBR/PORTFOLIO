'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Idioma = 'pt-BR' | 'en' | 'es' | 'fr'

interface LanguageContextType {
  idioma: Idioma
  setIdioma: (idioma: Idioma) => void
  t: <T = string>(chave: string) => T
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Tipo local para mensagens que aceita objetos, arrays e primitivos
type MessagePrimitive = string | number | boolean | null
type MessageValue = MessagePrimitive | MessageValue[] | { [key: string]: MessageValue }
type Messages = { [key: string]: MessageValue }

// Importar traduções
import ptBR from '../../../messages/pt-BR.json'
import en from '../../../messages/en.json'
import es from '../../../messages/es.json'
import fr from '../../../messages/fr.json'

const traducoes: Record<Idioma, Messages> = {
  'pt-BR': ptBR,
  'en': en,
  'es': es,
  'fr': fr,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [idioma, setIdiomaState] = useState<Idioma>('pt-BR')
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    // Carregar idioma do localStorage
    const idiomaArmazenado = localStorage.getItem('idioma') as Idioma
    if (idiomaArmazenado && traducoes[idiomaArmazenado]) {
      setIdiomaState(idiomaArmazenado)
    }
    setMontado(true)
  }, [])

  const setIdioma = (novoIdioma: Idioma) => {
    setIdiomaState(novoIdioma)
    localStorage.setItem('idioma', novoIdioma)
  }

  const t = <T = string>(chave: string): T => {
    const chaves = chave.split('.')
    const valor = chaves.reduce<unknown>((acc, k) => {
      if (typeof acc === 'object' && acc !== null) {
        return (acc as Record<string, unknown>)[k]
      }
      return undefined
    }, traducoes[idioma])

    return (valor as T) ?? (chave as unknown as T)
  }

  if (!montado) return null

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider')
  }
  return context
}
