import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Clock,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    Ticket,
    Trash,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface EventYear {
    id: number;
    year: number;
    title: string;
}

interface Ticket {
    id: number;
    code: string;
    event_year_id: number | null;
    used_at: string | null;
    created_at: string;
    eventYear?: EventYear;
    film_votings_count?: number;
}

interface Props {
    tickets: {
        data: Ticket[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
    eventYears: EventYear[];
    currentEventYear: EventYear;
    stats: {
        total: number;
        used: number;
        unused: number;
    };
}

export default function TicketsIndex({ tickets, filters, eventYears, currentEventYear, stats }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.event-years.tickets.index', currentEventYear.id),
            {
                search: searchQuery,
                status: statusFilter === 'all' ? '' : statusFilter,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('admin.event-years.tickets.index', currentEventYear.id),
            {
                search: searchQuery,
                status: value === 'all' ? '' : value,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const resetTicket = (ticket: Ticket) => {
        router.post(route('admin.event-years.tickets.reset', [currentEventYear.id, ticket.id]));
    };

    const deleteTicket = () => {
        if (ticketToDelete) {
            router.delete(route('admin.event-years.tickets.destroy', [currentEventYear.id, ticketToDelete.id]));
            setTicketToDelete(null);
        }
    };

    const exportTickets = () => {
        window.open(route('admin.event-years.tickets.export', currentEventYear.id), '_blank');
    };

    const formatDateTime = (dateString: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    const getUsagePercentage = () => {
        if (stats.total === 0) return 0;
        return Math.round((stats.used / stats.total) * 100);
    };

    return (
        <AdminLayout title={`Manajemen Tiket - ${currentEventYear.title}`}>
            <Head title={`Manajemen Tiket - ${currentEventYear.title}`} />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.event-years.show', currentEventYear.id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Event
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">Manajemen Tiket</h1>
                            <p className="text-muted-foreground">{currentEventYear.title}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={exportTickets}>
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.event-years.tickets.create', currentEventYear.id)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Buat Tiket Baru
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Ticket className="text-primary h-5 w-5" />
                            Total Tiket
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">{stats.total}</p>
                            <p className="text-muted-foreground text-sm">tiket</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Users className="h-5 w-5 text-green-600" />
                            Digunakan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-green-600">{stats.used}</p>
                            <p className="text-muted-foreground text-sm">tiket</p>
                        </div>
                        <div className="mt-2">
                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-green-600 transition-all duration-300"
                                    style={{ width: `${getUsagePercentage()}%` }}
                                />
                            </div>
                            <p className="text-muted-foreground mt-1 text-xs">{getUsagePercentage()}% digunakan</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Belum Digunakan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-blue-600">{stats.unused}</p>
                            <p className="text-muted-foreground text-sm">tiket</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100">
                                <span className="text-xs font-bold text-orange-600">%</span>
                            </div>
                            Tersedia
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-orange-600">{100 - getUsagePercentage()}</p>
                            <p className="text-muted-foreground text-sm">%</p>
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">dari total tiket</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filter & Pencarian
                    </CardTitle>
                    <CardDescription>Cari dan filter tiket berdasarkan kriteria</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari kode tiket..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={handleStatusChange}>
                            <SelectTrigger className="sm:max-w-xs">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="used">Digunakan</SelectItem>
                                <SelectItem value="unused">Belum Digunakan</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit">
                            <Search className="mr-2 h-4 w-4" />
                            Cari
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Tickets Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Tiket</CardTitle>
                    <CardDescription>
                        Menampilkan {tickets.from} - {tickets.to} dari {tickets.total} tiket
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode Tiket</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Digunakan Pada</TableHead>
                                    <TableHead>Dibuat Pada</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Ticket className="text-muted-foreground/50 h-12 w-12" />
                                                <div>
                                                    <p className="text-muted-foreground text-lg font-medium">
                                                        Tidak ada tiket ditemukan
                                                    </p>
                                                    <p className="text-muted-foreground text-sm">
                                                        {searchQuery || statusFilter
                                                            ? 'Coba ubah filter pencarian Anda'
                                                            : 'Belum ada tiket untuk event ini'}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tickets.data.map((ticket) => (
                                        <TableRow key={ticket.id} className="hover:bg-muted/50">
                                            <TableCell>
                                                <div className="font-mono text-lg font-medium">{ticket.code}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={ticket.used_at ? 'secondary' : 'default'}
                                                    className={
                                                        ticket.used_at
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }
                                                >
                                                    {ticket.used_at ? 'Digunakan' : 'Belum Digunakan'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {ticket.used_at ? (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="text-muted-foreground h-4 w-4" />
                                                        <span className="text-sm">
                                                            {formatDateTime(ticket.used_at)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-muted-foreground h-2 w-2 rounded-full" />
                                                    <span className="text-sm">{formatDateTime(ticket.created_at)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={route('admin.event-years.tickets.show', [
                                                                    currentEventYear.id,
                                                                    ticket.id,
                                                                ])}
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Detail
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {ticket.used_at && (
                                                            <DropdownMenuItem onClick={() => resetTicket(ticket)}>
                                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                                Reset Tiket
                                                            </DropdownMenuItem>
                                                        )}
                                                        {!ticket.used_at && (
                                                            <DropdownMenuItem
                                                                className="text-red-600 dark:text-red-400"
                                                                onClick={() => setTicketToDelete(ticket)}
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Hapus
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {tickets.last_page > 1 && (
                        <>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground text-sm">
                                    Menampilkan {tickets.from} - {tickets.to} dari {tickets.total} tiket
                                </div>
                                <div className="flex gap-2">
                                    {tickets.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.event-years.tickets.index', currentEventYear.id),
                                                    {
                                                        page: tickets.current_page - 1,
                                                        search: searchQuery,
                                                        status: statusFilter === 'all' ? '' : statusFilter,
                                                    },
                                                )
                                            }
                                        >
                                            Sebelumnya
                                        </Button>
                                    )}
                                    {tickets.current_page < tickets.last_page && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.event-years.tickets.index', currentEventYear.id),
                                                    {
                                                        page: tickets.current_page + 1,
                                                        search: searchQuery,
                                                        status: statusFilter === 'all' ? '' : statusFilter,
                                                    },
                                                )
                                            }
                                        >
                                            Berikutnya
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!ticketToDelete} onOpenChange={(open) => !open && setTicketToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Tiket</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus tiket dengan kode{' '}
                            <span className="font-mono font-semibold">"{ticketToDelete?.code}"</span>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="text-destructive">
                        Tindakan ini tidak dapat dibatalkan dan tiket akan dihapus secara permanen.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteTicket} className="bg-red-600 hover:bg-red-700">
                            <Trash className="mr-2 h-4 w-4" />
                            Hapus Tiket
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
