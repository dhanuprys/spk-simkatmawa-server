import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, CheckCircle, Clock, Eye, FileVideo, Star, TrendingUp, Users, X } from 'lucide-react';

interface DashboardProps {
    stats: {
        total_participants: number;
        pending_participants: number;
        approved_participants: number;
        rejected_participants: number;
        total_films: number;
        pending_films: number;
        verified_films: number;
        total_categories: number;
        total_event_years: number;
        total_users: number;
    };
    recent_participants: any[];
    recent_films: any[];
    categories: any[];
    event_years: any[];
}

export default function Dashboard({
    stats,
    recent_participants,
    recent_films,
    categories,
    event_years,
}: DashboardProps) {
    const statCards = [
        {
            title: 'Total Peserta',
            value: stats.total_participants,
            icon: Users,
            description: `${stats.approved_participants} disetujui`,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            href: route('admin.participants.index'),
        },
        {
            title: 'Total Film',
            value: stats.total_films,
            icon: FileVideo,
            description: `${stats.verified_films} terverifikasi`,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            href: route('admin.films.index'),
        },
        // {
        //     title: 'Kategori',
        //     value: stats.total_categories,
        //     icon: Award,
        //     description: 'Kategori film',
        //     color: 'text-purple-600',
        //     bgColor: 'bg-purple-50',
        //     href: route('admin.categories.index'),
        // },
        {
            title: 'Tahun Event',
            value: stats.total_event_years,
            icon: Calendar,
            description: 'Event tahunan',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            href: route('admin.event-years.index'),
        },
    ];

    return (
        <AdminLayout title="Dashboard" description="Ringkasan festival film NITISARA">
            <Head title="Dashboard - NITISARA Admin" />

            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Selamat Datang di Panel Admin NITISARA</h2>
                <p className="mt-2 text-gray-600">Kelola festival film dengan mudah dan efisien</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card) => (
                    <Card key={card.title} className="cursor-pointer transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <div className={`rounded-lg p-2 ${card.bgColor}`}>
                                <card.icon className={`h-4 w-4 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-muted-foreground text-xs">{card.description}</p>
                        </CardContent>
                        <Link href={card.href} className="absolute inset-0" />
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Participants */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Peserta Terbaru
                        </CardTitle>
                        <CardDescription>Peserta yang baru mendaftar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recent_participants && recent_participants.length > 0 ? (
                                recent_participants.map((participant) => (
                                    <div
                                        key={participant.id}
                                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">
                                                    {participant.team_name}
                                                </span>
                                                <span className="text-muted-foreground text-sm">
                                                    {participant.leader_name} • {participant.city}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {participant.verification_status === 'approved' ? (
                                                <Badge variant="default" className="bg-green-100 text-green-800">
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Disetujui
                                                </Badge>
                                            ) : participant.verification_status === 'rejected' ? (
                                                <Badge variant="default" className="bg-red-100 text-red-800">
                                                    <X className="mr-1 h-3 w-3" />
                                                    Ditolak
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    Menunggu
                                                </Badge>
                                            )}
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.participants.show', participant.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center">
                                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada peserta</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Peserta yang mendaftar akan muncul di sini.
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('admin.participants.index')}>Lihat Semua Peserta</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Films */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileVideo className="h-5 w-5" />
                            Film Terbaru
                        </CardTitle>
                        <CardDescription>Film yang baru diunggah</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recent_films && recent_films.length > 0 ? (
                                recent_films.map((film) => (
                                    <div
                                        key={film.id}
                                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">
                                                    {film.title || `Film #${film.id}`}
                                                </span>
                                                <span className="text-muted-foreground text-sm">
                                                    {film.participant?.team_name || 'Peserta tidak ditemukan'}
                                                </span>
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
                                                    Menunggu
                                                </Badge>
                                            )}
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.films.show', film.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center">
                                    <FileVideo className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada film</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Film yang diunggah akan muncul di sini.
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('admin.films.index')}>Lihat Semua Film</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                        <CardDescription>Akses cepat ke fitur-fitur utama</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" asChild className="h-auto flex-col p-4 hover:bg-blue-50">
                                <Link href={route('admin.participants.index')}>
                                    <Users className="mb-2 h-6 w-6 text-blue-600" />
                                    <span>Kelola Peserta</span>
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="h-auto flex-col p-4 hover:bg-green-50">
                                <Link href={route('admin.films.index')}>
                                    <FileVideo className="mb-2 h-6 w-6 text-green-600" />
                                    <span>Kelola Film</span>
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="h-auto flex-col p-4 hover:bg-purple-50">
                                <Link href={route('admin.statistics')}>
                                    <TrendingUp className="mb-2 h-6 w-6 text-purple-600" />
                                    <span>Lihat Statistik</span>
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="h-auto flex-col p-4 hover:bg-orange-50">
                                <Link href={route('admin.settings.index')}>
                                    <Star className="mb-2 h-6 w-6 text-orange-600" />
                                    <span>Pengaturan</span>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
