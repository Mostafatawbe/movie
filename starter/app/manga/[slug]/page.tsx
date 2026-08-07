import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MediaDetail } from '@/components/media/media-detail'
import { getByType, getBySlug } from '@/lib/mock-data'

export function generateStaticParams() {
  return getByType('manga').map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getBySlug('manga', slug)
  if (!item) return { title: 'Not found — Cinephile' }
  return {
    title: `${item.title} — Cinephile`,
    description: item.overview,
  }
}

export default async function MangaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getBySlug('manga', slug)
  if (!item) notFound()
  return <MediaDetail item={item} />
}
