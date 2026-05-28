'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Star, Clock, Users, Download, Play, BookOpen, Sparkles } from 'lucide-react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import PageHeroBanner from '@/components/page-hero-banner'
import { materials, categories } from '@/constant/materials-data'

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredMaterials = materials.filter((material) =>
    selectedCategory === 'all'
      ? material.title.toLowerCase().includes(searchQuery.toLowerCase())
      : material.category === selectedCategory && material.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <PageHeroBanner 
        icon={<BookOpen size={16} />}
        eyebrow="Materi Pembelajaran"
        title={<>Eksplorasi <br className="hidden md:block" />Materi Belajar</>}
        description="Raih pemahaman lebih dalam dan tingkatkan rasa keingintahuanmu dengan materi pembelajaran yang ada."
        gradient="from-teal-500 to-emerald-600"
        stats={[
          { value: '6',   label: 'Mata Pelajaran' },
          { value: '24',  label: 'Total Materi' },
          { value: '62%', label: 'Avg. Progress' },
        ]}
        decoration={
          <div className="absolute right-6 bottom-3 flex items-end gap-1 opacity-15 pointer-events-none select-none">
            <span className="text-4xl">📚</span>
            <span className="text-2xl mb-2">🔭</span>
            <span className="text-3xl">🧬</span>
            <span className="text-xl mb-1">✏️</span>
          </div>
        }
      />

      <main className="pb-16 px-4 sm:px-6 md:px-8 mt-8">
        <div className="max-w-screen-xl mx-auto">

          {/* Search Bar */}
          <div className="mb-6 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari materi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name === 'Semua' ? 'all' : cat.name)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 animate-scale-in ${
                    (cat.name === 'Semua' && selectedCategory === 'all') || selectedCategory === cat.name
                      ? 'bg-linear-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/25'
                      : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50 hover:border-gray-300'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((material, idx) => (
              <Link
                key={material.id}
                href={`/materials/${material.slug}`}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-2 cursor-pointer animate-fade-in-up shimmer-overlay h-full"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                {/* Top colored section */}
                <div className={`relative h-32 bg-linear-to-br ${material.gradient} p-5 flex flex-col justify-between overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                      {material.category}
                    </span>
                    {material.trending && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                        <Sparkles size={12} />
                        Trending
                      </span>
                    )}
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/70 text-xs font-medium">{material.lessons} pelajaran · {material.duration}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-teal-700 transition-colors">{material.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{material.instructor}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-700">{material.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Users size={14} />
                      <span>{material.students.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500">Progress</span>
                      <span className="text-xs font-bold text-slate-700">{material.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-linear-to-r ${material.gradient} transition-all duration-700 rounded-full`}
                        style={{ width: `${material.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                      <Play size={14} fill="white" />
                      {material.progress === 100 ? 'Ulangi' : 'Lanjutkan'}
                    </button>
                    <button className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all duration-300 flex items-center justify-center">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredMaterials.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Tidak ada materi ditemukan</h3>
              <p className="text-slate-500 text-sm">Coba gunakan kata kunci lain</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
