'use client'

import { Clock, AlertCircle } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useCountUp } from '@/hooks/use-count-up'

function ExamCard({ exam, index }: {
  exam: { subject: string; date: string; time: string; daysLeft: number; progress: number; status: string; color: string }
  index: number
}) {
  const { ref, inView } = useInView()
  const displayDays = useCountUp(String(exam.daysLeft), 1000, inView)

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 p-6 hover:shadow-md hover:shadow-black/5 transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
      }}
    >
      {/* Status indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full bg-linear-to-b ${exam.color}`} />

      <div className="flex items-start justify-between gap-4">
        {/* Left content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-700 mb-2">{exam.subject}</h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{exam.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle size={16} />
              <span>{exam.date}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Persiapan</span>
              <span className="text-slate-400">{exam.progress}% selesai</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${exam.color} transition-all duration-1000`}
                style={{
                  width: inView ? `${exam.progress}%` : '0%',
                  transitionDelay: `${index * 100 + 400}ms`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Days left badge */}
        <div className="shrink-0 text-right">
          <div className="text-3xl font-bold text-slate-700 tabular-nums">{displayDays}</div>
          <div className="text-xs text-slate-400 font-medium">hari tersisa</div>
        </div>
      </div>

      {/* Action button */}
      <button className="mt-4 w-full py-2 px-4 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-600 font-semibold transition-all duration-300 text-sm">
        Mulai Persiapan
      </button>
    </div>
  )
}

export default function UpcomingExams() {
  const exams = [
    {
      subject: 'Matematika Aljabar',
      date: '15 Maret 2024',
      time: '09:00 - 11:00',
      daysLeft: 5,
      progress: 75,
      status: 'active',
      color: 'from-blue-500 to-blue-600',
    },
    {
      subject: 'Ilmu Pengetahuan Alam',
      date: '18 Maret 2024',
      time: '13:00 - 15:00',
      daysLeft: 8,
      progress: 60,
      status: 'active',
      color: 'from-green-500 to-green-600',
    },
    {
      subject: 'Bahasa Inggris',
      date: '20 Maret 2024',
      time: '10:00 - 12:00',
      daysLeft: 10,
      progress: 45,
      status: 'pending',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Ujian Mendatang</h2>
        <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors">
          Lihat Semua
        </a>
      </div>

      <div className="space-y-3">
        {exams.map((exam, index) => (
          <ExamCard key={index} exam={exam} index={index} />
        ))}
      </div>
    </div>
  )
}
