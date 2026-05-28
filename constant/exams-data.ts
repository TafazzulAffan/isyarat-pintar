// Types
export interface UpcomingExam {
  id: number
  title: string
  subject: string
  date: string
  time: string
  daysLeft: number
  questions: number
  duration: number
  format: string
  topics: string[]
  gradient: string
  readiness: number
}

export interface OngoingExam {
  id: number
  title: string
  subject: string
  timeLeft: string
  questions: number
  answered: number
}

export interface CompletedExam {
  id: number
  title: string
  subject: string
  completedDate: string
  score: number
  maxScore: number
  rank: string
  gradient: string
}

// Upcoming Exams
export const upcomingExams: UpcomingExam[] = [
  {
    id: 1,
    title: 'Ujian Tengah Semester - Matematika',
    subject: 'Matematika',
    date: '2024-03-22',
    time: '09:00 - 11:00',
    daysLeft: 11,
    questions: 50,
    duration: 120,
    format: 'Multiple Choice & Essay',
    topics: ['Aljabar', 'Geometri', 'Kalkulus'],
    gradient: 'from-violet-500 to-purple-600',
    readiness: 72,
  },
  {
    id: 2,
    title: 'Ujian Bahasa Indonesia',
    subject: 'Bahasa',
    date: '2024-03-25',
    time: '13:00 - 14:30',
    daysLeft: 14,
    questions: 40,
    duration: 90,
    format: 'Essay & Analysis',
    topics: ['Puisi', 'Prosa', 'Tata Bahasa'],
    gradient: 'from-rose-400 to-pink-500',
    readiness: 58,
  },
  {
    id: 3,
    title: 'Praktik Ujian - Biologi',
    subject: 'Sains',
    date: '2024-03-28',
    time: '10:00 - 12:00',
    daysLeft: 17,
    questions: 35,
    duration: 120,
    format: 'Praktik + Multiple Choice',
    topics: ['Genetika', 'Evolusi', 'Ekologi'],
    gradient: 'from-teal-500 to-emerald-500',
    readiness: 85,
  },
]

// Ongoing Exams
export const ongoingExams: OngoingExam[] = [
  {
    id: 4,
    title: 'Kuis Harian - Sejarah',
    subject: 'Sosial',
    timeLeft: '15 menit',
    questions: 20,
    answered: 12,
  },
]

// Completed Exams
export const completedExams: CompletedExam[] = [
  {
    id: 5,
    title: 'Ujian Akhir Semester - Fisika',
    subject: 'Sains',
    completedDate: '2024-03-01',
    score: 92,
    maxScore: 100,
    rank: '1 dari 45',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    id: 6,
    title: 'Mid-Term Test - Seni Rupa',
    subject: 'Seni',
    completedDate: '2024-02-28',
    score: 88,
    maxScore: 100,
    rank: '3 dari 50',
    gradient: 'from-fuchsia-400 to-pink-500',
  },
]

// Tab Configuration
export const examTabs = [
  { name: 'Semua', emoji: '📋' },
  { name: 'Mendatang', emoji: '📅' },
  { name: 'Berlangsung', emoji: '🚀' },
  { name: 'Selesai', emoji: '✅' },
]
