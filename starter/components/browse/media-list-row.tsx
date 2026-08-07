import Link from 'next/link'
import type { MediaItem } from '@/lib/types'
import { mediaHref, MEDIA_TYPE_LABELS } from '@/lib/nav'
import { formatRuntime } from '@/lib/format'
import { GenreBadge } from '@/components/media/genre-badge'
import { RatingBadge } from '@/components/media/rating-badge'

export function MediaListRow({ item }: { item: MediaItem }) {
  return (
    <Link
      href={mediaHref(item.type, item.slug)}
      className="group flex gap-4 rounded-xl border border-border bg-card/50 p-3 transition-colors hover:border-primary/60 hover:bg-card"
    >
      <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg sm:w-24">
        <img src={item.poster || '/placeholder.svg'} alt={item.title} loading="lazy" className="size-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{item.title}</h3>
            <p className="text-xs text-muted-foreground">
              {MEDIA_TYPE_LABELS[item.type]} · {item.year}
              {item.runtime ? ` · ${formatRuntime(item.runtime)}` : ''} · {item.status}
            </p>
          </div>
          <RatingBadge rating={item.rating} />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.overview}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {item.genres.slice(0, 3).map((g) => (
            <GenreBadge key={g} genre={g} />
          ))}
        </div>
      </div>
    </Link>
  )
}
