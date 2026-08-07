import { HeroCarousel } from '@/components/home/hero-carousel'
import { MediaRail } from '@/components/media/media-rail'
import { ContinueWatching } from '@/components/home/continue-watching'
import {
  getByType,
  getTrending,
  getTopRated,
  getRecentlyAdded,
} from '@/lib/mock-data'

export default function HomePage() {
  const trending = getTrending()
  const movies = getByType('movie')
  const tv = getByType('tv')
  const anime = getByType('anime')
  const manga = getByType('manga')
  const novels = getByType('novel')
  const topRated = getTopRated(12)
  const recent = getRecentlyAdded(12)

  return (
    <div className="pb-8">
      <HeroCarousel items={trending.slice(0, 5)} />

      <div className="relative z-10 -mt-8 flex flex-col gap-10">
        <MediaRail title="Trending This Week" items={trending} href="/search?sort=popularity" />
        <ContinueWatching items={movies.slice(0, 6)} />
        <MediaRail title="Popular Movies" items={movies} href="/movies" />
        <MediaRail title="Popular TV Shows" items={tv} href="/tv" />
        <MediaRail title="Top Anime" items={anime} href="/anime" />
        <MediaRail title="Top Manga" items={manga} href="/manga" />
        <MediaRail title="Popular Novels" items={novels} href="/novels" />
        <MediaRail title="Recently Added" items={recent} />
        <MediaRail title="Top Rated" items={topRated} />
        <MediaRail title="Editor's Picks" items={[...trending].reverse()} />
        <MediaRail title="Recommended For You" items={[...topRated].reverse()} />
      </div>
    </div>
  )
}
