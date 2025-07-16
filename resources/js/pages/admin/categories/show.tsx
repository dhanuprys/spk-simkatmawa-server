import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, FileText, Heart, Star, Users } from 'lucide-react';

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

interface Participant {
    id: number;
    team_name: string;
    leader_name: string;
    city: string;
    company: string;
    verification_status: string;
    verified_at?: string;
    created_at: string;
}

interface EventYear {
    id: number;
    year: number;
    title: string;
    show_start: string;
    show_end: string;
}

interface Category {
    id: number;
    name: string;
    is_active: boolean;
    event_year_id: number;
    created_at: string;
    updated_at: string;
    eventYear: EventYear;
    participants: Participant[];
    films: Film[];
    total_films: number;
    verified_films_count: number;
    pending_films_count: number;
    ranked_films_count: number;
    total_votes: number;
}

interface Props {
    category: Category;
}

export default function CategoryShow({ category }: Props) {
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

    const formatVoteCount = (count: number) => {
        if (count === 0) return '0';
        if (count < 1000) return count.toString();
        if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
        return `${(count / 1000000).toFixed(1)}M`;
    };

    const getVerificationStatus = (isVerified: boolean) => {
        if (!isVerified) return { text: 'Menunggu', variant: 'secondary' as const };
        return { text: 'Terverifikasi', variant: 'default' as const };
    };

    const getParticipantStatus = (status: string) => {
        if (status === 'approved') return { text: 'Disetujui', variant: 'default' as const };
        if (status === 'pending') return { text: 'Menunggu', variant: 'secondary' as const };
        return { text: 'Ditolak', variant: 'destructive' as const };
    };

    return (
        <AdminLayout title={`Kategori: ${category.name}`} description="Detail kategori dan film">
            <Head title={`${category.name} - NITISARA Admin`} />

            <div className="space-y-8">
                {/* Header & Navigation */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.event-years.show', category.event_year_id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Event
                            </Link>
                        </Button>
                        <div>
                            <h1 className="flex items-center gap-2 text-2xl font-bold">
                                {category.name}
                                <Badge variant={category.is_active ? 'default' : 'outline'}>
                                    {category.is_active ? 'Aktif' : 'Nonaktif'}
                                </Badge>
                            </h1>
                            <p className="text-muted-foreground">
                                Kategori dalam <span className="font-semibold">{category.eventYear?.title ?? '-'}</span>
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.event-years.categories.edit', [category.event_year_id, category.id])}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Kategori
                        </Link>
                    </Button>
                </div>

                {/* Stats Card */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card className="col-span-1 flex flex-col items-center justify-center p-4">
                        <FileText className="mb-1 h-6 w-6 text-blue-500" />
                        <span className="text-muted-foreground text-sm">Total Film</span>
                        <span className="text-2xl font-bold">{category.total_films}</span>
                    </Card>
                    <Card className="col-span-1 flex flex-col items-center justify-center p-4">
                        <Badge variant="default" className="mb-1 flex h-5 w-5 items-center justify-center p-0">
                            <Star className="h-4 w-4 text-green-500" />
                        </Badge>
                        <span className="text-muted-foreground text-sm">Terverifikasi</span>
                        <span className="text-2xl font-bold">{category.verified_films_count}</span>
                    </Card>
                    <Card className="col-span-1 flex flex-col items-center justify-center p-4">
                        <Badge variant="secondary" className="mb-1 flex h-5 w-5 items-center justify-center p-0">
                            <Star className="h-4 w-4 text-yellow-500" />
                        </Badge>
                        <span className="text-muted-foreground text-sm">Menunggu</span>
                        <span className="text-2xl font-bold">{category.pending_films_count}</span>
                    </Card>
                    <Card className="col-span-1 flex flex-col items-center justify-center p-4">
                        <Star className="mb-1 h-6 w-6 text-yellow-500" />
                        <span className="text-muted-foreground text-sm">Berperingkat</span>
                        <span className="text-2xl font-bold">{category.ranked_films_count}</span>
                    </Card>
                    <Card className="col-span-1 flex flex-col items-center justify-center p-4">
                        <Heart className="mb-1 h-6 w-6 text-red-500" />
                        <span className="text-muted-foreground text-sm">Total Vote</span>
                        <span className="text-2xl font-bold">{formatVoteCount(category.total_votes)}</span>
                    </Card>
                </div>

                {/* Film List Section */}
                <section>
                    <div className="mb-2 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-xl font-semibold">
                            <FileText className="h-5 w-5" /> Daftar Film
                        </h2>
                        <span className="text-muted-foreground text-sm">
                            Semua film yang di-submit dalam kategori{' '}
                            <span className="font-semibold">{category.name}</span>
                        </span>
                    </div>
                    {category.films.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {category.films.map((film) => (
                                <Card key={film.id} className="flex h-full flex-col justify-between">
                                    <CardContent className="flex h-full flex-col gap-2 p-4">
                                        <div className="mb-1 flex items-center gap-2">
                                            <h4 className="line-clamp-1 text-lg font-semibold">{film.title}</h4>
                                            {film.ranking ? (
                                                <Badge className="bg-yellow-500 text-white">
                                                    <Star className="mr-1 h-3 w-3" />#{film.ranking}
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-muted-foreground">
                                                    No Rank
                                                </Badge>
                                            )}
                                            <Badge variant={getVerificationStatus(film.is_verified).variant}>
                                                {getVerificationStatus(film.is_verified).text}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground mb-1 line-clamp-2 text-sm">
                                            {film.synopsis}
                                        </p>
                                        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                                            <Users className="h-3 w-3" />
                                            <span>{film.participant.team_name}</span>
                                            <span>•</span>
                                            <span>
                                                {film.participant.city}, {film.participant.company}
                                            </span>
                                            <span>• Ketua: {film.participant.leader_name}</span>
                                        </div>
                                        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
                                            <span>Dibuat: {formatShortDate(film.created_at)}</span>
                                            {film.verified_at && (
                                                <span>Diverifikasi: {formatDateTime(film.verified_at)}</span>
                                            )}
                                            {film.verified_by && <span>Oleh: {film.verified_by.name}</span>}
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Heart className="h-4 w-4 text-red-500" />
                                                <span className="font-semibold">
                                                    {formatVoteCount(film.vote_count)}
                                                </span>
                                                <span className="text-muted-foreground text-sm">vote</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={route('admin.films.show', film.id)}>Lihat Detail</Link>
                                                </Button>
                                                {(film.film_url || film.direct_video_url) && (
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a
                                                            href={film.direct_video_url || film.film_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Tonton Film
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted-foreground py-8 text-center">
                            <FileText className="text-muted-foreground/60 mx-auto mb-2 h-8 w-8" />
                            <p>Belum ada film dalam kategori ini.</p>
                        </div>
                    )}
                </section>

                {/* Participants List Section */}
                <section>
                    <div className="mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Peserta dalam Kategori</h2>
                    </div>
                    {category.participants.length > 0 ? (
                        <div className="space-y-3">
                            {category.participants.map((participant) => (
                                <Card
                                    key={participant.id}
                                    className="flex flex-col p-4 md:flex-row md:items-center md:justify-between"
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
                                    <div className="mt-2 flex items-center gap-2 md:mt-0">
                                        <Badge variant={getParticipantStatus(participant.verification_status).variant}>
                                            {getParticipantStatus(participant.verification_status).text}
                                        </Badge>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={route('admin.participants.show', participant.id)}>
                                                Lihat Detail
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted-foreground py-8 text-center">
                            <Users className="text-muted-foreground/60 mx-auto mb-2 h-8 w-8" />
                            <p>Belum ada peserta dalam kategori ini.</p>
                        </div>
                    )}
                </section>
            </div>
        </AdminLayout>
    );
}
