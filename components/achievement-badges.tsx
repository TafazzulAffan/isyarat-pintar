'use client'

import { Lock } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useCountUp } from '@/hooks/use-count-up'

export default function AchievementBadges() {
  const { ref, inView } = useInView()
  const displayPoints = useCountUp('3,240', 1400, inView)

  const badges = [
    { icon: '🔥', label: 'Rajin Belajar', unlocked: true, description: '7 hari berturut-turut' },
    { icon: '⭐', label: 'Pembaca Cepat', unlocked: true, description: '5 materi selesai' },
    { icon: '🎯', label: 'Penembak Jitu', unlocked: false, description: 'Jawab sempurna 3x' },
    { icon: '🏆', label: 'Juara Kelas', unlocked: false, description: 'Nilai 100 di ujian' },
  ]

  return (
    <div ref={ref} className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800">Pencapaian</h2>

      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
              badge.unlocked
                ? 'bg-amber-50 border border-amber-100 hover:shadow-md'
                : 'bg-gray-50 border border-gray-100 opacity-60'
            }`}
            style={{
              opacity: inView ? (badge.unlocked ? 1 : 0.6) : 0,
              transform: inView ? 'scale(1)' : 'scale(0.8)',
              transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="text-3xl mb-2"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'scale(1)' : 'scale(0.4)',
                  transition: `opacity 0.4s ease ${index * 80 + 200}ms, transform 0.4s ease ${index * 80 + 200}ms`,
                }}
              >{badge.icon}</div>
              <h3 className="font-semibold text-sm text-slate-700">{badge.label}</h3>
              <p className="text-xs text-slate-400 mt-1">{badge.description}</p>
            </div>

            {!badge.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-xl">
                <Lock size={20} className="text-slate-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="bg-white border border-gray-100 rounded-xl p-4"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease 400ms, transform 0.5s ease 400ms',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-600">Total Poin Musim Ini</span>
          <span className="text-2xl font-bold text-slate-800 tabular-nums">{displayPoints}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-1000"
            style={{
              width: inView ? '75%' : '0%',
              transitionDelay: '500ms',
            }}
          />
        </div>
      </div>
    </div>
  )
}
