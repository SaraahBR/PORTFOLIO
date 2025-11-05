'use client'

import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaVideo, FaChevronLeft, FaChevronRight, FaDesktop, FaMobileAlt } from 'react-icons/fa'
import Image from 'next/image'
import SnakeGame from '../../app/jogo-cobrinha/SnakeGame.jsx'
import { useLanguage } from '@/app/internacionalizacao/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  // Imagens do projeto LUIGARAH - Desktop
  const luigarahDesktopImages = [
    'LUIGARAH-front/1oVIDEO-LUIGARAH.gif',
    'LUIGARAH-front/2oVIDEO-LUIGARAH.gif',
    'LUIGARAH-front/3oVIDEO-LUIGARAH.gif',
    'LUIGARAH-front/4oVIDEO-LUIGARAH.gif',
    'LUIGARAH-front/LightHouse-LUIGARAH.png'
  ]

  // Imagens do projeto LUIGARAH - Mobile
  const luigarahMobileImages = [
    'LUIGARAH-front/1oVIDEO-MOBILE-LUIGARAHF.gif',
    'LUIGARAH-front/2oVIDEO-MOBILE-LUIGARAHF.gif',
    'LUIGARAH-front/3oVIDEO-MOBILE-LUIGARAHF.gif',
    'LUIGARAH-front/4oVIDEO-MOBILE-LUIGARAHF.gif'
  ]

  // Seleciona as imagens baseado no modo de visualização
  const currentImages = viewMode === 'desktop' ? luigarahDesktopImages : luigarahMobileImages

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  // Resetar índice ao mudar entre desktop e mobile
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [viewMode])

  const projetos = t('projects.items') as Array<{
    title: string
    subtitle: string | null
    description: string
    technologies: string[]
    linkSite: string | null
    linkGithub: string | null
    linkVideo: string | null
  }>

  return (
    <section id="projects" className="relative pt-4 pb-12 sm:py-20 px-4 sm:px-6 lg:px-8 section-blur">
      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-16">
            <span className="text-gradient">{t('projects.title')}</span>
          </h2>

          <div className="space-y-8">
            {projetos.map((projeto, indice) => (
              <motion.div
                key={projeto.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: indice * 0.1, duration: 0.6 }}
                className="glass-effect rounded-xl p-6 sm:p-8 hover-glow w-full max-w-full overflow-hidden glitter"
              >
                <div className={`flex flex-col ${indice === 0 ? 'lg:flex-row' : ''} gap-6`}>
                  {/* Imagem/Vídeo/Carousel */}
                  {indice === 0 ? (
                    <div className="w-full md:w-2/5 flex-shrink-0 relative">
                      {/* Botões de alternância Desktop/Mobile */}
                      <div className="flex justify-center gap-2 mb-4">
                        <button
                          onClick={() => setViewMode('desktop')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            viewMode === 'desktop'
                              ? 'bg-[#b8968a] dark:bg-white text-white dark:text-gray-900 shadow-md'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          <FaDesktop size={16} />
                          Desktop
                        </button>
                        <button
                          onClick={() => setViewMode('mobile')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            viewMode === 'mobile'
                              ? 'bg-[#b8968a] dark:bg-white text-white dark:text-gray-900 shadow-md'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          <FaMobileAlt size={16} />
                          Mobile
                        </button>
                      </div>

                      {/* Visualização Desktop (Monitor) */}
                      {viewMode === 'desktop' ? (
                        <div className="pb-0">
                          {/* Frame da TV com padding para as bordas */}
                          <div className="relative bg-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-black border-4 dark:border-white/10 shadow-lg rounded-lg p-3 sm:p-4 mb-0.5">
                            {/* Área da imagem */}
                            <div className="relative aspect-video rounded overflow-hidden bg-gray-200 dark:bg-gray-900">
                              <Image
                                src={currentImages[currentImageIndex]}
                                alt={`LUIGARAH Screenshot ${currentImageIndex + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                              />
                            </div>

                            {/* Botões de navegação nas laterais da borda (sem fundo) */}
                            <button
                              onClick={handlePrevImage}
                              className="absolute left-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-all z-20"
                              aria-label="Imagem anterior"
                            >
                              <FaChevronLeft size={15} className="text-gray-700 dark:text-white drop-shadow-lg" />
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="absolute right-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-all z-20"
                              aria-label="Próxima imagem"
                            >
                              <FaChevronRight size={15} className="text-gray-700 dark:text-white drop-shadow-lg" />
                            </button>

                            {/* Indicadores (bolinhas) embaixo da imagem, dentro da borda */}
                            <div className="flex justify-center gap-2 pt-3">
                              {currentImages.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentImageIndex(idx)}
                                  className={`h-2 rounded-full transition-all shadow-sm ${
                                    idx === currentImageIndex
                                      ? 'bg-[#b8968a] dark:bg-white w-6'
                                      : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400 w-2'
                                  }`}
                                  aria-label={`Ir para imagem ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Suporte/Pé do Monitor (estilo moderno) */}
                          <div className="flex flex-col items-center -mt-0.5">
                            {/* Haste vertical larga */}
                            <div className="w-16 sm:w-20 h-5 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-900 dark:to-black rounded-b shadow-md"></div>
                            {/* Base retangular robusta do suporte */}
                            <div className="w-40 sm:w-48 h-3.5 sm:h-4 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-black dark:to-gray-900 rounded-md shadow-xl"></div>
                          </div>
                        </div>
                      ) : (
                        /* Visualização Mobile (Celular) */
                        <div className="pb-0">
                          <div className="flex justify-center items-center p-4">
                            {/* Container do celular - estilo Samsung S25 (mais quadrado) */}
                            <div className="relative mobile-shadow-light">
                              <style jsx>{`
                                .mobile-shadow-light {
                                  filter: drop-shadow(0 0 12px rgba(100, 116, 139, 0.25));
                                }
                                :global(.dark) .mobile-shadow-light {
                                  filter: none;
                                }
                              `}</style>
                              {/* Frame do celular - bordas menos arredondadas (Samsung) - branco puro no light, preto no dark */}
                              <div 
                                className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-gradient-to-b dark:from-gray-950 dark:to-black rounded-2xl shadow-2xl p-2 border border-gray-200 dark:border-gray-800" 
                                style={{ width: '155px' }}
                              >
                                
                                {/* Botões laterais (volume esquerda, power direita) */}
                                <div className="absolute -left-[2px] top-12 w-[2px] h-4 bg-gray-400 dark:bg-gray-800 rounded-l-sm"></div>
                                <div className="absolute -left-[2px] top-[4.5rem] w-[2px] h-6 bg-gray-400 dark:bg-gray-800 rounded-l-sm"></div>
                                <div className="absolute -right-[2px] top-14 w-[2px] h-8 bg-gray-400 dark:bg-gray-800 rounded-r-sm"></div>
                                
                                {/* Setas de navegação na borda do celular */}
                                <button
                                  onClick={handlePrevImage}
                                  className="absolute left-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-all z-30"
                                  aria-label="Imagem anterior"
                                >
                                  <FaChevronLeft size={10} className="text-gray-900 dark:text-white drop-shadow-lg" />
                                </button>
                                <button
                                  onClick={handleNextImage}
                                  className="absolute right-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-all z-30"
                                  aria-label="Próxima imagem"
                                >
                                  <FaChevronRight size={10} className="text-gray-900 dark:text-white drop-shadow-lg" />
                                </button>
                                
                                {/* Tela do celular */}
                                <div className="relative rounded-xl overflow-hidden bg-gray-50 dark:bg-black" style={{ height: '270px' }}>
                                  {/* Barra superior com câmera e sensores */}
                                  <div className="absolute top-0 left-0 right-0 h-4 bg-white dark:bg-gray-950 z-20 rounded-t-xl border-b border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center justify-center h-full gap-1">
                                      {/* Câmera */}
                                      <div className="w-1.5 h-1.5 bg-gray-800 dark:bg-gray-600 rounded-full"></div>
                                      {/* Speaker */}
                                      <div className="w-8 h-1 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
                                    </div>
                                  </div>

                                  {/* Conteúdo da tela com imagem */}
                                  <div className="absolute top-4 left-0 right-0 bottom-8 overflow-hidden">
                                    <div className="relative w-full h-full" style={{ transform: 'scaleX(1.15)' }}>
                                      <Image
                                        src={currentImages[currentImageIndex]}
                                        alt={`LUIGARAH Screenshot ${currentImageIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="160px"
                                      />

                                      {/* Indicadores */}
                                      <div className="absolute bottom-0.5 left-0 right-0 flex justify-center gap-1 z-30">
                                        {currentImages.map((_, idx) => (
                                          <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`h-1 rounded-full transition-all ${
                                              idx === currentImageIndex
                                                ? 'bg-[#b8968a] dark:bg-white w-3'
                                                : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400 w-1'
                                            }`}
                                            aria-label={`Ir para imagem ${idx + 1}`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Área da borda inferior */}
                                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-white dark:bg-gray-950 rounded-b-xl flex items-center justify-center border-t border-gray-200 dark:border-gray-800">
                                    {/* Botão Home circular centralizado */}
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black flex items-center justify-center">
                                      <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Conteúdo do Card */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 break-words leading-snug">{projeto.title}</h3>
                    {projeto.subtitle && (
                      <p className="text-[#c4a199] dark:text-[#d4c4b8] font-semibold mb-3 break-words">{projeto.subtitle}</p>
                    )}
                    <p className="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed break-words">{projeto.description}</p>

                    {/* Tecnologias */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {projeto.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#f2e8e0] dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-full text-sm font-medium border border-[#e5d8cf] dark:border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                      {projeto.linkSite && (
                        <a
                          href={projeto.linkSite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4b5a8] via-[#c4a199] to-[#b8968a] dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white font-semibold rounded-lg hover:scale-105 transition-transform border border-[#c4a199]/30 dark:border-gray-600"
                        >
                          <FaExternalLinkAlt />
                          {t('projects.viewSite')}
                        </a>
                      )}
                      {projeto.linkVideo && (
                        <a
                          href={projeto.linkVideo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-nude-100 dark:bg-white/10 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-nude-200 dark:hover:bg-white/20 transition-colors border border-nude-200 dark:border-white/20"
                        >
                          <FaVideo />
                          {t('projects.viewVideo')}
                        </a>
                      )}
                      {projeto.linkGithub && (
                        <a
                          href={projeto.linkGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-nude-100 dark:bg-white/10 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-nude-200 dark:hover:bg-white/20 transition-colors border border-nude-200 dark:border-white/20"
                        >
                          <FaGithub />
                          {t('projects.viewCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Jogo da Cobrinha */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: projetos.length * 0.1, duration: 0.6 }}
            >
              <SnakeGame />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
