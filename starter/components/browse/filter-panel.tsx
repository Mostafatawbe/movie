'use client'

import { Search, X } from 'lucide-react'
import type { MediaStatus, SortOption } from '@/lib/types'
import { cn } from '@/lib/utils'
import { COUNTRIES, LANGUAGES } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export interface FilterState {
  query: string
  genre: string
  country: string
  language: string
  year: string
  status: string
  sort: SortOption
}

export const DEFAULT_FILTERS: FilterState = {
  query: '',
  genre: 'all',
  country: 'all',
  language: 'all',
  year: 'all',
  status: 'all',
  sort: 'popularity',
}

const YEARS = ['2025', '2024', '2023', '2022', '2021', '2020']
const STATUSES: MediaStatus[] = ['Released', 'Airing', 'Completed', 'Ongoing', 'Upcoming']

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm outline-none transition-colors focus:border-ring"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-popover">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

const opt = (values: string[], allLabel: string) => [
  { value: 'all', label: allLabel },
  ...values.map((v) => ({ value: v, label: v })),
]

export function FilterPanel({
  value,
  onChange,
  genres,
  showTypeFilter = false,
  bare = false,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
  genres: string[]
  showTypeFilter?: boolean
  bare?: boolean
}) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch })
  const isDirty = JSON.stringify(value) !== JSON.stringify(DEFAULT_FILTERS)

  const body = (
    <div className="flex flex-col gap-4">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">Search</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={value.query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Title keyword..."
            className="h-9 w-full rounded-lg border border-border bg-secondary/50 pl-9 pr-3 text-sm outline-none focus:border-ring"
          />
        </div>
      </div>

      <Select label="Genre" value={value.genre} onChange={(v) => set({ genre: v })} options={opt(genres, 'All Genres')} />
      <Select
        label="Country"
        value={value.country}
        onChange={(v) => set({ country: v })}
        options={opt(COUNTRIES, 'All Countries')}
      />
      <Select
        label="Language"
        value={value.language}
        onChange={(v) => set({ language: v })}
        options={opt(LANGUAGES, 'All Languages')}
      />
      <Select label="Year" value={value.year} onChange={(v) => set({ year: v })} options={opt(YEARS, 'Any Year')} />
      <Select
        label="Status"
        value={value.status}
        onChange={(v) => set({ status: v })}
        options={opt(STATUSES, 'Any Status')}
      />

      {isDirty && (
        <Button variant="ghost" size="sm" className="gap-1.5 self-start" onClick={() => onChange(DEFAULT_FILTERS)}>
          <X className="size-4" /> Clear filters
        </Button>
      )}
    </div>
  )

  if (bare) return body

  return (
    <div className={cn('rounded-xl border border-border bg-card/50 p-4')}>
      <h3 className="mb-4 text-sm font-semibold">Filters</h3>
      {body}
    </div>
  )
}
