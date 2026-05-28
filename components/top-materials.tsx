'use client'

import { Play, BookOpen, FileText, Video } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

function MaterialCard({ material, index }: {
  material: { icon: string; title: string; subject: string; progress: number; lessons: number; type: string; image: string; students: number }
  index: number
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1 cursor-pointer h-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, box-shadow 0.5s ease`,
      }}
    >
      {/* Gradient header */}
      <div className={`h-28 bg-linear-to-br ${material.image} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-5xl opacity-80"
            style={{
              opacity: inView ? 0.8 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.5)',
              transition: `opacity 0.5s ease ${index * 100 + 250}ms, transform 0.5s ease ${index * 100 + 250}ms`,
            }}
          >{material.icon}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col">
        <div className="mb-3">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 line-clamp-2">{material.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{material.subject}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
          <span>👥 {material.students.toLocaleString()}</span>
          <span>•</span>
          <span>📖 {material.lessons} pelajaran</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Progres</span>
            <span className="text-sm font-bold text-slate-800">{material.progress}%</span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full bg-linear-to-r ${material.image} transition-all duration-1000`}
              style={{
                width: inView ? `${material.progress}%` : '0%',
                transitionDelay: `${index * 100 + 400}ms`,
              }}
            />
          </div>

          <button className="w-full px-4 py-2.5 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 flex items-center justify-center gap-2">
            <Play size={16} fill="white" />
            {material.progress === 100 ? 'Ulangi' : 'Lanjutkan'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TopMaterials() {
  const materials = [
    {
      icon: '📚',
      title: 'Persamaan Kuadrat',
      subject: 'Matematika',
      progress: 85,
      lessons: 12,
      type: 'interactive',
      image: 'from-violet-500 to-purple-500',
      students: 2341,
    },
    {
      icon: '🔬',
      title: 'Fotosintesis: Proses Alam',
      subject: 'IPA',
      progress: 60,
      lessons: 8,
      type: 'video',
      image: 'from-sky-500 to-blue-500',
      students: 1876,
    },
    {
      icon: '🌍',
      title: 'Era Reformasi Indonesia',
      subject: 'Sejarah',
      progress: 92,
      lessons: 15,
      type: 'reading',
      image: 'from-rose-500 to-pink-500',
      students: 1524,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Materi Terbaru</h2>
        <a href="/materials" className="text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors flex items-center gap-1">
          Lihat Semua →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {materials.map((material, index) => (
          <MaterialCard key={index} material={material} index={index} />
        ))}
      </div>
    </div>
  )
}
