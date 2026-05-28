'use client'

import { useState } from 'react'
import { Calendar, Clock, BookOpen, CheckCircle2, GraduationCap } from 'lucide-react'
import Navbar from '@/components/navbar'
import PageHeroBanner from '@/components/page-hero-banner'
import { upcomingExams, ongoingExams, completedExams, examTabs } from '@/constant/exams-data'

export default function ExamsPage() {
  const [selectedTab, setSelectedTab] = useState('semua')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = examTabs

  const renderUpcomingCard = (exam: typeof upcomingExams[0], idx: number) => (
    <div
      key={exam.id}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1.5 animate-fade-in-up shimmer-overlay"
      style={{ animationDelay: `${idx * 120}ms` }}
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${exam.gradient} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg`}>
                {exam.daysLeft}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-800 mb-0.5">{exam.title}</h3>
                <p className="text-sm text-slate-500">{exam.subject} · {exam.format}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 ml-15 mb-3 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400" /> {new Date(exam.date).toLocaleDateString('id-ID')}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {exam.time}</span>
              <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-slate-400" /> {exam.questions} soal · {exam.duration} menit</span>
            </div>
            <div className="flex flex-wrap gap-1.5 ml-15">
              {exam.topics.map((topic) => (
                <span key={topic} className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs text-slate-600 font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 lg:flex-col lg:items-end shrink-0 ml-15 lg:ml-0">
            <div className="text-center lg:text-right">
              <p className="text-xs text-slate-400 font-medium mb-1">Kesiapan</p>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-linear-to-r ${exam.gradient} rounded-full`} style={{ width: `${exam.readiness}%` }} />
                </div>
                <span className="text-sm font-bold text-slate-700">{exam.readiness}%</span>
              </div>
            </div>
            <button
              disabled={exam.daysLeft !== 0}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                exam.daysLeft === 0
                  ? 'bg-linear-to-r from-teal-500 to-emerald-600 text-white hover:shadow-lg shadow-teal-500/25 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {exam.daysLeft === 0 ? 'Kerjakan' : `${exam.daysLeft} hari lagi`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderOngoingCard = (exam: typeof ongoingExams[0]) => (
    <div
      key={exam.id}
      className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 animate-scale-in shimmer-overlay"
    >
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-amber-200/30" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wider">Sedang Berlangsung</p>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{exam.title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock size={14} /> {exam.timeLeft}</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> {exam.answered}/{exam.questions} terjawab</span>
          </div>
          <div className="mt-3 w-48">
            <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${(exam.answered / exam.questions) * 100}%` }} />
            </div>
          </div>
        </div>
        <button className="px-6 py-3 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 shrink-0">
          Lanjutkan →
        </button>
      </div>
    </div>
  )

  const renderCompletedCard = (exam: typeof completedExams[0], idx: number) => (
    <div
      key={exam.id}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1.5 animate-fade-in-up shimmer-overlay"
      style={{ animationDelay: `${200 + idx * 120}ms` }}
    >
      <div className={`h-1.5 bg-linear-to-r ${exam.gradient}`} />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={22} />
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-800">{exam.title}</h3>
            <p className="text-sm text-slate-500">{exam.subject}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-center">
            <p className="text-xs text-emerald-600 font-medium mb-1">Skor</p>
            <p className="text-2xl font-bold text-emerald-700">
              {exam.score}<span className="text-sm text-emerald-500">/{exam.maxScore}</span>
            </p>
          </div>
          <div className="bg-violet-50 rounded-xl p-3 text-center">
            <p className="text-xs text-violet-600 font-medium mb-1">Ranking</p>
            <p className="text-lg font-bold text-violet-700">{exam.rank}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Selesai: {new Date(exam.completedDate).toLocaleDateString('id-ID')}
          </p>
          <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-sm transition-all">
            Detail
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <PageHeroBanner
        icon={<GraduationCap size={16} />}
        eyebrow="Pusat Ujian"
        title={<>Jadwal & <br className="hidden md:block" />Ujian</>}
        description="Pantau jadwal ujian, ukur kesiapanmu, dan raih skor tertinggi!"
        gradient="from-violet-500 via-purple-600 to-fuchsia-600"
        stats={[
          { value: '3', label: '📅 Mendatang',    variant: 'default' },
          { value: '1', label: '🚀 Berlangsung', variant: 'warning' },
          { value: '2', label: '✅ Selesai',       variant: 'default' },
        ]}
        decoration={
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white" />
              <div className="absolute inset-6 rounded-full border-2 border-white" />
              <div className="absolute inset-12 rounded-full border-[1.5px] border-white" />
              <div className="w-6 h-6 rounded-full bg-white" />
            </div>
          </div>
        }
      />

      <main className="pb-16 px-4 sm:px-6 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto">

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setSelectedTab(tab.name.toLowerCase())}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                    selectedTab === tab.name.toLowerCase()
                      ? 'bg-linear-to-r from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/25'
                      : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* All Exams */}
          {selectedTab === 'semua' && (
            <div className="space-y-8">
              {ongoingExams.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    Ujian Berlangsung
                  </h2>
                  <div className="space-y-4">
                    {ongoingExams.map(renderOngoingCard)}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">📅 Ujian Mendatang</h2>
                <div className="space-y-4">
                  {upcomingExams.map((exam, idx) => renderUpcomingCard(exam, idx))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">✅ Ujian Selesai</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedExams.map((exam, idx) => renderCompletedCard(exam, idx))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'mendatang' && (
            <div className="space-y-4">
              {upcomingExams.map((exam, idx) => renderUpcomingCard(exam, idx))}
            </div>
          )}

          {selectedTab === 'berlangsung' && (
            <div className="space-y-4">
              {ongoingExams.map(renderOngoingCard)}
            </div>
          )}

          {selectedTab === 'selesai' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedExams.map((exam, idx) => renderCompletedCard(exam, idx))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
