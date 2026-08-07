import type { MediaItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MediaCard } from '@/components/media/media-card'

export function MediaGrid({ items, className }: { items: MediaItem[]; className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        className,
      )}
    >
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  )
}
