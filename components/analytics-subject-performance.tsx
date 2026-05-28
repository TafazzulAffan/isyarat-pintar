'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useInView } from '@/hooks/use-in-view'

const data = [
  { subject: 'Matematika', nilai: 88, warna: '#8b5cf6' },
  { subject: 'IPA', nilai: 76, warna: '#14b8a6' },
  { subject: 'B. Indonesia', nilai: 92, warna: '#f43f5e' },
  { subject: 'B. Inggris', nilai: 71, warna: '#f59e0b' },
  { subject: 'Sejarah', nilai: 85, warna: '#0ea5e9' },
  { subject: 'Seni', nilai: 95, warna: '#10b981' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xl shadow-black/5">
        <p className="text-slate-800 font-bold text-sm">{label}</p>
        <p className="text-teal-600 text-sm">
          Nilai: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export default function AnalyticsSubjectPerformance({ delay = 0 }: { delay?: number }) {
  const avgScore = Math.round(data.reduce((sum, d) => sum + d.nilai, 0) / data.length)
  const bestSubject = data.reduce((max, d) => (d.nilai > max.nilai ? d : max), data[0])

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
      <div className="absolute -right-12 -bottom-12 w-36 h-36 rounded-full bg-linear-to-br from-violet-100/30 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Performa Per Mata Pelajaran</h3>
            <p className="text-sm text-slate-500 mt-1">
              Rata-rata: <span className="font-semibold text-teal-600">{avgScore}</span> · Terbaik: {bestSubject.subject} ({bestSubject.nilai})
            </p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="subject"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }} />
              <Bar
                dataKey="nilai"
                radius={[8, 8, 0, 0]}
                maxBarSize={48}
                isAnimationActive={inView}
                animationDuration={800}
                animationEasing="ease-out"
                animationBegin={delay}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.warna} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
