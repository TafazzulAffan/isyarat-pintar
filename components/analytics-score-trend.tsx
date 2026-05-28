'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useInView } from '@/hooks/use-in-view'

const data = [
  { bulan: 'Sep', nilai: 72, quiz: 68 },
  { bulan: 'Okt', nilai: 75, quiz: 72 },
  { bulan: 'Nov', nilai: 78, quiz: 74 },
  { bulan: 'Des', nilai: 74, quiz: 70 },
  { bulan: 'Jan', nilai: 82, quiz: 78 },
  { bulan: 'Feb', nilai: 85, quiz: 82 },
  { bulan: 'Mar', nilai: 88, quiz: 85 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xl shadow-black/5">
        <p className="text-slate-800 font-bold text-sm">{label}</p>
        <p className="text-violet-600 text-sm">
          Ujian: <span className="font-semibold">{payload[0].value}</span>
        </p>
        <p className="text-sky-500 text-sm">
          Kuis: <span className="font-semibold">{payload[1].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export default function AnalyticsScoreTrend({ delay = 0 }: { delay?: number }) {
  const latestScore = data[data.length - 1].nilai
  const prevScore = data[data.length - 2].nilai
  const trend = latestScore - prevScore
  const trendLabel = trend > 0 ? `+${trend}` : `${trend}`

  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.5s ease`,
      }}
    >
      <div className="absolute -right-16 -bottom-16 w-40 h-40 rounded-full bg-linear-to-br from-violet-100/40 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Tren Nilai Bulanan</h3>
            <p className="text-sm text-slate-500 mt-1">
              Nilai terakhir: <span className="font-semibold text-violet-600">{latestScore}</span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {trendLabel} dari bulan lalu
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-violet-500" />
              <span className="text-slate-500">Ujian</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-sky-400" />
              <span className="text-slate-500">Kuis</span>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="bulan"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                domain={[60, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="nilai"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5, stroke: '#fff' }}
                activeDot={{ r: 7, stroke: '#8b5cf6', strokeWidth: 2, fill: '#ddd6fe' }}
                isAnimationActive={inView}
                animationDuration={900}
                animationEasing="ease-out"
                animationBegin={delay}
              />
              <Line
                type="monotone"
                dataKey="quiz"
                stroke="#0ea5e9"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4, stroke: '#fff' }}
                activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2, fill: '#bae6fd' }}
                isAnimationActive={inView}
                animationDuration={900}
                animationEasing="ease-out"
                animationBegin={delay + 150}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
