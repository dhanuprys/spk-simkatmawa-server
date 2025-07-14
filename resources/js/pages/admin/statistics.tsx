import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Activity, Award, Calendar, CheckCircle, Clock, FileVideo, PieChart, TrendingUp, Users } from 'lucide-react';

interface StatisticsProps {
    participants_by_month: any[];
    films_by_month: any[];
    films_by_category: any[];
    verification_stats: {
        participants: {
            pending: number;
            verified: number;
            total: number;
        };
        films: {
            pending: number;
            verified: number;
            total: number;
        };
    };
    event_years_stats: any[];
    recent_activity: {
        new_participants: number;
        new_films: number;
        verified_participants: number;
        verified_films: number;
    };
    overall_stats: {
        total_participants: number;
        total_films: number;
        total_categories: number;
        total_event_years: number;
        total_users: number;
        avg_films_per_participant: number;
    };
    current_year: number;
}

export default function Statistics({
    participants_by_month,
    films_by_month,
    films_by_category,
    verification_stats,
    event_years_stats,
    recent_activity,
    overall_stats,
    current_year,
}: StatisticsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open':
                return <Badge className="bg-green-100 text-green-800">Terbuka</Badge>;
            case 'coming_soon':
                return <Badge className="bg-blue-100 text-blue-800">Segera Dibuka</Badge>;
            case 'ended':
                return <Badge className="bg-gray-100 text-gray-800">Berakhir</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <AdminLayout title="Statistik" description="Statistik komprehensif festival film NITISARA">
            <Head title="Statistik - NITISARA Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Statistik Festival</h1>
                    <p className="text-muted-foreground">
                        Analisis data komprehensif festival film NITISARA {current_year}
                    </p>
                </div>

                {/* Overall Statistics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overall_stats.total_participants}</div>
                            <p className="text-muted-foreground text-xs">Seluruh periode festival</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Film</CardTitle>
                            <FileVideo className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overall_stats.total_films}</div>
                            <p className="text-muted-foreground text-xs">
                                Rata-rata {overall_stats.avg_films_per_participant} film per peserta
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kategori Aktif</CardTitle>
                            <Award className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overall_stats.total_categories}</div>
                            <p className="text-muted-foreground text-xs">Kategori film yang tersedia</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tahun Event</CardTitle>
                            <Calendar className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overall_stats.total_event_years}</div>
                            <p className="text-muted-foreground text-xs">Periode festival yang telah dibuat</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overall_stats.total_users}</div>
                            <p className="text-muted-foreground text-xs">Pengguna admin sistem</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Aktivitas 30 Hari</CardTitle>
                            <Activity className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {recent_activity.new_participants + recent_activity.new_films}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                {recent_activity.new_participants} peserta baru, {recent_activity.new_films} film baru
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Verification Statistics */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Statistik Verifikasi Peserta
                            </CardTitle>
                            <CardDescription>Status verifikasi peserta festival</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm font-medium">Terverifikasi</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600">
                                        {verification_stats.participants.verified}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-orange-600" />
                                        <span className="text-sm font-medium">Menunggu Verifikasi</span>
                                    </div>
                                    <span className="text-2xl font-bold text-orange-600">
                                        {verification_stats.participants.pending}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-t pt-2">
                                    <span className="text-sm font-medium">Total Peserta</span>
                                    <span className="text-xl font-bold">{verification_stats.participants.total}</span>
                                </div>
                                <div className="text-muted-foreground mt-2 text-xs">
                                    Tingkat verifikasi:{' '}
                                    {verification_stats.participants.total > 0
                                        ? Math.round(
                                              (verification_stats.participants.verified /
                                                  verification_stats.participants.total) *
                                                  100,
                                          )
                                        : 0}
                                    %
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileVideo className="h-5 w-5" />
                                Statistik Verifikasi Film
                            </CardTitle>
                            <CardDescription>Status verifikasi film yang diunggah</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm font-medium">Terverifikasi</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600">
                                        {verification_stats.films.verified}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-orange-600" />
                                        <span className="text-sm font-medium">Menunggu Verifikasi</span>
                                    </div>
                                    <span className="text-2xl font-bold text-orange-600">
                                        {verification_stats.films.pending}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-t pt-2">
                                    <span className="text-sm font-medium">Total Film</span>
                                    <span className="text-xl font-bold">{verification_stats.films.total}</span>
                                </div>
                                <div className="text-muted-foreground mt-2 text-xs">
                                    Tingkat verifikasi:{' '}
                                    {verification_stats.films.total > 0
                                        ? Math.round(
                                              (verification_stats.films.verified / verification_stats.films.total) *
                                                  100,
                                          )
                                        : 0}
                                    %
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Event Years Statistics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Statistik Tahun Event
                        </CardTitle>
                        <CardDescription>Performa setiap tahun event festival</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {event_years_stats.length > 0 ? (
                            <div className="space-y-4">
                                {event_years_stats.map((eventYear) => (
                                    <div
                                        key={eventYear.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-3">
                                                <h3 className="font-semibold text-gray-900">{eventYear.title}</h3>
                                                {eventYear.is_active && (
                                                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                                                )}
                                                {getStatusBadge(eventYear.submission_status)}
                                            </div>
                                            <div className="text-muted-foreground grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="font-medium">Periode Show:</span>{' '}
                                                    {formatDate(eventYear.show_start)} -{' '}
                                                    {formatDate(eventYear.show_end)}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Submit Film:</span>{' '}
                                                    {formatDate(eventYear.submission_start_date)} -{' '}
                                                    {formatDate(eventYear.submission_end_date)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {eventYear.participants_count}
                                            </div>
                                            <div className="text-muted-foreground text-sm">Peserta</div>
                                            <div className="text-lg font-semibold text-green-600">
                                                {eventYear.films_count}
                                            </div>
                                            <div className="text-muted-foreground text-sm">Film</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-6 text-center">
                                <Calendar className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                                <p className="text-muted-foreground text-sm">Belum ada data tahun event</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Films by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5" />
                            Film per Kategori
                        </CardTitle>
                        <CardDescription>Distribusi film berdasarkan kategori festival</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {films_by_category.length > 0 ? (
                            <div className="space-y-4">
                                {films_by_category.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary h-4 w-4 rounded-full"></div>
                                            <div>
                                                <span className="font-medium">{category.name}</span>
                                                <div className="text-muted-foreground text-sm">
                                                    {category.total_participants} peserta terdaftar
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-blue-600">
                                                {category.total_films}
                                            </div>
                                            <div className="text-muted-foreground text-sm">film</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-6 text-center">
                                <PieChart className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                                <p className="text-muted-foreground text-sm">Belum ada data kategori film</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Monthly Trends */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Participants by Month */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Peserta per Bulan ({current_year})
                            </CardTitle>
                            <CardDescription>Tren pendaftaran peserta sepanjang tahun</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {participants_by_month.length > 0 ? (
                                <div className="space-y-3">
                                    {participants_by_month.map((item) => (
                                        <div
                                            key={item.month}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                                                <span className="font-medium">
                                                    {new Date(current_year, item.month - 1).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            month: 'long',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-blue-600">{item.count}</div>
                                                <div className="text-muted-foreground text-sm">peserta</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-6 text-center">
                                    <TrendingUp className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                                    <p className="text-muted-foreground text-sm">Belum ada data peserta per bulan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Films by Month */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileVideo className="h-5 w-5" />
                                Film per Bulan ({current_year})
                            </CardTitle>
                            <CardDescription>Tren pengunggahan film sepanjang tahun</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {films_by_month.length > 0 ? (
                                <div className="space-y-3">
                                    {films_by_month.map((item) => (
                                        <div
                                            key={item.month}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                                <span className="font-medium">
                                                    {new Date(current_year, item.month - 1).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            month: 'long',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-green-600">{item.count}</div>
                                                <div className="text-muted-foreground text-sm">film</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-6 text-center">
                                    <FileVideo className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                                    <p className="text-muted-foreground text-sm">Belum ada data film per bulan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Aktivitas Terbaru (30 Hari Terakhir)
                        </CardTitle>
                        <CardDescription>Ringkasan aktivitas sistem dalam 30 hari terakhir</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {recent_activity.new_participants}
                                </div>
                                <div className="text-muted-foreground text-sm">Peserta Baru</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{recent_activity.new_films}</div>
                                <div className="text-muted-foreground text-sm">Film Baru</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {recent_activity.verified_participants}
                                </div>
                                <div className="text-muted-foreground text-sm">Peserta Diverifikasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {recent_activity.verified_films}
                                </div>
                                <div className="text-muted-foreground text-sm">Film Diverifikasi</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
