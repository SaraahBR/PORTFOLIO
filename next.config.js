/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = process.env.REPO_NAME || process.env.NEXT_PUBLIC_BASE_PATH || 'PORTFOLIO'

const nextConfig = {
  // Gera site 100% estático (pasta out/)
  output: 'export',

  // Base para Project Pages (username.github.io/<repo>)
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // Evita problemas com <Image/> no export
  images: { 
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },

  // Evita 404 ao recarregar rotas
  trailingSlash: true,

  // Otimizações de performance
  compress: true,
  minify: true,
  swcMinify: true,

  // Headers para cache agressivo
  async headers() {
    return [
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
