export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nude-100 dark:bg-dark">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  )
}
