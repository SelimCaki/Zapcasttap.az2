import Image from 'next/image'
import Link from 'next/link'
import { Camera } from 'lucide-react'

export function HeroCard() {
  return (
    <section className="relative mx-4 overflow-hidden rounded-3xl bg-slate-900 text-white ring-1 ring-white/10">
      <Image
        src="/images/hero-parts.png"
        alt=""
        fill
        priority
        sizes="440px"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-transparent" />
      <div className="relative flex flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-highlight px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-highlight-foreground">
          Pulsuz sorğu
        </span>
        <h2 className="max-w-[16rem] text-2xl font-bold leading-tight text-balance">
          Maşının üçün zapçast və ya usta axtarırsan?
        </h2>
        <p className="max-w-[15rem] text-sm leading-relaxed text-slate-300">
          Şəklini çək, sorğu yarat, satıcılardan təklif al.
        </p>
        <Link
          href="/sorgu"
          className="mt-1 flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-blue-700"
        >
          <Camera className="size-4" aria-hidden="true" />
          Sorğu Yarat
        </Link>
      </div>
    </section>
  )
}
