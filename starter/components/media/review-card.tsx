import { ThumbsUp } from 'lucide-react'
import type { Review } from '@/lib/types'
import { formatDate } from '@/lib/format'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RatingBadge } from '@/components/media/rating-badge'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-xl border border-border bg-card/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={review.avatar || '/placeholder.svg'} alt={review.author} />
            <AvatarFallback>{review.author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{review.author}</p>
            <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
          </div>
        </div>
        <RatingBadge rating={review.rating} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.content}</p>
      <button className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary">
        <ThumbsUp className="size-3.5" /> {review.likes}
      </button>
    </article>
  )
}
