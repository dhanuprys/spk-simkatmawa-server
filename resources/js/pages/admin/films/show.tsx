import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Clock as ClockIcon,
    Download,
    Edit,
    FileVideo,
    User,
} from 'lucide-react';

interface FilmShowProps {
    film: {
        id: number;
        title: string;
        description: string;
        duration: number;
        director: string;
        producer: string;
        year_produced: number;
        language: string;
        subtitle_language: string;
        synopsis: string;
        crew: string;
        cast: string;
        technical_specs: string;
        file_path: string;
        verified_by_user_id: number | null;
        verified_at: string | null;
        created_at: string;
        participant: any;
        verified_by: any;
    };
}

export default function FilmShow({ film }: FilmShowProps) {
    return (
        <AdminLayout title={`Film: ${film.title}`}>
            <Head title={`${film.title} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.films.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{film.title}</h1>
                            <p className="text-muted-foreground">{film.director}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.films.edit', film.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        {film.file_path && (
                            <Button variant="outline" asChild>
                                <Link href={route('admin.films.download', film.id)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Link>
                            </Button>
                        )}
                        {film.verified_by_user_id ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Terverifikasi
                            </Badge>
                        ) : (
                            <Badge variant="secondary">
                                <Clock className="mr-1 h-3 w-3" />
                                Menunggu Verifikasi
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Film Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileVideo className="h-5 w-5" />
                                Informasi Film
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="flex items-center gap-3">
                                    <User className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Sutradara</div>
                                        <div className="text-muted-foreground text-sm">{film.director}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Produser</div>
                                        <div className="text-muted-foreground text-sm">{film.producer}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Tahun Produksi</div>
                                        <div className="text-muted-foreground text-sm">{film.year_produced}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ClockIcon className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Durasi</div>
                                        <div className="text-muted-foreground text-sm">{film.duration} menit</div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4">
                                <div>
                                    <div className="font-medium">Bahasa</div>
                                    <div className="text-muted-foreground text-sm">{film.language}</div>
                                </div>
                                {film.subtitle_language && (
                                    <div>
                                        <div className="font-medium">Bahasa Subtitle</div>
                                        <div className="text-muted-foreground text-sm">{film.subtitle_language}</div>
                                    </div>
                                )}
                                <div>
                                    <div className="font-medium">Tanggal Upload</div>
                                    <div className="text-muted-foreground text-sm">
                                        {new Date(film.created_at).toLocaleDateString('id-ID')}
                                    </div>
                                </div>
                                {film.verified_by_user_id && (
                                    <div>
                                        <div className="font-medium">Diverifikasi Oleh</div>
                                        <div className="text-muted-foreground text-sm">
                                            {film.verified_by?.name} pada{' '}
                                            {new Date(film.verified_at!).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Participant Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Peserta</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {film.participant ? (
                                <div className="space-y-4">
                                    <div>
                                        <div className="font-medium">Nama Peserta</div>
                                        <div className="text-muted-foreground text-sm">{film.participant.name}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">Email</div>
                                        <div className="text-muted-foreground text-sm">{film.participant.email}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">Institusi</div>
                                        <div className="text-muted-foreground text-sm">
                                            {film.participant.institution}
                                        </div>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <Link href={route('admin.participants.show', film.participant.id)}>
                                            Lihat Detail Peserta
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Tidak ada data peserta</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Synopsis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sinopsis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{film.synopsis}</p>
                    </CardContent>
                </Card>

                {/* Additional Info */}
                {(film.cast || film.crew || film.technical_specs) && (
                    <div className="grid gap-6 md:grid-cols-3">
                        {film.cast && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cast</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{film.cast}</p>
                                </CardContent>
                            </Card>
                        )}
                        {film.crew && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Crew</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{film.crew}</p>
                                </CardContent>
                            </Card>
                        )}
                        {film.technical_specs && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Spesifikasi Teknis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{film.technical_specs}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
