'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { DriverRequest } from '@/lib/data'

export function OfferSheet({
  request,
  onClose,
  onSubmit,
}: {
  request: DriverRequest
  onClose: () => void
  onSubmit: (price: number, note: string) => void
}) {
  const [price, setPrice] = useState('')
  const [note, setNote] = useState('')
  const priceRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    priceRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const value = Number(price)
  const valid = Number.isFinite(value) && value > 0

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-[440px] items-end">
      <button
        type="button"
        aria-label="Bağla"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 animate-in fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-sheet-title"
        className="relative w-full rounded-t-3xl bg-card p-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] shadow-2xl animate-in slide-in-from-bottom"
      >
        <span className="mx-auto mb-4 block h-1.5 w-12 rounded-full bg-muted" aria-hidden="true" />
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id="offer-sheet-title" className="text-lg font-bold">
              Qiymət Təklifi Göndər
            </h2>
            <p className="text-sm text-muted-foreground">
              {request.car} ({request.year}) — {request.part}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Bağla"
            className="flex size-9 items-center justify-center rounded-full bg-muted"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (valid) onSubmit(value, note.trim())
          }}
        >
          <div>
            <label htmlFor="offer-price" className="mb-1.5 block text-sm font-semibold">
              Qiymət
            </label>
            <div className="relative">
              <input
                ref={priceRef}
                id="offer-price"
                type="number"
                inputMode="decimal"
                min={1}
                step="0.01"
                required
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-14 w-full rounded-xl border border-input bg-card pl-4 pr-16 text-2xl font-extrabold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                AZN
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="offer-note" className="mb-1.5 block text-sm font-semibold">
              Qeyd
            </label>
            <textarea
              id="offer-note"
              rows={3}
              placeholder="Detalın vəziyyəti, çatdırılma, zəmanət haqqında qeyd..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm leading-relaxed outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15"
            />
          </div>
          <button
            type="submit"
            disabled={!valid}
            className="h-13 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-blue-700 disabled:bg-slate-400"
          >
            Təklifi Göndər
          </button>
        </form>
      </div>
    </div>
  )
}
