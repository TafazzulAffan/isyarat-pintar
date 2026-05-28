'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useInView } from '@/hooks/use-in-view'

const data = [
  { minggu: 'Minggu 1', materi: 5, tugas: 3, quiz: 2 },
  { minggu: 'Minggu 2', materi: 8, tugas: 5, quiz: 4 },
  { minggu: 'Minggu 3', materi: 6, tugas: 4, quiz: 3 },
  { minggu: 'Minggu 4', materi: 10, tugas: 7, quiz: 5 },
  { minggu: 'Minggu 5', materi: 7, tugas: 6, quiz: 4 },
  { minggu: 'Minggu 6', materi: 9, tugas: 5, quiz: 6 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xl shadow-black/5">
        <p className="text-slate-800 font-bold text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsActivityBreakdown({ delay = 0 }: { delay?: number }) {
  const totalActivities = data.reduce((sum, d) => sum + d.materi + d.tugas + d.quiz, 0)

  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.5s ease`,
      }}
    >
      <div className="absolute -left-12 -bottom-12 w-36 h-36 rounded-full bg-linear-to-br from-teal-100/30 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Rincian Aktivitas Pembelajaran</h3>
            <p className="text-sm text-slate-500 mt-1">
              Total {totalActivities} aktivitas dalam 6 minggu terakhir
            </p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="minggu"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }} />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
                iconType="circle"
                iconSize={10}
              />
              <Bar dataKey="materi" name="Materi" fill="#0f766e" radius={[4, 4, 0, 0]} maxBarSize={28} isAnimationActive={inView} animationDuration={800} animationEasing="ease-out" animationBegin={delay} />
              <Bar dataKey="tugas" name="Tugas" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={28} isAnimationActive={inView} animationDuration={800} animationEasing="ease-out" animationBegin={delay + 100} />
              <Bar dataKey="quiz" name="Kuis" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={28} isAnimationActive={inView} animationDuration={800} animationEasing="ease-out" animationBegin={delay + 200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
