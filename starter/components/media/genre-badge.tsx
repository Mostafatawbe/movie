import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function GenreBadge({ genre, className }: { genre: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn('border-border/70 bg-background/40 backdrop-blur-sm', className)}>
      {genre}
    </Badge>
  )
}
