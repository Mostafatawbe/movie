import type { Metadata } from 'next'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { BrowseView } from '@/components/browse/browse-view'
import { getByType, GENRES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Movies — Cinephile',
  description: 'Browse and discover movies. Filter by genre, year, country, and more.',
}

export default function MoviesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Browse"
        title="Movies"
        description="From blockbusters to hidden indie gems — explore our full catalogue of films."
        className="mb-8"
      />
      <BrowseView items={getByType('movie')} genres={GENRES.movie} />
    </PageShell>
  )
}
