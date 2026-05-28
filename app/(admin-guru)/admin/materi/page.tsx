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

interface Materi {
  id: number
  title: string
  slug: string
  description?: string
  category?: string
  created_at?: string
  updated_at?: string
}

interface FormData {
  title: string
  slug: string
  description: string
  category: string
}

export default function MateriPage() {
  const [materials, setMaterials] = useState<Materi[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      category: '',
    },
  })

  // Fetch materials
  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/lessons')
      setMaterials(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch materials:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat data materi',
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
        await apiClient.put(`/lessons/${editingId}`, data)
        toast({
          title: 'Success',
          description: 'Materi berhasil diperbarui',
        })
      } else {
        // Create
        await apiClient.post('/lessons', data)
        toast({
          title: 'Success',
          description: 'Materi berhasil ditambahkan',
        })
      }
      setOpenDialog(false)
      reset()
      setEditingId(null)
      fetchMaterials()
    } catch (error) {
      toast({
        title: 'Error',
        description: editingId ? 'Gagal memperbarui materi' : 'Gagal menambahkan materi',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (material: Materi) => {
    setEditingId(material.id)
    reset({
      title: material.title,
      slug: material.slug,
      description: material.description || '',
      category: material.category || '',
    })
    setOpenDialog(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus materi ini?')) return

    try {
      await apiClient.delete(`/lessons/${id}`)
      toast({
        title: 'Success',
        description: 'Materi berhasil dihapus',
      })
      fetchMaterials()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus materi',
        variant: 'destructive',
      })
    }
  }

  const handleOpenDialog = () => {
    setEditingId(null)
    reset()
    setOpenDialog(true)
  }

  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full h-full p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Materi</h1>
            <p className="text-gray-600 mt-1">Kelola materi pembelajaran untuk siswa</p>
          </div>
          <Button onClick={handleOpenDialog} className="gap-2 bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white">
            <Plus className="w-4 h-4" />
            Tambah Materi
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari materi..."
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
          ) : filteredMaterials.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">
                {materials.length === 0
                  ? 'Tidak ada data materi'
                  : 'Tidak ada hasil pencarian'}
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-50">Judul</TableHead>
                  <TableHead className="bg-gray-50">Slug</TableHead>
                  <TableHead className="bg-gray-50">Kategori</TableHead>
                  <TableHead className="bg-gray-50">Deskripsi</TableHead>
                  <TableHead className="bg-gray-50">Dibuat</TableHead>
                  <TableHead className="bg-gray-50 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.title}</TableCell>
                    <TableCell className="text-sm text-gray-600">{material.slug}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {material.category || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                      {material.description || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {material.created_at
                        ? new Date(material.created_at).toLocaleDateString('id-ID')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(material)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(material.id)}
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
                {editingId ? 'Edit Materi' : 'Tambah Materi Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Materi
                </label>
                <Input
                  placeholder="Masukkan judul materi"
                  {...register('title', { required: 'Judul materi harus diisi' })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <Input
                  placeholder="masukkan-slug"
                  {...register('slug', { required: 'Slug harus diisi' })}
                />
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <Input
                  placeholder="Kategori materi"
                  {...register('category')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Masukkan deskripsi materi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  {...register('description')}
                />
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
