import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import type { AbstractIntlMessages } from 'next-intl'
import type { RequestConfig } from 'next-intl/server'

export const locales = ['pt-BR', 'en', 'es', 'fr'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  // Garante locale definido e suportado
  const l: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : 'pt-BR'

  const messages: AbstractIntlMessages = (
    await import(`./messages/${l}.json`)
  ).default

  return {
    locale: l,
    messages,
  }
})
