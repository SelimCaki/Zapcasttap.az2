import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export function ScreenHeader({
  title,
  backHref = '/',
  action,
}: {
  title: string
  backHref?: string
  action?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 bg-brand px-4 py-3 text-brand-foreground">
      <Link
        href={backHref}
        aria-label="Geri qayıt"
        className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </Link>
      <h1 className="flex-1 text-lg font-semibold text-balance">{title}</h1>
      {action}
    </header>
  )
}
