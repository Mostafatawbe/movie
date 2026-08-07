'use client'

import { useMemo, useState } from 'react'
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react'
import type { MediaItem, SortOption } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MediaGrid } from '@/components/media/media-grid'
import { MediaListRow } from '@/components/browse/media-list-row'
import { FilterPanel, type FilterState, DEFAULT_FILTERS } from '@/components/browse/filter-panel'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const PAGE_SIZE = 12

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'alphabetical', label: 'A–Z' },
]

function applyFilters(items: MediaItem[], f: FilterState): MediaItem[] {
  let out = items.filter((m) => {
    if (f.query && !m.title.toLowerCase().includes(f.query.toLowerCase())) return false
    if (f.genre !== 'all' && !m.genres.includes(f.genre)) return false
    if (f.country !== 'all' && m.country !== f.country) return false
    if (f.language !== 'all' && m.language !== f.language) return false
    if (f.year !== 'all' && String(m.year) !== f.year) return false
    if (f.status !== 'all' && m.status !== f.status) return false
    return true
  })
  out = [...out].sort((a, b) => {
    switch (f.sort) {
      case 'newest':
        return b.year - a.year
      case 'oldest':
        return a.year - b.year
      case 'rating':
        return b.rating - a.rating
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      default:
        return b.popularity - a.popularity
    }
  })
  return out
}

export function BrowseView({
  items,
  genres,
  showTypeFilter = false,
}: {
  items: MediaItem[]
  genres: string[]
  showTypeFilter?: boolean
}) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => applyFilters(items, filters), [items, filters])
  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  function update(next: FilterState) {
    setFilters(next)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-20">
          <FilterPanel value={filters} onChange={update} genres={genres} showTypeFilter={showTypeFilter} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filtered.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            {/* Mobile filters */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <SlidersHorizontal className="size-4" /> Filters
                    </Button>
                  }
                />
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-6">
                    <FilterPanel
                      value={filters}
                      onChange={update}
                      genres={genres}
                      showTypeFilter={showTypeFilter}
                      bare
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-1">
              {SORTS.map((s) => (
                <Button
                  key={s.value}
                  variant={filters.sort === s.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => update({ ...filters, sort: s.value })}
                  className="hidden md:inline-flex"
                >
                  {s.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center rounded-lg border border-border p-0.5">
              <Button
                variant={view === 'grid' ? 'secondary' : 'ghost'}
                size="icon-sm"
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'secondary' : 'ghost'}
                size="icon-sm"
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {(filters.genre !== 'all' || filters.year !== 'all' || filters.status !== 'all') && (
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              ['Genre', filters.genre, () => update({ ...filters, genre: 'all' })],
              ['Year', filters.year, () => update({ ...filters, year: 'all' })],
              ['Status', filters.status, () => update({ ...filters, status: 'all' })],
            ]
              .filter(([, v]) => v !== 'all')
              .map(([label, value, clear]) => (
                <Badge
                  key={label as string}
                  variant="secondary"
                  className="cursor-pointer"
                  render={<button onClick={clear as () => void} />}
                >
                  {label as string}: {value as string} ✕
                </Badge>
              ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-xl border border-dashed border-border py-24 text-center">
            <p className="text-lg font-medium">No results found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        ) : view === 'grid' ? (
          <MediaGrid items={visible} />
        ) : (
          <div className="flex flex-col gap-3">
            {visible.map((item) => (
              <MediaListRow key={item.id} item={item} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setPage((p) => p + 1)} className="px-8">
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
