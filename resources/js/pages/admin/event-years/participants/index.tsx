import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Edit,
    Eye,
    Filter,
    Plus,
    Search,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface EventYearParticipantsIndexProps {
    event_year: {
        id: number;
        year: number;
        title: string;
        description: string;
    };
    participants: {
        data: any[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: any[];
    filters: {
        search?: string;
        category_id?: string;
        status?: string;
    };
}

export default function EventYearParticipantsIndex({
    event_year,
    participants,
    categories,
    filters,
}: EventYearParticipantsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || 'all');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleFilter = () => {
        router.get(
            route('admin.event-years.participants.index', event_year.id),
            {
                search,
                category_id: categoryId === 'all' ? '' : categoryId,
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
        setStatus('all');
        router.get(
            route('admin.event-years.participants.index', event_year.id),
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

    // Calculate statistics
    const totalParticipants = participants.total;
    const approvedParticipants = participants.data.filter((p) => p.verification_status === 'approved').length;
    const pendingParticipants = participants.data.filter((p) => p.verification_status === 'pending').length;
    const rejectedParticipants = participants.data.filter((p) => p.verification_status === 'rejected').length;

    return (
        <AdminLayout title={`Peserta ${event_year.year}`} description={`Kelola peserta festival ${event_year.title}`}>
            <Head title={`Peserta ${event_year.year} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.event-years.show', event_year.id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Event
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Peserta {event_year.year}</h1>
                            <p className="text-muted-foreground">
                                {event_year.title} - Kelola dan verifikasi peserta festival
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.event-years.participants.create', event_year.id)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Peserta
                        </Link>
                    </Button>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Total Peserta</p>
                                    <p className="text-3xl font-bold text-blue-600">{totalParticipants}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-green-500">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Disetujui</p>
                                    <p className="text-3xl font-bold text-green-600">{approvedParticipants}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-yellow-100 p-2">
                                    <Clock className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Menunggu</p>
                                    <p className="text-3xl font-bold text-yellow-600">{pendingParticipants}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-red-500">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-red-100 p-2">
                                    <X className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Ditolak</p>
                                    <p className="text-3xl font-bold text-red-600">{rejectedParticipants}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filter & Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-muted-foreground text-sm">
                                Gunakan filter di atas untuk menyempitkan hasil pencarian
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleFilter} className="flex-1 sm:flex-none">
                                    <Search className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                                <Button variant="outline" onClick={clearFilters} className="flex-1 sm:flex-none">
                                    <X className="mr-2 h-4 w-4" />
                                    Bersihkan
                                </Button>
                            </div>
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
                                        className="group rounded-lg border p-6 transition-all hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-sm"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl font-semibold text-gray-900">
                                                        {participant.team_name}
                                                    </span>
                                                    {/* Verified Badge - This is the key verification */}
                                                    {participant.verification_status === 'approved' ? (
                                                        <Badge
                                                            variant="default"
                                                            className="border-green-200 bg-green-100 text-green-800 shadow-sm"
                                                        >
                                                            <CheckCircle className="mr-1 h-3 w-3" />
                                                            Disetujui
                                                        </Badge>
                                                    ) : participant.verification_status === 'rejected' ? (
                                                        <Badge
                                                            variant="default"
                                                            className="border-red-200 bg-red-100 text-red-800 shadow-sm"
                                                        >
                                                            <X className="mr-1 h-3 w-3" />
                                                            Ditolak
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="secondary"
                                                            className="border-yellow-200 bg-yellow-100 text-yellow-800 shadow-sm"
                                                        >
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            Menunggu
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <span className="font-medium text-gray-700">Ketua:</span>
                                                        <p className="text-gray-600">{participant.leader_name}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="font-medium text-gray-700">Email:</span>
                                                        <p className="text-gray-600">{participant.leader_email}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="font-medium text-gray-700">WhatsApp:</span>
                                                        <p className="text-gray-600">{participant.leader_whatsapp}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="font-medium text-gray-700">Perusahaan:</span>
                                                        <p className="text-gray-600">{participant.company}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium text-gray-700">Kategori:</span>
                                                        <span className="text-gray-600">
                                                            {participant.category?.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium text-gray-700">Kota:</span>
                                                        <span className="text-gray-600">{participant.city}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium text-gray-700">PIN:</span>
                                                        <span className="font-mono text-gray-600">
                                                            {participant.pin}
                                                        </span>
                                                    </div>
                                                </div>

                                                {participant.verified_by && (
                                                    <div className="rounded-md bg-gray-50 p-3">
                                                        <div className="text-sm">
                                                            <span className="font-medium text-gray-700">
                                                                Diverifikasi oleh:
                                                            </span>{' '}
                                                            <span className="text-gray-600">
                                                                {participant.verified_by.name}
                                                            </span>
                                                            <span className="text-gray-500">
                                                                {' '}
                                                                pada{' '}
                                                                {new Date(participant.updated_at).toLocaleDateString(
                                                                    'id-ID',
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="ml-6 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
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
                                    Belum ada peserta yang terdaftar untuk event {event_year.year} atau tidak ada yang
                                    sesuai dengan filter.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
