import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    ExternalLink,
    FileText,
    FileVideo,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface FilmShowProps {
    film: {
        id: number;
        title: string;
        synopsis: string;
        film_url: string;
        originality_file: string;
        poster_file: string;
        backdrop_file: string | null;
        verified_by_user_id: number | null;
        verified_at: string | null;
        created_at: string;
        updated_at: string;
        participant: any;
        verified_by: any;
        ranking: number | null;
    };
}

export default function FilmShow({ film }: FilmShowProps) {
    const [showVerifyDialog, setShowVerifyDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [editRankingOpen, setEditRankingOpen] = useState(false);
    const [ranking, setRanking] = useState<number | ''>(film.ranking ?? '');
    const [saving, setSaving] = useState(false);

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

    const handleVerify = () => {
        router.post(route('admin.films.verify', film.id));
        setShowVerifyDialog(false);
    };

    const handleReject = () => {
        router.post(route('admin.films.reject', film.id));
        setShowRejectDialog(false);
    };

    const handleSaveRanking = async () => {
        setSaving(true);
        await router.put(
            route('admin.films.update', film.id),
            { ranking },
            {
                onFinish: () => {
                    setSaving(false);
                    setEditRankingOpen(false);
                },
            },
        );
    };

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
                            <p className="text-muted-foreground">Dikirim oleh {film.participant?.team_name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <span className="ml-4 font-semibold">
                            Peringkat: {film.ranking ?? '-'}
                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-2"
                                onClick={() => setEditRankingOpen(true)}
                            >
                                Edit
                            </Button>
                        </span>
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
                            <div>
                                <div className="font-medium text-gray-900">Judul Film</div>
                                <div className="text-gray-700">{film.title}</div>
                            </div>

                            <div>
                                <div className="font-medium text-gray-900">Synopsis</div>
                                <div className="whitespace-pre-wrap text-gray-700">{film.synopsis}</div>
                            </div>

                            <div>
                                <div className="font-medium text-gray-900">Film URL</div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={film.film_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="truncate text-blue-600 hover:text-blue-800"
                                    >
                                        {film.film_url}
                                    </a>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a href={film.film_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Tanggal Upload</div>
                                        <div className="text-muted-foreground text-sm">
                                            {formatDate(film.created_at)}
                                        </div>
                                    </div>
                                </div>
                                {film.verified_by_user_id && (
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="text-muted-foreground h-4 w-4" />
                                        <div>
                                            <div className="font-medium">Diverifikasi Oleh</div>
                                            <div className="text-muted-foreground text-sm">
                                                {film.verified_by?.name} pada {formatDate(film.verified_at!)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Participant Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informasi Peserta
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {film.participant ? (
                                <div className="space-y-4">
                                    <div>
                                        <div className="font-medium text-gray-900">Nama Tim</div>
                                        <div className="text-gray-700">{film.participant.team_name}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Ketua Tim</div>
                                        <div className="text-gray-700">{film.participant.leader_name}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Kota</div>
                                        <div className="text-gray-700">{film.participant.city}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Perusahaan/Institusi</div>
                                        <div className="text-gray-700">{film.participant.company}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">PIN</div>
                                        <div className="font-mono text-gray-700">{film.participant.pin}</div>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <Link href={route('admin.participants.show', film.participant.id)}>
                                            Lihat Detail Peserta
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="py-4 text-center">
                                    <AlertTriangle className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                    <p className="text-muted-foreground">Tidak ada data peserta</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Files Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            File Terupload
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <div className="font-medium text-gray-900">Surat Pernyataan Orisinalitas</div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                        ✓ Terupload
                                    </Badge>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a
                                            href={route('admin.films.download', film.id)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="font-medium text-gray-900">Poster Film</div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                        ✓ Terupload
                                    </Badge>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a
                                            href={route('admin.films.download-poster', film.id)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                                {film.poster_file && (
                                    <div className="h-32 w-full overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={`/storage/${film.poster_file}`}
                                            alt="Poster film"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="font-medium text-gray-900">Backdrop Film</div>
                                {film.backdrop_file ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                                ✓ Terupload
                                            </Badge>
                                            <Button variant="ghost" size="sm" asChild>
                                                <a
                                                    href={route('admin.films.download-backdrop', film.id)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                        <div className="h-32 w-full overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={`/storage/${film.backdrop_file}`}
                                                alt="Backdrop film"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <Badge variant="outline" className="bg-gray-50 text-gray-500">
                                        Tidak ada
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Verification Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Verifikasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            {film.verified_by_user_id ? (
                                <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                                        >
                                            <AlertTriangle className="mr-2 h-4 w-4" />
                                            Batalkan Verifikasi
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-2">
                                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                                                Batalkan Verifikasi Film
                                            </DialogTitle>
                                            <DialogDescription>
                                                Apakah Anda yakin ingin membatalkan verifikasi film "{film.title}"? Film
                                                akan kembali ke status "Menunggu Verifikasi".
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                                                Batal
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={handleReject}
                                                className="bg-amber-600 hover:bg-amber-700"
                                            >
                                                <AlertTriangle className="mr-2 h-4 w-4" />
                                                Batalkan Verifikasi
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Verifikasi Film
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                Verifikasi Film
                                            </DialogTitle>
                                            <DialogDescription>
                                                Apakah Anda yakin ingin memverifikasi film "{film.title}"? Film akan
                                                ditandai sebagai terverifikasi dan dapat diproses lebih lanjut.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
                                                Batal
                                            </Button>
                                            <Button onClick={handleVerify} className="bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Verifikasi Film
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Dialog open={editRankingOpen} onOpenChange={setEditRankingOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Peringkat Film</DialogTitle>
                        <DialogDescription>Masukkan peringkat film (integer, boleh kosong).</DialogDescription>
                    </DialogHeader>
                    <div className="py-2">
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={ranking}
                            onChange={(e) => setRanking(e.target.value === '' ? '' : parseInt(e.target.value))}
                            placeholder="Peringkat (misal: 1, 2, 3)"
                            min={1}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setEditRankingOpen(false)} disabled={saving}>
                            Batal
                        </Button>
                        <Button onClick={handleSaveRanking} disabled={saving}>
                            {saving ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
