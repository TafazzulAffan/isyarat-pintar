'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function WelcomeSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [greeting, setGreeting] = useState('')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 0 && hour < 12) return 'Selamat pagi'
    if (hour >= 12 && hour < 18) return 'Selamat siang'
    return 'Selamat sore'
  }

  useEffect(() => {
    setGreeting(getGreeting())
    const t = setTimeout(() => setIsLoaded(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Photo */}
      <Image
        src="/dashboard-banner.png"
        alt="Kelas Bahasa Isyarat"
        fill
        className={`object-cover object-center transition-all duration-1400 ${
          isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
        }`}
        priority
      />

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-teal-900/80 via-emerald-900/70 to-cyan-900/75" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20" />

      {/* ── Animated ambient blobs ── */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none animate-float-delayed" />
      <div className="absolute bottom-16 right-1/4 w-56 h-56 bg-cyan-300/10 rounded-full blur-3xl pointer-events-none animate-blob" />

      {/* ── Spinning ring decorations ── */}
      <div
        className="absolute top-8 right-12 w-28 h-28 rounded-full border border-white/10 pointer-events-none animate-spin-slow"
        style={{ animationDuration: '25s' }}
      />
      <div
        className="absolute bottom-24 left-16 w-20 h-20 rounded-full border border-white/[0.07] pointer-events-none animate-spin-slow-rev"
        style={{ animationDuration: '18s' }}
      />

      {/* ── Floating sparkle dots ── */}
      {[
        { size: 'w-1.5 h-1.5', pos: 'top-[20%] left-[15%]', dur: '4s', del: '0s' },
        { size: 'w-1 h-1',     pos: 'top-[35%] left-[25%]', dur: '5s', del: '0.8s' },
        { size: 'w-2 h-2',     pos: 'top-[15%] right-[20%]', dur: '6s', del: '1.2s' },
        { size: 'w-1 h-1',     pos: 'top-[55%] right-[30%]', dur: '4.5s', del: '0.4s' },
        { size: 'w-1.5 h-1.5', pos: 'bottom-[30%] left-[40%]', dur: '5.5s', del: '2s' },
        { size: 'w-1 h-1',     pos: 'top-[25%] left-[60%]', dur: '3.8s', del: '1.6s' },
      ].map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.size} ${s.pos} rounded-full bg-white/40 pointer-events-none animate-float`}
          style={{ animationDuration: s.dur, animationDelay: s.del }}
        />
      ))}

      {/* Grid dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Aurora diagonal sweep ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.04) 45%, transparent 55%)',
          animation: 'aurora 10s ease infinite',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 42.5C1248 45 1344 60 1392 67.5L1440 75V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="#f8f9fc"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center pt-28 md:pt-36 pb-24 md:pb-28 px-6 md:px-12">

        {/* Greeting pill */}
        <div
          className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
            isLoaded ? 'animate-scale-in-bounce' : 'opacity-0 scale-75'
          }`}
        >
          <span className="text-sm md:text-base font-medium text-teal-100 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg shimmer-overlay hover:bg-white/15 transition-colors duration-300 cursor-default">
            👋 {greeting}
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg ${
            isLoaded ? 'animate-fade-in-up delay-150' : 'opacity-0 translate-y-8'
          }`}
        >
          Selamat Datang,{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #99f6e4, #6ee7b7, #34d399, #99f6e4)',
              backgroundSize: '200% auto',
              animation: 'gradient-text 3s ease infinite',
            }}
          >
            User!
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-teal-100/90 text-base md:text-lg max-w-md mx-auto drop-shadow ${
            isLoaded ? 'animate-fade-in-up delay-300' : 'opacity-0 translate-y-8'
          }`}
        >
          Pantau perkembanganmu dan terus belajar dengan semangat!
        </p>

        {/* Decorative badge */}
        <div
          className={`mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full shadow-xl hover:bg-white/15 hover:border-white/35 hover:scale-105 transition-all duration-300 cursor-default shimmer-overlay ${
            isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Belajar Lebih Giat Hari Ini!
        </div>
      </div>
    </div>
  )
}
