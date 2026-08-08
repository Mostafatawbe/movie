import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Film,
  Tv,
  BookOpen,
  Star,
  Heart,
  Eye,
  Clock,
  BarChart3,
  Settings,
  Edit3,
} from 'lucide-react'
import { PageShell } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MediaGrid } from '@/components/media/media-grid'
import { RatingBadge } from '@/components/media/rating-badge'
import { getByType, getTrending, getTopRated, MEDIA } from '@/lib/mock-data'
import { mediaHref } from '@/lib/nav'

export const metadata: Metadata = {
  title: 'Profile — Cinephile',
  description: 'Your personal entertainment profile on Cinephile.',
}

const USER = {
  name: 'Jordan Diaz',
  handle: '@jordan',
  bio: 'Cinephile at heart. I watch everything from arthouse dramas to shōnen anime. Always looking for something new.',
  joined: 'January 2023',
  avatar: '/placeholder.svg?height=200&width=200&query=portrait avatar user profile',
  banner: '/placeholder.svg?height=600&width=1600&query=cinematic dark moody banner landscape',
}

const STATS = [
  { icon: Film, label: 'Movies', value: '247' },
  { icon: Tv, label: 'TV Shows', value: '89' },
  { icon: BookOpen, label: 'Books', value: '62' },
  { icon: Star, label: 'Reviews', value: '184' },
  { icon: Clock, label: 'Hours', value: '3,420' },
  { icon: BarChart3, label: 'Avg Rating', value: '7.8' },
]

const RECENT_RATINGS = MEDIA.slice(0, 6).map((m, i) => ({
  media: m,
  rating: [9, 8.5, 7, 9.5, 8, 7.5][i],
  date: `${i + 1}d ago`,
}))

export default function ProfilePage() {
  const favMovies = getByType('movie').slice(0, 6)
  const favShows = getByType('tv').slice(0, 6)
  const favAnime = getByType('anime').slice(0, 6)
  const favManga = getByType('manga').slice(0, 6)
  const favNovels = getByType('novel').slice(0, 6)
  const watchlist = getTrending().slice(0, 6)
  const recentlyViewed = [...MEDIA].reverse().slice(0, 6)

  return (
    <div className="pb-16">
      {/* Banner */}
      <div className="relative h-48 w-full overflow-hidden md:h-64">
        <img src={USER.banner} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <PageShell className="!py-0">
        {/* Profile header */}
        <div className="relative -mt-20 flex flex-col gap-5 md:flex-row md:items-end">
          <div className="size-32 shrink-0 overflow-hidden rounded-2xl ring-4 ring-background shadow-2xl md:size-40">
            <img src={USER.avatar} alt={USER.name} className="size-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-4xl font-display">{USER.name}</h1>
            <p className="text-sm text-muted-foreground">{USER.handle} · Joined {USER.joined}</p>
            <p className="mt-2 max-w-xl text-pretty text-sm text-muted-foreground">{USER.bio}</p>
          </div>
          <div className="flex gap-2 pb-1">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <Edit3 className="size-4" /> Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" render={<Link href="/profile" />}>
              <Settings className="size-4" /> Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card/50 p-4 text-center">
              <s.icon className="mx-auto size-5 text-primary" />
              <p className="mt-2 text-xl font-bold tabular-nums font-display">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="favorites" className="mt-10">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="favorites">
              <Heart className="size-4 mr-1.5" /> Favorites
            </TabsTrigger>
            <TabsTrigger value="watchlist">
              <Eye className="size-4 mr-1.5" /> Watchlist
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="size-4 mr-1.5" /> Recently Viewed
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="size-4 mr-1.5" /> Reviews & Ratings
            </TabsTrigger>
          </TabsList>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-10">
            <FavoriteSection title="Favorite Movies" items={favMovies} />
            <FavoriteSection title="Favorite TV Shows" items={favShows} />
            <FavoriteSection title="Favorite Anime" items={favAnime} />
            <FavoriteSection title="Favorite Manga" items={favManga} />
            <FavoriteSection title="Favorite Novels" items={favNovels} />
          </TabsContent>

          {/* Watchlist */}
          <TabsContent value="watchlist">
            <MediaGrid items={watchlist} />
          </TabsContent>

          {/* Recently viewed */}
          <TabsContent value="recent">
            <MediaGrid items={recentlyViewed} />
          </TabsContent>

          {/* Reviews & Ratings */}
          <TabsContent value="reviews">
            <div className="flex flex-col gap-3">
              {RECENT_RATINGS.map(({ media, rating, date }) => (
                <Link
                  key={media.id}
                  href={mediaHref(media.type, media.slug)}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/50"
                >
                  <img
                    src={media.poster}
                    alt={media.title}
                    className="h-20 w-14 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium group-hover:text-primary">{media.title}</h3>
                    <p className="text-xs text-muted-foreground">{media.year} · {media.genres.slice(0, 2).join(', ')}</p>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      Absolutely loved this. Every frame was a masterclass in storytelling.
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <RatingBadge rating={rating} size="md" />
                    <span className="text-xs text-muted-foreground">{date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PageShell>
    </div>
  )
}

function FavoriteSection({ title, items }: { title: string; items: import('@/lib/types').MediaItem[] }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold font-display">{title}</h2>
      <MediaGrid items={items} />
    </section>
  )
}
