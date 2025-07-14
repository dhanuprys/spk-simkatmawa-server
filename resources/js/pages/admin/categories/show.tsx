import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Award, Edit, Film } from 'lucide-react';

interface Participant {
    id: number;
    team_name: string;
    leader_name: string;
    city: string;
    company: string;
    status: string;
    created_at: string;
    films: Film[];
}

interface Film {
    id: number;
    title: string;
    director: string;
    duration: number;
    file_size: number;
    status: string;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
    is_active: boolean;
    participants_count: number;
    participants: Participant[];
    event_year_id: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    category: Category;
}

export default function CategoryShow({ category }: Props) {
    const formatFileSize = (bytes: number) => {
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(1)} MB`;
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}j ${mins}m` : `${mins}m`;
    };

    return (
        <AdminLayout title={`Kategori: ${category.name}`} description="Detail kategori film">
            <Head title={`${category.name} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.event-years.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Tahun Event
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{category.name}</h1>
                            <p className="text-muted-foreground">Detail kategori film</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link
                                href={route('admin.event-years.categories.edit', [category.event_year_id, category.id])}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Category Info */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Informasi Kategori
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground text-sm font-medium">Status</Label>
                                <Badge variant={category.is_active ? 'default' : 'secondary'}>
                                    {category.is_active ? 'Aktif' : 'Nonaktif'}
                                </Badge>
                            </div>

                            <div className="grid gap-4">
                                <div className="flex items-center gap-2">
                                    <Film className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <p className="text-sm font-medium">Total Peserta</p>
                                        <p className="text-muted-foreground text-sm">
                                            {category.participants_count} peserta
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="text-muted-foreground text-xs">
                                    <p>Dibuat: {new Date(category.created_at).toLocaleDateString('id-ID')}</p>
                                    <p>Diupdate: {new Date(category.updated_at).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Participants List */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Peserta dalam Kategori</CardTitle>
                            <CardDescription>Daftar peserta yang terdaftar dalam kategori ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {category.participants.length > 0 ? (
                                <div className="space-y-4">
                                    {category.participants.map((participant) => (
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
                                                <div className="mt-2 flex gap-2">
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
                                                    {participant.films.length > 0 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {participant.films.length} film
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.participants.show', participant.id)}>
                                                    Lihat Detail
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <Film className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                    <p className="text-muted-foreground">Belum ada peserta dalam kategori ini</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
