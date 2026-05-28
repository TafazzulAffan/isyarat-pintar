'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const data = [
  { name: 'Selesai', value: 18, color: '#0f766e', icon: CheckCircle2 },
  { name: 'Sedang Dikerjakan', value: 5, color: '#0ea5e9', icon: Clock },
  { name: 'Belum Dikerjakan', value: 3, color: '#f59e0b', icon: AlertCircle },
  { name: 'Terlambat', value: 2, color: '#ef4444', icon: XCircle },
]

const total = data.reduce((sum, d) => sum + d.value, 0)

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0]
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xl shadow-black/5">
        <p className="text-slate-800 font-bold text-sm">{d.name}</p>
        <p className="text-teal-600 text-sm">
          Jumlah: <span className="font-semibold">{d.value}</span> tugas
        </p>
        <p className="text-slate-400 text-sm">
          {((d.value / total) * 100).toFixed(0)}% dari total
        </p>
      </div>
    )
  }
  return null
}

export default function AnalyticsTaskCompletion({ delay = 0 }: { delay?: number }) {
  const completionRate = ((data[0].value / total) * 100).toFixed(0)

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
      <div className="absolute -left-12 -top-12 w-36 h-36 rounded-full bg-linear-to-br from-teal-100/30 to-transparent" />

      <div className="relative z-10">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800">Status Penyelesaian Tugas</h3>
          <p className="text-sm text-slate-500 mt-1">Total {total} tugas · {completionRate}% selesai</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Donut Chart */}
          <div className="relative w-48 h-48 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                  isAnimationActive={inView}
                  animationDuration={900}
                  animationEasing="ease-out"
                  animationBegin={delay}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800">{completionRate}%</span>
              <span className="text-xs text-slate-500">Selesai</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3 w-full">
            {data.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">{item.value}</span>
                    <span className="text-xs text-slate-400">({((item.value / total) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
