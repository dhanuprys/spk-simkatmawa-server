import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    Calendar,
    CalendarDays,
    Download,
    Edit,
    FileText,
    Heart,
    Plus,
    Star,
    Ticket,
    Trash2,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Participant {
    id: number;
    team_name: string;
    leader_name: string;
    city: string;
    company: string;
    verification_status: string;
    status: string;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
    is_active: boolean;
    participants_count?: number;
}

interface Film {
    id: number;
    title: string;
    synopsis: string;
    film_url: string;
    direct_video_url?: string;
    is_verified: boolean;
    verified_at?: string;
    ranking?: number;
    created_at: string;
    participant: {
        id: number;
        team_name: string;
        leader_name: string;
        city: string;
        company: string;
    };
    verified_by?: {
        id: number;
        name: string;
    };
    vote_count: number;
}

interface TopFilm extends Film {}

interface FilmsByCategory {
    id: number;
    name: string;
    is_active: boolean;
    participants_count: number;
    films: Film[];
    total_films: number;
    verified_films_count: number;
    pending_films_count: number;
}

interface FavoriteFilmsByCategory extends FilmsByCategory {
    top_films: TopFilm[];
}

interface EventYear {
    id: number;
    year: number;
    title: string;
    description: string;
    registration_start: string;
    registration_end: string;
    submission_start_date: string;
    submission_end_date: string;
    show_start: string;
    show_end: string;
    event_guide_document: string | null;
    participants_count: number;
    participants: Participant[];
    categories: Category[];
    favorite_films_by_category?: FavoriteFilmsByCategory[];
    created_at: string;
    updated_at: string;
    ticket_stats?: {
        total: number;
        used: number;
        unused: number;
    };
}

interface Props {
    event_year: EventYear;
}

