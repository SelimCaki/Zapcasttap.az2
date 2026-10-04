'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { translations } from '@/lib/languages'
import { BottomNav } from '@/components/bottom-nav'
import { CategoryGrid } from '@/components/home/category-grid'
import { HeroCard } from '@/components/home/hero-card'
import { HomeHeader } from '@/components/home/home-header'
import { RecentRequests } from '@/components/home/recent-requests'
import { SearchBar } from '@/components/home/search-bar'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  
  // Seçilən dil (Susmaya görə 'az')
  const [lang, setLang] = useState<'az' | 'tr' | 'ru' | 'en'>('az')
  const t = translations[lang]

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  return (
    <>
      <main className="flex flex-1 flex-col gap-6 pb-6">
        <div className="rounded-b-[2rem] bg-brand pb-12">
          
          {/* Üst Bar: Dil Seçimi Və Google Giriş */}
          <div className="flex items-center justify-between px-4 pt-4">
            {/* Dil Seçim Menusu */}
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-white/20 text-white font-medium text-sm px-3 py-1.5 rounded-lg border border-white/30 backdrop-blur-md outline-none"
            >
              <option value="az" className="text-black">🇦🇿 AZ</option>
              <option value="tr" className="text-black">🇹🇷 TR</option>
              <option value="ru" className="text-black">🇷🇺 RU</option>
              <option value="en" className="text-black">🇬🇧 EN</option>
            </select>

            {!user && (
              <button 
                onClick={handleGoogleLogin}
                className="bg-white text-black font-semibold px-4 py-2 rounded-xl shadow-md text-sm hover:bg-gray-100 transition-all"
              >
                {t.loginGoogle}
              </button>
            )}
          </div>

          <HomeHeader />
          <HeroCard />
        </div>
        
        <div className="-mt-[3.25rem] px-4">
          <SearchBar placeholder={t.searchPlaceholder} />
        </div>
        <CategoryGrid />
        <RecentRequests />
      </main>
      <BottomNav />
    </>
  )
}
