import Link from 'next/link'
import { Play, Plus } from 'lucide-react'
import type { MediaItem } from '@/lib/types'
import { mediaHref, MEDIA_TYPE_LABELS } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { RatingBadge } from '@/components/media/rating-badge'

export function MediaCard({
  item,
  className,
  variant = 'poster',
}: {
  item: MediaItem
  className?: string
  variant?: 'poster' | 'wide'
}) {
  return (
    <Link
      href={mediaHref(item.type, item.slug)}
      className={cn(
        'group/card relative block overflow-hidden rounded-xl bg-card ring-1 ring-border/60 transition-all duration-300 hover:ring-primary/70 hover:shadow-2xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <div className={cn('relative overflow-hidden', variant === 'poster' ? 'aspect-[2/3]' : 'aspect-video')}>
        <img
          src={variant === 'poster' ? item.poster : item.backdrop}
          alt={`${item.title} ${variant === 'poster' ? 'poster' : 'backdrop'}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 will-change-transform group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <div className="absolute left-2 top-2 flex items-center gap-1.5">
          <RatingBadge rating={item.rating} />
        </div>
        <span className="absolute right-2 top-2 rounded-full glass px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/90">
          {MEDIA_TYPE_LABELS[item.type]}
        </span>

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 p-3 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            <Play className="size-3.5 fill-current" /> Watch
          </span>
          <span className="grid size-8 place-items-center rounded-full glass text-foreground">
            <Plus className="size-4" />
          </span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold leading-tight">{item.title}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{item.year}</span>
          <span className="size-1 rounded-full bg-muted-foreground/50" />
          <span className="truncate">{item.genres.slice(0, 2).join(', ')}</span>
        </div>
      </div>
    </Link>
  )
}
