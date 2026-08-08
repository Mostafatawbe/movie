'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MediaGrid } from '@/components/media/media-grid'
import { PersonCard } from '@/components/media/person-card'
import { searchMedia, searchPeople } from '@/lib/mock-data'
import type { MediaType } from '@/lib/types'

const TYPE_LABELS: { key: MediaType; label: string }[] = [
  { key: 'movie', label: 'Movies' },
  { key: 'tv', label: 'TV' },
  { key: 'anime', label: 'Anime' },
  { key: 'manga', label: 'Manga' },
  { key: 'novel', label: 'Novels' },
]

export function SearchView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)

  const mediaResults = useMemo(() => searchMedia(query), [query])
  const peopleResults = useMemo(() => searchPeople(query), [query])

  const grouped = useMemo(() => {
    const map: Record<string, typeof mediaResults> = {}
    for (const item of mediaResults) {
      map[item.type] = map[item.type] ? [...map[item.type], item] : [item]
    }
    return map
  }, [mediaResults])

  const totalResults = mediaResults.length + peopleResults.length

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    router.replace(`/search${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <div className="pt-4">
      <form onSubmit={submit} className="relative mb-8 max-w-2xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV, anime, manga, novels, people..."
          className="h-14 rounded-full border-border bg-card pl-12 pr-12 text-base"
          aria-label="Search"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-5" />
          </button>
        )}
      </form>

      {!query.trim() ? (
        <p className="text-muted-foreground">Start typing to search across the entire catalog.</p>
      ) : totalResults === 0 ? (
        <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
          <p className="text-lg font-medium">{`No results for "${query}"`}</p>
          <p className="mt-2 text-sm text-muted-foreground">Try a different title, genre, or name.</p>
        </div>
      ) : (
        <div>
          <p className="mb-6 text-sm text-muted-foreground">
            {totalResults} result{totalResults === 1 ? '' : 's'} for{' '}
            <span className="font-medium text-foreground">{`"${query}"`}</span>
          </p>

          <Tabs defaultValue="all">
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="all">All</TabsTrigger>
              {TYPE_LABELS.filter((t) => grouped[t.key]?.length).map((t) => (
                <TabsTrigger key={t.key} value={t.key}>
                  {t.label} ({grouped[t.key].length})
                </TabsTrigger>
              ))}
              {peopleResults.length > 0 && (
                <TabsTrigger value="people">People ({peopleResults.length})</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="all" className="space-y-10">
              {peopleResults.length > 0 && (
                <section>
                  <h2 className="mb-4 font-display text-xl font-semibold">People</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {peopleResults.map((p) => (
                      <PersonCard key={p.id} name={p.name} role={p.role} image={p.image} href={`/person/${p.id.replace('person-', '')}`} />
                    ))}
                  </div>
                </section>
              )}
              {TYPE_LABELS.filter((t) => grouped[t.key]?.length).map((t) => (
                <section key={t.key}>
                  <h2 className="mb-4 font-display text-xl font-semibold">{t.label}</h2>
                  <MediaGrid items={grouped[t.key]} />
                </section>
              ))}
            </TabsContent>

            {TYPE_LABELS.filter((t) => grouped[t.key]?.length).map((t) => (
              <TabsContent key={t.key} value={t.key}>
                <MediaGrid items={grouped[t.key]} />
              </TabsContent>
            ))}

            {peopleResults.length > 0 && (
              <TabsContent value="people">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {peopleResults.map((p) => (
                    <PersonCard key={p.id} name={p.name} role={p.role} image={p.image} href={`/person/${p.id.replace('person-', '')}`} />
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </div>
  )
}
