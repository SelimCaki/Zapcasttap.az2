import Link from 'next/link'
import { CarFront, MessageCircle } from 'lucide-react'
import { recentRequests } from '@/lib/data'

export function RecentRequests() {
  return (
    <section aria-labelledby="recent-title">
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 id="recent-title" className="text-base font-bold">
          Son Axtarılan Detallar
        </h2>
        <Link href="/teklifler" className="text-sm font-medium text-primary">
          Hamısı
        </Link>
      </div>
      <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-2">
        {recentRequests.map((r) => (
          <li key={r.id} className="w-56 shrink-0 snap-start">
            <Link
              href="/teklifler"
              className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                  <CarFront className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{r.car}</p>
                  <p className="text-xs text-muted-foreground">{r.year} il</p>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">{r.part}</p>
              <span className="flex w-fit items-center gap-1.5 rounded-full bg-highlight/15 px-2.5 py-1 text-xs font-semibold text-amber-700">
                <MessageCircle className="size-3.5" aria-hidden="true" />
                {r.bids} təklif
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
