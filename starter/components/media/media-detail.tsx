import React from 'react'
import Link from 'next/link'
import {
  Play,
  Plus,
  Share2,
  Star,
  Clock,
  Calendar,
  Globe,
  MapPin,
  Building2,
  BookOpen,
  Layers,
  Film,
  Hash,
  User,
  PenLine,
  DollarSign,
} from 'lucide-react'
import type { MediaItem } from '@/lib/types'
import { MEDIA_TYPE_LABELS, personHref } from '@/lib/nav'
import { getMany } from '@/lib/mock-data'
import { formatRuntime, formatCurrency, formatDate, formatCompact } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GenreBadge } from '@/components/media/genre-badge'
import { RatingBadge } from '@/components/media/rating-badge'
import { PersonCard } from '@/components/media/person-card'
import { MediaRail } from '@/components/media/media-rail'
import { ReviewCard } from '@/components/media/review-card'
import { SeasonAccordion } from '@/components/media/season-accordion'
import { CommentsSection } from '@/components/media/comments-section'

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value?: string | number
}) {
  if (value === undefined || value === null || value === '' || value === '—') return null
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

export function MediaDetail({ item }: { item: MediaItem }) {
  const recommendations = getMany(item.recommendations)
  const similar = getMany(item.similar)
  const isBook = item.type === 'manga' || item.type === 'novel'

  return (
    <div className="pb-16">
      {/* Backdrop hero */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
          <img
            src={item.backdrop || '/placeholder.svg'}
            alt=""
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>

        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="relative -mt-48 flex flex-col gap-6 md:-mt-56 md:flex-row md:items-end">
            {/* Poster */}
            <div className="w-40 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60 shadow-2xl md:w-56">
              <img
                src={item.poster || '/placeholder.svg'}
                alt={`${item.title} poster`}
                className="aspect-[2/3] size-full object-cover"
              />
            </div>

            {/* Title block */}
            <div className="min-w-0 flex-1 pb-2">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full glass px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
                  {MEDIA_TYPE_LABELS[item.type]}
                </span>
                <RatingBadge rating={item.rating} size="md" />
                <span className="text-xs text-muted-foreground">
                  {formatCompact(item.voteCount)} votes
                </span>
                <span className="rounded-full border border-border/70 px-2 py-0.5 text-xs text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-glow md:text-5xl font-display">
                {item.title}
              </h1>
              {item.originalTitle && item.originalTitle !== item.title && (
                <p className="mt-1 text-sm text-muted-foreground">{item.originalTitle}</p>
              )}
              {item.tagline && <p className="mt-2 text-base font-medium text-primary">{item.tagline}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                {item.genres.map((g) => (
                  <GenreBadge key={g} genre={g} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg" className="h-11 gap-2 px-6 text-sm">
                  <Play className="size-5 fill-current" /> {isBook ? 'Read Now' : 'Watch Now'}
                </Button>
                <Button size="lg" variant="secondary" className="h-11 gap-2 px-5 text-sm">
                  <Plus className="size-5" /> Watchlist
                </Button>
                <Button variant="ghost" size="icon-lg" className="size-11" aria-label="Share">
                  <Share2 className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto mt-10 max-w-[1600px] px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="min-w-0">
            {/* Overview */}
            <section>
              <h2 className="mb-3 text-xl font-semibold font-display">Overview</h2>
              <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">{item.overview}</p>
            </section>

            {/* Trailer */}
            {!isBook && (
              <section className="mt-10">
                <h2 className="mb-3 text-xl font-semibold font-display">Trailer</h2>
                <div className="group relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-border/60">
                  <img
                    src={item.backdrop || '/placeholder.svg'}
                    alt={`${item.title} trailer`}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-black/40">
                    <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform group-hover:scale-110">
                      <Play className="size-7 fill-current" />
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* Cast */}
            {item.cast && item.cast.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 text-xl font-semibold font-display">Cast</h2>
                <div className="flex flex-wrap gap-4">
                  {item.cast.map((c) => (
                    <PersonCard
                      key={c.id}
                      name={c.name}
                      role={c.role}
                      image={c.image}
                      href={personHref(c.name)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Characters (anime) */}
            {item.characters && item.characters.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 text-xl font-semibold font-display">Characters & Voice Actors</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {item.characters.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/60 p-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={c.characterImage || '/placeholder.svg'}
                          alt={c.characterName}
                          className="size-11 rounded-lg object-cover"
                        />
                        <span className="truncate text-sm font-medium">{c.characterName}</span>
                      </div>
                      {c.voiceActor && (
                        <Link
                          href={personHref(c.voiceActor)}
                          className="flex min-w-0 items-center gap-3 text-right transition-colors hover:text-primary"
                        >
                          <span className="truncate text-sm text-muted-foreground">{c.voiceActor}</span>
                          <img
                            src={c.voiceActorImage || '/placeholder.svg'}
                            alt={c.voiceActor}
                            className="size-11 rounded-lg object-cover"
                          />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Seasons / Episodes (TV) */}
            {item.seasons && item.seasons.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 text-xl font-semibold font-display">Seasons & Episodes</h2>
                <SeasonAccordion seasons={item.seasons} />
              </section>
            )}

            {/* Reviews */}
            {item.reviews && item.reviews.length > 0 && (
              <section className="mt-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold font-display">Reviews</h2>
                  <span className="text-sm text-muted-foreground">{item.reviews.length} reviews</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {item.reviews.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </section>
            )}

            {/* Comments */}
            <section className="mt-10">
              <CommentsSection />
            </section>
          </div>

          {/* Sidebar — details */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card/50 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Stat icon={Star} label="Rating" value={`${item.rating.toFixed(1)} / 10`} />
                <Stat icon={Calendar} label="Release" value={formatDate(item.releaseDate)} />
                {!isBook && <Stat icon={Clock} label="Runtime" value={formatRuntime(item.runtime)} />}
                <Stat icon={Globe} label="Language" value={item.language} />
                <Stat icon={MapPin} label="Country" value={item.country} />
                {item.director && <Stat icon={Film} label="Director" value={item.director} />}
                {item.studio && <Stat icon={Building2} label="Studio" value={item.studio} />}
                {item.source && <Stat icon={BookOpen} label="Source" value={item.source} />}
                {item.episodeCount && <Stat icon={Layers} label="Episodes" value={item.episodeCount} />}
                {item.author && <Stat icon={PenLine} label="Author" value={item.author} />}
                {item.artist && <Stat icon={User} label="Artist" value={item.artist} />}
                {item.volumes && <Stat icon={Layers} label="Volumes" value={item.volumes} />}
                {item.chapters && <Stat icon={BookOpen} label="Chapters" value={item.chapters} />}
                {item.publisher && <Stat icon={Building2} label="Publisher" value={item.publisher} />}
                {item.pages && <Stat icon={BookOpen} label="Pages" value={item.pages} />}
                {item.isbn && <Stat icon={Hash} label="ISBN" value={item.isbn} />}
                {item.budget && <Stat icon={DollarSign} label="Budget" value={formatCurrency(item.budget)} />}
                {item.revenue && <Stat icon={DollarSign} label="Revenue" value={formatCurrency(item.revenue)} />}
              </div>

              {item.writers && item.writers.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <p className="mb-1 text-xs text-muted-foreground">Writers</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.writers.map((w) => (
                      <Link
                        key={w}
                        href={personHref(w)}
                        className="rounded-md bg-secondary px-2 py-1 text-xs transition-colors hover:text-primary"
                      >
                        {w}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {item.networks && item.networks.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <p className="mb-1 text-xs text-muted-foreground">Networks</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.networks.map((n) => (
                      <span key={n} className="rounded-md bg-secondary px-2 py-1 text-xs">
                        {n}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {item.productionCompanies && item.productionCompanies.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <p className="mb-1 text-xs text-muted-foreground">Production</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.productionCompanies.map((c) => (
                      <span key={c} className="rounded-md bg-secondary px-2 py-1 text-xs">
                        {c}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {item.streamingPlatforms && item.streamingPlatforms.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <p className="mb-2 text-xs text-muted-foreground">
                    {isBook ? 'Available at' : 'Streaming on'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.streamingPlatforms.map((p) => (
                      <span
                        key={p}
                        className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>

        {/* Recommendations & similar */}
        {recommendations.length > 0 && (
          <div className="mt-14 -mx-4 md:-mx-8">
            <MediaRail title="Recommendations" items={recommendations} />
          </div>
        )}
        {similar.length > 0 && (
          <div className="mt-10 -mx-4 md:-mx-8">
            <MediaRail title={`More like this`} items={similar} />
          </div>
        )}
      </div>
    </div>
  )
}
