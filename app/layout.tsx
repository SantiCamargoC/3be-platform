import type { Metadata } from 'next'
import { Sora, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '3be · Plataforma de Formación, Cultura y Bienestar',
  description:
    'Sistema multi-tenant para diagnóstico anónimo Hawkins, formación consciente por video y analítica de bienestar para directivos y talento humano.',
  keywords: [
    '3be',
    'bienestar laboral',
    'cultura organizacional',
    'diagnostico anonimo',
    'mapa de consciencia',
    'hawkins',
    'liderazgo consciente',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen bg-surface font-sans text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
