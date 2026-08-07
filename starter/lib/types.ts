/**
 * Core domain types for the Cinephile entertainment platform.
 *
 * These interfaces intentionally mirror the shape of a typical REST API
 * response (TMDb / AniList / MangaDex / Open Library) so the mock data layer
 * can later be swapped for real network calls with minimal changes.
 */

export type MediaType = 'movie' | 'tv' | 'anime' | 'manga' | 'novel'

export type MediaStatus =
  | 'Released'
  | 'Airing'
  | 'Completed'
  | 'Ongoing'
  | 'Upcoming'
  | 'Cancelled'
  | 'Hiatus'

export interface Genre {
  id: string
  name: string
}

export interface Person {
  id: string
  name: string
  role?: string // character or credited role
  image: string
  department?: 'Acting' | 'Directing' | 'Writing' | 'Production' | 'Voice'
}

export interface CharacterCredit {
  id: string
  characterName: string
  characterImage: string
  voiceActor?: string
  voiceActorImage?: string
}

export interface Episode {
  id: string
  number: number
  title: string
  overview: string
  runtime: number
  still: string
  airDate: string
}

export interface Season {
  id: string
  number: number
  name: string
  episodeCount: number
  poster: string
  airDate: string
  episodes: Episode[]
}

export interface Review {
  id: string
  author: string
  avatar: string
  rating: number // out of 10
  date: string
  content: string
  likes: number
}

export interface MediaItem {
  id: string
  type: MediaType
  slug: string
  title: string
  originalTitle?: string
  tagline?: string
  overview: string
  poster: string
  backdrop: string
  genres: string[]
  rating: number // 0 - 10
  voteCount: number
  popularity: number
  status: MediaStatus
  year: number
  releaseDate: string
  runtime?: number // minutes (movie / episode)
  language: string
  country: string
  trending?: boolean

  // Movie / TV specific
  budget?: number
  revenue?: number
  director?: string
  writers?: string[]
  cast?: Person[]
  productionCompanies?: string[]
  streamingPlatforms?: string[]

  // TV specific
  seasons?: Season[]
  networks?: string[]

  // Anime specific
  studio?: string
  source?: string
  episodeCount?: number
  characters?: CharacterCredit[]

  // Manga specific
  author?: string
  artist?: string
  volumes?: number
  chapters?: number

  // Novel specific
  publisher?: string
  isbn?: string
  pages?: number

  // Relations (ids)
  recommendations?: string[]
  similar?: string[]
  reviews?: Review[]
}

export interface PersonProfile {
  id: string
  name: string
  role: 'actor' | 'director'
  image: string
  banner: string
  biography: string
  birthday: string
  birthplace: string
  nationality: string
  knownFor: string[] // media ids
  awards?: string[]
  gallery: string[]
}

export type SortOption =
  | 'popularity'
  | 'newest'
  | 'oldest'
  | 'rating'
  | 'alphabetical'

export interface SearchFilters {
  query: string
  mediaType: MediaType | 'all'
  genre: string | 'all'
  country: string | 'all'
  language: string | 'all'
  year: string | 'all'
  status: MediaStatus | 'all'
  sort: SortOption
}
