// Types
export interface Lesson {
  id: number
  title: string
  duration: string
  watched: boolean
  content: string
  description: string
}

export interface LessonSection {
  id: number
  title: string
  lessons: Lesson[]
}

export interface MaterialDetailData {
  id: number
  title: string
  category: string
  instructor: string
  rating: number
  students: number
  gradient: string
  bgLight: string
  overview: string
  sections: LessonSection[]
}

export interface ResourceItem {
  name: string
  type: string
  size: string
}

export interface KeyPoint {
  text: string
}

export interface EngagementStat {
  label: string
  value: string
  icon: 'eye' | 'thumbsUp' | 'messageCircle'
}

// Material Details Data
export const materialDetailsData: MaterialDetailData = {
  id: 1,
  title: 'Aljabar Dasar',
  category: 'Matematika',
  instructor: 'Dr. Ahmad',
  rating: 4.8,
  students: 2341,
  gradient: 'from-teal-500 to-emerald-600',
  bgLight: 'bg-emerald-50',
  overview: 'Pelajari konsep dasar aljabar dengan pendekatan yang mudah dipahami. Materi ini dirancang khusus untuk membantu Anda memahami persamaan linear, variabel, dan operasi aljabar dasar.',
  sections: [
    {
      id: 1,
      title: 'Pengenalan Aljabar',
      lessons: [
        {
          id: 1,
          title: 'Apa itu Variabel dan Konstanta',
          duration: '12:45',
          watched: true,
          description: 'Memahami perbedaan antara variabel dan konstanta dalam aljabar',
          content: 'Konten video pembelajaran tentang variabel dan konstanta...'
        },
        {
          id: 2,
          title: 'Operasi Dasar dalam Aljabar',
          duration: '15:30',
          watched: true,
          description: 'Pelajari penjumlahan, pengurangan, perkalian, dan pembagian dalam bentuk aljabar',
          content: 'Konten video pembelajaran tentang operasi dasar...'
        },
        {
          id: 3,
          title: 'Menyederhanakan Ekspresi Aljabar',
          duration: '14:15',
          watched: false,
          description: 'Teknik-teknik untuk menyederhanakan ekspresi aljabar yang kompleks',
          content: 'Konten video pembelajaran tentang menyederhanakan ekspresi...'
        }
      ]
    },
    {
      id: 2,
      title: 'Persamaan Linear',
      lessons: [
        {
          id: 4,
          title: 'Pengenalan Persamaan Linear',
          duration: '13:20',
          watched: false,
          description: 'Memahami struktur dan cara menyelesaikan persamaan linear',
          content: 'Konten video pembelajaran tentang persamaan linear...'
        },
        {
          id: 5,
          title: 'Penyelesaian Persamaan Linear Satu Variabel',
          duration: '16:45',
          watched: false,
          description: 'Langkah demi langkah menyelesaikan persamaan dengan satu variabel',
          content: 'Konten video pembelajaran tentang penyelesaian persamaan...'
        }
      ]
    },
    {
      id: 3,
      title: 'Aplikasi Praktis',
      lessons: [
        {
          id: 6,
          title: 'Soal dan Pembahasan',
          duration: '20:00',
          watched: false,
          description: 'Kumpulan soal praktis dengan pembahasan lengkap',
          content: 'Konten video pembelajaran tentang soal dan pembahasan...'
        }
      ]
    }
  ]
}

// Key Points untuk Aljabar Dasar
export const keyPointsData: KeyPoint[] = [
  {
    text: 'Variabel adalah simbol yang mewakili nilai yang tidak diketahui'
  },
  {
    text: 'Konstanta adalah nilai tetap yang tidak berubah'
  },
  {
    text: 'Operasi aljabar mengikuti aturan persamaan matematika'
  },
  {
    text: 'Penyederhanaan ekspresi membuat perhitungan lebih mudah'
  }
]

// Resources untuk Material
export const resourcesData: ResourceItem[] = [
  {
    name: 'PDF - Ringkasan Aljabar Dasar',
    type: 'pdf',
    size: '2.4 MB'
  },
  {
    name: 'Excel - Latihan Soal',
    type: 'excel',
    size: '1.8 MB'
  },
  {
    name: 'Video Alternatif - Penjelasan Lanjut',
    type: 'video',
    size: '145 MB'
  }
]

// Engagement Stats untuk Material
export const engagementStatsData: EngagementStat[] = [
  {
    label: 'Viewed',
    value: '284',
    icon: 'eye'
  },
  {
    label: 'Likes',
    value: '42',
    icon: 'thumbsUp'
  },
  {
    label: 'Comments',
    value: '18',
    icon: 'messageCircle'
  }
]
