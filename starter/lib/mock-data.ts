import type {
  MediaItem,
  MediaType,
  PersonProfile,
  Review,
  CharacterCredit,
  Person,
  Season,
} from './types'

/* -------------------------------------------------------------------------- */
/*  Image helpers — swap these for real CDN / API image URLs later.           */
/* -------------------------------------------------------------------------- */

const poster = (q: string) =>
  `/placeholder.svg?height=600&width=400&query=${encodeURIComponent(q + ' movie poster, cinematic, dramatic lighting')}`
const backdrop = (q: string) =>
  `/placeholder.svg?height=1080&width=1920&query=${encodeURIComponent(q + ' cinematic wide backdrop, film still, moody lighting')}`
const avatar = (q: string) =>
  `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(q + ' portrait headshot')}`
const still = (q: string) =>
  `/placeholder.svg?height=400&width=700&query=${encodeURIComponent(q + ' scene still')}`

/* -------------------------------------------------------------------------- */
/*  Shared building blocks                                                    */
/* -------------------------------------------------------------------------- */

export const GENRES: Record<MediaType, string[]> = {
  movie: ['Action', 'Drama', 'Sci-Fi', 'Thriller', 'Comedy', 'Horror', 'Romance', 'Adventure', 'Crime', 'Fantasy'],
  tv: ['Drama', 'Crime', 'Sci-Fi', 'Comedy', 'Mystery', 'Fantasy', 'Documentary', 'Action'],
  anime: ['Shonen', 'Seinen', 'Slice of Life', 'Mecha', 'Isekai', 'Fantasy', 'Action', 'Romance', 'Sci-Fi'],
  manga: ['Shonen', 'Seinen', 'Shojo', 'Josei', 'Fantasy', 'Action', 'Romance', 'Horror'],
  novel: ['Fantasy', 'Sci-Fi', 'Mystery', 'Literary', 'Romance', 'Thriller', 'Historical'],
}

export const COUNTRIES = ['United States', 'United Kingdom', 'Japan', 'South Korea', 'France', 'Canada']
export const LANGUAGES = ['English', 'Japanese', 'Korean', 'French', 'Spanish']
export const STUDIOS = ['A24', 'Studio Ghibli', 'MAPPA', 'Wit Studio', 'HBO', 'Netflix', 'Warner Bros.']
export const NETWORKS = ['HBO', 'Netflix', 'AMC', 'Apple TV+', 'Prime Video', 'Disney+']

function makeReviews(seed: string): Review[] {
  const authors = [
    ['CinemaScholar', 9, 'An audacious, meticulously crafted piece of filmmaking that lingers long after the credits roll.'],
    ['ReelTalk', 8, 'Gorgeous cinematography and a career-best performance carry this one across the finish line.'],
    ['FrameByFrame', 7, 'Ambitious and often stunning, though the pacing sags in the middle act.'],
    ['NightOwlViews', 10, 'A masterpiece. Every frame feels intentional and every beat earns its emotion.'],
  ] as const
  return authors.map(([author, rating, content], i) => ({
    id: `${seed}-rev-${i}`,
    author,
    avatar: avatar(author),
    rating,
    date: `2025-0${(i % 9) + 1}-1${i}`,
    content,
    likes: 40 + i * 27,
  }))
}

