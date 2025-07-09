import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, Eye, Plus } from 'lucide-react';

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
                            <div className="space-y-4">
                                {event_years.data.map((eventYear) => (
                                    <div
                                        key={eventYear.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {eventYear.title} ({eventYear.year})
                                                </span>
                                                <span className="text-muted-foreground text-sm">
                                                    {eventYear.description || 'Tidak ada deskripsi'}
                                                </span>
                                                <span className="text-muted-foreground text-sm">
                                                    {eventYear.participants_count} peserta
                                                </span>
                                                <span className="text-muted-foreground text-sm">
                                                    Pendaftaran:{' '}
                                                    {new Date(eventYear.registration_start).toLocaleDateString('id-ID')}{' '}
                                                    - {new Date(eventYear.registration_end).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {eventYear.is_active && (
                                                <Badge variant="default" className="bg-green-100 text-green-800">
                                                    Aktif
                                                </Badge>
                                            )}
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.event-years.show', eventYear.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.event-years.edit', eventYear.id)}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
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
