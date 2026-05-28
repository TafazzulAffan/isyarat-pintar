'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, BookOpen, Users, Award } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function HeroSection() {
  const { ref, inView } = useInView(0.1)

  const fadeUp = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <div ref={ref} className="relative w-full overflow-hidden min-h-120 md:min-h-145 flex items-center">

      {/* Background Photo */}
      <Image
        src="/dashboard-banner.png"
        alt="Kelas Bahasa Isyarat"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-teal-950/85 via-teal-900/65 to-teal-800/30" />
      <div className="absolute inset-0 bg-linear-to-t from-teal-950/70 via-transparent to-transparent" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-teal-400 via-emerald-400 to-cyan-400" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal light slash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          background: 'linear-gradient(115deg, transparent 40%, white 41%, white 43%, transparent 44%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="max-w-2xl">

          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm mb-6"
            style={fadeUp(0)}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">
              Platform Belajar Tuli
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 drop-shadow"
            style={fadeUp(100)}
          >
            Belajar{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-300 to-emerald-300">
              Bahasa Isyarat
            </span>{' '}
            dengan Mudah
          </h1>

          {/* Description */}
          <p
            className="text-white/70 text-base md:text-lg leading-relaxed mb-9 max-w-xl"
            style={fadeUp(200)}
          >
            Tingkatkan kemampuan berkomunikasi melalui materi interaktif, ujian terstruktur,
            dan pantau perkembanganmu setiap hari bersama komunitas kami.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-10" style={fadeUp(300)}>
            <button className="px-7 py-3 bg-linear-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-105 transition-all duration-300">
              Mulai Belajar
            </button>
            <button className="px-7 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-sm border border-white/25 hover:bg-white/20 transition-all duration-300">
              Lihat Materi
            </button>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3" style={fadeUp(400)}>
            {[
              { icon: <BookOpen className="w-4 h-4" />, value: '120+', label: 'Materi' },
              { icon: <Users className="w-4 h-4" />, value: '2.4K', label: 'Siswa Aktif' },
              { icon: <Award className="w-4 h-4" />, value: '98%', label: 'Kepuasan' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm"
              >
                <span className="text-teal-300">{stat.icon}</span>
                <span className="text-xl font-black text-white leading-none">{stat.value}</span>
                <span className="text-white/60 text-xs font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden leading-0">
        <svg
          viewBox="0 0 1440 64"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 text-[#f8f9fc]"
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
