import Link from 'next/link'
import { CarFront, Cog, Disc3, Droplets, Wrench, Zap } from 'lucide-react'

const categories = [
  { label: 'Mühərrik', icon: Cog },
  { label: 'Xodovoy / Asqı', icon: Wrench },
  { label: 'Kuzov və Bamper', icon: CarFront },
  { label: 'Elektrik və İşıq', icon: Zap },
  { label: 'Yağlar və Mayelər', icon: Droplets },
  { label: 'Təkər və Disk', icon: Disc3 },
]

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-title" className="px-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="categories-title" className="text-base font-bold">
          Kateqoriyalar
        </h2>
        <Link href="/panel" className="text-sm font-medium text-primary">
          Hamısı
        </Link>
      </div>
      <ul className="grid grid-cols-3 gap-3">
        {categories.map(({ label, icon: Icon }) => (
          <li key={label}>
            <Link
              href="/sorgu"
              className="flex h-full flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center shadow-sm transition-colors hover:border-primary"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold leading-tight">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
