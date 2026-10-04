import Link from 'next/link'
import { BadgeCheck, MapPin, MessageCircle, Phone, Star, Store } from 'lucide-react'
import type { Offer } from '@/lib/data'

export function OfferCard({ offer, best }: { offer: Offer; best?: boolean }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground">
          <Store className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-bold">{offer.shop}</h3>
            {offer.verified ? (
              <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Təsdiqlənmiş satıcı" />
            ) : null}
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {offer.location}
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-lg bg-highlight/15 px-2 py-1 text-xs font-bold text-amber-700">
          {offer.rating.toFixed(1)}
          <Star className="size-3.5 fill-highlight text-highlight" aria-hidden="true" />
        </span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-md bg-highlight px-2 py-1 text-[11px] font-bold text-highlight-foreground">
            {offer.condition}
          </span>
          {best ? (
            <span className="rounded-md bg-success/15 px-2 py-1 text-[11px] font-bold text-success">
              Ən yaxşı qiymət
            </span>
          ) : null}
        </div>
        <p className="text-2xl font-extrabold tracking-tight text-foreground">
          {offer.price} <span className="text-base font-bold text-muted-foreground">AZN</span>
        </p>
      </div>

      <p className="rounded-xl bg-muted/60 p-3 text-sm leading-relaxed text-slate-700">
        {offer.note}
      </p>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/cat"
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-blue-100"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Çatda Yaz
        </Link>
        <a
          href={`tel:${offer.phone}`}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-blue-700"
        >
          <Phone className="size-4" aria-hidden="true" />
          Zəng Et
        </a>
      </div>
    </article>
  )
}
