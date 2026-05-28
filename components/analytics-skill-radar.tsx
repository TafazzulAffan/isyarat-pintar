'use client'

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useInView } from '@/hooks/use-in-view'

const data = [
  { skill: 'Pemahaman', value: 85, fullMark: 100 },
  { skill: 'Keaktifan', value: 78, fullMark: 100 },
  { skill: 'Ketepatan Waktu', value: 90, fullMark: 100 },
  { skill: 'Nilai Ujian', value: 82, fullMark: 100 },
  { skill: 'Partisipasi', value: 75, fullMark: 100 },
  { skill: 'Kreativitas', value: 88, fullMark: 100 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xl shadow-black/5">
        <p className="text-slate-800 font-bold text-sm">{payload[0].payload.skill}</p>
        <p className="text-violet-600 text-sm">
          Skor: <span className="font-semibold">{payload[0].value}/100</span>
        </p>
      </div>
    )
  }
  return null
}

export default function AnalyticsSkillRadar({ delay = 0 }: { delay?: number }) {
  const avgSkill = Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length)

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
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-linear-to-br from-violet-100/30 to-transparent" />

      <div className="relative z-10">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800">Analisis Kompetensi Siswa</h3>
          <p className="text-sm text-slate-500 mt-1">
            Skor rata-rata: <span className="font-semibold text-violet-600">{avgSkill}/100</span>
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Kompetensi"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="#8b5cf6"
                fillOpacity={0.15}
                dot={{ fill: '#8b5cf6', r: 4, stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={inView}
                animationDuration={900}
                animationEasing="ease-out"
                animationBegin={delay}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill summary badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          {data
            .sort((a, b) => b.value - a.value)
            .slice(0, 3)
            .map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-200/50"
              >
                {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'} {skill.skill}: {skill.value}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}
