'use client'

import { useMemo, useState } from 'react'
import { offers } from '@/lib/data'
import { cn } from '@/lib/utils'
import { OfferCard } from './offer-card'

const sorts = [
  { id: 'price', label: 'Ən ucuz' },
  { id: 'rating', label: 'Reytinq' },
  { id: 'verified', label: 'Təsdiqlənmiş' },
] as const

type SortId = (typeof sorts)[number]['id']

export function OffersList() {
  const [sort, setSort] = useState<SortId>('price')
  const cheapest = Math.min(...offers.map((o) => o.price))

  const list = useMemo(() => {
    if (sort === 'verified') return offers.filter((o) => o.verified)
    return [...offers].sort((a, b) => (sort === 'price' ? a.price - b.price : b.rating - a.rating))
  }, [sort])

  return (
    <section aria-labelledby="offers-title" className="flex flex-col gap-3 px-4">
      <div className="flex items-center justify-between">
        <h2 id="offers-title" className="text-base font-bold">
          Gələn təkliflər
        </h2>
        <span className="text-xs text-muted-foreground">{list.length} nəticə</span>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="Sıralama">
        {sorts.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={sort === s.id}
            onClick={() => setSort(s.id)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
              sort === s.id
                ? 'bg-brand text-brand-foreground'
                : 'border border-border bg-card text-muted-foreground',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <ul className="flex flex-col gap-3">
        {list.map((o) => (
          <li key={o.id}>
            <OfferCard offer={o} best={o.price === cheapest} />
          </li>
        ))}
      </ul>
    </section>
  )
}
