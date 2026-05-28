'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Edit, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import apiClient from '@/lib/api-client'
import { useToast } from '@/hooks/use-toast'

interface Ujian {
  id: number
  title: string
  description?: string
  start_date?: string
  end_date?: string
  total_questions?: number
  duration?: number
  passing_score?: number
  status?: string
  created_at?: string
  updated_at?: string
}

interface FormData {
  title: string
  description: string
  start_date: string
  end_date: string
  total_questions: number
  duration: number
  passing_score: number
  status: string
}

export default function UjianPage() {
  const [exams, setExams] = useState<Ujian[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      total_questions: 0,
      duration: 60,
      passing_score: 70,
      status: 'draft',
    },
  })

  // Fetch exams
  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/assessments')
      setExams(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch exams:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat data ujian',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (editingId) {
        // Update
        await apiClient.put(`/assessments/${editingId}`, data)
        toast({
          title: 'Success',
          description: 'Ujian berhasil diperbarui',
        })
      } else {
        // Create
        await apiClient.post('/assessments', data)
        toast({
          title: 'Success',
          description: 'Ujian berhasil ditambahkan',
        })
      }
      setOpenDialog(false)
      reset()
      setEditingId(null)
      fetchExams()
    } catch (error) {
      toast({
        title: 'Error',
        description: editingId ? 'Gagal memperbarui ujian' : 'Gagal menambahkan ujian',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (exam: Ujian) => {
    setEditingId(exam.id)
    reset({
      title: exam.title,
      description: exam.description || '',
      start_date: exam.start_date || '',
      end_date: exam.end_date || '',
      total_questions: exam.total_questions || 0,
      duration: exam.duration || 60,
      passing_score: exam.passing_score || 70,
      status: exam.status || 'draft',
    })
    setOpenDialog(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ujian ini?')) return

    try {
      await apiClient.delete(`/assessments/${id}`)
      toast({
        title: 'Success',
        description: 'Ujian berhasil dihapus',
      })
      fetchExams()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus ujian',
        variant: 'destructive',
      })
    }
  }

  const handleOpenDialog = () => {
    setEditingId(null)
    reset()
    setOpenDialog(true)
  }

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full h-full p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Ujian</h1>
            <p className="text-gray-600 mt-1">Kelola ujian dan penilaian siswa</p>
          </div>
          <Button onClick={handleOpenDialog} className="gap-2 bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white">
            <Plus className="w-4 h-4" />
            Tambah Ujian
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari ujian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Memuat data...</div>
            </div>
          ) : filteredExams.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">
                {exams.length === 0
                  ? 'Tidak ada data ujian'
                  : 'Tidak ada hasil pencarian'}
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-50">Judul</TableHead>
                  <TableHead className="bg-gray-50">Tanggal Mulai</TableHead>
                  <TableHead className="bg-gray-50">Tanggal Selesai</TableHead>
                  <TableHead className="bg-gray-50">Soal</TableHead>
                  <TableHead className="bg-gray-50">Durasi (min)</TableHead>
                  <TableHead className="bg-gray-50">Nilai Lulus</TableHead>
                  <TableHead className="bg-gray-50">Status</TableHead>
                  <TableHead className="bg-gray-50 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {exam.start_date
                        ? new Date(exam.start_date).toLocaleDateString('id-ID')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {exam.end_date
                        ? new Date(exam.end_date).toLocaleDateString('id-ID')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {exam.total_questions || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {exam.duration || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {exam.passing_score || '-'}%
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                          exam.status
                        )}`}
                      >
                        {exam.status || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(exam)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(exam.id)}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Dialog Form */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-h-96 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Ujian' : 'Tambah Ujian Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Ujian
                </label>
                <Input
                  placeholder="Masukkan judul ujian"
                  {...register('title', { required: 'Judul ujian harus diisi' })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Masukkan deskripsi ujian"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  {...register('description')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Mulai
                  </label>
                  <Input
                    type="date"
                    {...register('start_date')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Selesai
                  </label>
                  <Input
                    type="date"
                    {...register('end_date')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Soal
                  </label>
                  <Input
                    type="number"
                    min="0"
                    {...register('total_questions', {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durasi (Menit)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    {...register('duration', {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nilai Lulus (%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    {...register('passing_score', {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('status')}
                >
                  <option value="draft">Draft</option>
                  <option value="active">Aktif</option>
                  <option value="published">Dipublikasikan</option>
                  <option value="closed">Ditutup</option>
                </select>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingId ? 'Perbarui' : 'Simpan'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
