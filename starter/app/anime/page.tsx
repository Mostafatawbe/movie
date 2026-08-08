import type { Metadata } from 'next'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { BrowseView } from '@/components/browse/browse-view'
import { getByType, GENRES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Anime — Cinephile',
  description: 'Browse and discover anime. Filter by genre, studio, season, and more.',
}

export default function AnimePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Browse"
        title="Anime"
        description="Seasonal simulcasts to all-time classics — track every series you love."
        className="mb-8"
      />
      <BrowseView items={getByType('anime')} genres={GENRES.anime} />
    </PageShell>
  )
}
