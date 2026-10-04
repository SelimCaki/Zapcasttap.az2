'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BadgeCheck,
  CheckCheck,
  ChevronLeft,
  ImagePlus,
  MapPin,
  Navigation,
  Paperclip,
  Phone,
  Send,
  Store,
  X,
} from 'lucide-react'
import { initialMessages, offers, type ChatMessage } from '@/lib/data'
import { cn } from '@/lib/utils'

const seller = offers[0]
const SHOP_ADDRESS = 'Babək prospekti 12, Xətai rayonu, Bakı'

function nowTime() {
  return new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })
}

export function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [text, setText] = useState('')
  const [attachOpen, setAttachOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current)
  }, [])

  function push(msg: Omit<ChatMessage, 'id' | 'time'>) {
    setMessages((prev) => [...prev, { ...msg, id: crypto.randomUUID(), time: nowTime() }])
  }

  function scheduleReply(reply: string) {
    if (replyTimer.current) clearTimeout(replyTimer.current)
    setTyping(true)
    replyTimer.current = setTimeout(() => {
      setTyping(false)
      push({ from: 'seller', text: reply })
    }, 1600)
  }

  function sendText() {
    const value = text.trim()
    if (!value) return
    push({ from: 'me', text: value })
    setText('')
    scheduleReply('Təşəkkürlər! Sualınızı qeyd etdim, bir dəqiqəyə cavab verirəm.')
  }

  function sendPhoto(files: FileList | null) {
    const file = files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    push({ from: 'me', image: URL.createObjectURL(file) })
    setAttachOpen(false)
    scheduleReply('Fotonu gördüm, bu detal sizin maşına tam uyğundur.')
  }

  function sendLocation() {
    push({ from: 'seller', location: SHOP_ADDRESS })
    setAttachOpen(false)
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-3 bg-brand px-3 py-3 text-brand-foreground">
        <Link
          href="/teklifler"
          aria-label="Geri qayıt"
          className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </Link>
        <span className="relative flex size-10 items-center justify-center rounded-full bg-primary">
          <Store className="size-5" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 size-3 rounded-full bg-success ring-2 ring-brand" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-1 truncate text-sm font-bold">
            {seller.shop}
            <BadgeCheck className="size-4 shrink-0 text-blue-400" aria-label="Təsdiqlənmiş satıcı" />
          </h1>
          <p className="text-xs text-green-400">Onlayn</p>
        </div>
        <a
          href={`tel:${seller.phone}`}
          aria-label="Zəng et"
          className="flex size-10 items-center justify-center rounded-full bg-primary hover:bg-blue-700"
        >
          <Phone className="size-4" aria-hidden="true" />
        </a>
      </header>

      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-2">
        <Image
          src="/images/bumper.png"
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-lg object-cover"
        />
        <p className="flex-1 text-sm font-semibold">Qabaq Bamper</p>
        <span className="rounded-lg bg-highlight px-2.5 py-1 text-sm font-extrabold text-highlight-foreground">
          180 AZN
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        role="log"
        aria-live="polite"
        aria-label="Mesajlar"
      >
        <p className="mb-4 text-center text-[11px] font-medium text-muted-foreground">Bu gün</p>
        <ul className="flex flex-col gap-2">
          {messages.map((m) => (
            <li key={m.id} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[78%] rounded-2xl text-sm shadow-sm',
                  m.from === 'me'
                    ? 'rounded-br-md bg-primary text-primary-foreground'
                    : 'rounded-bl-md bg-card text-foreground',
                  m.image ? 'p-1' : 'px-3.5 py-2.5',
                )}
              >
                {m.text ? <p className="leading-relaxed text-pretty">{m.text}</p> : null}
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- supports blob previews
                  <img src={m.image} alt="Göndərilmiş foto" className="max-h-56 w-56 rounded-xl object-cover" />
                ) : null}
                {m.location ? (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(m.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold">Mağazanın ünvanı</span>
                      <span className="block text-xs text-muted-foreground">{m.location}</span>
                      <span className="mt-1 block text-xs font-semibold text-primary">Xəritədə aç</span>
                    </span>
                  </a>
                ) : null}
                <span
                  className={cn(
                    'mt-1 flex items-center justify-end gap-1 text-[10px]',
                    m.from === 'me' ? 'text-blue-100' : 'text-muted-foreground',
                    m.image && 'px-2 pb-1',
                  )}
                >
                  {m.time}
                  {m.from === 'me' ? <CheckCheck className="size-3.5" aria-label="Oxundu" /> : null}
                </span>
              </div>
            </li>
          ))}
          {typing ? (
            <li className="flex">
              <span className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-sm">
                <span className="sr-only">Satıcı yazır...</span>
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${d}ms` }}
                    aria-hidden="true"
                  />
                ))}
              </span>
            </li>
          ) : null}
        </ul>
        <div ref={endRef} />
      </div>

      {attachOpen ? (
        <div className="grid grid-cols-2 gap-2 border-t border-border bg-card px-4 py-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 rounded-xl bg-accent p-3 text-left text-sm font-semibold text-accent-foreground"
          >
            <ImagePlus className="size-5" aria-hidden="true" />
            Foto göndər
          </button>
          <button
            type="button"
            onClick={sendLocation}
            className="flex items-center gap-3 rounded-xl bg-highlight/15 p-3 text-left text-sm font-semibold text-amber-800"
          >
            <Navigation className="size-5 shrink-0" aria-hidden="true" />
            Mağazanın ünvanını göndər
          </button>
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendText()
        }}
        className="flex items-center gap-2 border-t border-border bg-card px-3 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]"
      >
        <button
          type="button"
          onClick={() => setAttachOpen((v) => !v)}
          aria-label={attachOpen ? 'Əlavələri bağla' : 'Əlavə et'}
          aria-expanded={attachOpen}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          {attachOpen ? <X className="size-5" aria-hidden="true" /> : <Paperclip className="size-5" aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label="Foto göndər"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <ImagePlus className="size-5" aria-hidden="true" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => {
            sendPhoto(e.target.files)
            e.target.value = ''
          }}
        />
        <label htmlFor="chat-input" className="sr-only">
          Mesaj
        </label>
        <input
          id="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) e.stopPropagation()
          }}
          placeholder="Mesajınızı yazın..."
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-full bg-muted px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
        />
        <button
          type="submit"
          aria-label="Göndər"
          disabled={!text.trim()}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-blue-700 disabled:bg-slate-300"
        >
          <Send className="size-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
