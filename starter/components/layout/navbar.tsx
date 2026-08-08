'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, Clapperboard, Menu, Search, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/nav'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// Dummy auth flag — replace with real session state later.
const IS_LOGGED_IN = true

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search')
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass border-b border-border/60' : 'bg-gradient-to-b from-background/90 to-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 md:px-8">
        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="flex items-center gap-2 font-display">
                  <Clapperboard className="size-5 text-primary" />
                  Cinephile
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted',
                      isActive(link.href) && 'bg-muted text-primary',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pr-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Clapperboard className="size-5" />
          </span>
          <span className="hidden text-lg font-semibold tracking-tight font-display sm:block">
            Cine<span className="text-primary">phile</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                isActive(link.href) && 'text-foreground',
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1">
          <form onSubmit={submitSearch} className="hidden md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles, people..."
                className="h-9 w-44 rounded-full border border-border bg-secondary/60 pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:w-64 focus:border-ring focus:bg-secondary"
                aria-label="Search"
              />
            </div>
          </form>

          <Link
            href="/search"
            aria-label="Search"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'md:hidden')}
          >
            <Search className="size-5" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                  <Bell className="size-5" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {[
                'New season of Hollow Crown is now streaming',
                'Blade of the Fallen Sky released episode 24',
                'Your watchlist title Orbital is trending',
              ].map((n, i) => (
                <DropdownMenuItem key={i} className="flex-col items-start gap-0.5 py-2">
                  <span className="text-sm">{n}</span>
                  <span className="text-xs text-muted-foreground">{i + 1}h ago</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {IS_LOGGED_IN ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Account" className="rounded-full">
                    <Avatar className="size-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Your avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col">
                    <span>Jordan Diaz</span>
                    <span className="text-xs font-normal text-muted-foreground">@jordan</span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <User className="size-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/admin" />}>
                  <LayoutDashboard className="size-4" /> Admin
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <Settings className="size-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/login" />}>
                  <LogOut className="size-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 pl-1">
              <Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
                Login
              </Link>
              <Link href="/register" className={cn(buttonVariants({ size: 'sm' }))}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
