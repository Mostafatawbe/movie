import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Cinephile — Movies, TV, Anime, Manga & Novels',
  description:
    'A premium entertainment platform to discover and track movies, TV shows, anime, manga, and novels. Ratings, reviews, and a community of fans.',
  generator: 'v0.app',
  keywords: ['movies', 'tv shows', 'anime', 'manga', 'novels', 'reviews', 'streaming'],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0b',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
