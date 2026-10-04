import Image from 'next/image'
import { Bell, ChevronDown, MapPin } from 'lucide-react'

export function HomeHeader() {
  return (
    <header className="flex items-center gap-3 px-4 pb-4 pt-5">
      <Image
        src="/images/avatar.png"
        alt="İstifadəçi profili"
        width={44}
        height={44}
        className="size-11 rounded-full object-cover ring-2 ring-primary"
      />
      <div className="flex-1">
        <p className="text-xs text-slate-400">Məkan</p>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-semibold text-white"
        >
          <MapPin className="size-4 text-highlight" aria-hidden="true" />
          Bakı, Azərbaycan
          <ChevronDown className="size-4 text-slate-400" aria-hidden="true" />
        </button>
      </div>
      <button
        type="button"
        aria-label="Bildirişlər (3 yeni)"
        className="relative flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <Bell className="size-5" aria-hidden="true" />
        <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-highlight ring-2 ring-brand" />
      </button>
    </header>
  )
}
