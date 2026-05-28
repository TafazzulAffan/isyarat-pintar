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

interface Tugas {
  id: number
  title: string
  description?: string
  due_date?: string
  status?: string
  created_at?: string
  updated_at?: string
}

interface FormData {
  title: string
  description: string
  due_date: string
  status: string
}

export default function TugasPage() {
  const [tasks, setTasks] = useState<Tugas[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      due_date: '',
      status: 'active',
    },
  })

  // Fetch tasks
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/tasks')
      setTasks(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat data tugas',
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
        await apiClient.put(`/tasks/${editingId}`, data)
        toast({
          title: 'Success',
          description: 'Tugas berhasil diperbarui',
        })
      } else {
        // Create
        await apiClient.post('/tasks', data)
        toast({
          title: 'Success',
          description: 'Tugas berhasil ditambahkan',
        })
      }
      setOpenDialog(false)
      reset()
      setEditingId(null)
      fetchTasks()
    } catch (error) {
      toast({
        title: 'Error',
        description: editingId ? 'Gagal memperbarui tugas' : 'Gagal menambahkan tugas',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (task: Tugas) => {
    setEditingId(task.id)
    reset({
      title: task.title,
      description: task.description || '',
      due_date: task.due_date || '',
      status: task.status || 'active',
    })
    setOpenDialog(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tugas ini?')) return

    try {
      await apiClient.delete(`/tasks/${id}`)
      toast({
        title: 'Success',
        description: 'Tugas berhasil dihapus',
      })
      fetchTasks()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus tugas',
        variant: 'destructive',
      })
    }
  }

  const handleOpenDialog = () => {
    setEditingId(null)
    reset()
    setOpenDialog(true)
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'completed':
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
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Tugas</h1>
            <p className="text-gray-600 mt-1">Kelola tugas dan pekerjaan rumah siswa</p>
          </div>
          <Button onClick={handleOpenDialog} className="gap-2 bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white">
            <Plus className="w-4 h-4" />
            Tambah Tugas
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari tugas..."
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
          ) : filteredTasks.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">
                {tasks.length === 0
                  ? 'Tidak ada data tugas'
                  : 'Tidak ada hasil pencarian'}
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-50">Judul</TableHead>
                  <TableHead className="bg-gray-50">Deskripsi</TableHead>
                  <TableHead className="bg-gray-50">Deadline</TableHead>
                  <TableHead className="bg-gray-50">Status</TableHead>
                  <TableHead className="bg-gray-50">Dibuat</TableHead>
                  <TableHead className="bg-gray-50 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                      {task.description || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString('id-ID')
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                          task.status
                        )}`}
                      >
                        {task.status || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {task.created_at
                        ? new Date(task.created_at).toLocaleDateString('id-ID')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(task)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Tugas' : 'Tambah Tugas Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Tugas
                </label>
                <Input
                  placeholder="Masukkan judul tugas"
                  {...register('title', { required: 'Judul tugas harus diisi' })}
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
                  placeholder="Masukkan deskripsi tugas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  {...register('description')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <Input
                  type="date"
                  {...register('due_date')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('status')}
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="completed">Selesai</option>
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
