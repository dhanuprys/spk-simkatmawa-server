import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, CalendarDays, Edit, Users } from 'lucide-react';

interface Participant {
    id: number;
    team_name: string;
    leader_name: string;
    city: string;
    company: string;
    status: string;
    created_at: string;
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
    participants_count: number;
    participants: Participant[];
    created_at: string;
    updated_at: string;
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
                            </div>

                            <div className="border-t pt-4">
                                <div className="text-muted-foreground text-xs">
                                    <p>Dibuat: {new Date(event_year.created_at).toLocaleDateString('id-ID')}</p>
                                    <p>Diupdate: {new Date(event_year.updated_at).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
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

                {/* Participants List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Peserta dalam Event</CardTitle>
                        <CardDescription>Daftar peserta yang terdaftar dalam event ini</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {event_year.participants.length > 0 ? (
                            <div className="space-y-4">
                                {event_year.participants.map((participant) => (
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
                                                    participant.status === 'verified'
                                                        ? 'default'
                                                        : participant.status === 'pending'
                                                          ? 'secondary'
                                                          : 'destructive'
                                                }
                                            >
                                                {participant.status === 'verified'
                                                    ? 'Terverifikasi'
                                                    : participant.status === 'pending'
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
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <p className="text-muted-foreground">Belum ada peserta dalam event ini</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
