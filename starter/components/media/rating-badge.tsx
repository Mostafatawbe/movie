import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RatingBadge({
  rating,
  className,
  size = 'sm',
}: {
  rating: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const tone =
    rating >= 8.5 ? 'text-emerald-400' : rating >= 7 ? 'text-amber-400' : 'text-orange-400'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full glass font-semibold tabular-nums',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-sm',
        size === 'lg' && 'px-3 py-1.5 text-base',
        className,
      )}
    >
      <Star className={cn('fill-current', tone, size === 'sm' ? 'size-3' : 'size-4')} />
      <span>{rating.toFixed(1)}</span>
    </span>
  )
}
