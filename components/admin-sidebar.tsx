'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, LayoutDashboard, BookOpen, CheckSquare, FileText, Users, LogOut, ChevronDown, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { authService } from '@/lib/api-services'

interface AdminSidebarProps {
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  isCollapsed?: boolean
  setIsCollapsed?: (collapsed: boolean) => void
  isMobile?: boolean
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

export default function AdminSidebar({ isOpen = true, setIsOpen, isCollapsed = false, setIsCollapsed, isMobile = false }: AdminSidebarProps) {
  const pathname = usePathname()
  const { user: authUser } = useAuth()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    pendidikan: true,
    service: true,
  })
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const menuSections = [
    {
      title: 'PENDIDIKAN',
      id: 'pendidikan',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
        { icon: BookOpen, label: 'Materi', href: '/admin/materi' },
        { icon: CheckSquare, label: 'Tugas', href: '/admin/tugas' },
        { icon: FileText, label: 'Ujian', href: '/admin/ujian' },
      ],
    },
    {
      title: 'SERVICE',
      id: 'service',
      items: [
        { icon: GraduationCap, label: 'Guru', href: '/admin/guru' },
        { icon: Users, label: 'Siswa', href: '/admin/siswa' },
      ],
    },
  ]

  const isActive = (href: string) => {
    return pathname === href
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

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }))
  }

  return (
    <>
      {/* Mobile Overlay - Only show on mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen?.(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 transition-all duration-300 flex flex-col ${
          isMobile
            ? `fixed left-0 top-16 h-[calc(100vh-64px)] w-72 transform z-40 ${!isOpen ? '-translate-x-full' : 'translate-x-0'}`
            : `fixed left-0 top-20 lg:flex lg:flex-col ${isCollapsed ? 'w-20' : 'w-72'} h-[calc(100vh-80px)] z-30`
        }`}
      >
        {/* Menu Content */}
        <nav className={`flex-1 overflow-hidden ${isCollapsed ? 'p-2' : 'p-4'} space-y-2`}>
          {menuSections.map((section) => (
            <div key={section.id} className={`${isCollapsed ? '' : 'mb-6'}`}>
              {/* Section Title */}
              {!isCollapsed && (
                <button
                  onClick={() => handleToggleSection(section.id)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-600 uppercase tracking-wider hover:text-emerald-600 transition-colors mb-2"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}

              {/* Menu Items */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isCollapsed
                    ? 'grid-rows-[1fr] opacity-100'
                    : expandedSections[section.id]
                      ? 'grid-rows-[1fr] opacity-100 mb-2'
                      : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className={`overflow-hidden ${isCollapsed ? 'space-y-2' : 'space-y-1'}`}>
                  {section.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                        isCollapsed ? 'justify-center px-2' : ''
                      } ${
                        active
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                          : 'text-slate-700 hover:bg-slate-200 hover:text-emerald-700'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon size={20} className="flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                      {isCollapsed && (
                        <div className="absolute left-24 bg-slate-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  )
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="flex-shrink-0 border-t border-slate-200 bg-gradient-to-t from-slate-100 to-slate-50 p-4">
          {/* User Profile Card */}
          {!isCollapsed && (
            <div className="mb-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {userData ? (userData.name.split(' ').map(n => n[0]).slice(0, 2).join('') || 'AG') : 'AG'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{userData?.name || 'Admin Guru'}</p>
                  <p className="text-xs text-slate-600 truncate">{userData?.email || 'admin@guru.id'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
