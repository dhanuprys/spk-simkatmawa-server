import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, Mail, Shield, Trash2, User } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

export default function UserShow({ user }: Props) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.users.destroy', user.id), {
            onSuccess: () => {
                setIsDeleting(false);
                setIsDeleteDialogOpen(false);
            },
            onError: (errors) => {
                setIsDeleting(false);
                console.error('Error deleting user:', errors);
            },
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout title={`User: ${user.name}`} description="Detail user admin">
            <Head title={`${user.name} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.users.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-muted-foreground">Detail user admin</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('admin.users.edit', user.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Hapus
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Hapus User</DialogTitle>
                                    <DialogDescription>
                                        Apakah Anda yakin ingin menghapus user{' '}
                                        <span className="font-semibold">{user.name}</span>?
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-3">
                                    <p className="text-destructive text-sm">
                                        Perhatian: Tindakan ini tidak dapat dibatalkan dan akan menghapus user secara
                                        permanen.
                                    </p>
                                </div>
                                <DialogFooter className="gap-2">
                                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                        {isDeleting ? 'Menghapus...' : 'Hapus User'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* User Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informasi User
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="flex items-center gap-3">
                                    <User className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Nama</div>
                                        <div className="text-muted-foreground text-sm">{user.name}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Email</div>
                                        <div className="text-muted-foreground text-sm">{user.email}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Shield className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Status</div>
                                        <div className="text-muted-foreground text-sm">
                                            {user.email_verified_at ? (
                                                <Badge variant="default" className="bg-green-100 text-green-800">
                                                    Terverifikasi
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">Belum Terverifikasi</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Bergabung Sejak</div>
                                        <div className="text-muted-foreground text-sm">
                                            {formatDate(user.created_at)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <div>
                                        <div className="font-medium">Terakhir Diupdate</div>
                                        <div className="text-muted-foreground text-sm">
                                            {formatDate(user.updated_at)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Statistik User
                            </CardTitle>
                            <CardDescription>Informasi aktivitas user</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm font-medium">Role</span>
                                    </div>
                                    <p className="text-2xl font-bold">Admin</p>
                                    <p className="text-muted-foreground text-xs">Akses penuh ke panel admin</p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm font-medium">Durasi Bergabung</span>
                                    </div>
                                    <p className="text-2xl font-bold">
                                        {Math.floor(
                                            (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24),
                                        )}{' '}
                                        hari
                                    </p>
                                    <p className="text-muted-foreground text-xs">Sejak bergabung dengan sistem</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
