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
    Calendar,
    Clock,
    Eye,
    Filter,
    Key,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    ToggleLeft,
    ToggleRight,
    Trash,
} from 'lucide-react';
import { useState } from 'react';

interface VotingPagePin {
    id: number;
    pin: string;
    name: string;
    is_active: boolean;
    lifetime_minutes: number;
    expires_at: string;
    last_active_at: string | null;
    created_at: string;
}

interface Props {
    pins: {
        data: VotingPagePin[];
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
}

export default function VotingPinsIndex({ pins, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [pinToDelete, setPinToDelete] = useState<VotingPagePin | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.voting-pins.index'),
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
            route('admin.voting-pins.index'),
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

    const toggleActive = (pin: VotingPagePin) => {
        router.post(route('admin.voting-pins.toggle-active', { votingPin: pin.id }));
    };

    const regeneratePin = (pin: VotingPagePin) => {
        router.post(route('admin.voting-pins.regenerate', { votingPin: pin.id }));
    };

    const deletePin = () => {
        if (pinToDelete) {
            router.delete(route('admin.voting-pins.destroy', { votingPin: pinToDelete.id }));
            setPinToDelete(null);
        }
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedIds(pins.data.map((pin) => pin.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((pid) => pid !== id));
        }
    };

    const handleBulkActivate = () => {
        if (selectedIds.length === 0) return;
        router.post(route('admin.voting-pins.bulk-activate'), { ids: selectedIds });
    };

    const handleBulkDeactivate = () => {
        if (selectedIds.length === 0) return;
        router.post(route('admin.voting-pins.bulk-deactivate'), { ids: selectedIds });
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    const formatDuration = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} menit`;
        } else if (minutes < 1440) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} jam${remainingMinutes > 0 ? ` ${remainingMinutes} menit` : ''}`;
        } else {
            const days = Math.floor(minutes / 1440);
            const remainingHours = Math.floor((minutes % 1440) / 60);
            return `${days} hari${remainingHours > 0 ? ` ${remainingHours} jam` : ''}`;
        }
    };

    const getActivePinsCount = () => pins.data.filter((pin) => pin.is_active).length;
    const getInactivePinsCount = () => pins.data.filter((pin) => !pin.is_active).length;

