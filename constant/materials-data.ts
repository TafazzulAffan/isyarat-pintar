// Types
export interface Material {
  id: number
  slug: string
  title: string
  category: string
  gradient: string
  bgLight: string
  rating: number
  students: number
  duration: string
  lessons: number
  instructor: string
  progress: number
  trending: boolean
}

// Materials Data
export const materials: Material[] = [
  {
    id: 1,
    slug: 'aljabar-dasar',
    title: 'Aljabar Dasar',
    category: 'Matematika',
    gradient: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    rating: 4.8,
    students: 2341,
    duration: '4.5 jam',
    lessons: 12,
    instructor: 'Dr. Ahmad',
    progress: 65,
    trending: true,
  },
  {
    id: 2,
    slug: 'tata-bahasa-indonesia',
    title: 'Tata Bahasa Indonesia',
    category: 'Bahasa',
    gradient: 'from-rose-400 to-pink-500',
    bgLight: 'bg-rose-50',
    rating: 4.6,
    students: 1876,
    duration: '3.2 jam',
    lessons: 8,
    instructor: 'Ibu Siti',
    progress: 42,
    trending: false,
  },
  {
    id: 3,
    slug: 'biologi-sel',
    title: 'Biologi Sel',
    category: 'Sains',
    gradient: 'from-teal-500 to-emerald-500',
    bgLight: 'bg-teal-50',
    rating: 4.9,
    students: 3102,
    duration: '5.1 jam',
    lessons: 15,
    instructor: 'Prof. Budi',
    progress: 88,
    trending: true,
  },
  {
    id: 4,
    slug: 'sejarah-nusantara',
    title: 'Sejarah Nusantara',
    category: 'Sosial',
    gradient: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50',
    rating: 4.7,
    students: 1524,
    duration: '3.8 jam',
    lessons: 10,
    instructor: 'Pak Hendra',
    progress: 56,
    trending: false,
  },
  {
    id: 5,
    slug: 'fisika-kuantum',
    title: 'Fisika Kuantum',
    category: 'Sains',
    gradient: 'from-sky-400 to-blue-500',
    bgLight: 'bg-sky-50',
    rating: 4.5,
    students: 987,
    duration: '6.2 jam',
    lessons: 18,
    instructor: 'Prof. Rini',
    progress: 23,
    trending: true,
  },
  {
    id: 6,
    slug: 'seni-rupa-modern',
    title: 'Seni Rupa Modern',
    category: 'Seni',
    gradient: 'from-fuchsia-400 to-pink-500',
    bgLight: 'bg-fuchsia-50',
    rating: 4.6,
    students: 654,
    duration: '2.5 jam',
    lessons: 6,
    instructor: 'Mbak Eka',
    progress: 100,
    trending: false,
  },
]

// Categories Configuration
export const categories = [
  { name: 'Semua', emoji: '📚' },
  { name: 'Matematika', emoji: '🔢' },
  { name: 'Bahasa', emoji: '📝' },
  { name: 'Sains', emoji: '🔬' },
  { name: 'Sosial', emoji: '🌍' },
  { name: 'Seni', emoji: '🎨' },
]
