import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/Tema/ThemeContext'
import { LanguageProvider } from '@/app/internacionalizacao/LanguageContext'
import { Toaster } from 'sonner'

// Fonte padrão via sistema (evita download de Google Fonts na build)

export const metadata: Metadata = {
  title: 'Sarah Hernandes - Desenvolvedora Full Stack',
  description: 'Portfólio de Sarah Vitória Hernandes Gaspar - Desenvolvedora Full Stack especializada em React, Next.js, Node.js e tecnologias modernas.',
  keywords: ['desenvolvedor', 'full stack', 'react', 'next.js', 'typescript', 'portfolio'],
  authors: [{ name: 'Sarah Hernandes' }],
  icons: {
    icon: 'favicon.ico',
  },
  openGraph: {
    title: 'Sarah Hernandes - Desenvolvedora Full Stack',
    description: 'Meu portfólio como desenvolvedora Full Stack. Confira meus projetos e habilidades!',
    type: 'website',
    url: 'https://saraahbr.github.io/PORTFOLIO/',
    images: [
      {
        url: 'https://media.licdn.com/dms/image/v2/D4D03AQGG-sDPII1WPQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731438153736?e=1749081600&v=beta&t=2DjPCCqNqEyHdrh6moaQTyfbgUTbcOittu7QoJOib7s',
        width: 1200,
        height: 630,
        alt: 'Sarah Hernandes',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('portfolio-theme') || 'dark';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
