'use client'

import { Calendar, Clock } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export default function StudySchedule() {
  const { ref, inView } = useInView()

  const schedule = [
    { day: 'Senin', time: '14:00', subject: 'Matematika', duration: '2 jam', color: 'from-blue-500 to-blue-600' },
    { day: 'Selasa', time: '15:30', subject: 'IPA', duration: '1.5 jam', color: 'from-green-500 to-green-600' },
    { day: 'Rabu', time: '14:00', subject: 'Bahasa', duration: '1 jam', color: 'from-purple-500 to-purple-600' },
    { day: 'Kamis', time: '16:00', subject: 'Sejarah', duration: '1.5 jam', color: 'from-orange-500 to-orange-600' },
  ]

  return (
    <div ref={ref} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Jadwal Belajar</h2>
        <button className="text-slate-400 hover:text-teal-600 transition-colors">
          <Calendar size={20} />
        </button>
      </div>

      <div className="space-y-2">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md hover:shadow-black/5 transition-all duration-300"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-16px)',
              transition: `opacity 0.45s ease ${index * 90}ms, transform 0.45s ease ${index * 90}ms`,
            }}
          >
            {/* Left colored indicator */}
            <div className={`absolute left-0 top-0 w-1 h-full bg-linear-to-b ${item.color}`} />

            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-700 text-sm">{item.subject}</div>
                <div className="text-xs text-slate-400 mt-1">{item.day}</div>
              </div>

              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
                  <Clock size={14} />
                  {item.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 px-4 rounded-xl bg-linear-to-br from-teal-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
        Atur Jadwal
      </button>
    </div>
  )
}