export default function EventYearShow({ event_year }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (startDate: string, endDate: string) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) return 'secondary'; // Upcoming
        if (now >= start && now <= end) return 'default'; // Active
        return 'destructive'; // Ended
    };

    const getStatusText = (startDate: string, endDate: string) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) return 'Akan Datang';
        if (now >= start && now <= end) return 'Berlangsung';
        return 'Selesai';
    };

    const formatVoteCount = (count: number) => {
        if (count === 0) return '0';
        if (count < 1000) return count.toString();
        if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
        return `${(count / 1000000).toFixed(1)}M`;
    };

    const formatShortDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getVerificationStatus = (isVerified: boolean, verifiedAt?: string) => {
        if (!isVerified) return { text: 'Pending', variant: 'secondary' as const };
        return { text: 'Terverifikasi', variant: 'default' as const };
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteDialog = (category: Category) => {
        setCategoryToDelete(category);
        setIsDialogOpen(true);
    };

    const handleDeleteCategory = () => {
        if (!categoryToDelete) return;

        setIsDeleting(true);
        router.delete(route('admin.event-years.categories.destroy', [event_year.id, categoryToDelete.id]), {
            onSuccess: () => {
                setIsDeleting(false);
                setIsDialogOpen(false);
                setCategoryToDelete(null);
            },
            onError: (errors) => {
                setIsDeleting(false);
                console.error('Error deleting category:', errors);
                // Optionally, show a toast or error message
            },
        });
    };

    return (
        <AdminLayout title={`Tahun Event: ${event_year.title}`} description="Detail tahun event">
            <Head title={`${event_year.title} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.event-years.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{event_year.title}</h1>
                            <p className="text-muted-foreground">Detail tahun event</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('admin.event-years.edit', event_year.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Event Info */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Informasi Event
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <p className="text-sm font-medium">Tahun Event</p>
                                        <p className="text-muted-foreground text-sm">{event_year.year}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <p className="text-sm font-medium">Tampilkan Mulai</p>
                                        <p className="text-muted-foreground text-sm">
                                            {formatDate(event_year.show_start)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <p className="text-sm font-medium">Tampilkan Sampai</p>
                                        <p className="text-muted-foreground text-sm">
                                            {formatDate(event_year.show_end)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {event_year.description && (
                                <div>
                                    <p className="text-muted-foreground text-sm">{event_year.description}</p>
                                </div>
                            )}

                            <div className="grid gap-4">
                                <div className="flex items-center gap-2">
                                    <Users className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <p className="text-sm font-medium">Total Peserta</p>
                                        <p className="text-muted-foreground text-sm">
                                            {event_year.participants_count} peserta
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <p className="text-sm font-medium">Total Kategori</p>
                                        <p className="text-muted-foreground text-sm">
                                            {event_year.categories?.length || 0} kategori
                                        </p>
                                    </div>
                                </div>
                                {event_year.favorite_films_by_category &&
                                    event_year.favorite_films_by_category.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Heart className="text-muted-foreground h-4 w-4" />
                                            <div>
                                                <p className="text-sm font-medium">Total Film dengan Vote</p>
                                                <p className="text-muted-foreground text-sm">
                                                    {formatVoteCount(
                                                        event_year.favorite_films_by_category.reduce(
                                                            (total, category) =>
                                                                total +
                                                                category.top_films.reduce(
                                                                    (sum, film) => sum + film.vote_count,
                                                                    0,
                                                                ),
                                                            0,
                                                        ),
                                                    )}{' '}
                                                    total vote
                                                </p>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <div className="border-t pt-4">
                                <div className="text-muted-foreground text-xs">
                                    <p>Dibuat: {new Date(event_year.created_at).toLocaleDateString('id-ID')}</p>
                                    <p>Diupdate: {new Date(event_year.updated_at).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                            {event_year.event_guide_document && (
                                <div className="mt-4">
                                    <Button asChild variant="outline" size="sm" className="w-full">
                                        <a
                                            href={route('admin.event-years.download-guide', event_year.id)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Unduh Panduan Event
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Timeline Event</CardTitle>
                            <CardDescription>Jadwal penting tahun event ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                            <Calendar className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Pendaftaran</p>
                                            <p className="text-muted-foreground text-sm">
                                                {formatDate(event_year.registration_start)} -{' '}
                                                {formatDate(event_year.registration_end)}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={getStatusColor(
                                            event_year.registration_start,
                                            event_year.registration_end,
                                        )}
                                    >
                                        {getStatusText(event_year.registration_start, event_year.registration_end)}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                            <Calendar className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Submit Film</p>
                                            <p className="text-muted-foreground text-sm">
                                                {formatDate(event_year.submission_start_date)} -{' '}
                                                {formatDate(event_year.submission_end_date)}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={getStatusColor(
                                            event_year.submission_start_date,
                                            event_year.submission_end_date,
                                        )}
                                    >
                                        {getStatusText(
                                            event_year.submission_start_date,
                                            event_year.submission_end_date,
                                        )}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Category Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>Kategori dalam Event</CardTitle>
                        <CardDescription>Kelola kategori untuk tahun event ini</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {event_year.categories && event_year.categories.length > 0 ? (
                            <div className="grid gap-3">
                                {event_year.categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-colors"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{category.name}</span>
                                                {category.is_active ? (
                                                    <Badge variant="default" className="text-xs">
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-xs">
                                                        Nonaktif
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-muted-foreground flex items-center gap-1 text-sm">
                                                <Users className="h-3 w-3" />
                                                <span>{category.participants_count || 0} peserta</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link
                                                    href={route('admin.event-years.categories.show', [
                                                        event_year.id,
                                                        category.id,
                                                    ])}
                                                >
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    Lihat Film
                                                </Link>
                                            </Button>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link
                                                    href={route('admin.event-years.categories.edit', [
                                                        event_year.id,
                                                        category.id,
                                                    ])}
                                                >
                                                    <Edit className="mr-1 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => openDeleteDialog(category)}
                                                disabled={isDeleting && categoryToDelete?.id === category.id}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-muted-foreground py-8 text-center">
                                <Award className="text-muted-foreground/60 mx-auto mb-2 h-8 w-8" />
                                <p>Belum ada kategori untuk event ini.</p>
                            </div>
                        )}
                        <div className="mt-4">
                            <Button asChild>
                                <Link href={route('admin.event-years.categories.create', event_year.id)}>
                                    Tambah Kategori
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Favorite Films by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Film Favorit per Kategori
                        </CardTitle>
                        <CardDescription>Film dengan voting terbanyak di setiap kategori</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {event_year.favorite_films_by_category && event_year.favorite_films_by_category.length > 0 ? (
                            <div className="space-y-6">
                                {event_year.favorite_films_by_category.map((category) => (
                                    <div key={category.id} className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                                <Badge variant={category.is_active ? 'default' : 'outline'}>
                                                    {category.is_active ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                            </div>
                                            <div className="text-muted-foreground text-sm">
                                                {category.total_films} film • {category.participants_count} peserta
                                            </div>
                                        </div>

                                        {category.top_films.length > 0 ? (
                                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                                                {category.top_films.map((film, index) => (
                                                    <div
                                                        key={film.id}
                                                        className="hover:bg-muted/50 relative rounded-lg border p-4 transition-colors"
                                                    >
                                                        {film.ranking ? (
                                                            <div className="absolute -top-2 -right-2">
                                                                <Badge className="bg-yellow-500 text-white">
                                                                    <Star className="mr-1 h-3 w-3" />#{film.ranking}
                                                                </Badge>
                                                            </div>
                                                        ) : index < 3 ? (
                                                            <div className="absolute -top-2 -right-2">
                                                                <Badge
                                                                    variant={
                                                                        index === 0
                                                                            ? 'default'
                                                                            : index === 1
                                                                              ? 'secondary'
                                                                              : 'outline'
                                                                    }
                                                                >
                                                                    <Star className="mr-1 h-3 w-3" />
                                                                    Top {index + 1}
                                                                </Badge>
                                                            </div>
                                                        ) : null}

                                                        <div className="space-y-3">
                                                            <div>
                                                                <div className="mb-2 flex items-center gap-2">
                                                                    <h4 className="line-clamp-2 font-semibold">
                                                                        {film.title}
                                                                    </h4>
                                                                    <Badge
                                                                        variant={
                                                                            getVerificationStatus(film.is_verified)
                                                                                .variant
                                                                        }
                                                                    >
                                                                        {getVerificationStatus(film.is_verified).text}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-muted-foreground line-clamp-2 text-sm">
                                                                    {film.synopsis}
                                                                </p>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <Users className="text-muted-foreground h-3 w-3" />
                                                                    <span className="text-muted-foreground text-sm">
                                                                        {film.participant.team_name}
                                                                    </span>
                                                                    <span className="text-muted-foreground">•</span>
                                                                    <span className="text-muted-foreground text-sm">
                                                                        {film.participant.city},{' '}
                                                                        {film.participant.company}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-muted-foreground text-sm">
                                                                        Ketua: {film.participant.leader_name}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between border-t pt-2">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center gap-1">
                                                                        <Heart className="h-4 w-4 text-red-500" />
                                                                        <span className="text-lg font-semibold">
                                                                            {formatVoteCount(film.vote_count)}
                                                                        </span>
                                                                        <span className="text-muted-foreground text-sm">
                                                                            vote
                                                                        </span>
                                                                    </div>
                                                                    {film.ranking && (
                                                                        <div className="flex items-center gap-1">
                                                                            <Star className="h-4 w-4 text-yellow-500" />
                                                                            <span className="font-semibold text-yellow-600">
                                                                                #{film.ranking}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <Button variant="ghost" size="sm" asChild>
                                                                    <Link href={route('admin.films.show', film.id)}>
                                                                        Lihat Detail
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-muted-foreground py-8 text-center">
                                                <Heart className="text-muted-foreground/60 mx-auto mb-2 h-8 w-8" />
                                                <p>Belum ada film dalam kategori ini</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-muted-foreground py-8 text-center">
                                <Heart className="text-muted-foreground/60 mx-auto mb-2 h-8 w-8" />
                                <p>Belum ada data film favorit untuk event ini</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Participants List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Peserta dalam Event
                                </CardTitle>
                                <CardDescription>Daftar peserta yang terdaftar dalam event ini</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button asChild>
                                    <Link href={route('admin.event-years.participants.index', event_year.id)}>
                                        <Users className="mr-2 h-4 w-4" />
                                        Lihat Semua Peserta
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.event-years.participants.create', event_year.id)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Peserta
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {event_year.participants.length > 0 ? (
                            <div className="space-y-4">
                                {/* Show only first 5 participants with a "View All" link */}
                                {event_year.participants.slice(0, 5).map((participant) => (
                                    <div
                                        key={participant.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium">{participant.team_name}</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Ketua: {participant.leader_name}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                {participant.city} • {participant.company}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={
                                                    participant.verification_status === 'approved'
                                                        ? 'default'
                                                        : participant.verification_status === 'pending'
                                                          ? 'secondary'
                                                          : 'destructive'
                                                }
                                            >
                                                {participant.verification_status === 'approved'
                                                    ? 'Terverifikasi'
                                                    : participant.verification_status === 'pending'
                                                      ? 'Menunggu'
                                                      : 'Ditolak'}
                                            </Badge>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.participants.show', participant.id)}>
                                                    Lihat Detail
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {event_year.participants.length > 5 && (
                                    <div className="pt-4 text-center">
                                        <Button variant="outline" asChild>
                                            <Link href={route('admin.event-years.participants.index', event_year.id)}>
                                                Lihat {event_year.participants.length - 5} peserta lainnya
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <p className="text-muted-foreground mb-4">Belum ada peserta dalam event ini</p>
                                <Button asChild>
                                    <Link href={route('admin.event-years.participants.create', event_year.id)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Peserta Pertama
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Ticket Management */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ticket className="h-5 w-5" />
                            Manajemen Tiket
                        </CardTitle>
                        <CardDescription>Kelola tiket voting untuk event ini</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {event_year.ticket_stats ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="text-muted-foreground h-4 w-4" />
                                            <span className="text-sm font-medium">Total Tiket</span>
                                        </div>
                                        <p className="text-2xl font-bold">{event_year.ticket_stats.total}</p>
                                    </div>
                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="h-4 w-4 text-green-600" />
                                            <span className="text-sm font-medium">Tiket Digunakan</span>
                                        </div>
                                        <p className="text-2xl font-bold text-green-600">
                                            {event_year.ticket_stats.used}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm font-medium">Tiket Belum Digunakan</span>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {event_year.ticket_stats.unused}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Button asChild>
                                        <Link href={route('admin.event-years.tickets.index', event_year.id)}>
                                            <Ticket className="mr-2 h-4 w-4" />
                                            Lihat Semua Tiket
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href={route('admin.event-years.tickets.create', event_year.id)}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Buat Tiket Baru
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href={route('admin.event-years.tickets.export', event_year.id)}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Export CSV
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Ticket className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <p className="text-muted-foreground mb-4">Belum ada tiket untuk event ini</p>
                                <Button asChild>
                                    <Link href={route('admin.event-years.tickets.create', event_year.id)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Buat Tiket Pertama
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                    if (!isDeleting) {
                        setIsDialogOpen(open);
                        if (!open) setCategoryToDelete(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Kategori</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus kategori{' '}
                            <span className="font-semibold">{categoryToDelete?.name}</span>?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-3">
                        <p className="text-destructive text-sm">
                            Perhatian: Semua peserta yang terdaftar dalam kategori ini juga akan terhapus.
                        </p>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteCategory} disabled={isDeleting}>
                            {isDeleting ? 'Menghapus...' : 'Hapus Kategori'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
