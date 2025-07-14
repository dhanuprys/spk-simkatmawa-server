import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Award, Calendar, Edit, Plus, Ticket, Users } from 'lucide-react';

interface EventYearsIndexProps {
    event_years: {
        data: any[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function EventYearsIndex({ event_years }: EventYearsIndexProps) {
    return (
        <AdminLayout title="Tahun Event" description="Kelola tahun event festival">
            <Head title="Tahun Event - NITISARA Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Tahun Event</h1>
                        <p className="text-muted-foreground">Kelola tahun event festival NITISARA</p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.event-years.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Tahun Event
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Tahun Event</CardTitle>
                        <CardDescription>Total {event_years.total} tahun event</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {event_years.data.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {event_years.data.map((eventYear) => {
                                    const now = new Date();
                                    const showStart = new Date(eventYear.show_start);
                                    const showEnd = new Date(eventYear.show_end);
                                    const isOngoing = now >= showStart && now <= showEnd;
                                    return (
                                        <div
                                            key={eventYear.id}
                                            className={`group flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md ${isOngoing ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-200'}`}
                                        >
                                            <div className="mb-2 flex items-center gap-3">
                                                <span className="flex items-center gap-2 text-lg font-bold">
                                                    {eventYear.title}{' '}
                                                    <span className="text-base font-normal text-gray-500">
                                                        ({eventYear.year})
                                                    </span>
                                                    {isOngoing && (
                                                        <Badge className="animate-pulse border-green-200 bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                                            Sedang Berlangsung
                                                        </Badge>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="mb-2 text-sm text-gray-700">
                                                {eventYear.description || (
                                                    <span className="text-gray-400 italic">Tidak ada deskripsi</span>
                                                )}
                                            </div>
                                            <div className="mb-2 flex flex-wrap gap-3 text-sm">
                                                <span className="flex items-center gap-1 font-medium text-blue-700">
                                                    <Award className="h-4 w-4" />
                                                    {eventYear.categories_count ?? 0} Kategori
                                                </span>
                                                <span className="flex items-center gap-1 font-medium text-purple-700">
                                                    <Users className="h-4 w-4" />
                                                    {eventYear.participants_count} Peserta
                                                </span>
                                                <span className="flex items-center gap-1 font-medium text-orange-600">
                                                    <Ticket className="h-4 w-4" />
                                                    {eventYear.ticket_stats?.unused ?? 0} Tiket Tersedia
                                                </span>
                                            </div>
                                            <div className="mb-3 flex flex-col gap-1 text-xs text-gray-500">
                                                <span>
                                                    Pendaftaran:{' '}
                                                    {new Date(eventYear.registration_start).toLocaleDateString('id-ID')}{' '}
                                                    - {new Date(eventYear.registration_end).toLocaleDateString('id-ID')}
                                                </span>
                                                <span>
                                                    Tampilkan:{' '}
                                                    {new Date(eventYear.show_start).toLocaleDateString('id-ID')} -{' '}
                                                    {new Date(eventYear.show_end).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="mt-auto flex gap-2">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="w-full font-semibold"
                                                    variant="secondary"
                                                >
                                                    <Link href={route('admin.event-years.show', eventYear.id)}>
                                                        Kelola
                                                    </Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    size="icon"
                                                    variant="ghost"
                                                    className="border border-gray-200"
                                                >
                                                    <Link
                                                        href={route('admin.event-years.edit', eventYear.id)}
                                                        title="Edit Tahun Event"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Calendar className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <h3 className="mb-2 text-lg font-medium">Tidak ada tahun event</h3>
                                <p className="text-muted-foreground">Belum ada tahun event yang dibuat.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
