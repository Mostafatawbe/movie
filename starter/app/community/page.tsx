import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, Heart, TrendingUp, Users, Star, Flame } from 'lucide-react'
import { PageHeader, PageShell } from '@/components/layout/page-header'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mediaHref } from '@/lib/nav'
import { RatingBadge } from '@/components/media/rating-badge'
import { getTrending } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Community — Cinephile',
  description: 'Discussions, reviews, and activity from the Cinephile community.',
}

const DISCUSSIONS = [
  { id: 'd1', title: 'What is the most underrated sci-fi film of the decade?', author: 'Maya Chen', replies: 142, likes: 388, tag: 'Discussion' },
  { id: 'd2', title: 'Ranking every season of Hollow Crown from worst to best', author: 'Devin Park', replies: 96, likes: 271, tag: 'Lists' },
  { id: 'd3', title: 'Anime recommendations for someone who loved Iron Halo?', author: 'Sam Rivera', replies: 210, likes: 455, tag: 'Recommendations' },
  { id: 'd4', title: 'Hot take: the book was genuinely better this time', author: 'Priya Nair', replies: 63, likes: 129, tag: 'Debate' },
  { id: 'd5', title: 'Weekly watch club — this week we are covering Orbital', author: 'Jordan Lee', replies: 38, likes: 84, tag: 'Watch Club' },
]

const ACTIVITY = [
  { id: 'a1', user: 'CinemaScholar', action: 'rated', target: 'Echoes of Tomorrow', detail: '9.0', time: '12m' },
  { id: 'a2', user: 'ReelTalk', action: 'reviewed', target: 'Hollow Crown', detail: '', time: '48m' },
  { id: 'a3', user: 'NightOwlViews', action: 'added to watchlist', target: 'Blade of the Fallen Sky', detail: '', time: '2h' },
  { id: 'a4', user: 'FrameByFrame', action: 'rated', target: 'A Thousand Suns', detail: '8.5', time: '3h' },
  { id: 'a5', user: 'mayawatches', action: 'started a discussion in', target: 'Anime', detail: '', time: '5h' },
]

const TOP_MEMBERS = [
  { name: 'CinemaScholar', reviews: 312, points: '48.2k' },
  { name: 'NightOwlViews', reviews: 287, points: '41.9k' },
  { name: 'ReelTalk', reviews: 254, points: '39.1k' },
  { name: 'FrameByFrame', reviews: 198, points: '31.4k' },
]

export default function CommunityPage() {
  const trending = getTrending().slice(0, 5)

  return (
    <PageShell>
      <PageHeader
        eyebrow="Community"
        title="Join the Conversation"
        description="Discuss your favorite titles, share reviews, and connect with fellow fans."
        className="mb-8"
      >
        <Button size="lg" className="gap-2">
          <MessageSquare className="size-5" /> New Discussion
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: Users, label: 'Members', value: '128,940' },
          { icon: MessageSquare, label: 'Discussions', value: '9,412' },
          { icon: Star, label: 'Reviews', value: '284,301' },
          { icon: Flame, label: 'Online Now', value: '3,127' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card/50 p-5">
            <s.icon className="size-5 text-primary" />
            <p className="mt-3 text-2xl font-bold tabular-nums font-display">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Discussions */}
        <div className="min-w-0">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold font-display">
            <TrendingUp className="size-5 text-primary" /> Trending Discussions
          </h2>
          <div className="flex flex-col gap-3">
            {DISCUSSIONS.map((d) => (
              <Link
                key={d.id}
                href="/community"
                className="group flex items-start gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/50"
              >
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback>{d.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{d.tag}</Badge>
                    <span className="text-xs text-muted-foreground">by {d.author}</span>
                  </div>
                  <h3 className="text-balance font-medium leading-snug group-hover:text-primary">{d.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="size-3.5" /> {d.replies}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="size-3.5" /> {d.likes}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent activity */}
          <h2 className="mb-4 mt-10 text-xl font-semibold font-display">Recent Activity</h2>
          <div className="rounded-2xl border border-border bg-card/50">
            {ACTIVITY.map((a, i) => (
              <div
                key={a.id}
                className={
                  'flex items-center gap-3 p-4 ' + (i !== ACTIVITY.length - 1 ? 'border-b border-border' : '')
                }
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback>{a.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="min-w-0 flex-1 truncate text-sm">
                  <span className="font-medium">{a.user}</span>{' '}
                  <span className="text-muted-foreground">{a.action}</span>{' '}
                  <span className="font-medium text-primary">{a.target}</span>
                  {a.detail && <span className="text-muted-foreground"> — {a.detail}</span>}
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Top Members
            </h2>
            <div className="flex flex-col gap-4">
              {TOP_MEMBERS.map((m, i) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="w-4 text-sm font-bold text-primary">{i + 1}</span>
                  <Avatar className="size-9">
                    <AvatarFallback>{m.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.reviews} reviews</p>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">{m.points}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Trending Titles
            </h2>
            <div className="flex flex-col gap-3">
              {trending.map((m) => (
                <Link key={m.id} href={mediaHref(m.type, m.slug)} className="group flex items-center gap-3">
                  <img
                    src={m.poster || '/placeholder.svg'}
                    alt={m.title}
                    className="h-16 w-11 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium group-hover:text-primary">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.year}</p>
                  </div>
                  <RatingBadge rating={m.rating} />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  )
}
