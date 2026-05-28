'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, LogOut, Settings, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import NavMobile from './nav-mobile'

interface NavbarProps {
  onMenuClick?: () => void
  isSidebarOpen?: boolean
}

export default function Navbar({ onMenuClick, isSidebarOpen = false }: NavbarProps = {}) {
  const pathname = usePathname()
  const router = useRouter()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileNavHidden, setMobileNavHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [entered, setEntered] = useState(false)

  const handleLogout = () => {
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    // Clear localStorage
    localStorage.clear()

    // Redirect to login
    router.push('/')
  }

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if scrolled down
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Check if scrolling up or down for hide/show animation
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Materi', href: '/materials' },
    { label: 'Tugas', href: '/tasks' },
    { label: 'Ujian', href: '/exams' },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(true)
    onMenuClick?.()
  }

  return (
    <>
      <NavMobile isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Mobile/Tablet Header */}
      <div className="fixed top-0 left-0 right-0 lg:hidden z-50 bg-linear-to-r from-[#014140]/95 to-[#0a4a40]/95 backdrop-blur-2xl border-b border-white/20 px-4 py-3">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <button
            onClick={handleMobileMenuClick}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white shrink-0"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex-1" /> {/* Spacer to push logo to right */}
          
          <Link href="/dashboard" className="flex items-center gap-2 group shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/assets/logo/logo-name.png"
              alt="IsyaratPintar E-Learning Logo"
              width={80}
              height={48}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>
      </div>
      
      {/* Desktop Navbar */}
      <nav 
      className={`hidden lg:block fixed top-3 lg:top-6 left-2 right-2 lg:left-6 lg:right-6 z-50 transition-all duration-500 ${
        !entered ? '-translate-y-16 opacity-0' : ''
      } ${
        isSidebarOpen ? 'lg:translate-y-0 -translate-y-32 lg:opacity-100 opacity-0' : ''
      } ${
        mobileNavHidden ? '-translate-y-32 opacity-0 lg:translate-y-0 lg:opacity-100' : ''
      } ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'
      }`}
    >
      <div className={`bg-linear-to-r from-[#014140]/95 to-[#0a4a40]/95 backdrop-blur-2xl border shadow-2xl transition-all duration-300 rounded-full px-4 lg:px-8 py-3 lg:py-4 ${
          isScrolled
            ? 'border-white/30 shadow-teal-900/40'
            : 'border-white/20'
        }`}>
        <div className={`flex items-center justify-between gap-2 lg:gap-8`}>
          {/* Logo and Brand */}
          <Link href="/dashboard" className="flex items-center gap-2 lg:gap-3 group shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/assets/logo/logo-name.png"
              alt="IsyaratPintar E-Learning Logo"
              width={120}
              height={80}
              className="h-10 lg:h-11 w-auto pl-1"
              priority
            />
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 group overflow-hidden ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white shadow-lg shadow-black/20'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {/* shimmer sweep on hover */}
                <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 group-hover:translate-x-[130%] transition-transform duration-500 pointer-events-none" />
                {/* active underline bar */}
                {isActive(item.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-teal-300" />
                )}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Icons and User */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-4 shrink-0">
            {/* Notification Bell */}
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-200 text-white relative group shrink-0">
              <Bell size={18} className="lg:w-5 lg:h-5 group-hover:animate-float" style={{ animationDuration: '0.6s' }} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <div className="absolute right-0 top-12 hidden group-hover:block bg-white/95 text-[#014140] rounded-lg p-3 text-xs w-48 shadow-xl">
                <p className="font-semibold mb-2">Notifikasi Baru</p>
                <p className="text-[#4a8078]">Anda memiliki 2 tugas mendekati deadline</p>
              </div>
            </button>

            {/* User Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-2 lg:px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 transition-all group"
              >
                <span className="text-white text-sm font-semibold hidden lg:inline">User</span>
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-linear-to-br from-[#a8e6db] to-[#68b5ac] flex items-center justify-center text-white font-bold text-xs lg:text-sm border-2 border-white/30 group-hover:border-white/50 transition-all">
                  AR
                </div>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="p-4 border-b border-[#014140]/10">
                    <p className="text-sm font-bold text-[#014140]">Alfian Rizki</p>
                    <p className="text-xs text-[#4a8078]">student@isyarat.id</p>
                  </div>

                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#014140] hover:bg-[#014140]/10 rounded-lg transition-all group">
                      <Settings size={16} className="text-[#4a8078] group-hover:text-[#014140]" />
                      <span>Pengaturan</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout()
                        setUserMenuOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all group"
                    >
                      <LogOut size={16} />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </nav>
    </>
  )
}
