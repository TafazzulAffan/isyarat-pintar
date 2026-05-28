'use client'

import React from 'react'
import { BookOpen, CheckSquare2, FileText, TrendingUp } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useCountUp } from '@/hooks/use-count-up'

interface StatCard {
  icon: React.ReactNode
  label: string
  value: string | number
  sublabel: string
  color: string
}

function StatCardItem({ stat, idx }: { stat: StatCard; idx: number }) {
  const { ref, inView } = useInView()
  const displayValue = useCountUp(String(stat.value), 1200, inView)

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 h-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${idx * 80}ms, transform 0.5s ease ${idx * 80}ms, box-shadow 0.3s ease`,
      }}
    >
      <div className="relative">
        {/* Icon Background */}
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} text-white mb-4 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.6)',
            transition: `opacity 0.4s ease ${idx * 80 + 200}ms, transform 0.4s ease ${idx * 80 + 200}ms`,
          }}
        >
          {stat.icon}
        </div>

        <h3 className="text-sm font-semibold text-slate-500 mb-2">{stat.label}</h3>

        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-slate-800 tabular-nums">{displayValue}</span>
        </div>

        <p className="text-xs text-slate-400 mt-3">{stat.sublabel}</p>
      </div>
    </div>
  )
}

export default function StatisticsCards() {
  const stats: StatCard[] = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: 'Materials',
      value: '3',
      sublabel: 'belum dikerjakan',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: <CheckSquare2 className="w-6 h-6" />,
      label: 'Tasks',
      value: '3',
      sublabel: 'belum dikerjakan',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: 'Exams',
      value: '3',
      sublabel: 'belum dikerjakan',
      color: 'from-sky-500 to-blue-500',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Progress',
      value: '85%',
      sublabel: 'on track this month',
      color: 'from-amber-500 to-orange-500',
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <StatCardItem key={idx} stat={stat} idx={idx} />
      ))}
    </div>
  )
}
