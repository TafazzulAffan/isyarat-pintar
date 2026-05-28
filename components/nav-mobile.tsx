'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { X, Home, BookOpen, FileText, ClipboardCheck, Bell, LogOut, User } from 'lucide-react'
import { useState } from 'react'

interface NavMobileProps {
  isOpen: boolean
  onClose: () => void
}

export default function NavMobile({ isOpen, onClose }: NavMobileProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [notificationCount] = useState(2)

  const handleLogout = () => {
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    // Clear localStorage
    localStorage.clear()

    // Redirect to login
    router.push('/')
    onClose()
  }

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Materi', href: '/materials', icon: BookOpen },
    { label: 'Tugas', href: '/tasks', icon: FileText },
    { label: 'Ujian', href: '/exams', icon: ClipboardCheck },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-60 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-linear-to-b from-[#014140] to-[#0a4a40] z-70 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity" onClick={onClose}>
              <Image
                src="/assets/logo/logo-name.png"
                alt="IsyaratPintar E-Learning Logo"
                width={80}
                height={48}
                className="h-11 w-auto"
                priority
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/10 space-y-2">
            {/* Notification Section */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all">
              <div className="relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                    {notificationCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold">Notifikasi</span>
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all">
              <LogOut size={20} />
              <span className="text-sm font-semibold">Keluar</span>
            </button>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#a8e6db] to-[#68b5ac] flex items-center justify-center text-[#014140] font-bold text-base border-2 border-white/30">
                AR
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Alfian Rizki</p>
                <p className="text-xs text-[#a8e6db]">student@isyarat.id</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
