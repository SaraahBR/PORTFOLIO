'use client'

import Hero from '@/components/Hero/Hero'
import About from '@/components/Sobre/About'
import Skills from '@/components/Habilidades/Skills'
import Experience from '@/components/Emprego/Experience'
import Education from '@/components/Educacao/Education'
import Projects from '@/components/Projetos/Projects'
import Courses from '@/components/Cursos/Courses'
import Languages from '@/components/Idiomas/Languages'
import Contact from '@/components/Contato/Contact'
import Navbar from '@/components/Navbar/Navbar'
import GalaxyBackground from '@/components/GalaxyBackground'
import FlowerFairyBackground from '@/components/FlowerFairyBackground'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'
import { useThemeContext } from '@/components/Tema/ThemeContext'

export default function Home() {
  const { t } = useLanguage()
  const { theme } = useThemeContext()
  const year = new Date().getFullYear()
  return (
    <main className="relative min-h-screen">
      {theme === 'dark' ? <GalaxyBackground /> : <FlowerFairyBackground />}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Courses />
      <Education />
      <Projects />
      <Languages />
      <Contact />

      <footer className="relative z-10 bg-[#e8d5cc]/90 dark:bg-gray-900/95 backdrop-blur-md py-6 text-center text-gray-700 dark:text-gray-200 border-t-2 border-[#c9a89a]/50 dark:border-gray-700 shadow-xl">
        <p>{`© ${year} - Sarah Hernandes. ${t('footer.rights')}`}</p>
      </footer>
    </main>
  )
}
