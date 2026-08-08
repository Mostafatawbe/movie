import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Cake, MapPin, Flag, Award } from 'lucide-react'
import { PageShell } from '@/components/layout/page-header'
import { MediaGrid } from '@/components/media/media-grid'
import { formatDate } from '@/lib/format'
import { getPersonView, PEOPLE, personSlug } from '@/lib/mock-data'

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: personSlug(p) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const view = getPersonView(slug)
  if (!view) return { title: 'Not found — Cinephile' }
  return {
    title: `${view.profile.name} — Cinephile`,
    description: view.profile.biography.slice(0, 155),
  }
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const view = getPersonView(slug)
  if (!view) notFound()
  const { profile, role, filmography } = view

  return (
    <div className="pb-16">
      {/* Banner */}
      <div className="relative h-56 w-full overflow-hidden md:h-72">
        <img src={profile.banner || '/placeholder.svg'} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <PageShell className="!py-0">
        <div className="relative -mt-24 flex flex-col gap-6 md:flex-row md:items-end">
          <div className="size-40 shrink-0 overflow-hidden rounded-2xl ring-4 ring-background shadow-2xl md:size-48">
            <img
              src={profile.image || '/placeholder.svg'}
              alt={profile.name}
              className="size-full object-cover"
            />
          </div>
          <div className="pb-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {role === 'director' ? 'Director' : 'Actor'}
            </p>
            <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight md:text-5xl font-display">
              {profile.name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Cake className="size-4 text-primary" /> {formatDate(profile.birthday)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" /> {profile.birthplace}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Flag className="size-4 text-primary" /> {profile.nationality}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <section>
              <h2 className="mb-3 text-xl font-semibold font-display">Biography</h2>
              <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">{profile.biography}</p>
            </section>

            {filmography.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 text-xl font-semibold font-display">
                  {role === 'director' ? 'Filmography' : 'Known For'}
                </h2>
                <MediaGrid items={filmography} />
              </section>
            )}

            {profile.gallery.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 text-xl font-semibold font-display">Gallery</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {profile.gallery.map((src, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl ring-1 ring-border/60">
                      <img
                        src={src || '/placeholder.svg'}
                        alt={`${profile.name} photo ${i + 1}`}
                        className="size-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card/50 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Personal Info
              </h2>
              <dl className="flex flex-col gap-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Known Credits</dt>
                  <dd className="font-medium">{filmography.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Birthday</dt>
                  <dd className="font-medium">{formatDate(profile.birthday)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Place of Birth</dt>
                  <dd className="font-medium">{profile.birthplace}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Nationality</dt>
                  <dd className="font-medium">{profile.nationality}</dd>
                </div>
              </dl>

              {profile.awards && profile.awards.length > 0 && (
                <>
                  <div className="my-4 h-px bg-border" />
                  <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Award className="size-3.5" /> Awards
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {profile.awards.map((a) => (
                      <li key={a} className="text-sm">{a}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>
      </PageShell>
    </div>
  )
}
