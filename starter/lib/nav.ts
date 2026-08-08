import type { MediaType } from './types'

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Movies', href: '/movies' },
  { label: 'TV Shows', href: '/tv' },
  { label: 'Anime', href: '/anime' },
  { label: 'Manga', href: '/manga' },
  { label: 'Novels', href: '/novels' },
  { label: 'News', href: '/news' },
  { label: 'Community', href: '/community' },
]

export const MEDIA_TYPE_LABELS: Record<MediaType, string> = {
  movie: 'Movie',
  tv: 'TV Show',
  anime: 'Anime',
  manga: 'Manga',
  novel: 'Novel',
}

/** Maps a media type to its browse route base, e.g. movie -> /movies */
export const MEDIA_TYPE_ROUTE: Record<MediaType, string> = {
  movie: '/movies',
  tv: '/tv',
  anime: '/anime',
  manga: '/manga',
  novel: '/novels',
}

export function mediaHref(type: MediaType, slug: string): string {
  return `${MEDIA_TYPE_ROUTE[type]}/${slug}`
}

/** Build a person profile route from a display name (e.g. "Elena Ross" -> /person/elena-ross). */
export function personHref(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `/person/${slug}`
}
