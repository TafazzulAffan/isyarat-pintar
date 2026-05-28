'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin-sidebar'
import AdminNavbar from '@/components/admin-navbar'
import { isAuthenticated } from '@/lib/api-services'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function AdminGuruLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    // Small delay to ensure cookies are set after login
    const timer = setTimeout(() => {
      const authenticated = isAuthenticated()
      console.log('[ADMIN LAYOUT] Auth check result:', authenticated)
      if (!authenticated) {
        console.log('[ADMIN LAYOUT] Not authenticated, redirecting to login')
        router.push('/')
      }
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [router])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Don't render if not authenticated
  if (!isAuth) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar (Mobile + Desktop) */}
      <div className="flex-shrink-0">
        <AdminNavbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onToggleSidebar={handleToggleSidebar}
          sidebarOpen={sidebarOpen}
        />
      </div>
      
      {/* Main Layout Container */}
      <div className="flex flex-1 lg:pt-20">
        {/* Sidebar */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <main className={`flex-1 w-full overflow-y-auto ${!isMobile && !isCollapsed ? 'lg:ml-72' : !isMobile && isCollapsed ? 'lg:ml-20' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
