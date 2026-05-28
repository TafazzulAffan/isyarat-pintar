'use client'

import { useEffect, useState } from 'react'
import StatisticsCards from '@/components/statistics-cards'
import AnalyticsWeeklyStudy from '@/components/analytics-weekly-study'
import AnalyticsSubjectPerformance from '@/components/analytics-subject-performance'
import AnalyticsScoreTrend from '@/components/analytics-score-trend'
import AnalyticsActivityBreakdown from '@/components/analytics-activity-breakdown'
import RecentActivity from '@/components/recent-activity'
import { LoadingPage } from '@/components/loading-page'
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react'

export default function AdminDashboard() {
  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Check if this is the first visit - only runs on client side
  useEffect(() => {
    // Check if admin dashboard has been visited before
    const hasVisited = localStorage.getItem('adminDashboardVisited')
    
    if (!hasVisited) {
      // First visit - show loading
      setIsInitialLoading(true)
      localStorage.setItem('adminDashboardVisited', 'true')
    }
  }, [])

  // Handle progressive loading
  useEffect(() => {
    if (!isInitialLoading) return

    // Simulate progressive loading
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const increment = Math.random() * 30
        const newProgress = Math.min(prev + increment, 99)
        
        // When progress reaches 99%, wait a bit then complete
        if (newProgress >= 99) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setLoadingProgress(100)
            setTimeout(() => {
              setIsInitialLoading(false)
              setLoadingProgress(0)
            }, 300)
          }, 500)
          return newProgress
        }
        
        return newProgress
      })
    }, 200)

    return () => clearInterval(progressInterval)
  }, [isInitialLoading])

  // Show loading page on initial load
  if (isInitialLoading) {
    return (
      <LoadingPage 
        message="Memuat dashboard admin..." 
        showBrandInfo={false} 
        progress={Math.round(loadingProgress)}
        showProgress={true}
      />
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fc]">
      <main className="w-full">

        <div className="w-full px-2 sm:px-3 md:px-5 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 w-full">
          <div className="py-2">
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          </div>

            {/* Key Metrics Section */}
            <div className="space-y-2 sm:space-y-3 animate-fade-in-left">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
                  <TrendingUp size={18} className="sm:hidden" />
                  <TrendingUp size={22} className="hidden sm:block" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Metrik Utama</h2>
                  <p className="text-xs sm:text-sm text-slate-500">Ringkasan performa dan statistik pembelajaran</p>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
              {/* Total Students Card */}
              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-100 p-2.5 sm:p-3.5 md:p-4 hover:border-gray-200 transition-all duration-500 hover:shadow-lg shadow-blue-500/15 hover:-translate-y-1 cursor-pointer">
                <div className="absolute -right-8 -top-8 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-linear-to-br from-gray-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                <div className="relative z-10 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Users size={16} className="sm:hidden" />
                      <Users size={20} className="hidden sm:block" />
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Total Siswa</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">245</h3>
                  <p className="text-xs font-medium text-blue-600">↑ 12 siswa baru minggu ini</p>
                </div>
              </div>

              {/* Active Classes Card */}
              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-100 p-2.5 sm:p-3.5 md:p-4 hover:border-gray-200 transition-all duration-500 hover:shadow-lg shadow-purple-500/15 hover:-translate-y-1 cursor-pointer">
                <div className="absolute -right-8 -top-8 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-linear-to-br from-gray-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                <div className="relative z-10 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <BookOpen size={16} className="sm:hidden" />
                      <BookOpen size={20} className="hidden sm:block" />
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Kelas Aktif</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">18</h3>
                  <p className="text-xs font-medium text-purple-600">9 kelas sedang berlangsung</p>
                </div>
              </div>

              {/* Average Score Card */}
              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-100 p-2.5 sm:p-3.5 md:p-4 hover:border-gray-200 transition-all duration-500 hover:shadow-lg shadow-teal-500/15 hover:-translate-y-1 cursor-pointer">
                <div className="absolute -right-8 -top-8 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-linear-to-br from-gray-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                <div className="relative z-10 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <TrendingUp size={16} className="sm:hidden" />
                      <TrendingUp size={20} className="hidden sm:block" />
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Rata-rata Nilai</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">78.5</h3>
                  <p className="text-xs font-medium text-teal-600">↑ 2.1 dari bulan lalu</p>
                </div>
              </div>

              {/* Completed Tasks Card */}
              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-100 p-2.5 sm:p-3.5 md:p-4 hover:border-gray-200 transition-all duration-500 hover:shadow-lg shadow-amber-500/15 hover:-translate-y-1 cursor-pointer">
                <div className="absolute -right-8 -top-8 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-linear-to-br from-gray-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                <div className="relative z-10 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Award size={16} className="sm:hidden" />
                      <Award size={20} className="hidden sm:block" />
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Tugas Selesai</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">1,245</h3>
                  <p className="text-xs font-medium text-amber-600">87% tingkat penyelesaian</p>
                </div>
              </div>
            </div>

            {/* Analytics Section Header */}
            <div className="flex items-center gap-2 sm:gap-3 animate-fade-in-left pt-2 sm:pt-4 md:pt-6">
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:scale-110 hover:rotate-6 transition-transform duration-300 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Analisis Pembelajaran</h2>
                <p className="text-xs sm:text-sm text-slate-500">Grafik dan laporan performa siswa secara menyeluruh</p>
              </div>
            </div>

            {/* Row 1: Weekly Study + Subject Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <AnalyticsWeeklyStudy />
              <AnalyticsSubjectPerformance />
            </div>

            {/* Row 2: Score Trend + Activity Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <AnalyticsScoreTrend />
              <AnalyticsActivityBreakdown />
            </div>

            {/* Recent Activity Section */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-left">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/20 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Aktivitas Terbaru</h2>
                  <p className="text-xs sm:text-sm text-slate-500">Ringkasan aktivitas siswa dan guru terkini</p>
                </div>
              </div>
            </div>

            {/* Recent Activity Component */}
            <RecentActivity />

            {/* Additional Statistics Cards */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-left pt-2 sm:pt-4 md:pt-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/20 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Statistik Tambahan</h2>
                  <p className="text-xs sm:text-sm text-slate-500">Data statistik dan metrik penting lainnya</p>
                </div>
              </div>
            </div>

            {/* Additional Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {/* Attendance Rate */}
              <div className="rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-100 p-3 sm:p-4 hover:border-gray-200 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800">Tingkat Kehadiran</h3>
                  <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-green-100 flex-shrink-0">
                    <span className="text-green-600 font-bold text-xs sm:text-sm">92%</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">Kehadiran siswa bulan ini</p>
                <div className="mt-3 sm:mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Task Submission Rate */}
              <div className="rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-100 p-3 sm:p-4 hover:border-gray-200 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800">Tingkat Pengumpulan</h3>
                  <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-100 flex-shrink-0">
                    <span className="text-blue-600 font-bold text-xs sm:text-sm">87%</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">Pengumpulan tugas tepat waktu</p>
                <div className="mt-3 sm:mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>

              {/* Exam Completion Rate */}
              <div className="rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-100 p-3 sm:p-4 hover:border-gray-200 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800">Tingkat Ujian</h3>
                  <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-purple-100 flex-shrink-0">
                    <span className="text-purple-600 font-bold text-xs sm:text-sm">95%</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500">Siswa yang menyelesaikan ujian</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>

            {/* Bottom spacing */}
            <div className="h-8" />

          </div>
        </div>
      </main>
    </div>
  )
}
