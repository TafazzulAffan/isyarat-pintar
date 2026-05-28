'use client'

import { useState } from 'react'
import { 
  ArrowLeft, 
  Play, 
  Download, 
  Bookmark, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  ThumbsUp,
  MessageCircle,
  Volume2
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { 
  materialDetailsData, 
  keyPointsData, 
  resourcesData, 
  engagementStatsData 
} from '@/constant/material-details-data'
import { materials } from '@/constant/materials-data'

export default function MaterialDetailPage({ params }: { params: { slug: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('lesson')
  const [isSaved, setIsSaved] = useState(false)
  const [isWatched, setIsWatched] = useState(false)

  // Find material by slug
  const material = materials.find(m => m.slug === params.slug)
  
  // Use material data if found, otherwise use default
  const materialData = materialDetailsData

  // Hitung total lessons yang sudah ditonton
  const allLessons = materialData.sections.flatMap(s => s.lessons)
  const currentLesson = allLessons[currentLessonIndex]
  const watchedCount = allLessons.filter(l => l.watched).length
  const totalLessons = allLessons.length
  const progressPercentage = Math.round((watchedCount / totalLessons) * 100)

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      setIsWatched(allLessons[currentLessonIndex + 1].watched)
    }
  }

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
      setIsWatched(allLessons[currentLessonIndex - 1].watched)
    }
  }

  const handleMarkWatched = () => {
    setIsWatched(!isWatched)
    allLessons[currentLessonIndex].watched = !isWatched
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="pb-20 pt-34 px-4 sm:px-6 md:px-8">
        <div className="max-w-screen mx-auto">
          {/* Breadcrumb and Back Button */}
          <div className="mb-6 flex items-center gap-3">
            <Link 
              href="/materials"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-teal-200 hover:border-teal-300 text-slate-600 hover:text-slate-700 transition-all duration-300 font-medium text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Kembali
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Materials</span>
              <span>/</span>
              <span className="text-slate-700 font-medium">{materialData.category}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Video Player Section */}
              <div className={`relative w-full rounded-2xl overflow-hidden bg-linear-to-br ${materialData.gradient} shadow-xl`}>
                {/* Video Container */}
                <div className="relative aspect-video bg-black/80 flex items-center justify-center group cursor-pointer overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-20 h-20 rounded-full bg-teal-500/10 backdrop-blur-md flex items-center justify-center group-hover:bg-teal-500/20 group-hover:scale-110 transition-all duration-300 border border-teal-400/20">
                      <Play 
                        size={32} 
                        className="text-white fill-white group-hover:translate-x-1 transition-transform" 
                      />
                    </div>
                  </div>

                  {/* Time badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-teal-900/40 backdrop-blur-md border border-teal-400/30 text-white text-xs font-semibold z-20">
                    {currentLesson.duration}
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-900/20">
                    <div 
                      className={`h-full bg-linear-to-r ${materialData.gradient} transition-all duration-300`}
                      style={{ width: `${Math.random() * 70}%` }}
                    />
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6 bg-white">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                        {currentLesson.title}
                      </h1>
                      <p className="text-slate-500 text-sm">{currentLesson.description}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl bg-linear-to-r ${materialData.gradient} text-white font-semibold text-sm whitespace-nowrap`}>
                      {materialData.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-teal-200">
                    <button 
                      onClick={handleMarkWatched}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isWatched
                          ? `bg-linear-to-r ${materialData.gradient} text-white shadow-lg`
                          : 'bg-teal-50 text-slate-600 hover:bg-teal-100'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      {isWatched ? 'Sudah Ditonton' : 'Tandai Ditonton'}
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-slate-600 font-semibold text-sm transition-all duration-300">
                      <Download size={16} />
                      Unduh
                    </button>
                    <button 
                      onClick={() => setIsSaved(!isSaved)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isSaved
                          ? `bg-linear-to-r ${materialData.gradient} text-white`
                          : 'bg-teal-50 text-slate-600 hover:bg-teal-100'
                      }`}
                    >
                      <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                      {isSaved ? 'Tersimpan' : 'Simpan'}
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-slate-600 font-semibold text-sm transition-all duration-300 ml-auto">
                      <Share2 size={16} />
                      Bagikan
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="bg-white rounded-2xl border border-teal-100 overflow-hidden shadow-sm">
                {/* Tab Navigation */}
                <div className="flex border-b border-teal-200">
                  {[
                    { id: 'lesson', label: 'Konten Pelajaran', icon: BookOpen },
                    { id: 'notes', label: 'Catatan', icon: FileText },
                    { id: 'resources', label: 'Sumber Daya', icon: Download }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-4 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-b-2 ${
                        activeTab === tab.id
                          ? `border-linear-to-r bg-gradient-to-r ${materialData.gradient} text-white`
                          : 'border-transparent text-slate-600 hover:bg-teal-50'
                      }`}
                    >
                      <tab.icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'lesson' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Ringkasan Pelajaran</h3>
                        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                          <p className="mb-4">{currentLesson.content}</p>
                          <p className="text-slate-600 border-l-4 border-linear-to-r pl-4 py-2 bg-gradient-to-r from-teal-50 to-transparent rounded-r">
                            💡 <strong>Tips:</strong> Tonton video dengan seksama dan pikirkan contoh-contoh yang diberikan. Jangan ragu untuk menonton ulang bagian yang belum jelas.
                          </p>
                        </div>
                      </div>

                      {/* Key Points */}
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Poin-Poin Penting</h4>
                        <ul className="space-y-2">
                          {keyPointsData.map((point, idx) => (
                            <li key={idx} className="flex gap-3 items-start">
                              <CheckCircle2 size={20} className={`flex-shrink-0 mt-0.5 text-linear-to-r ${materialData.gradient}`} style={{ background: `linear-gradient(135deg, var(--color-from), var(--color-to))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                              <span className="text-slate-700">{point.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notes' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200">
                        <p className="text-slate-700 font-medium mb-2">Catatan Pribadi Anda</p>
                        <textarea 
                          placeholder="Tulis catatan tentang pelajaran ini..."
                          className="w-full p-3 rounded-lg bg-white border border-teal-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30 resize-none"
                          rows={6}
                        />
                        <button className={`mt-3 px-4 py-2 rounded-lg bg-linear-to-r ${materialData.gradient} text-white font-semibold text-sm hover:shadow-lg transition-all`}>
                          Simpan Catatan
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'resources' && (
                    <div className="space-y-3">
                      {resourcesData.map((resource, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-teal-200 hover:border-teal-300 hover:shadow-md transition-all duration-300 cursor-pointer group">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`p-2.5 rounded-lg bg-teal-100`}>
                              <Download size={20} className={`text-linear-to-r ${materialData.gradient}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-slate-900">{resource.name}</p>
                              <p className="text-xs text-slate-500">{resource.size}</p>
                            </div>
                          </div>
                          <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrevLesson}
                  disabled={currentLessonIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-teal-200 hover:border-teal-300 text-slate-600 hover:text-slate-700 font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Sebelumnya
                </button>
                <button
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r ${materialData.gradient} text-white font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg`}
                >
                  Selanjutnya
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Sidebar - Playlist dan Info */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Material Info Card */}
              <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Informasi Materi</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Instruktur</p>
                    <p className="font-semibold text-slate-800">{materialData.instructor}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Rating</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < 4 ? '⭐' : '☆'}`} />
                        ))}
                      </div>
                      <span className="font-semibold text-slate-800">{materialData.rating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Peserta</p>
                    <p className="font-semibold text-slate-800">{materialData.students.toLocaleString()} siswa</p>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className={`bg-linear-to-br ${materialData.gradient} rounded-2xl p-6 text-white shadow-lg`}>
                <h3 className="font-bold mb-4">Progress Belajarmu</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold opacity-90">Pelajaran Diselesaikan</span>
                    <span className="text-xl font-bold">{progressPercentage}%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden border border-white/30">
                    <div 
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm opacity-90">{watchedCount} dari {totalLessons} pelajaran ditonton</p>
              </div>

              {/* Lessons Playlist */}
              <div className="bg-white rounded-2xl border border-teal-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-teal-100">
                  <h3 className="font-bold text-slate-800">Daftar Pelajaran</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {materialData.sections.map((section) => (
                    <div key={section.id}>
                      <div className="px-6 py-3 bg-teal-50 border-b border-teal-100 sticky top-0 z-5">
                        <p className="font-semibold text-xs text-slate-600 uppercase tracking-wide">{section.title}</p>
                      </div>
                      {section.lessons.map((lesson, idx) => {
                        const lessonIdx = allLessons.findIndex(l => l.id === lesson.id)
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setCurrentLessonIndex(lessonIdx)
                              setIsWatched(lesson.watched)
                            }}
                            className={`w-full px-6 py-3.5 border-b border-teal-100 text-left transition-all duration-200 hover:bg-teal-50 group ${
                              currentLessonIndex === lessonIdx ? `bg-gradient-to-r ${materialData.bgLight}` : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 flex-shrink-0 ${lesson.watched ? 'text-teal-500' : 'text-teal-300'}`}>
                                {lesson.watched ? (
                                  <CheckCircle2 size={18} className="fill-current" />
                                ) : (
                                  <div className="w-4.5 h-4.5 rounded-full border-2 border-current" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold transition-colors ${
                                  currentLessonIndex === lessonIdx 
                                    ? 'text-slate-800' 
                                    : 'text-slate-600 group-hover:text-slate-800'
                                }`}>
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                  <Clock size={12} />
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="bg-white rounded-2xl p-5 border border-teal-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Engagement Stats</p>
                <div className="space-y-3">
                  {engagementStatsData.map((stat, idx) => {
                    const iconMap: { [key: string]: any } = {
                      'eye': Eye,
                      'thumbsUp': ThumbsUp,
                      'messageCircle': MessageCircle
                    }
                    const IconComponent = iconMap[stat.icon] || Eye
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors">
                        <div className={`p-2 rounded-lg bg-linear-to-br ${materialData.gradient}`} style={{ background: `linear-gradient(135deg, hsl(var(--color-1)), hsl(var(--color-2)))` }}>
                          <IconComponent size={14} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                          <p className="font-bold text-slate-800">{stat.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
