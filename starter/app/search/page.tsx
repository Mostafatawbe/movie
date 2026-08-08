import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageShell } from '@/components/layout/page-header'
import { SearchView } from '@/components/search/search-view'
import { MediaRailSkeleton } from '@/components/media/media-skeletons'

export const metadata: Metadata = {
  title: 'Search — Cinephile',
  description: 'Search across movies, TV, anime, manga, novels, and people.',
}

export default function SearchPage() {
  return (
    <PageShell>
      <Suspense fallback={<MediaRailSkeleton />}>
        <SearchView />
      </Suspense>
    </PageShell>
  )
}
