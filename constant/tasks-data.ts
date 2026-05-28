// Types
export interface Task {
  id: number
  title: string
  subject: string
  dueDate: string
  daysLeft: number
  status: 'completed' | 'late' | 'not_submitted' | 'pending'
  priority: 'high' | 'medium' | 'low'
  points: number
  submitted: boolean
  description: string
  gradient: string
  score?: number
  groupMembers?: number
}

export interface StatusConfig {
  label: string
  bg: string
  text: string
  border: string
  iconType: 'checkCircle' | 'alertCircle' | 'clock'
}

// Tasks Data
export const tasks: Task[] = [
  {
    id: 1,
    title: 'Soal Latihan Aljabar Chapter 3',
    subject: 'Matematika',
    dueDate: '2024-03-15',
    daysLeft: 3,
    status: 'pending',
    priority: 'high',
    points: 100,
    submitted: false,
    description: 'Kerjakan 20 soal tentang persamaan linear dan sistem persamaan',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Esai: Analisis Cerpen Indonesia',
    subject: 'Bahasa',
    dueDate: '2024-03-08',
    daysLeft: -4,
    status: 'not_submitted',
    priority: 'medium',
    points: 80,
    submitted: false,
    description: 'Tulis esai minimal 500 kata tentang cerpen pilihan Anda',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    id: 3,
    title: 'Praktik Laboratorium Biologi',
    subject: 'Sains',
    dueDate: '2024-03-10',
    daysLeft: -2,
    status: 'late',
    priority: 'high',
    points: 120,
    submitted: true,
    description: 'Laporan hasil pengamatan sel dengan foto dokumentasi',
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'Quiz Sejarah Nusantara',
    subject: 'Sosial',
    dueDate: '2024-03-05',
    daysLeft: -7,
    status: 'completed',
    priority: 'low',
    points: 50,
    submitted: true,
    description: '20 pertanyaan pilihan ganda tentang periode colonial',
    gradient: 'from-amber-400 to-orange-500',
    score: 85,
  },
  {
    id: 5,
    title: 'Proyek Kelompok: Presentasi Fisika',
    subject: 'Sains',
    dueDate: '2024-03-20',
    daysLeft: 8,
    status: 'pending',
    priority: 'high',
    points: 150,
    submitted: false,
    description: 'Buat presentasi 10 menit + slide tentang aplikasi fisika dalam kehidupan',
    gradient: 'from-sky-400 to-blue-500',
    groupMembers: 4,
  },
  {
    id: 6,
    title: 'Laporan Eksperimen Kimia',
    subject: 'Sains',
    dueDate: '2024-03-01',
    daysLeft: -11,
    status: 'not_submitted',
    priority: 'high',
    points: 100,
    submitted: false,
    description: 'Laporan lengkap hasil eksperimen reaksi kimia',
    gradient: 'from-fuchsia-400 to-pink-500',
  },
]

// Task Status Configuration
export const taskStatuses = [
  { name: 'Semua', emoji: '📋' },
  { name: 'Selesai', emoji: '✅' },
  { name: 'Terlambat', emoji: '⏰' },
  { name: 'Tidak Mengumpulkan', emoji: '❌' },
]

// Status Config Helper
export const getStatusConfig = (status: string): StatusConfig => {
  switch (status) {
    case 'completed':
      return {
        label: 'Selesai',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconType: 'checkCircle',
      }
    case 'late':
      return {
        label: 'Terlambat',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        iconType: 'alertCircle',
      }
    case 'not_submitted':
      return {
        label: 'Tidak Mengumpulkan',
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        iconType: 'alertCircle',
      }
    case 'pending':
      return {
        label: 'Belum Dikerjakan',
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        iconType: 'clock',
      }
    default:
      return {
        label: status,
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        iconType: 'clock',
      }
  }
}
