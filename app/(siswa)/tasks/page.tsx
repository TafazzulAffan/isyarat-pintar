'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, AlertCircle, Zap, FileText, Upload, ClipboardList } from 'lucide-react'
import Navbar from '@/components/navbar'
import PageHeroBanner from '@/components/page-hero-banner'
import { tasks, taskStatuses, getStatusConfig } from '@/constant/tasks-data'

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const statuses = taskStatuses

  // Helper function to render icon based on iconType
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'checkCircle':
        return <CheckCircle2 className="text-emerald-500" size={18} />
      case 'alertCircle':
        return <AlertCircle className="text-amber-500" size={18} />
      case 'clock':
        return <Clock className="text-sky-500" size={18} />
      default:
        return <Clock className="text-gray-400" size={18} />
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    let matchesStatus = false
    if (filterStatus === 'all') {
      matchesStatus = true
    } else if (filterStatus === 'Selesai') {
      matchesStatus = task.status === 'completed'
    } else if (filterStatus === 'Terlambat') {
      matchesStatus = task.status === 'late'
    } else if (filterStatus === 'Tidak Mengumpulkan') {
      matchesStatus = task.status === 'not_submitted'
    }
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <PageHeroBanner
        icon={<ClipboardList size={16} />}
        eyebrow="Manajemen Tugas"
        title={<>Tugas & <br className="hidden md:block" />Penugasan</>}
        description="Atur prioritas, pantau deadline, dan selesaikan tugasmu tepat waktu!"
        gradient="from-sky-500 to-blue-600"
        stats={[
          { value: '1', label: '✅ Selesai',    variant: 'success' },
          { value: '2', label: '📋 Pending',    variant: 'default' },
          { value: '3', label: '⚠️ Terlambat', variant: 'danger' },
        ]}
        decoration={
          <div className="absolute right-8 top-0 bottom-0 flex flex-col justify-center gap-3 opacity-10 pointer-events-none select-none">
            {[75, 90, 55, 70].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border-2 border-white shrink-0 ${i < 1 ? 'bg-white' : ''}`} />
                <div className="h-1.5 bg-white rounded-full" style={{ width: `${w}px` }} />
              </div>
            ))}
          </div>
        }
      />

      <main className="pb-16 px-4 sm:px-6 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto">

          {/* Status Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {statuses.map((status, i) => (
              <button
                key={status.name}
                onClick={() => setFilterStatus(status.name === 'Semua' ? 'all' : status.name)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95 animate-scale-in ${
                  (status.name === 'Semua' && filterStatus === 'all') || filterStatus === status.name
                    ? 'bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                    : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50 hover:border-gray-300'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span>{status.emoji}</span>
                {status.name}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.map((task, idx) => {
              const statusConfig = getStatusConfig(task.status)
              return (
                <div
                  key={task.id}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 cursor-pointer animate-fade-in-left shimmer-overlay"
                  style={{ animationDelay: `${idx * 90}ms` }}
                >
                  {/* Left color accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${task.gradient}`} />

                  <div className="relative z-10 p-5 pl-6 flex flex-col md:flex-row md:items-center gap-4">
                    {/* Left Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        {getIconComponent(statusConfig.iconType)}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-slate-800 mb-0.5 group-hover:text-teal-700 transition-colors">{task.title}</h3>
                          <p className="text-sm text-slate-500">{task.subject} · {task.points} poin</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 ml-7.5 line-clamp-1">{task.description}</p>
                    </div>

                    {/* Right Content */}
                    <div className="flex items-center gap-3 shrink-0 ml-7.5 md:ml-0">
                      {/* Priority */}
                      {task.priority === 'high' && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
                          <Zap size={12} /> Prioritas
                        </span>
                      )}

                      {/* Due Date */}
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                          task.daysLeft > 0
                            ? 'bg-emerald-50 text-emerald-700'
                            : task.daysLeft === 0
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {task.daysLeft > 0 ? `${task.daysLeft} hari` : task.daysLeft === 0 ? 'Hari ini' : 'Lewat'}
                      </span>

                      {/* Status Badge */}
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.label}
                      </span>

                      {/* Action Button */}
                      <button className={`p-2.5 rounded-xl text-white transition-all duration-300 group-hover:scale-105 shrink-0 bg-linear-to-r ${
                        task.status === 'completed' ? 'from-emerald-500 to-green-600 shadow-emerald-500/20' : 'from-teal-500 to-emerald-600 shadow-teal-500/20'
                      } shadow-lg`}>
                        {task.status === 'completed' ? <CheckCircle2 size={18} /> : <FileText size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty state */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Tidak ada tugas ditemukan</h3>
              <p className="text-slate-500 text-sm">Semua tugas sudah selesai!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