function makeCast(names: [string, string][]): Person[] {
  return names.map(([name, character], i) => ({
    id: `cast-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    role: character,
    image: avatar(name),
    department: 'Acting',
  }))
}

function makeCharacters(names: [string, string][]): CharacterCredit[] {
  return names.map(([character, va], i) => ({
    id: `char-${i}-${character.toLowerCase().replace(/\s+/g, '-')}`,
    characterName: character,
    characterImage: avatar(character + ' anime character'),
    voiceActor: va,
    voiceActorImage: avatar(va),
  }))
}

function makeSeasons(count: number, showTitle: string): Season[] {
  return Array.from({ length: count }, (_, s) => {
    const seasonNum = s + 1
    const episodes = Array.from({ length: 8 }, (_, e) => ({
      id: `${showTitle}-s${seasonNum}-e${e + 1}`.toLowerCase().replace(/\s+/g, '-'),
      number: e + 1,
      title: `Episode ${e + 1}`,
      overview:
        'Tensions escalate as long-buried secrets rise to the surface and alliances are tested in unexpected ways.',
      runtime: 48 + (e % 3) * 4,
      still: still(`${showTitle} season ${seasonNum} episode ${e + 1}`),
      airDate: `202${3 + s}-0${(e % 9) + 1}-1${e}`,
    }))
    return {
      id: `${showTitle}-s${seasonNum}`.toLowerCase().replace(/\s+/g, '-'),
      number: seasonNum,
      name: `Season ${seasonNum}`,
      episodeCount: episodes.length,
      poster: poster(`${showTitle} season ${seasonNum}`),
      airDate: `202${3 + s}-01-15`,
      episodes,
    }
  })
}

/* -------------------------------------------------------------------------- */
/*  Curated catalogue                                                         */
/* -------------------------------------------------------------------------- */

type Seed = {
  title: string
  type: MediaType
  tagline?: string
  overview: string
  genres: string[]
  rating: number
  year: number
  status: MediaItem['status']
  trending?: boolean
  runtime?: number
  extra?: Partial<MediaItem>
}

const SEEDS: Seed[] = [
  {
    title: 'Echoes of Tomorrow',
    type: 'movie',
    tagline: 'The future remembers everything.',
    overview:
      'A grief-stricken quantum physicist discovers she can send messages to her past self, but every change ripples into a darker present she must race to undo.',
    genres: ['Sci-Fi', 'Drama', 'Thriller'],
    rating: 8.7,
    year: 2025,
    status: 'Released',
    trending: true,
    runtime: 142,
    extra: {
      budget: 95_000_000,
      revenue: 412_000_000,
      director: 'Ava Sinclair',
      writers: ['Ava Sinclair', 'Marcus Vale'],
      productionCompanies: ['Lumen Pictures', 'Orbit Films'],
      streamingPlatforms: ['Netflix', 'Apple TV+'],
      cast: makeCast([
        ['Elena Ross', 'Dr. Mira Kade'],
        ['Daniel Okafor', 'James Kade'],
        ['Yuki Tanaka', 'Dr. Sato'],
        ['Priya Nair', 'Agent Lin'],
      ]),
    },
  },
  {
    title: 'The Last Lighthouse',
    type: 'movie',
    tagline: 'Some lights are meant to guide you home.',
    overview:
      'On a remote island, an aging keeper and a runaway share one final storm season that will change how they both understand loss.',
    genres: ['Drama', 'Romance'],
    rating: 8.1,
    year: 2024,
    status: 'Released',
    trending: true,
    runtime: 118,
    extra: {
      director: 'Theo Marsh',
      streamingPlatforms: ['Prime Video'],
      cast: makeCast([
        ['Harold Vance', 'The Keeper'],
        ['Sofia Marlowe', 'Wren'],
      ]),
    },
  },
  {
    title: 'Neon Requiem',
    type: 'movie',
    tagline: 'In the city that never sleeps, someone has to.',
    overview:
      'A burnt-out detective hunts a ghost from his past through a rain-soaked megacity where memories can be bought and sold.',
    genres: ['Crime', 'Thriller', 'Sci-Fi'],
    rating: 7.9,
    year: 2025,
    status: 'Released',
    trending: true,
    runtime: 134,
    extra: {
      director: 'Ava Sinclair',
      streamingPlatforms: ['Netflix'],
      cast: makeCast([
        ['Daniel Okafor', 'Det. Cole'],
        ['Elena Ross', 'Nadia'],
      ]),
    },
  },
  {
    title: 'Crimson Divide',
    type: 'movie',
    tagline: 'Every war has two sides. Both bleed.',
    overview:
      'Two estranged brothers find themselves on opposite lines of a civil war, forced to choose between blood and belief.',
    genres: ['Action', 'Drama', 'Adventure'],
    rating: 8.3,
    year: 2023,
    status: 'Released',
    runtime: 156,
    extra: { director: 'Theo Marsh', streamingPlatforms: ['Disney+'] },
  },
  {
    title: 'Paper Moons',
    type: 'movie',
    tagline: 'Wishes cost more than you think.',
    overview:
      'A struggling illustrator stumbles into a traveling carnival where every drawing she makes comes true — for a price.',
    genres: ['Fantasy', 'Romance', 'Adventure'],
    rating: 7.6,
    year: 2024,
    status: 'Released',
    runtime: 109,
  },
  {
    title: 'Silent Frequency',
    type: 'movie',
    tagline: 'They heard us first.',
    overview:
      'A radio astronomer intercepts a signal that seems to know her name, launching a taut first-contact thriller.',
    genres: ['Sci-Fi', 'Horror', 'Thriller'],
    rating: 7.4,
    year: 2025,
    status: 'Upcoming',
  },

  // TV
  {
    title: 'Hollow Crown',
    type: 'tv',
    tagline: 'Power is the only inheritance.',
    overview:
      'A sprawling dynastic drama following three families clawing for control of a fractured empire across two decades.',
    genres: ['Drama', 'Fantasy'],
    rating: 9.1,
    year: 2022,
    status: 'Airing',
    trending: true,
    extra: {
      networks: ['HBO'],
      streamingPlatforms: ['HBO'],
      seasons: makeSeasons(3, 'Hollow Crown'),
      cast: makeCast([
        ['Harold Vance', 'Lord Aldric'],
        ['Sofia Marlowe', 'Lady Rowan'],
        ['Priya Nair', 'Queen Isolde'],
      ]),
    },
  },
  {
    title: 'Midnight Precinct',
    type: 'tv',
    tagline: 'The night shift never ends.',
    overview:
      'An anthology crime series set in a single police precinct where each season unravels one impossible case.',
    genres: ['Crime', 'Mystery', 'Drama'],
    rating: 8.5,
    year: 2023,
    status: 'Airing',
    trending: true,
    extra: { networks: ['AMC'], seasons: makeSeasons(2, 'Midnight Precinct') },
  },
  {
    title: 'Orbital',
    type: 'tv',
    tagline: 'Home is 400 kilometers away.',
    overview:
      'Six astronauts aboard a decaying space station must survive a slow-burning mystery when Earth goes dark.',
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    rating: 8.8,
    year: 2024,
    status: 'Airing',
    trending: true,
    extra: { networks: ['Apple TV+'], seasons: makeSeasons(1, 'Orbital') },
  },
  {
    title: 'The Understudy',
    type: 'tv',
    tagline: 'The show must go on.',
    overview:
      'A dark comedy about a theater troupe where ambition, sabotage, and a suspicious accident collide backstage.',
    genres: ['Comedy', 'Drama'],
    rating: 7.7,
    year: 2025,
    status: 'Upcoming',
    extra: { networks: ['Netflix'] },
  },

  // Anime
  {
    title: 'Blade of the Fallen Sky',
    type: 'anime',
    tagline: 'One cut can change the world.',
    overview:
      'A young swordsmith inherits a cursed blade and must master its power before it consumes the last free city.',
    genres: ['Shonen', 'Action', 'Fantasy'],
    rating: 9.0,
    year: 2023,
    status: 'Airing',
    trending: true,
    runtime: 24,
    extra: {
      studio: 'MAPPA',
      source: 'Manga',
      episodeCount: 24,
      streamingPlatforms: ['Netflix'],
      characters: makeCharacters([
        ['Ren Amaya', 'Kaito Ishida'],
        ['Suzu', 'Hana Mori'],
        ['Master Genji', 'Takeshi Ono'],
      ]),
    },
  },
  {
    title: 'Starlight Diner',
    type: 'anime',
    tagline: 'Every dish tells a story.',
    overview:
      'A gentle slice-of-life series set in a late-night diner where lost souls find comfort in food and quiet company.',
    genres: ['Slice of Life', 'Romance'],
    rating: 8.6,
    year: 2024,
    status: 'Completed',
    runtime: 23,
    extra: { studio: 'Studio Ghibli', source: 'Original', episodeCount: 12 },
  },
  {
    title: 'Iron Halo',
    type: 'anime',
    tagline: 'Pilots do not pray.',
    overview:
      'In a world of towering war machines, a reluctant pilot bonds with an ancient mech that remembers a forgotten war.',
    genres: ['Mecha', 'Sci-Fi', 'Action'],
    rating: 8.4,
    year: 2025,
    status: 'Airing',
    trending: true,
    runtime: 24,
    extra: { studio: 'Wit Studio', source: 'Light Novel', episodeCount: 13 },
  },
  {
    title: 'Reborn as the Archmage',
    type: 'anime',
    tagline: 'A second life, infinite spells.',
    overview:
      'A dying scholar is reincarnated into a magical world with all his knowledge intact — and a destiny he never asked for.',
    genres: ['Isekai', 'Fantasy', 'Action'],
    rating: 7.8,
    year: 2024,
    status: 'Completed',
    runtime: 24,
    extra: { studio: 'MAPPA', source: 'Light Novel', episodeCount: 12 },
  },

  // Manga
  {
    title: 'Ashes & Ember',
    type: 'manga',
    tagline: 'Rise from what remains.',
    overview:
      'A blacksmith\u2019s daughter forges a rebellion against an empire that turned her village to ash.',
    genres: ['Shonen', 'Action', 'Fantasy'],
    rating: 8.9,
    year: 2021,
    status: 'Ongoing',
    trending: true,
    extra: { author: 'Kenji Aramaki', artist: 'Kenji Aramaki', volumes: 14, chapters: 132 },
  },
  {
    title: 'Quiet Tide',
    type: 'manga',
    tagline: 'Love moves slowly, like the sea.',
    overview:
      'A tender coming-of-age romance between two students who meet every summer at the same seaside town.',
    genres: ['Shojo', 'Romance'],
    rating: 8.2,
    year: 2020,
    status: 'Completed',
    extra: { author: 'Mei Sato', artist: 'Mei Sato', volumes: 8, chapters: 64 },
  },
  {
    title: 'The Butcher\u2019s Ledger',
    type: 'manga',
    tagline: 'Every debt is paid in blood.',
    overview:
      'A psychological seinen thriller following a mild-mannered accountant leading a double life in the criminal underworld.',
    genres: ['Seinen', 'Horror', 'Action'],
    rating: 8.7,
    year: 2022,
    status: 'Ongoing',
    trending: true,
    extra: { author: 'Ryo Fukuda', artist: 'Ai Kurosawa', volumes: 9, chapters: 88 },
  },

  // Novels
  {
    title: 'The Cartographer\u2019s Daughter',
    type: 'novel',
    tagline: 'Not all maps lead home.',
    overview:
      'A sweeping literary fantasy about a girl who inherits maps of places that do not yet exist — and the empire that wants them.',
    genres: ['Fantasy', 'Literary'],
    rating: 8.5,
    year: 2023,
    status: 'Released',
    trending: true,
    extra: { author: 'Isabel Crane', publisher: 'Harrow House', pages: 512, isbn: '978-1-4028-9462-6' },
  },
  {
    title: 'Cold Harbor',
    type: 'novel',
    tagline: 'The truth froze here.',
    overview:
      'A detective returns to her coastal hometown to solve a decades-old disappearance that everyone wants forgotten.',
    genres: ['Mystery', 'Thriller'],
    rating: 8.0,
    year: 2024,
    status: 'Released',
    extra: { author: 'Marcus Vale', publisher: 'Nightjar Press', pages: 388, isbn: '978-0-7653-8721-1' },
  },
  {
    title: 'A Thousand Suns',
    type: 'novel',
    tagline: 'Humanity\u2019s last light.',
    overview:
      'Generations aboard a colony ship grapple with faith, mutiny, and hope as they approach a planet that may already be dead.',
    genres: ['Sci-Fi', 'Literary'],
    rating: 8.8,
    year: 2022,
    status: 'Released',
    trending: true,
    extra: { author: 'Isabel Crane', publisher: 'Harrow House', pages: 604, isbn: '978-1-9821-5560-3' },
  },
]

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const MEDIA: MediaItem[] = SEEDS.map((s, i) => {
  const slug = slugify(s.title)
  return {
    id: `${s.type}-${i}-${slug}`,
    type: s.type,
    slug,
    title: s.title,
    tagline: s.tagline,
    overview: s.overview,
    poster: poster(s.title),
    backdrop: backdrop(s.title),
    genres: s.genres,
    rating: s.rating,
    voteCount: 1200 + i * 731,
    popularity: Math.round(s.rating * 100 + (s.trending ? 250 : 0) + (2025 - s.year) * -3 + 500),
    status: s.status,
    year: s.year,
    releaseDate: `${s.year}-0${(i % 9) + 1}-1${i % 9}`,
    runtime: s.runtime,
    language: s.type === 'anime' || s.type === 'manga' ? 'Japanese' : 'English',
    country: s.type === 'anime' || s.type === 'manga' ? 'Japan' : 'United States',
    trending: s.trending,
    reviews: makeReviews(slug),
    ...s.extra,
  }
})

// Wire up recommendations / similar (same type, excluding self)
MEDIA.forEach((m) => {
  const sameType = MEDIA.filter((x) => x.type === m.type && x.id !== m.id).map((x) => x.id)
  m.recommendations = sameType.slice(0, 6)
  m.similar = [...sameType].reverse().slice(0, 6)
})

/* -------------------------------------------------------------------------- */
/*  People                                                                    */
/* -------------------------------------------------------------------------- */

export const PEOPLE: PersonProfile[] = [
  {
    id: 'person-elena-ross',
    name: 'Elena Ross',
    role: 'actor',
    image: avatar('Elena Ross actress'),
    banner: backdrop('Elena Ross red carpet'),
    biography:
      'Elena Ross is an award-winning actress known for her intense, layered performances across science fiction and drama. She trained at the National Theatre before breaking out in independent film.',
    birthday: '1989-03-14',
    birthplace: 'Dublin, Ireland',
    nationality: 'Irish',
    knownFor: ['movie-0-echoes-of-tomorrow', 'movie-2-neon-requiem'],
    awards: ['Best Actress — Venice 2025', 'Critics Choice Award 2024'],
    gallery: [avatar('Elena Ross 1'), avatar('Elena Ross 2'), avatar('Elena Ross 3'), avatar('Elena Ross 4')],
  },
  {
    id: 'person-daniel-okafor',
    name: 'Daniel Okafor',
    role: 'actor',
    image: avatar('Daniel Okafor actor'),
    banner: backdrop('Daniel Okafor premiere'),
    biography:
      'Daniel Okafor is a versatile actor celebrated for commanding leading-man presence and a knack for morally complex characters.',
    birthday: '1985-11-02',
    birthplace: 'Lagos, Nigeria',
    nationality: 'Nigerian-British',
    knownFor: ['movie-0-echoes-of-tomorrow', 'movie-2-neon-requiem'],
    awards: ['BAFTA Rising Star 2016'],
    gallery: [avatar('Daniel Okafor 1'), avatar('Daniel Okafor 2'), avatar('Daniel Okafor 3'), avatar('Daniel Okafor 4')],
  },
  {
    id: 'person-ava-sinclair',
    name: 'Ava Sinclair',
    role: 'director',
    image: avatar('Ava Sinclair director'),
    banner: backdrop('film set director chair'),
    biography:
      'Ava Sinclair is a visionary filmmaker whose work blends heady science fiction concepts with deeply human stories. Her films are known for their striking visuals and emotional precision.',
    birthday: '1980-06-21',
    birthplace: 'Los Angeles, USA',
    nationality: 'American',
    knownFor: ['movie-0-echoes-of-tomorrow', 'movie-2-neon-requiem'],
    awards: ['Best Director — Cannes 2025', 'Golden Globe 2024'],
    gallery: [backdrop('Ava Sinclair set 1'), backdrop('Ava Sinclair set 2'), backdrop('Ava Sinclair set 3'), backdrop('Ava Sinclair set 4')],
  },
  {
    id: 'person-theo-marsh',
    name: 'Theo Marsh',
    role: 'director',
    image: avatar('Theo Marsh director'),
    banner: backdrop('cinema director filming'),
    biography:
      'Theo Marsh is an acclaimed director known for sweeping, emotionally resonant dramas and a painterly eye for landscape.',
    birthday: '1975-09-09',
    birthplace: 'Manchester, UK',
    nationality: 'British',
    knownFor: ['movie-1-the-last-lighthouse', 'movie-3-crimson-divide'],
    awards: ['Best Director — BAFTA 2023'],
    gallery: [backdrop('Theo Marsh set 1'), backdrop('Theo Marsh set 2'), backdrop('Theo Marsh set 3'), backdrop('Theo Marsh set 4')],
  },
]

/* -------------------------------------------------------------------------- */
/*  Query helpers — the seam where a REST/GraphQL client would plug in.       */
/* -------------------------------------------------------------------------- */

export function getByType(type: MediaType): MediaItem[] {
  return MEDIA.filter((m) => m.type === type)
}

export function getById(id: string): MediaItem | undefined {
  return MEDIA.find((m) => m.id === id)
}

export function getBySlug(type: MediaType, slug: string): MediaItem | undefined {
  return MEDIA.find((m) => m.type === type && m.slug === slug)
}

export function getMany(ids: string[] = []): MediaItem[] {
  return ids.map((id) => getById(id)).filter((m): m is MediaItem => Boolean(m))
}

export function getTrending(): MediaItem[] {
  return [...MEDIA].filter((m) => m.trending).sort((a, b) => b.popularity - a.popularity)
}

export function getTopRated(limit = 12): MediaItem[] {
  return [...MEDIA].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function getRecentlyAdded(limit = 12): MediaItem[] {
  return [...MEDIA].sort((a, b) => b.year - a.year).slice(0, limit)
}

export function getPersonById(id: string): PersonProfile | undefined {
  return PEOPLE.find((p) => p.id === id)
}

export function getPersonBySlug(slug: string): PersonProfile | undefined {
  return PEOPLE.find((p) => p.id.replace('person-', '') === slug)
}

export function personSlug(p: PersonProfile): string {
  return p.id.replace('person-', '')
}

export function searchMedia(query: string): MediaItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return MEDIA.filter((m) => {
    return (
      m.title.toLowerCase().includes(q) ||
      m.overview.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q))
    )
  }).sort((a, b) => b.popularity - a.popularity)
}

export function searchPeople(query: string): PersonProfile[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return PEOPLE.filter((p) => p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q))
}

/* -------------------------------------------------------------------------- */
/*  Person resolution — links from cast/crew resolve to a full or synthetic   */
/*  profile so every person link renders, even without a curated entry.       */
/* -------------------------------------------------------------------------- */

export function nameSlug(name: string): string {
  return slugify(name)
}

export interface PersonView {
  profile: PersonProfile
  role: 'actor' | 'director'
  filmography: MediaItem[]
  voiceRoles: { media: MediaItem; character: string }[]
}

/** Resolve a person by slug, synthesizing a profile from credits when needed. */
export function getPersonView(slug: string): PersonView | undefined {
  const curated = PEOPLE.find((p) => personSlug(p) === slug)

  // Gather every credit that matches this slug across the catalogue.
  const asCast = MEDIA.filter((m) => m.cast?.some((c) => slugify(c.name) === slug))
  const asDirector = MEDIA.filter((m) => m.director && slugify(m.director) === slug)
  const asWriter = MEDIA.filter((m) => m.writers?.some((w) => slugify(w) === slug))
  const voiceRoles = MEDIA.flatMap((m) =>
    (m.characters ?? [])
      .filter((c) => c.voiceActor && slugify(c.voiceActor) === slug)
      .map((c) => ({ media: m, character: c.characterName })),
  )

  const filmographyMap = new Map<string, MediaItem>()
  ;[...asCast, ...asDirector, ...asWriter, ...voiceRoles.map((v) => v.media)].forEach((m) =>
    filmographyMap.set(m.id, m),
  )
  const filmography = [...filmographyMap.values()].sort((a, b) => b.year - a.year)

  if (!curated && filmography.length === 0) return undefined

  // Recover a display name from the first matching credit.
  const derivedName =
    curated?.name ??
    asCast[0]?.cast?.find((c) => slugify(c.name) === slug)?.name ??
    asDirector[0]?.director ??
    voiceRoles[0]?.media.characters?.find((c) => c.voiceActor && slugify(c.voiceActor) === slug)?.voiceActor ??
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const role: 'actor' | 'director' =
    curated?.role ?? (asDirector.length > 0 && asCast.length === 0 ? 'director' : 'actor')

  const profile: PersonProfile =
    curated ??
    {
      id: `person-${slug}`,
      name: derivedName,
      role,
      image: avatar(derivedName),
      banner: backdrop(`${derivedName} portrait cinematic`),
      biography: `${derivedName} is a celebrated ${role} whose work spans a range of acclaimed titles. Known for a distinctive on-screen presence and consistently compelling performances, ${derivedName.split(' ')[0]} continues to be a favorite among audiences and critics alike.`,
      birthday: '1986-05-12',
      birthplace: 'Los Angeles, USA',
      nationality: 'American',
      knownFor: filmography.slice(0, 4).map((m) => m.id),
      awards: [],
      gallery: [avatar(`${derivedName} 1`), avatar(`${derivedName} 2`), avatar(`${derivedName} 3`), avatar(`${derivedName} 4`)],
    }

  return { profile, role, filmography, voiceRoles }
}
