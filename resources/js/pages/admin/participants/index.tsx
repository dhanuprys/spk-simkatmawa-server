import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle, ChevronLeft, ChevronRight, Clock, Edit, Eye, Filter, Search, Users, X } from 'lucide-react';
import { useState } from 'react';

interface ParticipantsIndexProps {
    participants: {
        data: any[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: any[];
    event_years: any[];
    filters: {
        search?: string;
        category_id?: string;
        event_year_id?: string;
        status?: string;
    };
}

export default function ParticipantsIndex({ participants, categories, event_years, filters }: ParticipantsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || 'all');
    const [eventYearId, setEventYearId] = useState(filters.event_year_id || 'all');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleFilter = () => {
        router.get(
            route('admin.participants.index'),
            {
                search,
                category_id: categoryId === 'all' ? '' : categoryId,
                event_year_id: eventYearId === 'all' ? '' : eventYearId,
                status: status === 'all' ? '' : status,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setCategoryId('all');
        setEventYearId('all');
        setStatus('all');
        router.get(
            route('admin.participants.index'),
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePageChange = (url: string) => {
        if (url) {
            router.visit(url, { preserveState: true });
        }
    };

    return (
        <AdminLayout title="Peserta" description="Verifikasi dan kelola data peserta festival">
            <Head title="Peserta - NITISARA Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Peserta</h1>
                        <p className="text-muted-foreground">
                            Verifikasi dan kelola data peserta festival film NITISARA
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filter & Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Pencarian</label>
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        placeholder="Cari nama tim, ketua, email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Kategori</label>
                                <Select value={categoryId} onValueChange={setCategoryId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua kategori</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tahun Event</label>
                                <Select value={eventYearId} onValueChange={setEventYearId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua tahun" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua tahun</SelectItem>
                                        {event_years.map((year) => (
                                            <SelectItem key={year.id} value={year.id.toString()}>
                                                {year.year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua status</SelectItem>
                                        <SelectItem value="pending">Menunggu verifikasi</SelectItem>
                                        <SelectItem value="approved">Disetujui</SelectItem>
                                        <SelectItem value="rejected">Ditolak</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button onClick={handleFilter}>
                                <Search className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="outline" onClick={clearFilters}>
                                <X className="mr-2 h-4 w-4" />
                                Bersihkan
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Participants List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Peserta</CardTitle>
                        <CardDescription>Total {participants.total} peserta ditemukan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {participants.data.length > 0 ? (
                            <div className="space-y-4">
                                {participants.data.map((participant) => (
                                    <div
                                        key={participant.id}
                                        className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="mb-2 flex items-center gap-3">
                                                        <span className="text-lg font-medium">
                                                            {participant.team_name}
                                                        </span>
                                                        {participant.verification_status === 'approved' ? (
                                                            <Badge
                                                                variant="default"
                                                                className="bg-green-100 text-green-800"
                                                            >
                                                                <CheckCircle className="mr-1 h-3 w-3" />
                                                                Disetujui
                                                            </Badge>
                                                        ) : participant.verification_status === 'rejected' ? (
                                                            <Badge
                                                                variant="default"
                                                                className="bg-red-100 text-red-800"
                                                            >
                                                                <X className="mr-1 h-3 w-3" />
                                                                Ditolak
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="secondary">
                                                                <Clock className="mr-1 h-3 w-3" />
                                                                Menunggu
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-muted-foreground grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                                                        <div>
                                                            <span className="font-medium">Ketua:</span>{' '}
                                                            {participant.leader_name}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Email:</span>{' '}
                                                            {participant.leader_email}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">WhatsApp:</span>{' '}
                                                            {participant.leader_whatsapp}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Perusahaan:</span>{' '}
                                                            {participant.company}
                                                        </div>
                                                    </div>
                                                    <div className="text-muted-foreground mt-2 text-sm">
                                                        <span className="font-medium">Kategori:</span>{' '}
                                                        {participant.category?.name} •
                                                        <span className="font-medium"> Tahun:</span>{' '}
                                                        {participant.event_year?.year} •
                                                        <span className="font-medium"> PIN:</span> {participant.pin}
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex items-center gap-1">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('admin.participants.show', participant.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('admin.participants.edit', participant.id)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination */}
                                {participants.links.length > 3 && (
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="text-muted-foreground text-sm">
                                            Menampilkan {(participants.current_page - 1) * participants.per_page + 1}{' '}
                                            sampai{' '}
                                            {Math.min(
                                                participants.current_page * participants.per_page,
                                                participants.total,
                                            )}{' '}
                                            dari {participants.total} peserta
                                        </div>
                                        <div className="flex gap-1">
                                            {participants.links.map((link, index) => (
                                                <Button
                                                    key={index}
                                                    variant={link.active ? 'default' : 'outline'}
                                                    size="sm"
                                                    disabled={!link.url}
                                                    onClick={() => handlePageChange(link.url)}
                                                    className="min-w-[40px]"
                                                >
                                                    {link.label === '&laquo; Previous' ? (
                                                        <ChevronLeft className="h-4 w-4" />
                                                    ) : link.label === 'Next &raquo;' ? (
                                                        <ChevronRight className="h-4 w-4" />
                                                    ) : (
                                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                                    )}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <h3 className="mb-2 text-lg font-medium">Tidak ada peserta</h3>
                                <p className="text-muted-foreground">
                                    Belum ada peserta yang terdaftar atau tidak ada yang sesuai dengan filter.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