    return (
        <AdminLayout title="PIN Page Login">
            <Head title="PIN Page Login" />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">PIN Page Login</h1>
                        <p className="text-muted-foreground">Kelola PIN untuk Page Login (akses halaman voting)</p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('admin.voting-pins.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Buat PIN Baru
                            </Link>
                        </Button>
                        <Button asChild variant="secondary">
                            <a href="/voting" target="_blank" rel="noopener noreferrer">
                                <Key className="mr-2 h-4 w-4" />
                                Buka Halaman Voting
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bulk Actions */}
            <div className="mb-4 flex gap-2">
                <Button variant="outline" onClick={handleBulkActivate} disabled={selectedIds.length === 0}>
                    Aktifkan Terpilih
                </Button>
                <Button variant="outline" onClick={handleBulkDeactivate} disabled={selectedIds.length === 0}>
                    Nonaktifkan Terpilih
                </Button>
                <span className="text-muted-foreground ml-2 text-sm">{selectedIds.length} dipilih</span>
            </div>

            {/* Statistics Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Key className="text-primary h-5 w-5" />
                            Total PIN
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">{pins.total}</p>
                            <p className="text-muted-foreground text-sm">PIN</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ToggleRight className="h-5 w-5 text-green-600" />
                            Aktif
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-green-600">{getActivePinsCount()}</p>
                            <p className="text-muted-foreground text-sm">PIN</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ToggleLeft className="h-5 w-5 text-gray-600" />
                            Tidak Aktif
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-gray-600">{getInactivePinsCount()}</p>
                            <p className="text-muted-foreground text-sm">PIN</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Kadaluarsa
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-blue-600">
                                {
                                    pins.data.filter((pin) => pin.expires_at && new Date(pin.expires_at) < new Date())
                                        .length
                                }
                            </p>
                            <p className="text-muted-foreground text-sm">PIN</p>
                        </div>
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
                    <CardDescription>Cari dan filter PIN berdasarkan kriteria</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari PIN atau nama..."
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
                                <SelectItem value="active">Aktif</SelectItem>
                                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit">
                            <Search className="mr-2 h-4 w-4" />
                            Cari
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* PINs Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar PIN</CardTitle>
                    <CardDescription>
                        Menampilkan {pins.from} - {pins.to} dari {pins.total} PIN
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            aria-label="Pilih semua"
                                        />
                                    </TableHead>
                                    <TableHead>PIN</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Durasi</TableHead>
                                    <TableHead>Kadaluarsa</TableHead>
                                    <TableHead>Terakhir Aktif</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pins.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Key className="text-muted-foreground/50 h-12 w-12" />
                                                <div>
                                                    <p className="text-muted-foreground text-lg font-medium">
                                                        Tidak ada PIN ditemukan
                                                    </p>
                                                    <p className="text-muted-foreground text-sm">
                                                        {searchQuery || statusFilter !== 'all'
                                                            ? 'Coba ubah filter pencarian Anda'
                                                            : 'Belum ada PIN yang dibuat'}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pins.data.map((pin) => (
                                        <TableRow key={pin.id} className="hover:bg-muted/50">
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(pin.id)}
                                                    onChange={(e) => handleSelectOne(pin.id, e.target.checked)}
                                                    aria-label={`Pilih PIN ${pin.pin}`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-mono text-lg font-medium">{pin.pin}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{pin.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={pin.is_active ? 'default' : 'secondary'}
                                                    className={
                                                        pin.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }
                                                >
                                                    {pin.is_active ? 'Aktif' : 'Tidak Aktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="text-muted-foreground h-4 w-4" />
                                                    <span className="text-sm">
                                                        {formatDuration(pin.lifetime_minutes)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {pin.expires_at ? (
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="text-muted-foreground h-4 w-4" />
                                                        <span className="text-sm">
                                                            {formatDateTime(pin.expires_at)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {pin.last_active_at ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                                        <span className="text-sm">
                                                            {formatDateTime(pin.last_active_at)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">Belum digunakan</span>
                                                )}
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
                                                                href={route('admin.voting-pins.edit', {
                                                                    votingPin: pin.id,
                                                                })}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={route('admin.voting-pins.sessions', {
                                                                    votingPin: pin.id,
                                                                })}
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Lihat Sesi
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => toggleActive(pin)}>
                                                            {pin.is_active ? (
                                                                <>
                                                                    <ToggleLeft className="mr-2 h-4 w-4" />
                                                                    Nonaktifkan
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ToggleRight className="mr-2 h-4 w-4" />
                                                                    Aktifkan
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => regeneratePin(pin)}>
                                                            <RefreshCw className="mr-2 h-4 w-4" />
                                                            Regenerasi PIN
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600 dark:text-red-400"
                                                            onClick={() => setPinToDelete(pin)}
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Hapus
                                                        </DropdownMenuItem>
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
                    {pins.last_page > 1 && (
                        <>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground text-sm">
                                    Menampilkan {pins.from} - {pins.to} dari {pins.total} PIN
                                </div>
                                <div className="flex gap-2">
                                    {pins.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.voting-pins.index', {
                                                        page: pins.current_page - 1,
                                                        search: searchQuery,
                                                        status: statusFilter === 'all' ? '' : statusFilter,
                                                    }),
                                                )
                                            }
                                        >
                                            Sebelumnya
                                        </Button>
                                    )}
                                    {pins.current_page < pins.last_page && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.voting-pins.index', {
                                                        page: pins.current_page + 1,
                                                        search: searchQuery,
                                                        status: statusFilter === 'all' ? '' : statusFilter,
                                                    }),
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
            <AlertDialog open={!!pinToDelete} onOpenChange={(open) => !open && setPinToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus PIN</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus PIN{' '}
                            <span className="font-mono font-semibold">"{pinToDelete?.pin}"</span>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="text-destructive">
                        Tindakan ini tidak dapat dibatalkan dan PIN akan dihapus secara permanen.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={deletePin} className="bg-red-600 hover:bg-red-700">
                            <Trash className="mr-2 h-4 w-4" />
                            Hapus PIN
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
