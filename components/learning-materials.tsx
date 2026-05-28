'use client'

import React from 'react'
import { Play, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

interface Course {
  id: number
  title: string
  subject: string
  progress: number
  color: string
  icon: string
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
        transition: `opacity 0.55s ease ${index * 100}ms, transform 0.55s ease ${index * 100}ms`,
      }}
    >
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900/40 to-slate-800/40" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><defs><pattern id=%22p%22 x=%220%22 y=%220%22 width=%22100%22 height=%22100%22 patternUnits=%22userSpaceOnUse%22><circle cx=%2220%22 cy=%2220%22 r=%225%22 fill=%22%23ffffff%22 opacity=%220.1%22/><circle cx=%2250%22 cy=%2250%22 r=%223%22 fill=%22%23a8e6db%22 opacity=%220.15%22/><circle cx=%2280%22 cy=%2220%22 r=%224%22 fill=%22%230d5f56%22 opacity=%220.1%22/><path d=%22M10,10 L90,90%22 stroke=%22%23ffffff%22 stroke-width=%221%22 opacity=%220.05%22/></pattern></defs><rect width=%22400%22 height=%22300%22 fill=%22%231a3a36%22/><rect width=%22400%22 height=%22300%22 fill=%22url(%23p)%22/></svg>')]" />

      {/* Card container */}
      <div className={`relative h-80 bg-linear-to-br ${course.color} p-6 flex flex-col justify-between transition-all duration-300 group-hover:shadow-2xl`}>
        {/* Icon and header */}
        <div className="flex items-start justify-between">
          <div className="text-5xl">{course.icon}</div>
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
            {course.subject}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-white text-pretty mb-2 leading-tight">
            {course.title}
          </h3>
          <p className="text-white/70 text-sm">Progres pembelajaran Anda</p>
        </div>

        {/* Progress bar and play button container */}
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-sm font-medium">Progress</span>
              <span className="text-white text-sm font-bold">{course.progress}%</span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2.5">
              <div
                className="h-full bg-linear-to-r from-white to-white/80 rounded-full transition-all duration-1000"
                style={{
                  width: inView ? `${course.progress}%` : '0%',
                  transitionDelay: `${index * 100 + 400}ms`,
                }}
              />
            </div>
          </div>

          {/* Play button */}
          <button className="shrink-0 bg-white/90 hover:bg-white text-slate-900 rounded-full p-3 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group-hover:bg-white group-hover:text-slate-900">
            <Play size={20} fill="currentColor" />
          </button>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  )
}

export default function LearningMaterials() {
  const courses: Course[] = [
    {
      id: 1,
      title: 'Ilmu Pengetahuan Alam',
      subject: 'Natural Science',
      progress: 65,
      color: 'from-blue-600 via-blue-500 to-cyan-400',
      icon: '🔬'
    },
    {
      id: 2,
      title: 'Ilmu Pengetahuan Alam',
      subject: 'Natural Science',
      progress: 45,
      color: 'from-purple-600 via-purple-500 to-pink-400',
      icon: '🌌'
    },
    {
      id: 3,
      title: 'Ilmu Pengetahuan Alam',
      subject: 'Natural Science',
      progress: 85,
      color: 'from-orange-600 via-orange-500 to-yellow-400',
      icon: '⚗️'
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            📚 Materi Pembelajaran
          </h2>
          <p className="text-gray-500 mt-1">Lanjutkan pembelajaran Anda</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors">
          Lihat Semua
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </div>

      {/* View more button */}
      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-white/60 to-gray-100/60 backdrop-blur-md border border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-white/70 hover:shadow-xl transition-all duration-300 group">
          Lihat Lebih Banyak Materi
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>
    </div>
  )
}
