'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Bell, LogOut, Settings, ChevronDown, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { authService } from '@/lib/api-services'

interface AdminNavbarProps {
  onMenuClick?: () => void
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
}

interface UserData {
  id: number
  name: string
  email: string
  username: string
  role: string
  role_label: string
  profile_photo_url: string | null
}

export default function AdminNavbar({ onMenuClick, sidebarOpen, onToggleSidebar }: AdminNavbarProps) {
  const router = useRouter()
  const { user: authUser } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

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

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (authUser?.id) {
          setLoadingUser(true)
          const response = await authService.getUserById(authUser.id)
          if (response.data) {
            setUserData(response.data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserData()
  }, [authUser?.id])

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick()
    }
  }

  const handleToggleSidebar = () => {
    if (onToggleSidebar) {
      onToggleSidebar()
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 z-50 px-4 py-3">
        <div className="flex items-center justify-between gap-4 h-full">
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-900 shrink-0"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-slate-900">Admin Guru</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-900 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-100 border-b border-slate-200 z-40 px-8">
        <div className="pl-2 h-full flex items-center justify-between gap-8">
          {/* Left: Logo and Menu Toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Image
              src="/assets/logo/logo-name-dark.png"
              alt="IsyaratPintar Logo"
              width={150}
              height={50}
              className="w-auto h-14 object-contain"
              priority
            />
            <button
              onClick={handleToggleSidebar}
              className="p-2 pl-4 rounded-lg hover:bg-slate-200 transition-colors text-slate-700 hover:text-slate-900"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Right: Notifications and User Menu */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-700 hover:text-slate-900 group">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-700 hover:text-slate-900">
              <Settings size={20} />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-300" />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 rounded-full">
                  <span className="text-white font-bold text-xs">
                    {userData ? (userData.name.split(' ').map(n => n[0]).slice(0, 2).join('') || 'AG') : 'AG'}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-900">{userData?.name?.split(' ')[0] || 'Admin'}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-600 transition-transform duration-200 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-300 rounded-lg shadow-xl py-1 z-50">
                  <div className="px-4 py-3 border-b border-slate-300">
                    <p className="text-sm font-semibold text-slate-900">{userData?.name || 'Admin Guru'}</p>
                    <p className="text-xs text-slate-600">{userData?.email || 'admin@guru.id'}</p>
                    {userData?.role_label && <p className="text-xs text-slate-600 mt-1">{userData.role_label}</p>}
                  </div>

                  <Link
                    href="/admin-guru/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors border-t border-slate-300"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
