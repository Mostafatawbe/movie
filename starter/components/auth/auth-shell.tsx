import Link from 'next/link'
import { Clapperboard } from 'lucide-react'

const backdrop = '/auth-backdrop.png'

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Form side */}
      <div className="flex items-center justify-center px-4 py-12 md:px-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <Clapperboard className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight font-display">
              Cine<span className="text-primary">phile</span>
            </span>
          </Link>

          <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl font-display">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <img src={backdrop || "/placeholder.svg"} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10">
          <p className="max-w-md text-balance text-2xl font-semibold leading-tight text-glow font-display">
            Track everything you watch and read. Discover your next favorite.
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Movies, TV, anime, manga, and novels — all in one premium hub built for true fans.
          </p>
        </div>
      </div>
    </div>
  )
}
