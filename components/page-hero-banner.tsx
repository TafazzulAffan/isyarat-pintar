'use client'

import React, { useEffect, useRef, useState } from 'react'

interface StatItem {
  value: string
  label: string
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

interface PageHeroBannerProps {
  icon: React.ReactNode
  eyebrow: string
  title: React.ReactNode
  description: string
  gradient: string
  stats: StatItem[]
  decoration?: React.ReactNode
}

const variantDot: Record<string, string> = {
  default: 'bg-white/60',
  success: 'bg-emerald-300',
  warning: 'bg-amber-300',
  danger: 'bg-red-300',
}

const variantGlow: Record<string, string> = {
  default: 'shadow-white/20',
  success: 'shadow-emerald-300/30',
  warning: 'shadow-amber-300/30',
  danger: 'shadow-red-300/30',
}

export default function PageHeroBanner({
  icon,
  eyebrow,
  title,
  description,
  gradient,
  stats,
  decoration,
}: PageHeroBannerProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div
      className={`relative w-full overflow-hidden bg-linear-to-br ${gradient}`}
      style={{ perspective: '1200px' }}
    >

      {/* ── Animated ambient blobs ── */}
      <div
        className="absolute -top-32 -right-32 w-xl h-144 rounded-full bg-white/10 blur-[80px] pointer-events-none animate-float"
        style={{ animationDuration: '9s' }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-24 w-96 h-96 rounded-full bg-black/10 blur-[60px] pointer-events-none animate-float-delayed"
        style={{ animationDuration: '11s' }}
      />
      <div
        className="absolute -bottom-20 right-1/3 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none animate-float"
        style={{ animationDuration: '7s', animationDelay: '2s' }}
      />

      {/* ── Spinning ring decoration ── */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-2 border-white/10 pointer-events-none animate-spin-slow"
        style={{ animationDuration: '30s' }}
      />
      <div
        className="absolute top-10 -right-10 w-48 h-48 rounded-full border border-white/8 pointer-events-none animate-spin-slow-rev"
        style={{ animationDuration: '20s' }}
      />

      {/* ── Diagonal aurora slash ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.06) 41%, rgba(255,255,255,0.06) 43%, transparent 54%)',
          animation: 'aurora 8s ease infinite',
          backgroundSize: '200% 200%',
        }}
      />

      {/* ── Animated dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Custom per-page decoration slot ── */}
      {decoration}

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-38 pb-16 md:pb-26">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10">

          {/* Left: Eyebrow + title + description */}
          <div className="flex-1 min-w-0">

            {/* Eyebrow pill — scale-in-bounce */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm mb-5 shimmer-overlay transition-all duration-300 hover:bg-white/20 hover:border-white/40 ${
                mounted ? 'animate-scale-in-bounce' : 'opacity-0'
              }`}
            >
              <span className="text-white/90">{icon}</span>
              <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">{eyebrow}</span>
            </div>

            {/* Title — fade in up, slight delay */}
            <h1
              className={`text-4xl md:text-5xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-sm ${
                mounted ? 'animate-fade-in-up delay-150' : 'opacity-0'
              }`}
            >
              {title}
            </h1>

            {/* Description — fade in up, more delay */}
            <p
              className={`text-white/60 text-sm md:text-base max-w-md leading-relaxed ${
                mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'
              }`}
            >
              {description}
            </p>
          </div>

          {/* Right: Stat pills stacked vertically */}
          <div className="flex flex-row lg:flex-col gap-3 shrink-0 flex-wrap lg:flex-nowrap">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm min-w-35
                  hover:bg-white/18 hover:border-white/35 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default shimmer-overlay
                  ${mounted ? 'animate-fade-in-right' : 'opacity-0'}`}
                style={{ animationDelay: `${300 + i * 120}ms` }}
              >
                {/* Animated dot */}
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${variantDot[stat.variant ?? 'default']} animate-pulse`}
                />
                <span className="text-2xl font-black text-white leading-none group-hover:scale-110 transition-transform duration-200 origin-left">
                  {stat.value}
                </span>
                <span className="text-white/60 text-xs font-medium leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Wave bottom edge ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden leading-0">
        <svg
          viewBox="0 0 1440 64"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-14 md:h-16 text-[#f8f9fc]"
          aria-hidden="true"
        >
          <path
            d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}
