'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { MediaItem } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { MediaCard } from '@/components/media/media-card'

export function MediaRail({
  title,
  items,
  href,
  variant = 'poster',
}: {
  title: string
  items: MediaItem[]
  href?: string
  variant?: 'poster' | 'wide'
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    const el = scrollerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  if (items.length === 0) return null

  return (
    <section className="group/rail relative">
      <div className="mb-3 flex items-center justify-between px-4 md:px-8">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl font-display">{title}</h2>
        <div className="flex items-center gap-2">
          {href && (
            <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              View all
            </Link>
          )}
          <div className="hidden items-center gap-1 md:flex">
            <Button variant="secondary" size="icon-sm" onClick={() => scroll('left')} aria-label="Scroll left">
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="secondary" size="icon-sm" onClick={() => scroll('right')} aria-label="Scroll right">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 md:px-8"
      >
        {items.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            variant={variant}
            className={variant === 'poster' ? 'w-40 shrink-0 md:w-44' : 'w-72 shrink-0 md:w-80'}
          />
        ))}
      </div>
    </section>
  )
}
