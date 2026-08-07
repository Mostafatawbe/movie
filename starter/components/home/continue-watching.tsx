import Link from 'next/link'
import { Play } from 'lucide-react'
import type { MediaItem } from '@/lib/types'
import { mediaHref } from '@/lib/nav'

// Deterministic dummy progress so server/client render match.
const PROGRESS = [72, 34, 88, 15, 56, 41]

export function ContinueWatching({ items }: { items: MediaItem[] }) {
  if (items.length === 0) return null
  return (
    <section>
      <div className="mb-3 px-4 md:px-8">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl font-display">Continue Watching</h2>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2 md:px-8">
        {items.map((item, i) => (
          <Link
            key={item.id}
            href={mediaHref(item.type, item.slug)}
            className="group/cw relative w-72 shrink-0 overflow-hidden rounded-xl bg-card ring-1 ring-border/60 transition-all hover:ring-primary/70 md:w-80"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.backdrop || '/placeholder.svg'}
                alt={item.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover/cw:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover/cw:opacity-100">
                <span className="grid size-12 place-items-center rounded-full bg-primary/90 text-primary-foreground">
                  <Play className="size-5 fill-current" />
                </span>
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="truncate text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.type === 'tv' ? 'S1 · E4' : `${PROGRESS[i % PROGRESS.length]}% watched`}
                </p>
              </div>
            </div>
            <div className="h-1 w-full bg-muted">
              <div className="h-full bg-primary" style={{ width: `${PROGRESS[i % PROGRESS.length]}%` }} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
