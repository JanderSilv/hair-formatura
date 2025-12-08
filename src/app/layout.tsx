import type { Metadata } from 'next'

import { loveCraftFont } from '@/assets/fonts'

import './globals.css'
import { ENV } from '@/config'

export const metadata: Metadata = {
  title: 'Hair Formatura',
  description: 'Espetáculo de formatura da UFBA',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
        <link rel="manifest" href="/assets/site.webmanifest" />

        <meta property="og:title" content="Hair Formatura" />
        <meta property="og:description" content="Espetáculo de formatura da UFBA" />
        <meta property="og:image" content="/assets/images/sun.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ENV.NEXT_PUBLIC_SITE_URL} />
      </head>
      <body className={`${loveCraftFont.variable} antialiased`}>{children}</body>
    </html>
  )
}
