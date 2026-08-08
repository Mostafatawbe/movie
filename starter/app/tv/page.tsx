import type { Metadata } from 'next'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { BrowseView } from '@/components/browse/browse-view'
import { getByType, GENRES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'TV Shows — Cinephile',
  description: 'Browse and discover TV shows. Filter by genre, network, status, and more.',
}

export default function TVPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Browse"
        title="TV Shows"
        description="Binge-worthy series, prestige dramas, and can't-miss finales — all in one place."
        className="mb-8"
      />
      <BrowseView items={getByType('tv')} genres={GENRES.tv} />
    </PageShell>
  )
}
