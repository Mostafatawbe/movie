import { Skeleton } from '@/components/ui/skeleton'

export function MediaCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border/60">
      <Skeleton className="aspect-[2/3] w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

export function MediaGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function MediaRailSkeleton() {
  return (
    <div className="px-4 md:px-8">
      <Skeleton className="mb-3 h-6 w-48" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-40 shrink-0 md:w-44">
            <MediaCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}
