'use client'

import React from 'react'
import { Menu, X, LayoutDashboard, BookOpen, CheckSquare, FileText, Settings, LogOut, Bell } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: BookOpen, label: 'Materials', href: '/materials' },
    { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
    { icon: FileText, label: 'Exams', href: '/exams' },
  ]

  const bottomItems = [
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: LogOut, label: 'Logout', href: '#' },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 transform transition-transform duration-300 z-30 overflow-y-auto md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Clean white background */}
        <div className="absolute inset-0 bg-white shadow-2xl border-r border-gray-100" />

        {/* Content */}
        <div className="relative h-full flex flex-col p-6 md:overflow-y-auto">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">IP</span>
              </div>
              IsyaratPintar
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Menu */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200 group"
              >
                <item.icon size={20} className="group-hover:text-teal-600 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Notification Bell - Floating */}
          <div className="mb-6 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-50 group-hover:bg-teal-100 transition-colors">
                <Bell size={18} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">2 New</p>
                <p className="text-xs text-slate-400">Notifications</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          </div>

          {/* Bottom Menu */}
          <nav className="space-y-1 border-t border-gray-100 pt-4">
            {bottomItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200 group"
              >
                <item.icon size={20} className="group-hover:text-slate-600 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* User Profile Card */}
          <div className="mt-4 p-4 rounded-xl bg-linear-to-r from-teal-50 to-emerald-50 border border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">Student</p>
                <p className="text-xs text-slate-400 truncate">student@isyarat.id</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
