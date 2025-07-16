import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, FileVideo, Upload, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilmCreateForParticipantProps {
    participant: {
        id: number;
        team_name: string;
        event_year: {
            id: number;
            year: number;
        };
        category: {
            id: number;
            name: string;
        };
    };
}

export default function FilmCreateForParticipant({ participant }: FilmCreateForParticipantProps) {
    const [dragOver, setDragOver] = useState<string | null>(null);
    const [castings, setCastings] = useState<Array<{ real_name: string; film_name: string }>>([]);

    // Always sync form.data.castings with castings state
    useEffect(() => {
        form.setData('castings', castings);
    }, [castings]);

    const form = useForm({
        title: '',
        synopsis: '',
        film_url: '',
        direct_video_url: '',
        ranking: '',
        originality_file: null as File | null,
        poster_file: null as File | null,
        backdrop_file: null as File | null,
        director: '',
        teaser_url: '',
        castings: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('admin.participants.films.store', participant.id));
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

    const handleAddCasting = () => setCastings([...castings, { real_name: '', film_name: '' }]);
    const handleRemoveCasting = (idx: number) => setCastings(castings.filter((_, i) => i !== idx));
    const handleCastingChange = (idx: number, field: 'real_name' | 'film_name', value: string) => {
        setCastings(castings.map((c, i) => (i === idx ? { ...c, [field]: value } : c)));
    };

    return (
        <AdminLayout title="Tambah Film untuk Peserta">
            <Head title="Tambah Film - NITISARA Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.participants.show', participant.id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Tambah Film untuk Peserta</h1>
                            <p className="text-muted-foreground">
                                Tambahkan film untuk tim: <strong>{participant.team_name}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Participant Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Informasi Peserta
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <Label className="text-sm font-medium">Nama Tim</Label>
                                <p className="text-sm text-gray-600">{participant.team_name}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Kategori</Label>
                                <p className="text-sm text-gray-600">{participant.category.name}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Tahun Event</Label>
                                <p className="text-sm text-gray-600">{participant.event_year.year}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Create Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileVideo className="h-5 w-5" />
                            Data Film
                        </CardTitle>
                        <CardDescription>Isi informasi lengkap film yang akan ditambahkan</CardDescription>
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
                                    <Label htmlFor="synopsis">Sinopsis *</Label>
                                    <Textarea
                                        id="synopsis"
                                        value={form.data.synopsis}
                                        onChange={(e) => form.setData('synopsis', e.target.value)}
                                        placeholder="Masukkan sinopsis film"
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

                                <div>
                                    <Label htmlFor="director">Sutradara (Opsional)</Label>
                                    <Input
                                        id="director"
                                        type="text"
                                        value={form.data.director}
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
                                        value={form.data.teaser_url}
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
                            </div>

                            {/* File Uploads */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">Upload File</h3>

                                {/* Originality File */}
                                <div>
                                    <Label htmlFor="originality_file">Surat Pernyataan Orisinalitas</Label>
                                    <div
                                        className={`mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                            dragOver === 'originality_file'
                                                ? 'border-primary bg-primary/5 scale-105'
                                                : form.data.originality_file
                                                  ? 'border-green-300 bg-green-50'
                                                  : 'border-primary/30 hover:border-primary/50'
                                        }`}
                                        onDragOver={(e) => handleDragOver(e, 'originality_file')}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, 'originality_file')}
                                        onClick={() => document.getElementById('originality_file')?.click()}
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="text-center">
                                                <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                                <p className="text-sm text-gray-600">
                                                    {form.data.originality_file
                                                        ? form.data.originality_file.name
                                                        : 'Drag & drop file atau klik untuk memilih'}
                                                </p>
                                                <p className="text-xs text-gray-500">PDF, JPG, JPEG, PNG (max 4MB)</p>
                                            </div>
                                        </div>
                                        <input
                                            id="originality_file"
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) form.setData('originality_file', file);
                                            }}
                                        />
                                    </div>
                                    {form.errors.originality_file && (
                                        <p className="text-sm text-red-600">{form.errors.originality_file}</p>
                                    )}
                                </div>

                                {/* Poster File */}
                                <div>
                                    <Label htmlFor="poster_file">Poster Film</Label>
                                    <div
                                        className={`mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                            dragOver === 'poster_file'
                                                ? 'border-primary bg-primary/5 scale-105'
                                                : form.data.poster_file
                                                  ? 'border-green-300 bg-green-50'
                                                  : 'border-primary/30 hover:border-primary/50'
                                        }`}
                                        onDragOver={(e) => handleDragOver(e, 'poster_file')}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, 'poster_file')}
                                        onClick={() => document.getElementById('poster_file')?.click()}
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="text-center">
                                                <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                                <p className="text-sm text-gray-600">
                                                    {form.data.poster_file
                                                        ? form.data.poster_file.name
                                                        : 'Drag & drop file atau klik untuk memilih'}
                                                </p>
                                                <p className="text-xs text-gray-500">JPG, JPEG, PNG (max 4MB)</p>
                                            </div>
                                        </div>
                                        <input
                                            id="poster_file"
                                            type="file"
                                            className="hidden"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) form.setData('poster_file', file);
                                            }}
                                        />
                                    </div>
                                    {form.errors.poster_file && (
                                        <p className="text-sm text-red-600">{form.errors.poster_file}</p>
                                    )}
                                </div>

                                {/* Backdrop File */}
                                <div>
                                    <Label htmlFor="backdrop_file">Backdrop Film (Opsional)</Label>
                                    <div
                                        className={`mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                            dragOver === 'backdrop_file'
                                                ? 'border-primary bg-primary/5 scale-105'
                                                : form.data.backdrop_file
                                                  ? 'border-green-300 bg-green-50'
                                                  : 'border-primary/30 hover:border-primary/50'
                                        }`}
                                        onDragOver={(e) => handleDragOver(e, 'backdrop_file')}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, 'backdrop_file')}
                                        onClick={() => document.getElementById('backdrop_file')?.click()}
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="text-center">
                                                <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                                <p className="text-sm text-gray-600">
                                                    {form.data.backdrop_file
                                                        ? form.data.backdrop_file.name
                                                        : 'Drag & drop file atau klik untuk memilih'}
                                                </p>
                                                <p className="text-xs text-gray-500">JPG, JPEG, PNG (max 4MB)</p>
                                            </div>
                                        </div>
                                        <input
                                            id="backdrop_file"
                                            type="file"
                                            className="hidden"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) form.setData('backdrop_file', file);
                                            }}
                                        />
                                    </div>
                                    {form.errors.backdrop_file && (
                                        <p className="text-sm text-red-600">{form.errors.backdrop_file}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r"
                                >
                                    {form.processing ? 'Menyimpan...' : 'Simpan Film'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.participants.show', participant.id)}>Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
