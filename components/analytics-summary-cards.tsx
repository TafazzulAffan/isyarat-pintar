'use client'

import { useEffect, useRef, useState } from 'react'
import { Clock, CheckCircle2, BarChart3, Zap } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useCountUp } from '@/hooks/use-count-up'

// --- Individual card with animations ---
function StatCard({
  stat,
  index,
}: {
  stat: {
    icon: React.ElementType
    label: string
    value: string
    change: string
    positive: boolean
    color: string
    bgLight: string
    shadowColor: string
    textColor: string
  }
  index: number
}) {
  const { ref: cardRef, inView: visible } = useInView()
  const displayValue = useCountUp(stat.value, 1400, visible)
  const Icon = stat.icon

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 hover:border-gray-200 transition-all duration-500 hover:shadow-lg ${stat.shadowColor} hover:-translate-y-1 cursor-pointer`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${index * 100}ms, transform 0.55s ease ${index * 100}ms, box-shadow 0.5s ease, border-color 0.5s ease`,
      }}
    >
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-linear-to-br from-gray-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`p-2.5 rounded-xl bg-linear-to-br ${stat.color} text-white shadow-lg ${stat.shadowColor} group-hover:scale-110 transition-transform duration-300`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.7)',
              transition: `opacity 0.4s ease ${index * 100 + 200}ms, transform 0.4s ease ${index * 100 + 200}ms`,
            }}
          >
            <Icon size={20} />
          </div>
          <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
        </div>

        <h3 className="text-3xl font-bold text-slate-800 mb-1.5 group-hover:scale-105 transition-transform duration-300 origin-left tabular-nums">
          {displayValue}
        </h3>

        <p className={`text-xs font-medium ${stat.textColor}`}>
          {stat.change}
        </p>
      </div>
    </div>
  )
}

// --- Main component ---
export default function AnalyticsSummaryCards() {
  const stats = [
    {
      icon: BarChart3,
      label: 'Rata-rata Nilai',
      value: '84.7',
      change: '↑ 3.2 dari semester lalu',
      positive: true,
      color: 'from-violet-500 to-purple-600',
      bgLight: 'bg-violet-50',
      shadowColor: 'shadow-violet-500/15',
      textColor: 'text-violet-600',
    },
    {
      icon: CheckCircle2,
      label: 'Tugas Selesai',
      value: '18/28',
      change: '64% tingkat penyelesaian',
      positive: true,
      color: 'from-teal-500 to-emerald-600',
      bgLight: 'bg-teal-50',
      shadowColor: 'shadow-teal-500/15',
      textColor: 'text-teal-600',
    },
    {
      icon: Clock,
      label: 'Total Jam Belajar',
      value: '127',
      change: '+12 jam minggu ini',
      positive: true,
      color: 'from-sky-500 to-blue-600',
      bgLight: 'bg-sky-50',
      shadowColor: 'shadow-sky-500/15',
      textColor: 'text-sky-600',
    },
    {
      icon: Zap,
      label: 'Streak Belajar',
      value: '14',
      change: 'hari berturut-turut!',
      positive: true,
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      shadowColor: 'shadow-amber-500/15',
      textColor: 'text-amber-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  )
}
