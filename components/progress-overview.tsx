'use client'

import React from 'react'
import { Target, Award, Flame, Zap } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useCountUp } from '@/hooks/use-count-up'

interface ProgressItem {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
  bgColor: string
}

function CountItem({ item, index }: { item: ProgressItem; index: number }) {
  const { ref, inView } = useInView()
  const displayValue = useCountUp(String(item.value), 1200, inView)
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
      }}
    >
      <div className="relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
            <p className="text-3xl font-bold text-slate-800 tabular-nums">{displayValue}</p>
          </div>
          <div
            className={`${item.bgColor} ${item.color} p-3 rounded-xl`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.6)',
              transition: `opacity 0.4s ease ${index * 100 + 200}ms, transform 0.4s ease ${index * 100 + 200}ms`,
            }}
          >
            {item.icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProgressOverview() {
  const { ref: sectionRef, inView: sectionInView } = useInView()

  const progressItems: ProgressItem[] = [
    {
      label: 'Total Poin',
      value: '3,000',
      icon: <Award className="w-5 h-5" />,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50'
    },
    {
      label: 'Materi Selesai',
      value: '10',
      icon: <Target className="w-5 h-5" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      label: 'Tugas Selesai',
      value: '2',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Main stats section */}
      <div className="space-y-4">
        {progressItems.map((item, idx) => (
          <CountItem key={idx} item={item} index={idx} />
        ))}
      </div>

      {/* Achievement section */}
      <div
        ref={sectionRef}
        className="relative overflow-hidden rounded-2xl"
        style={{
          opacity: sectionInView ? 1 : 0,
          transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.55s ease 0ms, transform 0.55s ease 0ms',
        }}
      >
        <div className="relative bg-white border border-gray-100 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-slate-800">🔥 Streak &amp; Badges</h3>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>

          <div className="space-y-4">
            {/* Streak */}
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-2">Current Streak</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">12</span>
                <span className="text-sm text-slate-400">days</span>
              </div>
              <div className="mt-3 flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i < 12
                        ? 'bg-linear-to-r from-teal-500 to-emerald-400 w-3'
                        : 'bg-gray-200 w-2'
                    }`}
                    style={{
                      width: sectionInView ? undefined : '0px',
                      transitionDelay: `${i * 50 + 300}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Recent badges */}
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-3">Recent Badges</p>
              <div className="flex gap-3 flex-wrap">
                {['🏆', '⭐', '🎖️', '✨'].map((badge, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-xl hover:scale-110 transition-transform duration-300 cursor-pointer shadow-sm"
                    style={{
                      opacity: sectionInView ? 1 : 0,
                      transform: sectionInView ? 'scale(1)' : 'scale(0.5)',
                      transition: `opacity 0.4s ease ${idx * 70 + 400}ms, transform 0.4s ease ${idx * 70 + 400}ms`,
                    }}
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick action button */}
      <button className="w-full px-6 py-4 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-[1.02]">
        Lihat Lebih Banyak
      </button>
    </div>
  )
}
