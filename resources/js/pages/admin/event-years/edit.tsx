import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Download, FileText, Save } from 'lucide-react';

interface EventYear {
    id: number;
    year: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    registration_start: string;
    registration_end: string;
    submission_start_date: string;
    submission_end_date: string;
    show_start: string;
    show_end: string;
    event_guide_document: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    event_year: EventYear;
}

interface EventYearFormData {
    year: string;
    title: string;
    description: string;
    registration_start: string;
    registration_end: string;
    submission_start_date: string;
    submission_end_date: string;
    show_start: string;
    show_end: string;
    event_guide_document: File | null;
    _method?: string;
    [key: string]: any;
}

export default function EventYearEdit({ event_year }: Props) {
    const { data, setData, post, processing, errors } = useForm<EventYearFormData>({
        year: event_year.year.toString(),
        title: event_year.title,
        description: event_year.description || '',
        registration_start: event_year.registration_start,
        registration_end: event_year.registration_end,
        submission_start_date: event_year.submission_start_date,
        submission_end_date: event_year.submission_end_date,
        show_start: event_year.show_start || '',
        show_end: event_year.show_end || '',
        event_guide_document: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.event-years.update', event_year.id), {
            ...data,
            _method: 'put',
            preserveScroll: true,
            onSuccess: () => {
                setData('event_guide_document', null);
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('event_guide_document', file);
    };

    const getFileName = (filePath: string) => {
        return filePath.split('/').pop() || filePath;
    };

    return (
        <AdminLayout title="Edit Tahun Event" description="Edit tahun event">
            <Head title={`Edit Tahun Event - ${event_year.title} - NITISARA Admin`} />
            <div className="mx-auto max-w-2xl py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Tahun Event</CardTitle>
                        <CardDescription>Perbarui detail tahun event festival</CardDescription>
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

                            <div className="space-y-2">
                                <Label htmlFor="event_guide_document">Dokumen Panduan Event</Label>
                                <div className="space-y-2">
                                    <Input
                                        id="event_guide_document"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className={errors.event_guide_document ? 'border-red-500' : ''}
                                    />
                                    <p className="text-muted-foreground text-xs">
                                        Format yang didukung: PDF, DOC, DOCX (Maksimal 10MB)
                                    </p>

                                    {/* Show existing file */}
                                    {event_year.event_guide_document && !data.event_guide_document && (
                                        <div className="flex items-center justify-between rounded-md border p-3">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">
                                                    {getFileName(event_year.event_guide_document)}
                                                </span>
                                            </div>
                                            <Button type="button" variant="outline" size="sm" asChild>
                                                <a
                                                    href={route('admin.event-years.download-guide', event_year.id)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Download className="mr-1 h-3 w-3" />
                                                    Download
                                                </a>
                                            </Button>
                                        </div>
                                    )}

                                    {/* Show new selected file */}
                                    {data.event_guide_document && (
                                        <div className="flex items-center gap-2 text-sm text-green-600">
                                            <FileText className="h-4 w-4" />
                                            {data.event_guide_document.name}
                                            <span className="text-muted-foreground text-xs">
                                                (akan mengganti file yang ada)
                                            </span>
                                        </div>
                                    )}

                                    {errors.event_guide_document && (
                                        <p className="text-sm text-red-600">{errors.event_guide_document}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="registration_start">Mulai Pendaftaran *</Label>
                                    <Input
                                        id="registration_start"
                                        type="date"
                                        value={
                                            data.registration_start
                                                ? dayjs(data.registration_start).format('YYYY-MM-DD')
                                                : ''
                                        }
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
                                        value={
                                            data.registration_end
                                                ? dayjs(data.registration_end).format('YYYY-MM-DD')
                                                : ''
                                        }
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
                                        value={
                                            data.submission_start_date
                                                ? dayjs(data.submission_start_date).format('YYYY-MM-DD')
                                                : ''
                                        }
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
                                        value={
                                            data.submission_end_date
                                                ? dayjs(data.submission_end_date).format('YYYY-MM-DD')
                                                : ''
                                        }
                                        onChange={(e) => setData('submission_end_date', e.target.value)}
                                        className={errors.submission_end_date ? 'border-red-500' : ''}
                                    />
                                    {errors.submission_end_date && (
                                        <p className="text-sm text-red-600">{errors.submission_end_date}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="show_start">Tampilkan Mulai</Label>
                                    <Input
                                        id="show_start"
                                        type="datetime-local"
                                        value={data.show_start ? dayjs(data.show_start).format('YYYY-MM-DDTHH:mm') : ''}
                                        onChange={(e) => setData('show_start', e.target.value)}
                                        className={errors.show_start ? 'border-red-500' : ''}
                                    />
                                    {errors.show_start && <p className="text-sm text-red-500">{errors.show_start}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="show_end">Tampilkan Sampai</Label>
                                    <Input
                                        id="show_end"
                                        type="datetime-local"
                                        value={data.show_end ? dayjs(data.show_end).format('YYYY-MM-DDTHH:mm') : ''}
                                        onChange={(e) => setData('show_end', e.target.value)}
                                        className={errors.show_end ? 'border-red-500' : ''}
                                    />
                                    {errors.show_end && <p className="text-sm text-red-500">{errors.show_end}</p>}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Update Tahun Event'}
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
