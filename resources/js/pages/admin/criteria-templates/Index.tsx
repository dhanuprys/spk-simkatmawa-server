import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CriteriaTemplate {
    id: number;
    name: string;
    description: string | null;
    l3_cg1_a_value: number | null;
    l3_cg1_b_value: number | null;
    l3_cg1_c_value: number | null;
    l3_cg2_a_value: number | null;
    l3_cg2_b_value: number | null;
    l3_cg1_a_max: boolean;
    l3_cg1_b_max: boolean;
    l3_cg1_c_max: boolean;
    l3_cg2_a_max: boolean;
    l3_cg2_b_max: boolean;
    l2_cg1_a_value: number | null;
    l2_cg1_b_value: number | null;
    l2_cg1_c_value: number | null;
    l2_cg1_d_value: number | null;
    l2_cg1_e_value: number | null;
    l2_cg1_f_value: number | null;
    l2_cg1_g_value: number | null;
    l2_cg2_a_value: number | null;
    l2_cg2_b_value: number | null;
    l2_cg3_a_value: number | null;
    l2_cg3_b_value: number | null;
    l2_cg3_c_value: number | null;
    l2_cg3_d_value: number | null;
    l2_cg3_e_value: number | null;
    l2_cg1_a_max: boolean;
    l2_cg1_b_max: boolean;
    l2_cg1_c_max: boolean;
    l2_cg1_d_max: boolean;
    l2_cg1_e_max: boolean;
    l2_cg1_f_max: boolean;
    l2_cg1_g_max: boolean;
    l2_cg2_a_max: boolean;
    l2_cg2_b_max: boolean;
    l2_cg3_a_max: boolean;
    l2_cg3_b_max: boolean;
    l2_cg3_c_max: boolean;
    l2_cg3_d_max: boolean;
    l2_cg3_e_max: boolean;
    l1_cg1_a_value: number | null;
    l1_cg1_b_value: number | null;
    l1_cg1_c_value: number | null;
    l1_cg1_a_max: boolean;
    l1_cg1_b_max: boolean;
    l1_cg1_c_max: boolean;
    limit: number;
    ascending: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    criteriaTemplates: {
        data: CriteriaTemplate[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ criteriaTemplates, filters }: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<number | null>(null);
    const [deletingIds, setDeletingIds] = useState<number[]>([]);

    // Cleanup function to reset deleting state if something goes wrong
    const resetDeletingState = (id?: number) => {
        if (id) {
            setDeletingIds((prev) => prev.filter((item) => item !== id));
        } else {
            setDeletingIds([]);
        }
    };

    // Safety timeout to reset deleting state if something goes wrong
    useEffect(() => {
        if (deletingIds.length > 0) {
            const timeout = setTimeout(() => {
                console.warn('Deleting state timeout, resetting...');
                setDeletingIds([]);
            }, 10000); // 10 seconds timeout

            return () => clearTimeout(timeout);
        }
    }, [deletingIds]);

    const { data, setData, post, processing, errors } = useForm({
        search: filters.search || '',
        csv_file: null as File | null,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.criteria-templates.index'), data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleImport = () => {
        if (data.csv_file) {
            post(route('admin.criteria-templates.import'), {
                onSuccess: () => {
                    setImportDialogOpen(false);
                    setData('csv_file', null);
                },
            });
        }
    };

    const handleExport = () => {
        window.location.href = route('admin.criteria-templates.export');
    };

    const handleMultipleDelete = () => {
        if (selectedIds.length > 0) {
            console.log('Attempting to delete:', selectedIds);
            setDeletingIds(selectedIds);
            router.post(route('admin.criteria-templates.destroy-multiple'),
                { ids: selectedIds },
                {
                    onSuccess: () => {
                        console.log('Multiple delete successful');
                        setSelectedIds([]);
                        resetDeletingState();
                        // Use visit instead of reload to avoid infinite loop
                        router.visit(route('admin.criteria-templates.index'), {
                            preserveScroll: true,
                            preserveState: false,
                        });
                    },
                    onError: (errors: any) => {
                        console.error('Multiple delete failed:', errors);
                        resetDeletingState();
                    },
                }
            );
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(criteriaTemplates.data.map((item) => item.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectItem = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((item) => item !== id));
        }
    };

    // Disable all interactions when any delete is in progress
    const isDeleting = deletingIds.length > 0;

    return (
        <AdminLayout title="Template Kriteria" description="Kelola template kriteria penilaian">
            <Head title="Template Kriteria" />

            {/* Loading overlay when deleting */}
            {isDeleting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex items-center space-x-3">
                            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
                            <span className="text-lg font-medium">Menghapus data...</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Template Kriteria</h2>
                        <p className="text-muted-foreground">Kelola template kriteria penilaian mahasiswa</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" disabled={isDeleting}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Import
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Import Data Template Kriteria</DialogTitle>
                                    <DialogDescription>
                                        Upload file CSV untuk mengimpor template kriteria. Pastikan format sesuai dengan
                                        template.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <Input
                                        type="file"
                                        accept=".csv,.txt"
                                        onChange={(e) => setData('csv_file', e.target.files?.[0] || null)}
                                    />
                                    <div className="text-muted-foreground text-sm">
                                        <p>Format CSV yang diharapkan:</p>
                                        <p>Nama, Deskripsi, L3_CG1_A_Value, L3_CG1_B_Value, ..., Limit, Ascending</p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button onClick={handleImport} disabled={processing || !data.csv_file}>
                                        {processing ? 'Mengimpor...' : 'Import'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Delete Confirmation Dialog */}
                        <Dialog open={deleteDialogOpen !== null} onOpenChange={() => setDeleteDialogOpen(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        {deleteDialogOpen === -1 ? 'Hapus Template Terpilih' : 'Hapus Template'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {deleteDialogOpen === -1
                                            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} template yang dipilih? Tindakan ini tidak dapat dibatalkan.`
                                            : `Apakah Anda yakin ingin menghapus template "${criteriaTemplates.data.find((m) => m.id === deleteDialogOpen)?.name}"? Tindakan ini tidak dapat dibatalkan.`}
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
                                        Batal
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            if (deleteDialogOpen === -1) {
                                                // Multiple delete
                                                console.log(
                                                    'Multiple delete dialog confirmed, route:',
                                                    route('admin.criteria-templates.destroy-multiple'),
                                                );
                                                handleMultipleDelete();
                                                setDeleteDialogOpen(null);
                                            } else if (deleteDialogOpen) {
                                                // Single delete
                                                setDeletingIds((prev) => [...prev, deleteDialogOpen]);
                                                router.delete(
                                                    route('admin.criteria-templates.destroy', deleteDialogOpen),
                                                    {
                                                        onSuccess: () => {
                                                            resetDeletingState(deleteDialogOpen);
                                                            setDeleteDialogOpen(null);
                                                            // Use visit instead of reload to avoid infinite loop
                                                            router.visit(route('admin.criteria-templates.index'), {
                                                                preserveScroll: true,
                                                                preserveState: false,
                                                            });
                                                        },
                                                        onError: (errors: any) => {
                                                            resetDeletingState(deleteDialogOpen);
                                                            setDeleteDialogOpen(null);
                                                            console.error('Delete failed:', errors);
                                                        },
                                                    },
                                                );
                                            }
                                        }}
                                        disabled={
                                            deleteDialogOpen === -1
                                                ? deletingIds.length > 0
                                                : deletingIds.includes(deleteDialogOpen || 0)
                                        }
                                    >
                                        {deleteDialogOpen === -1
                                            ? deletingIds.length > 0
                                                ? 'Menghapus...'
                                                : 'Hapus'
                                            : deletingIds.includes(deleteDialogOpen || 0)
                                                ? 'Menghapus...'
                                                : 'Hapus'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button onClick={handleExport} variant="outline" size="sm" disabled={isDeleting}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>

                        <Link href={route('admin.criteria-templates.create')}>
                            <Button size="sm" disabled={isDeleting}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Template
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Search and Actions */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <form onSubmit={handleSearch} className="flex max-w-md flex-1 items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        placeholder="Cari nama template..."
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        className="pl-10"
                                        disabled={isDeleting}
                                    />
                                </div>
                                <Button type="submit" variant="outline" size="sm" disabled={isDeleting}>
                                    Cari
                                </Button>
                            </form>

                            {selectedIds.length > 0 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={deletingIds.length > 0}
                                    onClick={() => setDeleteDialogOpen(-1)} // -1 means multiple delete
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {deletingIds.length > 0 ? 'Menghapus...' : `Hapus ${selectedIds.length} Item`}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Template Kriteria ({criteriaTemplates.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={
                                                    selectedIds.length === criteriaTemplates.data.length &&
                                                    criteriaTemplates.data.length > 0
                                                }
                                                onCheckedChange={handleSelectAll}
                                                disabled={isDeleting}
                                            />
                                        </TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Terakhir Diupdate</TableHead>
                                        <TableHead className="w-12">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {criteriaTemplates.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                                                Tidak ada data template kriteria
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        criteriaTemplates.data.map((template) => (
                                            <TableRow key={template.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedIds.includes(template.id)}
                                                        onCheckedChange={(checked) =>
                                                            handleSelectItem(template.id, checked as boolean)
                                                        }
                                                        disabled={isDeleting}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{template.name}</TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {template.description || '-'}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {new Date(template.updated_at).toLocaleDateString('id-ID')}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="relative">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="hover:bg-muted h-8 w-8 p-0"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="z-50 w-48"
                                                                sideOffset={4}
                                                            >
                                                                <DropdownMenuItem asChild>
                                                                    <Link
                                                                        href={route(
                                                                            'admin.criteria-templates.show',
                                                                            template.id,
                                                                        )}
                                                                        className="flex w-full cursor-pointer items-center px-2 py-1.5 text-sm"
                                                                    >
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        Lihat
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link
                                                                        href={route(
                                                                            'admin.criteria-templates.edit',
                                                                            template.id,
                                                                        )}
                                                                        className="flex w-full cursor-pointer items-center px-2 py-1.5 text-sm"
                                                                    >
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="flex w-full cursor-pointer items-center px-2 py-1.5 text-sm text-red-600 focus:text-red-600"
                                                                    onSelect={(e) => e.preventDefault()}
                                                                    onClick={() => setDeleteDialogOpen(template.id)}
                                                                >
                                                                    <div className="flex w-full items-center">
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Hapus
                                                                    </div>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {criteriaTemplates.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-muted-foreground text-sm">
                                    Menampilkan {(criteriaTemplates.current_page - 1) * criteriaTemplates.per_page + 1}{' '}
                                    sampai{' '}
                                    {Math.min(
                                        criteriaTemplates.current_page * criteriaTemplates.per_page,
                                        criteriaTemplates.total,
                                    )}{' '}
                                    dari {criteriaTemplates.total} hasil
                                </div>
                                <div className="flex items-center gap-2">
                                    {criteriaTemplates.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.criteria-templates.index'),
                                                    { ...filters, page: criteriaTemplates.current_page - 1 },
                                                    { preserveState: true },
                                                )
                                            }
                                            disabled={isDeleting}
                                        >
                                            Sebelumnya
                                        </Button>
                                    )}
                                    {criteriaTemplates.current_page < criteriaTemplates.last_page && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.criteria-templates.index'),
                                                    { ...filters, page: criteriaTemplates.current_page + 1 },
                                                    { preserveState: true },
                                                )
                                            }
                                            disabled={isDeleting}
                                        >
                                            Selanjutnya
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
