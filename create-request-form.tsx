'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Check, ChevronDown, X } from 'lucide-react'
import { brands, conditions } from '@/lib/data'
import { cn } from '@/lib/utils'

const MAX_PHOTOS = 4

const fieldClass =
  'h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15'

type Photo = { id: string; url: string; name: string }

export function CreateRequestForm() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [engine, setEngine] = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState<string>(conditions[0])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [published, setPublished] = useState(false)

  const carDone = Boolean(brand && model && year)
  const partDone = description.trim().length > 3
  const photoDone = photos.length > 0
  const currentStep = !carDone ? 1 : !partDone ? 2 : 3

  const steps = [
    { n: 1, label: 'Avtomobil', done: carDone },
    { n: 2, label: 'Detal', done: partDone },
    { n: 3, label: 'Foto', done: photoDone },
  ]

  function handleFiles(files: FileList | null) {
    if (!files) return
    const room = MAX_PHOTOS - photos.length
    const next = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, room)
      .map((f) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(f), name: f.name }))
    setPhotos((prev) => [...prev, ...next])
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((p) => p.id !== id)
    })
  }

  if (published) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="size-10" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-bold">Sorğunuz yayımlandı!</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {brand} {model} ({year}) üçün sorğunuz satıcılara göndərildi. Təkliflər gəldikcə
          bildiriş alacaqsınız.
        </p>
        <Link
          href="/teklifler"
          className="mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
        >
          Təkliflərə bax
        </Link>
        <Link href="/" className="text-sm font-medium text-primary">
          Ana səhifəyə qayıt
        </Link>
      </div>
    )
  }

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault()
        setPublished(true)
      }}
    >
      <ol className="flex items-center gap-2 bg-brand px-4 pb-5 pt-1" aria-label="Addımlar">
        {steps.map((s, i) => {
          const active = s.n === currentStep
          return (
            <li key={s.n} className="flex flex-1 items-center gap-2">
              <span
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold',
                  s.done
                    ? 'bg-success text-white'
                    : active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/10 text-slate-300',
                )}
              >
                {s.done ? <Check className="size-3.5" aria-hidden="true" /> : null}
                {s.n}. {s.label}
              </span>
              {i < steps.length - 1 ? (
                <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
              ) : null}
            </li>
          )
        })}
      </ol>

      <div className="flex flex-col gap-6 px-4 py-5">
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-sm font-bold">Avtomobil məlumatları</legend>
          <div className="relative">
            <label htmlFor="brand" className="sr-only">
              Marka
            </label>
            <select
              id="brand"
              required
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value)
                setModel('')
              }}
              className={cn(fieldClass, 'appearance-none pr-10', !brand && 'text-muted-foreground')}
            >
              <option value="" disabled>
                Marka seçin
              </option>
              {Object.keys(brands).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="relative">
            <label htmlFor="model" className="sr-only">
              Model
            </label>
            <select
              id="model"
              required
              disabled={!brand}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={cn(
                fieldClass,
                'appearance-none pr-10 disabled:opacity-60',
                !model && 'text-muted-foreground',
              )}
            >
              <option value="" disabled>
                Model seçin
              </option>
              {(brands[brand] ?? []).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="year" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Buraxılış ili
              </label>
              <input
                id="year"
                required
                inputMode="numeric"
                type="number"
                min={1970}
                max={2027}
                placeholder="2014"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="engine" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Mühərrik həcmi / Tipi
              </label>
              <input
                id="engine"
                placeholder="2.2 Diesel"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-sm font-bold">Detal</legend>
          <label htmlFor="description" className="sr-only">
            Detalın təsviri
          </label>
          <textarea
            id="description"
            required
            rows={4}
            placeholder="Tələb olunan detalın adı və ətraflı təsviri..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={cn(fieldClass, 'h-auto resize-none py-3 leading-relaxed')}
          />
          <div role="radiogroup" aria-label="Detalın vəziyyəti" className="flex flex-col gap-2">
            {conditions.map((c) => {
              const checked = condition === c
              return (
                <label
                  key={c}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm font-medium transition-colors',
                    checked ? 'border-primary bg-accent text-accent-foreground' : 'border-input',
                  )}
                >
                  <input
                    type="radio"
                    name="condition"
                    value={c}
                    checked={checked}
                    onChange={() => setCondition(c)}
                    className="size-4 accent-primary"
                  />
                  {c}
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-bold">
            Foto <span className="font-normal text-muted-foreground">({photos.length}/{MAX_PHOTOS})</span>
          </legend>
          {photos.length < MAX_PHOTOS ? (
            <label
              htmlFor="photos"
              className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-accent/50 px-6 py-8 text-center transition-colors hover:border-primary hover:bg-accent"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Camera className="size-7" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-foreground text-balance">
                Detalın və ya zədələnmiş hissənin fotosunu əlavə edin
              </span>
              <span className="text-xs text-muted-foreground">(Max 4 foto)</span>
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                className="sr-only"
                onChange={(e) => {
                  handleFiles(e.target.files)
                  e.target.value = ''
                }}
              />
            </label>
          ) : null}
          {photos.length > 0 ? (
            <ul className="mt-3 grid grid-cols-4 gap-2">
              {photos.map((p) => (
                <li key={p.id} className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                  <img src={p.url} alt={p.name} className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(p.id)}
                    aria-label="Fotonu sil"
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-slate-900/80 text-white"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </fieldset>
      </div>

      <div className="sticky bottom-0 mt-auto border-t border-border bg-card/95 p-4 backdrop-blur">
        <button
          type="submit"
          disabled={!carDone || !partDone}
          className="h-13 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
        >
          Sorğunu Yayımla
        </button>
      </div>
    </form>
  )
}
