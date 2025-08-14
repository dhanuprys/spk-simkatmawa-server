import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit, Eye, Plus, User } from 'lucide-react';

interface UsersIndexProps {
    users: {
        data: any[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function UsersIndex({ users }: UsersIndexProps) {
    return (
        <AdminLayout title="Users" description="Kelola user admin">
            <Head title="Users - SIMKATMAWA Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Users</h1>
                        <p className="text-muted-foreground">Kelola user admin festival</p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.users.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah User
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Users</CardTitle>
                        <CardDescription>Total {users.total} user admin</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {users.data.length > 0 ? (
                            <div className="space-y-4">
                                {users.data.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{user.name}</span>
                                                <span className="text-muted-foreground text-sm">{user.email}</span>
                                                <span className="text-muted-foreground text-sm">
                                                    Bergabung: {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">Admin</Badge>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.users.show', user.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.users.edit', user.id)}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <User className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <h3 className="mb-2 text-lg font-medium">Tidak ada user</h3>
                                <p className="text-muted-foreground">Belum ada user admin yang dibuat.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
