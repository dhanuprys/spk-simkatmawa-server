import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    FileText, 
    BarChart3, 
    Plus, 
    Eye,
    Calendar,
    TrendingUp
} from 'lucide-react';

interface ObjectMetric {
    id: number;
    name: string;
    created_at: string;
}

interface CriteriaTemplate {
    id: number;
    name: string;
    created_at: string;
}

interface DashboardProps {
    stats: {
        total_metrics: number;
        total_templates: number;
        total_users: number;
        recent_metrics: ObjectMetric[];
        recent_templates: CriteriaTemplate[];
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AdminLayout title="Dashboard" description="Ringkasan sistem DigitalBank">
            <Head title="Dashboard - DigitalBank Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Selamat datang di sistem manajemen DigitalBank
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Metrik</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_metrics}</div>
                            <p className="text-xs text-muted-foreground">
                                Aplikasi yang telah dinilai
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Template Kriteria</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_templates}</div>
                            <p className="text-xs text-muted-foreground">
                                Template kriteria yang tersedia
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                Pengguna terdaftar
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Data */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Metrics */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Metrik Terbaru</CardTitle>
                                <Link href={route('admin.object-metrics.index')}>
                                    <Button variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4" />
                                        Lihat Semua
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {stats.recent_metrics.length > 0 ? (
                                    stats.recent_metrics.map((metric) => (
                                        <div key={metric.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{metric.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(metric.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <Badge variant="secondary">Metrik</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-muted-foreground">Belum ada metrik</p>
                                        <Link href={route('admin.object-metrics.create')}>
                                            <Button variant="outline" size="sm" className="mt-2">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Tambah Metrik
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Templates */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Template Terbaru</CardTitle>
                                <Link href={route('admin.criteria-templates.index')}>
                                    <Button variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4" />
                                        Lihat Semua
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {stats.recent_templates.length > 0 ? (
                                    stats.recent_templates.map((template) => (
                                        <div key={template.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{template.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(template.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <Badge variant="outline">Template</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-muted-foreground">Belum ada template</p>
                                        <Link href={route('admin.criteria-templates.create')}>
                                            <Button variant="outline" size="sm" className="mt-2">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Tambah Template
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Link href={route('admin.object-metrics.create')}>
                                <Button className="w-full" variant="outline">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Metrik
                                </Button>
                            </Link>
                            <Link href={route('admin.criteria-templates.create')}>
                                <Button className="w-full" variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Buat Template
                                </Button>
                            </Link>
                            <Link href={route('admin.users.index')}>
                                <Button className="w-full" variant="outline">
                                    <Users className="mr-2 h-4 w-4" />
                                    Kelola Pengguna
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
