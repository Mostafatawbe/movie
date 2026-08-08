import type { Metadata } from 'next'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { BrowseView } from '@/components/browse/browse-view'
import { getByType, GENRES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Novels — Cinephile',
  description: 'Browse light novels and web novels. Filter by genre, status, author, and more.',
}

export default function NovelsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Browse"
        title="Novels"
        description="Light novels and long-running web serials worth binge-reading."
        className="mb-8"
      />
      <BrowseView items={getByType('novel')} genres={GENRES.novel} />
    </PageShell>
  )
}
