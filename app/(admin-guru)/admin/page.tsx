'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, BookOpen, CheckSquare, FileText, TrendingUp } from 'lucide-react'

const mockData = [
  { name: 'Jan', siswa: 40, tugas: 24, ujian: 24 },
  { name: 'Feb', siswa: 30, tugas: 13, ujian: 22 },
  { name: 'Mar', siswa: 20, tugas: 98, ujian: 29 },
  { name: 'Apr', siswa: 27, tugas: 39, ujian: 20 },
  { name: 'May', siswa: 18, tugas: 48, ujian: 21 },
]

const pieData = [
  { name: 'Sudah Dikerjakan', value: 65 },
  { name: 'Dalam Proses', value: 25 },
  { name: 'Belum Dikerjakan', value: 10 },
]

const COLORS = ['#14b8a6', '#06b6d4', '#f97316']

export default function AdminDashboard() {
  const stats = [
    { icon: Users, label: 'Total Siswa', value: '124', color: 'from-blue-500 to-blue-600' },
    { icon: BookOpen, label: 'Materi', value: '28', color: 'from-purple-500 to-purple-600' },
    { icon: CheckSquare, label: 'Tugas', value: '45', color: 'from-orange-500 to-orange-600' },
    { icon: FileText, label: 'Ujian', value: '12', color: 'from-pink-500 to-pink-600' },
  ]

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Admin</h1>
        <p className="text-slate-500 mt-2">Selamat datang kembali! Berikut adalah ringkasan aktivitas terkini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-slate-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
                <TrendingUp size={14} />
                +12% dari bulan lalu
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Aktivitas Bulan Ini</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="siswa" stroke="#14b8a6" strokeWidth={2} />
              <Line type="monotone" dataKey="tugas" stroke="#06b6d4" strokeWidth={2} />
              <Line type="monotone" dataKey="ujian" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Pengumpulan Tugas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx] }}
                />
                <span className="text-slate-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Aktivitas Terbaru</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { name: 'Budi Santoso', action: 'menyelesaikan tugas', subject: 'Bahasa Isyarat Dasar', time: '2 jam yang lalu' },
            { name: 'Siti Nurhaliza', action: 'mengumpulkan jawaban ujian', subject: 'Ujian Tengah Semester', time: '4 jam yang lalu' },
            { name: 'Ahmad Wijaya', action: 'membaca materi baru', subject: 'Tata Bahasa Lanjutan', time: '6 jam yang lalu' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
              <p className="text-sm text-slate-900">
                <span className="font-semibold">{item.name}</span> {item.action}
              </p>
              <p className="text-xs text-slate-500 mt-1">{item.subject}</p>
              <p className="text-xs text-slate-400 mt-1">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
