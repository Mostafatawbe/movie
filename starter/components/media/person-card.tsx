import Link from 'next/link'
import { cn } from '@/lib/utils'

export function PersonCard({
  name,
  role,
  image,
  href,
  className,
}: {
  name: string
  role?: string
  image: string
  href?: string
  className?: string
}) {
  const inner = (
    <>
      <div className="aspect-square overflow-hidden rounded-full ring-1 ring-border/60">
        <img
          src={image || '/placeholder.svg'}
          alt={name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover/person:scale-105"
        />
      </div>
      <div className="mt-2 text-center">
        <p className="truncate text-sm font-medium">{name}</p>
        {role && <p className="truncate text-xs text-muted-foreground">{role}</p>}
      </div>
    </>
  )

  const cls = cn('group/person block w-28 shrink-0', className)

  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  )
}
