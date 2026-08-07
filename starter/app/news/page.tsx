import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { MEDIA } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'News — Cinephile',
  description: 'The latest headlines across movies, TV, anime, manga, and novels.',
}

const CATEGORIES = ['All', 'Movies', 'TV', 'Anime', 'Manga', 'Novels', 'Industry']

const backdrop = (q: string) =>
  `/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(q + ' entertainment news editorial')}`

const HEADLINES = [
  'First look: the year\u2019s most anticipated sci-fi epic reveals its cast',
  'Streaming wars heat up as three platforms announce major originals',
  'Beloved anime confirms a third season with a new studio at the helm',
  'Award season predictions: the frontrunners taking shape this fall',
  'Bestselling fantasy novel lands a prestige limited-series adaptation',
  'Director roundtable: the visionaries redefining modern blockbusters',
  'Manga sales surge as a cult hit crosses over to mainstream audiences',
  'Behind the score: composing the sound of this season\u2019s biggest hit',
]

const AUTHORS = ['Alex Rivera', 'Priya Nair', 'Jordan Lee', 'Sam Okoro', 'Mia Fontaine']

const ARTICLES = HEADLINES.map((title, i) => {
  const media = MEDIA[i % MEDIA.length]
  return {
    id: `news-${i}`,
    title,
    category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
    author: AUTHORS[i % AUTHORS.length],
    time: `${i + 1}h ago`,
    readMins: 3 + (i % 5),
    image: backdrop(media.title),
    excerpt:
      'A closer look at the story everyone is talking about this week, with fresh details, context, and what it means for fans.',
  }
})

export default function NewsPage() {
  const [featured, ...rest] = ARTICLES

  return (
    <PageShell>
      <PageHeader
        eyebrow="Latest"
        title="News & Features"
        description="Headlines, interviews, and deep dives from across the world of entertainment."
        className="mb-8"
      />

      {/* Category chips */}
      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c, i) => (
          <button
            key={c}
            className={
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ' +
              (i === 0
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:text-foreground')
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      <Link
        href="/news"
        className="group relative mb-10 block overflow-hidden rounded-2xl ring-1 ring-border/60"
      >
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <img
            src={featured.image || '/placeholder.svg'}
            alt={featured.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <Badge className="mb-3">{featured.category}</Badge>
          <h2 className="max-w-3xl text-balance text-2xl font-bold leading-tight md:text-4xl font-display">
            {featured.title}
          </h2>
          <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{featured.author}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {featured.readMins} min read
            </span>
          </p>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <Link
            key={a.id}
            href="/news"
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:ring-1 hover:ring-primary/60"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={a.image || '/placeholder.svg'}
                alt={a.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge variant="secondary" className="absolute left-3 top-3 glass">
                {a.category}
              </Badge>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-balance font-semibold leading-snug group-hover:text-primary">{a.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.author} · {a.time}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}
