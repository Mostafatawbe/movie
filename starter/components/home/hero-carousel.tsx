'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Info, Play } from 'lucide-react'
import type { MediaItem } from '@/lib/types'
import { mediaHref } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GenreBadge } from '@/components/media/genre-badge'
import { RatingBadge } from '@/components/media/rating-badge'

export function HeroCarousel({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = items.length

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  )

  const resetTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 7000)
  }, [count])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [resetTimer])

  if (count === 0) return null
  const active = items[index]

  return (
    <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
      {/* Slides */}
      {items.map((item, i) => (
        <div
          key={item.id}
          aria-hidden={i !== index}
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-out',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
        >
          <img
            src={item.backdrop || '/placeholder.svg'}
            alt=""
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-16 md:px-8 md:pb-20">
        <div key={active.id} className="max-w-2xl animate-fade-in-up">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <RatingBadge rating={active.rating} size="md" />
            <span className="rounded-full glass px-2.5 py-1 text-xs font-medium">{active.year}</span>
            {active.genres.slice(0, 3).map((g) => (
              <GenreBadge key={g} genre={g} />
            ))}
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-glow md:text-6xl font-display">
            {active.title}
          </h1>
          {active.tagline && (
            <p className="mt-3 text-lg font-medium text-primary">{active.tagline}</p>
          )}
          <p className="mt-4 line-clamp-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {active.overview}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-12 gap-2 px-7 text-base"
              render={<Link href={mediaHref(active.type, active.slug)} />}
            >
              <Play className="size-5 fill-current" /> Watch Now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 gap-2 px-7 text-base"
              render={<Link href={mediaHref(active.type, active.slug)} />}
            >
              <Info className="size-5" /> Details
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-4 z-10 flex items-center gap-2 md:right-8">
        <Button
          variant="secondary"
          size="icon"
          className="glass"
          onClick={() => {
            go(index - 1)
            resetTimer()
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="glass"
          onClick={() => {
            go(index + 1)
            resetTimer()
          }}
          aria-label="Next slide"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => {
              setIndex(i)
              resetTimer()
            }}
            aria-label={`Go to ${item.title}`}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === index ? 'w-8 bg-primary' : 'w-4 bg-foreground/30 hover:bg-foreground/50',
            )}
          />
        ))}
      </div>
    </section>
  )
}
