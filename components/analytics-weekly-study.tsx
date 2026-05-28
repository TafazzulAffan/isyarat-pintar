'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useInView } from '@/hooks/use-in-view'

const data = [
  { hari: 'Sen', jam: 2.5, target: 3 },
  { hari: 'Sel', jam: 3.2, target: 3 },
  { hari: 'Rab', jam: 1.8, target: 3 },
  { hari: 'Kam', jam: 4.0, target: 3 },
  { hari: 'Jum', jam: 2.1, target: 3 },
  { hari: 'Sab', jam: 5.5, target: 3 },
  { hari: 'Min', jam: 3.8, target: 3 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xl shadow-black/5">
        <p className="text-slate-800 font-bold text-sm">{label}</p>
        <p className="text-teal-600 text-sm">
          Belajar: <span className="font-semibold">{payload[0].value} jam</span>
        </p>
        <p className="text-slate-400 text-sm">
          Target: <span className="font-semibold">{payload[1].value} jam</span>
        </p>
      </div>
    )
  }
  return null
}

export default function AnalyticsWeeklyStudy({ delay = 0 }: { delay?: number }) {
  const totalHours = data.reduce((sum, d) => sum + d.jam, 0).toFixed(1)
  const avgHours = (data.reduce((sum, d) => sum + d.jam, 0) / 7).toFixed(1)

  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.5s ease`,
      }}
    >
      <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-linear-to-br from-teal-100/40 to-transparent" />
      <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-linear-to-tr from-emerald-100/30 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Waktu Belajar Mingguan</h3>
            <p className="text-sm text-slate-500 mt-1">Total: {totalHours} jam · Rata-rata: {avgHours} jam/hari</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-linear-to-r from-teal-500 to-emerald-400" />
              <span className="text-slate-500">Belajar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-teal-50 border border-teal-300" />
              <span className="text-slate-500">Target</span>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorJam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="hari"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                unit=" jam"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="jam"
                stroke="#0f766e"
                strokeWidth={3}
                fill="url(#colorJam)"
                dot={{ fill: '#0f766e', strokeWidth: 2, r: 5, stroke: '#fff' }}
                activeDot={{ r: 7, stroke: '#0f766e', strokeWidth: 2, fill: '#99f6e4' }}
                isAnimationActive={inView}
                animationDuration={900}
                animationEasing="ease-out"
                animationBegin={delay}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="6 4"
                fill="none"
                dot={false}
                isAnimationActive={inView}
                animationDuration={900}
                animationEasing="ease-out"
                animationBegin={delay + 150}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
