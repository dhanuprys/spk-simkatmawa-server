import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Save } from 'lucide-react';

export default function EventYearCreate() {
    const { data, setData, post, processing, errors } = useForm({
        year: '',
        title: '',
        description: '',
        registration_start: '',
        registration_end: '',
        submission_start_date: '',
        submission_end_date: '',
        is_active: true as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.event-years.store'));
    };

    return (
        <AdminLayout title="Tambah Tahun Event" description="Buat tahun event baru">
            <Head title="Tambah Tahun Event - NITISARA Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('admin.event-years.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Tambah Tahun Event</h1>
                        <p className="text-muted-foreground">Buat tahun event baru untuk festival</p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Form Tahun Event
                        </CardTitle>
                        <CardDescription>Isi informasi tahun event yang akan dibuat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="year">Tahun *</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        placeholder="Contoh: 2024"
                                        min="2020"
                                        max="2030"
                                        className={errors.year ? 'border-red-500' : ''}
                                    />
                                    {errors.year && <p className="text-sm text-red-600">{errors.year}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Event *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: NITISARA 2024"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi event festival..."
                                    rows={3}
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="registration_start">Mulai Pendaftaran *</Label>
                                    <Input
                                        id="registration_start"
                                        type="date"
                                        value={data.registration_start}
                                        onChange={(e) => setData('registration_start', e.target.value)}
                                        className={errors.registration_start ? 'border-red-500' : ''}
                                    />
                                    {errors.registration_start && (
                                        <p className="text-sm text-red-600">{errors.registration_start}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="registration_end">Selesai Pendaftaran *</Label>
                                    <Input
                                        id="registration_end"
                                        type="date"
                                        value={data.registration_end}
                                        onChange={(e) => setData('registration_end', e.target.value)}
                                        className={errors.registration_end ? 'border-red-500' : ''}
                                    />
                                    {errors.registration_end && (
                                        <p className="text-sm text-red-600">{errors.registration_end}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="submission_start_date">Mulai Submit Film *</Label>
                                    <Input
                                        id="submission_start_date"
                                        type="date"
                                        value={data.submission_start_date}
                                        onChange={(e) => setData('submission_start_date', e.target.value)}
                                        className={errors.submission_start_date ? 'border-red-500' : ''}
                                    />
                                    {errors.submission_start_date && (
                                        <p className="text-sm text-red-600">{errors.submission_start_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="submission_end_date">Selesai Submit Film *</Label>
                                    <Input
                                        id="submission_end_date"
                                        type="date"
                                        value={data.submission_end_date}
                                        onChange={(e) => setData('submission_end_date', e.target.value)}
                                        className={errors.submission_end_date ? 'border-red-500' : ''}
                                    />
                                    {errors.submission_end_date && (
                                        <p className="text-sm text-red-600">{errors.submission_end_date}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                />
                                <Label htmlFor="is_active">Event Aktif</Label>
                            </div>
                            {data.is_active && (
                                <p className="rounded-md bg-amber-50 p-2 text-sm text-amber-600">
                                    ⚠️ Menandai event ini sebagai aktif akan menonaktifkan event tahun lainnya.
                                </p>
                            )}

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Tahun Event'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('admin.event-years.index')}>Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
