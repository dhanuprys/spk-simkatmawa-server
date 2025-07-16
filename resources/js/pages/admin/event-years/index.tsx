import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, CheckCircle, Clock, Edit, Eye, Plus, X } from 'lucide-react';

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
    const getEventStatus = (eventYear: any) => {
        const now = new Date();
        const showStart = new Date(eventYear.show_start);
        const showEnd = new Date(eventYear.show_end);
        const registrationStart = new Date(eventYear.registration_start);
        const registrationEnd = new Date(eventYear.registration_end);

        if (now >= showStart && now <= showEnd) {
            return {
                status: 'ongoing',
                text: 'Sedang Berlangsung',
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: CheckCircle,
            };
        } else if (now < registrationStart) {
            return {
                status: 'upcoming',
                text: 'Akan Datang',
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: Clock,
            };
        } else if (now >= registrationStart && now <= registrationEnd) {
            return {
                status: 'registration',
                text: 'Pendaftaran',
                color: 'bg-orange-100 text-orange-800 border-orange-200',
                icon: Calendar,
            };
        } else if (now > showEnd) {
            return { status: 'ended', text: 'Selesai', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: X };
        } else {
            return {
                status: 'preparation',
                text: 'Persiapan',
                color: 'bg-purple-100 text-purple-800 border-purple-200',
                icon: Clock,
            };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AdminLayout title="Tahun Event" description="Kelola tahun event festival">
            <Head title="Tahun Event - NITISARA Admin" />

            <div className="space-y-6">
                {/* Header */}
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

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Event</p>
                                    <p className="text-2xl font-bold">{event_years.total}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Sedang Berlangsung</p>
                                    <p className="text-2xl font-bold">
                                        {
                                            event_years.data.filter((e) => {
                                                const now = new Date();
                                                const start = new Date(e.show_start);
                                                const end = new Date(e.show_end);
                                                return now >= start && now <= end;
                                            }).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-orange-100 p-2">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Akan Datang</p>
                                    <p className="text-2xl font-bold">
                                        {
                                            event_years.data.filter((e) => {
                                                const now = new Date();
                                                const start = new Date(e.registration_start);
                                                return now < start;
                                            }).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-gray-100 p-2">
                                    <X className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Selesai</p>
                                    <p className="text-2xl font-bold">
                                        {
                                            event_years.data.filter((e) => {
                                                const now = new Date();
                                                const end = new Date(e.show_end);
                                                return now > end;
                                            }).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Event Years List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Tahun Event</CardTitle>
                        <CardDescription>Total {event_years.total} tahun event</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {event_years.data.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {event_years.data.map((eventYear) => {
                                    const status = getEventStatus(eventYear);
                                    const StatusIcon = status.icon;

                                    return (
                                        <div
                                            key={eventYear.id}
                                            className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                                        >
                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4">
                                                <Badge className={`${status.color} border text-xs font-medium`}>
                                                    <StatusIcon className="mr-1 h-3 w-3" />
                                                    {status.text}
                                                </Badge>
                                            </div>

                                            {/* Event Title */}
                                            <div className="mb-4 pr-20">
                                                <h3 className="text-xl font-bold text-gray-900">{eventYear.title}</h3>
                                                <p className="text-sm text-gray-500">Tahun {eventYear.year}</p>
                                            </div>

                                            {/* Description */}
                                            <div className="mb-4">
                                                <p className="line-clamp-2 text-sm text-gray-600">
                                                    {eventYear.description || 'Tidak ada deskripsi'}
                                                </p>
                                            </div>

                                            {/* Stats */}
                                            <div className="mb-4 grid grid-cols-3 gap-3">
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-blue-600">
                                                        {eventYear.categories_count ?? 0}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Kategori</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-purple-600">
                                                        {eventYear.participants_count}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Peserta</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-orange-600">
                                                        {eventYear.ticket_stats?.unused ?? 0}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Tiket</div>
                                                </div>
                                            </div>

                                            {/* Timeline */}
                                            <div className="mb-4 space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-500">Pendaftaran:</span>
                                                    <span className="font-medium">
                                                        {formatDate(eventYear.registration_start)} -{' '}
                                                        {formatDate(eventYear.registration_end)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-500">Tampilkan:</span>
                                                    <span className="font-medium">
                                                        {formatDate(eventYear.show_start)} -{' '}
                                                        {formatDate(eventYear.show_end)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <Button asChild size="sm" className="flex-1" variant="default">
                                                    <Link href={route('admin.event-years.show', eventYear.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Detail
                                                    </Link>
                                                </Button>
                                                <Button asChild size="sm" variant="outline">
                                                    <Link href={route('admin.event-years.edit', eventYear.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Calendar className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                                <h3 className="mb-2 text-lg font-medium">Tidak ada tahun event</h3>
                                <p className="text-muted-foreground mb-4">Belum ada tahun event yang dibuat.</p>
                                <Button asChild>
                                    <Link href={route('admin.event-years.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Buat Tahun Event Pertama
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
