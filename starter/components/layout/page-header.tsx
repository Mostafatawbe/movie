import { cn } from '@/lib/utils'

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-3 md:flex-row md:items-end md:justify-between', className)}>
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        )}
        <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl font-display">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

/** Standard page container spacing used across browse & detail pages. */
export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto max-w-[1600px] px-4 py-8 md:px-8 md:py-10', className)}>{children}</div>
  )
}
