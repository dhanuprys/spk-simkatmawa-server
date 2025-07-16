import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, FileVideo, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilmEditProps {
    film: {
        id: number;
        title: string;
        synopsis: string;
        film_url: string;
        direct_video_url?: string;
        originality_file: string;
        poster_landscape_file?: string;
        poster_portrait_file?: string;
        backdrop_file: string | null;
        verified_by_user_id: number | null;
        verified_at: string | null;
        created_at: string;
        updated_at: string;
        participant: any;
        verified_by: any;
        ranking: number | null;
        director?: string;
        teaser_url?: string;
        castings?: Array<{ real_name: string; film_name: string }>;
    };
}

export default function FilmEdit({ film }: FilmEditProps) {
    const [dragOver, setDragOver] = useState<string | null>(null);
    const [castings, setCastings] = useState<Array<{ real_name: string; film_name: string }>>(film.castings || []);

    // Always sync form.data.castings with castings state
    useEffect(() => {
        form.setData('castings', castings);
    }, [castings]);

    const form = useForm({
        title: film.title,
        synopsis: film.synopsis,
        film_url: film.film_url,
        direct_video_url: film.direct_video_url || '',
        originality_file: null as File | null,
        poster_landscape_file: null as File | null,
        poster_portrait_file: null as File | null,
        backdrop_file: null as File | null,
        director: film.director || '',
        teaser_url: film.teaser_url || '',
        ranking: film.ranking?.toString() || '',
        castings: film.castings || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.setData('castings', castings);
        form.put(route('admin.films.update', film.id));
    };

    const handleAddCasting = () => setCastings([...castings, { real_name: '', film_name: '' }]);
    const handleRemoveCasting = (idx: number) => setCastings(castings.filter((_, i) => i !== idx));
    const handleCastingChange = (idx: number, field: 'real_name' | 'film_name', value: string) => {
        setCastings(castings.map((c, i) => (i === idx ? { ...c, [field]: value } : c)));
    };

    const handleDragOver = (e: React.DragEvent, field: string) => {
        e.preventDefault();
        setDragOver(field);
    };

    const handleDragLeave = () => {
        setDragOver(null);
    };

    const handleDrop = (e: React.DragEvent, field: string) => {
        e.preventDefault();
        setDragOver(null);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            form.setData(field as any, files[0]);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout title={`Edit Film: ${film.title}`}>
            <Head title={`Edit ${film.title} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.films.show', film.id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Edit Film</h1>
                            <p className="text-muted-foreground">{film.title}</p>
                        </div>
                    </div>
                </div>

                {/* Film Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileVideo className="h-5 w-5" />
                            Informasi Film
                        </CardTitle>
                        <CardDescription>
                            Dikirim oleh {film.participant?.team_name} pada {formatDate(film.created_at)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <span className="text-sm font-medium text-gray-500">Tim:</span>
                                <p className="text-sm">{film.participant?.team_name}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Kategori:</span>
                                <p className="text-sm">{film.participant?.category?.name}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Tahun Event:</span>
                                <p className="text-sm">{film.participant?.event_year?.year}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Status:</span>
                                <p className="text-sm">
                                    {film.verified_by_user_id ? 'Terverifikasi' : 'Menunggu Verifikasi'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Data Film</CardTitle>
                        <CardDescription>Perbarui informasi film sesuai kebutuhan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Judul Film *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={form.data.title}
                                        onChange={(e) => form.setData('title', e.target.value)}
                                        placeholder="Masukkan judul film"
                                        className={form.errors.title ? 'border-red-500' : ''}
                                    />
                                    {form.errors.title && <p className="text-sm text-red-600">{form.errors.title}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="synopsis">Sinopsis Film *</Label>
                                    <Textarea
                                        id="synopsis"
                                        value={form.data.synopsis}
                                        onChange={(e) => form.setData('synopsis', e.target.value)}
                                        placeholder="Masukkan sinopsis singkat tentang film"
                                        rows={4}
                                        className={form.errors.synopsis ? 'border-red-500' : ''}
                                    />
                                    {form.errors.synopsis && (
                                        <p className="text-sm text-red-600">{form.errors.synopsis}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="film_url">Film URL *</Label>
                                    <Input
                                        id="film_url"
                                        type="url"
                                        value={form.data.film_url}
                                        onChange={(e) => form.setData('film_url', e.target.value)}
                                        placeholder="https://example.com/film.mp4"
                                        className={form.errors.film_url ? 'border-red-500' : ''}
                                    />
                                    {form.errors.film_url && (
                                        <p className="text-sm text-red-600">{form.errors.film_url}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="direct_video_url">Direct Video URL (Opsional)</Label>
                                    <Input
                                        id="direct_video_url"
                                        type="url"
                                        value={form.data.direct_video_url}
                                        onChange={(e) => form.setData('direct_video_url', e.target.value)}
                                        placeholder="https://example.com/video.mp4 atau YouTube URL"
                                        className={form.errors.direct_video_url ? 'border-red-500' : ''}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        URL langsung ke file video atau YouTube URL untuk pemutaran langsung
                                    </p>
                                    {form.errors.direct_video_url && (
                                        <p className="text-sm text-red-600">{form.errors.direct_video_url}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="director">Sutradara (Opsional)</Label>
                                    <Input
                                        id="director"
                                        type="text"
                                        value={form.data.director || ''}
                                        onChange={(e) => form.setData('director', e.target.value)}
                                        placeholder="Nama sutradara"
                                        className={form.errors.director ? 'border-red-500' : ''}
                                    />
                                    {form.errors.director && (
                                        <p className="text-sm text-red-600">{form.errors.director}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="teaser_url">Teaser URL (Opsional)</Label>
                                    <Input
                                        id="teaser_url"
                                        type="url"
                                        value={form.data.teaser_url || ''}
                                        onChange={(e) => form.setData('teaser_url', e.target.value)}
                                        placeholder="https://youtube.com/teaser"
                                        className={form.errors.teaser_url ? 'border-red-500' : ''}
                                    />
                                    {form.errors.teaser_url && (
                                        <p className="text-sm text-red-600">{form.errors.teaser_url}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>
                                        Pemeran (Castings) <span className="text-xs text-gray-400">(Opsional)</span>
                                    </Label>
                                    <div className="space-y-2">
                                        {castings.length === 0 && (
                                            <div className="text-gray-500">Belum ada data pemeran</div>
                                        )}
                                        {castings.map((c, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col gap-2 rounded border bg-gray-50 p-2 md:flex-row md:items-center"
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Nama asli"
                                                    value={c.real_name}
                                                    onChange={(e) =>
                                                        handleCastingChange(idx, 'real_name', e.target.value)
                                                    }
                                                    className="md:w-1/3"
                                                />
                                                <span className="text-gray-500">sebagai</span>
                                                <Input
                                                    type="text"
                                                    placeholder="Nama di film"
                                                    value={c.film_name}
                                                    onChange={(e) =>
                                                        handleCastingChange(idx, 'film_name', e.target.value)
                                                    }
                                                    className="md:w-1/3"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleRemoveCasting(idx)}
                                                >
                                                    &times;
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={handleAddCasting}>
                                            Tambah Pemeran
                                        </Button>
                                    </div>
                                    {form.errors.castings && (
                                        <p className="text-sm text-red-600">{form.errors.castings}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="ranking">Peringkat (Opsional)</Label>
                                    <Input
                                        id="ranking"
                                        type="number"
                                        value={form.data.ranking}
                                        onChange={(e) => form.setData('ranking', e.target.value)}
                                        placeholder="Masukkan peringkat film"
                                        min={1}
                                        className={form.errors.ranking ? 'border-red-500' : ''}
                                    />
                                    {form.errors.ranking && (
                                        <p className="text-sm text-red-600">{form.errors.ranking}</p>
                                    )}
                                </div>
                            </div>

                            {/* File Uploads */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">File Uploads</h3>

                                {/* Originality File */}
                                <div>
                                    <Label>Surat Pernyataan Orisinalitas (Opsional)</Label>
                                    <div
                                        className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                            dragOver === 'originality_file'
                                                ? 'border-primary bg-primary/5 scale-105'
                                                : form.data.originality_file
                                                  ? 'border-green-300 bg-green-50'
                                                  : 'border-primary/30 hover:border-primary/50'
                                        }`}
                                        onDragOver={(e) => handleDragOver(e, 'originality_file')}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, 'originality_file')}
                                    >
                                        <div className="text-center">
                                            <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                            <p className="text-sm font-medium">Upload File</p>
                                            <p className="text-muted-foreground text-xs">PDF, JPG, PNG (max 4MB)</p>
                                            <Input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) =>
                                                    form.setData('originality_file', e.target.files?.[0] || null)
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    {film.originality_file && (
                                        <p className="mt-1 text-xs text-gray-500">
                                            File saat ini: {film.originality_file.split('/').pop()}
                                        </p>
                                    )}
                                    {form.errors.originality_file && (
                                        <p className="text-sm text-red-600">{form.errors.originality_file}</p>
                                    )}
                                </div>

                                {/* Poster and Backdrop Files */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Poster Landscape File */}
                                    <div>
                                        <Label>Poster Landscape (16:9) (Opsional)</Label>
                                        <div
                                            className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                                dragOver === 'poster_landscape_file'
                                                    ? 'border-primary bg-primary/5 scale-105'
                                                    : form.data.poster_landscape_file
                                                      ? 'border-green-300 bg-green-50'
                                                      : 'border-primary/30 hover:border-primary/50'
                                            }`}
                                            onDragOver={(e) => handleDragOver(e, 'poster_landscape_file')}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'poster_landscape_file')}
                                        >
                                            <div className="text-center">
                                                <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                                <p className="text-sm font-medium">Upload Poster Landscape</p>
                                                <p className="text-muted-foreground text-xs">
                                                    JPG, PNG (16:9, max 3MB)
                                                </p>
                                                <Input
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={(e) =>
                                                        form.setData(
                                                            'poster_landscape_file',
                                                            e.target.files?.[0] || null,
                                                        )
                                                    }
                                                    className="mt-2"
                                                />
                                                {form.data.poster_landscape_file && (
                                                    <img
                                                        src={URL.createObjectURL(form.data.poster_landscape_file)}
                                                        alt="Preview Poster Landscape"
                                                        className="mx-auto mt-2 max-h-32 rounded shadow"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {film.poster_landscape_file && !form.data.poster_landscape_file && (
                                            <p className="mt-1 text-xs text-gray-500">
                                                File saat ini: {film.poster_landscape_file.split('/').pop()}
                                            </p>
                                        )}
                                        {form.errors.poster_landscape_file && (
                                            <p className="text-sm text-red-600">{form.errors.poster_landscape_file}</p>
                                        )}
                                    </div>

                                    {/* Poster Portrait File */}
                                    <div>
                                        <Label>Poster Portrait (2:3) (Opsional)</Label>
                                        <div
                                            className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                                dragOver === 'poster_portrait_file'
                                                    ? 'border-primary bg-primary/5 scale-105'
                                                    : form.data.poster_portrait_file
                                                      ? 'border-green-300 bg-green-50'
                                                      : 'border-primary/30 hover:border-primary/50'
                                            }`}
                                            onDragOver={(e) => handleDragOver(e, 'poster_portrait_file')}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'poster_portrait_file')}
                                        >
                                            <div className="text-center">
                                                <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                                <p className="text-sm font-medium">Upload Poster Portrait</p>
                                                <p className="text-muted-foreground text-xs">JPG, PNG (2:3, max 3MB)</p>
                                                <Input
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={(e) =>
                                                        form.setData(
                                                            'poster_portrait_file',
                                                            e.target.files?.[0] || null,
                                                        )
                                                    }
                                                    className="mt-2"
                                                />
                                                {form.data.poster_portrait_file && (
                                                    <img
                                                        src={URL.createObjectURL(form.data.poster_portrait_file)}
                                                        alt="Preview Poster Portrait"
                                                        className="mx-auto mt-2 max-h-32 rounded shadow"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {film.poster_portrait_file && !form.data.poster_portrait_file && (
                                            <p className="mt-1 text-xs text-gray-500">
                                                File saat ini: {film.poster_portrait_file.split('/').pop()}
                                            </p>
                                        )}
                                        {form.errors.poster_portrait_file && (
                                            <p className="text-sm text-red-600">{form.errors.poster_portrait_file}</p>
                                        )}
                                    </div>

                                    {/* Backdrop File (unchanged) */}
                                    <div>
                                        <Label>Backdrop Film (Opsional)</Label>
                                        <div
                                            className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                                dragOver === 'backdrop_file'
                                                    ? 'border-primary bg-primary/5 scale-105'
                                                    : form.data.backdrop_file
                                                      ? 'border-green-300 bg-green-50'
                                                      : 'border-primary/30 hover:border-primary/50'
                                            }`}
                                            onDragOver={(e) => handleDragOver(e, 'backdrop_file')}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'backdrop_file')}
                                        >
                                            <div className="text-center">
                                                <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                                <p className="text-sm font-medium">Upload Backdrop</p>
                                                <p className="text-muted-foreground text-xs">JPG, PNG (max 4MB)</p>
                                                <Input
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={(e) =>
                                                        form.setData('backdrop_file', e.target.files?.[0] || null)
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        {film.backdrop_file && (
                                            <p className="mt-1 text-xs text-gray-500">
                                                File saat ini: {film.backdrop_file.split('/').pop()}
                                            </p>
                                        )}
                                        {form.errors.backdrop_file && (
                                            <p className="text-sm text-red-600">{form.errors.backdrop_file}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r"
                                >
                                    {form.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.films.show', film.id)}>Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
