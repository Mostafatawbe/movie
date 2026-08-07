import type { Metadata } from 'next'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { BrowseView } from '@/components/browse/browse-view'
import { getByType, GENRES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Manga — Cinephile',
  description: 'Browse and discover manga. Filter by genre, status, author, and more.',
}

export default function MangaPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Browse"
        title="Manga"
        description="Ongoing serials and completed masterpieces — find your next read."
        className="mb-8"
      />
      <BrowseView items={getByType('manga')} genres={GENRES.manga} />
    </PageShell>
  )
}
