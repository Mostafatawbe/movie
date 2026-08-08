import Link from 'next/link'
import { Clapperboard, AtSign, Send, Rss, Mail } from 'lucide-react'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Categories',
    links: [
      { label: 'Movies', href: '/movies' },
      { label: 'TV Shows', href: '/tv' },
      { label: 'Anime', href: '/anime' },
      { label: 'Manga', href: '/manga' },
      { label: 'Novels', href: '/novels' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Account', href: '/profile' },
      { label: 'Report a Problem', href: '#' },
      { label: 'System Status', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '/news' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Preferences', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

const SOCIALS = [
  { label: 'Follow us', icon: AtSign, href: '#' },
  { label: 'Newsletter', icon: Send, href: '#' },
  { label: 'RSS feed', icon: Rss, href: '#' },
  { label: 'Email us', icon: Mail, href: '#' },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card/40">
      <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Clapperboard className="size-5" />
              </span>
              <span className="text-lg font-semibold font-display">
                Cine<span className="text-primary">phile</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Discover, track, and celebrate the stories you love — movies, TV, anime, manga, and novels, all in one
              premium home.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Cinephile. All rights reserved.</p>
          <p className="text-pretty">
            Data is illustrative. Built as a frontend skeleton for TMDb, AniList, MangaDex &amp; Open Library.
          </p>
        </div>
      </div>
    </footer>
  )
}
