import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <form role="search" action="/panel" className="relative">
      <label htmlFor="part-search" className="sr-only">
        Detal axtar
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="part-search"
        name="q"
        type="search"
        placeholder="Detal adı və ya kod ilə axtar..."
        className="h-13 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15"
      />
    </form>
  )
}
