import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { BarChart3, FileVideo, TrendingUp, Users } from 'lucide-react';

interface StatisticsProps {
    participants_by_month: any[];
    films_by_category: any[];
    verification_stats: {
        participants: {
            pending: number;
            verified: number;
        };
        films: {
            pending: number;
            verified: number;
        };
    };
}

export default function Statistics({ participants_by_month, films_by_category, verification_stats }: StatisticsProps) {
    return (
        <AdminLayout title="Statistik" description="Statistik festival film NITISARA">
            <Head title="Statistik - NITISARA Admin" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Statistik</h1>
                    <p className="text-muted-foreground">Analisis data festival film NITISARA</p>
                </div>

                {/* Verification Stats */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Statistik Peserta
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Terverifikasi</span>
                                    <span className="text-2xl font-bold text-green-600">
                                        {verification_stats.participants.verified}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Menunggu Verifikasi</span>
                                    <span className="text-2xl font-bold text-orange-600">
                                        {verification_stats.participants.pending}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Total</span>
                                    <span className="text-2xl font-bold">
                                        {verification_stats.participants.verified +
                                            verification_stats.participants.pending}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileVideo className="h-5 w-5" />
                                Statistik Film
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Terverifikasi</span>
                                    <span className="text-2xl font-bold text-green-600">
                                        {verification_stats.films.verified}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Menunggu Verifikasi</span>
                                    <span className="text-2xl font-bold text-orange-600">
                                        {verification_stats.films.pending}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Total</span>
                                    <span className="text-2xl font-bold">
                                        {verification_stats.films.verified + verification_stats.films.pending}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Films by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle>Film per Kategori</CardTitle>
                        <CardDescription>Distribusi film berdasarkan kategori</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {films_by_category.length > 0 ? (
                            <div className="space-y-4">
                                {films_by_category.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary h-4 w-4 rounded-full"></div>
                                            <span className="font-medium">{category.name}</span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">
                                            {category.participants_count} film
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-6 text-center">
                                <BarChart3 className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                                <p className="text-muted-foreground text-sm">Belum ada data kategori film</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Participants by Month */}
                <Card>
                    <CardHeader>
                        <CardTitle>Peserta per Bulan</CardTitle>
                        <CardDescription>Tren pendaftaran peserta sepanjang tahun</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {participants_by_month.length > 0 ? (
                            <div className="space-y-4">
                                {participants_by_month.map((item) => (
                                    <div
                                        key={item.month}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                                            <span className="font-medium">
                                                {new Date(2024, item.month - 1).toLocaleDateString('id-ID', {
                                                    month: 'long',
                                                })}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">{item.count} peserta</span>
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
            </div>
        </AdminLayout>
    );
}
