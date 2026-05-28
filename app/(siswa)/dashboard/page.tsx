'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import WelcomeSection from '@/components/welcome-section'
import AnalyticsSummaryCards from '@/components/analytics-summary-cards'
import AnalyticsWeeklyStudy from '@/components/analytics-weekly-study'
import AnalyticsSubjectPerformance from '@/components/analytics-subject-performance'
import AnalyticsTaskCompletion from '@/components/analytics-task-completion'
import AnalyticsScoreTrend from '@/components/analytics-score-trend'
import AnalyticsSkillRadar from '@/components/analytics-skill-radar'
import AnalyticsActivityBreakdown from '@/components/analytics-activity-breakdown'
import { LoadingPage } from '@/components/loading-page'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Check if this is the first visit - only runs on client side
  useEffect(() => {
    // Check if dashboard has been visited before
    const hasVisited = localStorage.getItem('dashboardVisited')
    
    if (!hasVisited) {
      // First visit - show loading
      setIsInitialLoading(true)
      localStorage.setItem('dashboardVisited', 'true')
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
        message="Memuat dashboard Anda..." 
        showBrandInfo={false} 
        progress={Math.round(loadingProgress)}
        showProgress={true}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      
      <Navbar onMenuClick={() => setSidebarOpen(true)} isSidebarOpen={sidebarOpen} />
      
      <main className="pb-16">
        {/* Welcome Section - Full Width */}
        <WelcomeSection />
        
        <div className="pt-8 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Analytics Section Header */}
            <div className="flex items-center gap-3 animate-fade-in-left">
              <div className="p-2.5 rounded-xl bg-linear-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20 hover:scale-110 hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Grafik Analisis Siswa</h2>
                <p className="text-sm text-slate-500">Pantau perkembangan belajar dan performa akademikmu</p>
              </div>
            </div>

            {/* Summary Cards */}
            <AnalyticsSummaryCards />

            {/* Row 1: Weekly Study + Score Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsWeeklyStudy />
              <AnalyticsScoreTrend delay={150} />
            </div>

            {/* Row 2: Subject Performance + Task Completion */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsSubjectPerformance />
              <AnalyticsTaskCompletion delay={150} />
            </div>

            {/* Row 3: Skill Radar + Activity Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsSkillRadar />
              <AnalyticsActivityBreakdown delay={150} />
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
