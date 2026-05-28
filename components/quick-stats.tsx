'use client'

import { useRef, useState, useEffect } from 'react'
import { TrendingUp, BookOpen, Target, Award } from 'lucide-react'
import { useCountUp } from '@/hooks/use-count-up'
import { useInView } from '@/hooks/use-in-view'

function StatCard({ stat, index }: { stat: { icon: React.ElementType; label: string; value: string; change: string; color: string }, index: number }) {
  const { ref, inView } = useInView()
  const displayValue = useCountUp(stat.value, 1200, inView)
  const Icon = stat.icon

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s ease ${index * 80}ms, box-shadow 0.5s ease`,
      }}
    >
      {/* Floating decorative circles */}
      <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-linear-to-br ${stat.color} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.7)',
              transition: `opacity 0.4s ease ${index * 80 + 180}ms, transform 0.4s ease ${index * 80 + 180}ms`,
            }}
          >
            <Icon size={24} />
          </div>
        </div>

        <p className="text-slate-500 text-sm font-semibold mb-2">{stat.label}</p>
        <h3 className="text-3xl font-bold text-slate-800 mb-1 tabular-nums">
          {displayValue}
        </h3>

        <p className="text-slate-400 text-xs font-medium mb-4">{stat.change}</p>

        {/* Progress bar */}
        <div className="mt-auto h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-linear-to-r ${stat.color} rounded-full transition-all duration-1000`}
            style={{
              width: inView ? `${60 + index * 8}%` : '0%',
              transitionDelay: `${index * 80 + 400}ms`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function QuickStats() {
  const stats = [
    {
      icon: BookOpen,
      label: 'Materi Tersedia',
      value: '24',
      change: '+3 baru',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Target,
      label: 'Tugas Aktif',
      value: '5',
      change: '2 deadline minggu ini',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: Award,
      label: 'Poin Pembelajaran',
      value: '3,240',
      change: '+180 minggu ini',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      label: 'Tingkat Penyelesaian',
      value: '82%',
      change: '↑ 5% dari bulan lalu',
      color: 'from-sky-500 to-blue-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  )
}
