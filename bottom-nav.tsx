'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, LayoutDashboard, MessageCircle, Plus, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/', label: 'Ana Səhifə', icon: House },
  { href: '/teklifler', label: 'Təkliflər', icon: Tag },
  { href: '/sorgu', label: 'Sorğu Yarat', icon: Plus, primary: true },
  { href: '/cat', label: 'Çat', icon: MessageCircle },
  { href: '/panel', label: 'Panel', icon: LayoutDashboard },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Əsas naviqasiya"
      className="sticky bottom-0 z-30 border-t border-border bg-card/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur"
    >
      <ul className="flex items-end justify-between">
        {items.map(({ href, label, icon: Icon, primary }) => {
          const active = pathname === href
          if (primary) {
            return (
              <li key={href} className="flex flex-1 justify-center">
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className="-mt-7 flex flex-col items-center gap-1"
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/40 ring-4 ring-background">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      'text-[11px] font-medium',
                      active ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            )
          }
          return (
            <li key={href} className="flex flex-1 justify-center">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
