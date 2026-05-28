'use client'

import { CheckCircle2, AlertCircle, BookOpen, Award, MessageSquare, Clock } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

function ActivityItem({ activity, index }: { activity: { type: string; icon: React.ElementType; title: string; description: string; time: string; color: string }, index: number }) {
  const { ref, inView } = useInView()
  const Icon = activity.icon
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md hover:shadow-black/5 transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`shrink-0 w-11 h-11 rounded-xl bg-linear-to-br ${activity.color} flex items-center justify-center text-white shadow-sm`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.6)',
            transition: `opacity 0.4s ease ${index * 80 + 150}ms, transform 0.4s ease ${index * 80 + 150}ms`,
          }}
        >
          <Icon size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-700">{activity.title}</h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{activity.description}</p>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
            <Clock size={12} />
            <span>{activity.time}</span>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="shrink-0 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function RecentActivity() {
  const activities = [
    {
      type: 'completed',
      icon: CheckCircle2,
      title: 'Menyelesaikan Kuis',
      description: 'Kamu menyelesaikan kuis Matematika dengan skor 92%',
      time: '2 jam yang lalu',
      color: 'from-green-500 to-green-600',
    },
    {
      type: 'achievement',
      icon: Award,
      title: 'Badge Baru!',
      description: 'Kamu mendapatkan badge "Rajin Belajar"',
      time: '5 jam yang lalu',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      type: 'assignment',
      icon: AlertCircle,
      title: 'Tugas Baru',
      description: 'Tugas IPA baru telah diterbitkan: Laporan Percobaan Fotosintesis',
      time: '1 hari yang lalu',
      color: 'from-blue-500 to-blue-600',
    },
    {
      type: 'comment',
      icon: MessageSquare,
      title: 'Feedback Guru',
      description: 'Guru memberikan umpan balik untuk esai Sejarahmu',
      time: '2 hari yang lalu',
      color: 'from-purple-500 to-purple-600',
    },
    {
      type: 'material',
      icon: BookOpen,
      title: 'Materi Baru',
      description: 'Bab baru "Trigonometri Lanjutan" telah tersedia',
      time: '3 hari yang lalu',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Aktivitas Terbaru</h2>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} index={index} />
        ))}
      </div>

      <button className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-semibold hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all duration-300">
        Lihat Semua Aktivitas
      </button>
    </div>
  )
}
