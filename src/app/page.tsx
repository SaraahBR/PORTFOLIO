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
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <main className="relative min-h-screen">
      <GalaxyBackground />
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

      <footer className="relative z-10 bg-nude-200/40 dark:bg-darker/50 backdrop-blur-md py-6 text-center text-gray-600 dark:text-gray-400 border-t border-nude-300/30 dark:border-white/5">
        <p>{`© ${year} - Sarah Hernandes. ${t('footer.rights')}`}</p>
      </footer>
    </main>
  )
}
