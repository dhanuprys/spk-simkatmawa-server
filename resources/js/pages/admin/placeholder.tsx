import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

interface PlaceholderProps {
    title: string;
    description?: string;
}

export default function Placeholder({
    title,
    description = 'Halaman ini sedang dalam pengembangan.',
}: PlaceholderProps) {
    return (
        <AdminLayout title={title}>
            <Head title={`${title} - SIMKATMAWA Admin`} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Halaman Sedang Dibangun</CardTitle>
                        <CardDescription>Fitur ini sedang dalam tahap pengembangan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="py-8 text-center">
                            <div className="mb-4 text-4xl">🚧</div>
                            <h3 className="mb-2 text-lg font-medium">Coming Soon</h3>
                            <p className="text-muted-foreground mb-4">
                                Halaman ini akan segera tersedia dalam versi berikutnya.
                            </p>
                            <Button variant="outline" asChild>
                                <a href={route('admin.dashboard')}>Kembali ke Dashboard</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
