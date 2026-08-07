'use client'

import { useState } from 'react'
import { ChevronDown, Clock } from 'lucide-react'
import type { Season } from '@/lib/types'
import { cn } from '@/lib/utils'
import { formatRuntime, formatDate } from '@/lib/format'

export function SeasonAccordion({ seasons }: { seasons: Season[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {seasons.map((season, i) => {
        const isOpen = open === i
        return (
          <div key={season.id} className="overflow-hidden rounded-xl border border-border bg-card/50">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/40"
              aria-expanded={isOpen}
            >
              <img
                src={season.poster || '/placeholder.svg'}
                alt={season.name}
                className="hidden size-14 rounded-lg object-cover sm:block"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{season.name}</p>
                <p className="text-sm text-muted-foreground">
                  {season.episodeCount} episodes · {formatDate(season.airDate)}
                </p>
              </div>
              <ChevronDown
                className={cn('size-5 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
              />
            </button>

            {isOpen && (
              <div className="divide-y divide-border border-t border-border">
                {season.episodes.map((ep) => (
                  <div key={ep.id} className="flex gap-4 p-4">
                    <div className="relative hidden w-40 shrink-0 overflow-hidden rounded-lg sm:block">
                      <img
                        src={ep.still || '/placeholder.svg'}
                        alt={ep.title}
                        className="aspect-video size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium">
                          {ep.number}. {ep.title}
                        </p>
                        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" /> {formatRuntime(ep.runtime)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{ep.overview}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDate(ep.airDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
