'use client'

import { useCallback, useMemo, useState } from 'react'
import { Check, Clock, Inbox, MapPin, Send, Wallet } from 'lucide-react'
import { driverRequests, myBrands, type DriverRequest } from '@/lib/data'
import { cn } from '@/lib/utils'
import { OfferSheet } from './offer-sheet'

const tabs = [
  { id: 'all', label: 'Bütün Markalar' },
  { id: 'mine', label: 'Mənim Markalarım (Mercedes, BMW)' },
  { id: 'near', label: 'Yaxınlıqdakı' },
] as const

type TabId = (typeof tabs)[number]['id']

export function SellerDashboard() {
  const [tab, setTab] = useState<TabId>('all')
  const [sent, setSent] = useState<Record<string, number>>({})
  const [active, setActive] = useState<DriverRequest | null>(null)

  const list = useMemo(() => {
    if (tab === 'mine') return driverRequests.filter((r) => myBrands.includes(r.brand))
    if (tab === 'near') return driverRequests.filter((r) => r.nearby)
    return driverRequests
  }, [tab])

  const sentCount = 18 + Object.keys(sent).length
  const closeSheet = useCallback(() => setActive(null), [])

  const stats = [
    { label: 'Aktiv Sorğular', value: '124', icon: Inbox, tone: 'text-blue-300' },
    { label: 'Göndərilən Təkliflər', value: String(sentCount), icon: Send, tone: 'text-green-300' },
    { label: 'Balansınız', value: '25.00 AZN', icon: Wallet, tone: 'text-highlight' },
  ]

  return (
    <>
      <div className="bg-brand px-4 pb-5">
        <ul className="grid grid-cols-3 gap-2">
          {stats.map(({ label, value, icon: Icon, tone }) => (
            <li key={label} className="flex flex-col gap-1.5 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              <Icon className={cn('size-5', tone)} aria-hidden="true" />
              <p className="text-lg font-extrabold leading-none text-white">{value}</p>
              <p className="text-[11px] leading-tight text-slate-400">{label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        role="tablist"
        aria-label="Filtr"
        className="no-scrollbar sticky top-0 z-10 flex gap-2 overflow-x-auto bg-background px-4 py-3"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
              tab === t.id
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-3 px-4 pb-6">
        {list.map((r) => {
          const sentPrice = sent[r.id]
          return (
            <li key={r.id}>
              <article className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      {r.car} · {r.year} · {r.engine}
                    </p>
                    <h3 className="mt-0.5 text-base font-bold">{r.part}</h3>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-highlight/15 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                    <Clock className="size-3" aria-hidden="true" />
                    {r.postedAgo}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{r.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-md bg-accent px-2 py-1 font-semibold text-accent-foreground">
                    {r.condition}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {r.distanceKm.toFixed(1)} km
                  </span>
                </div>
                {sentPrice ? (
                  <p className="flex h-11 items-center justify-center gap-2 rounded-xl bg-success/10 text-sm font-semibold text-success">
                    <Check className="size-4" aria-hidden="true" />
                    Təklif göndərildi — {sentPrice} AZN
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive(r)}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-blue-700"
                  >
                    <Send className="size-4" aria-hidden="true" />
                    Qiymət Təklifi Göndər
                  </button>
                )}
              </article>
            </li>
          )
        })}
      </ul>

      {active ? (
        <OfferSheet
          request={active}
          onClose={closeSheet}
          onSubmit={(price) => {
            setSent((prev) => ({ ...prev, [active.id]: price }))
            setActive(null)
          }}
        />
      ) : null}
    </>
  )
}
