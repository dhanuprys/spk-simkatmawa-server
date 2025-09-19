import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit } from 'lucide-react';

interface ObjectMetric {
    id: number;
    name: string;
    l2_cg1_a: number | null;
    l2_cg1_b: number | null;
    l2_cg1_c: number | null;
    l2_cg1_d: number | null;
    l2_cg1_e: number | null;
    l2_cg1_f: number | null;
    l2_cg1_g: number | null;
    l2_cg3_a: number | null;
    l2_cg3_b: number | null;
    l2_cg3_c: number | null;
    l2_cg3_d: number | null;
    l2_cg3_e: number | null;
    l3_cg1_a: number | null;
    l3_cg1_b: number | null;
    l3_cg1_c: number | null;
    l3_cg2_a: number | null;
    l3_cg2_b: number | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    objectMetric: ObjectMetric;
}

export default function Show({ objectMetric }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout title={`Detail Metrik - ${objectMetric.name}`} description="Detail lengkap metrik penilaian">
            <Head title={`Detail Metrik - ${objectMetric.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('admin.object-metrics.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight">Detail Metrik</h2>
                        <p className="text-muted-foreground">
                            Detail lengkap metrik penilaian untuk {objectMetric.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.object-metrics.edit', objectMetric.id)}>
                            <Button size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Dasar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label className="text-muted-foreground text-sm font-medium">Nama Mahasiswa</Label>
                                <p className="text-lg font-semibold">{objectMetric.name}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground text-sm font-medium">ID</Label>
                                <p className="text-lg font-semibold">#{objectMetric.id}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label className="text-muted-foreground text-sm font-medium">Dibuat</Label>
                                <p className="text-sm">{formatDate(objectMetric.created_at)}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground text-sm font-medium">Terakhir Diupdate</Label>
                                <p className="text-sm">{formatDate(objectMetric.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* L3 Criteria */}
                <Card>
                    <CardHeader>
                        <CardTitle>Kriteria Level 3 (L3)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
                                    CG1 - Penilaian Dasar
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span>Penyajian</span>
                                        <Badge variant="secondary">{objectMetric.l3_cg1_a || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Substansi</span>
                                        <Badge variant="secondary">{objectMetric.l3_cg1_b || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Kualitas</span>
                                        <Badge variant="secondary">{objectMetric.l3_cg1_c || 0}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
                                    CG2 - Penilaian Lanjutan
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span>Presentasi</span>
                                        <Badge variant="secondary">{objectMetric.l3_cg2_a || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Tanya Jawab</span>
                                        <Badge variant="secondary">{objectMetric.l3_cg2_b || 0}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* L2 Criteria */}
                <Card>
                    <CardHeader>
                        <CardTitle>Kriteria Level 2 (L2)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* CG1 - Kompetensi */}
                            <div>
                                <h4 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
                                    CG1 - Kompetensi
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span>Kompetisi</span>
                                        <Badge variant="outline">{objectMetric.l2_cg1_a || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Pengakuan</span>
                                        <Badge variant="outline">{objectMetric.l2_cg1_b || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Penghargaan</span>
                                        <Badge variant="outline">{objectMetric.l2_cg1_c || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Karier Organisasi</span>
                                        <Badge variant="outline">{objectMetric.l2_cg1_d || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Hasil Karya</span>
                                        <Badge variant="outline">{objectMetric.l2_cg1_e || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Pemberdayaan / Aksi Kemanusiaan</span>
                                        <Badge variant="outline">{objectMetric.l2_cg1_f || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Kewirausahaan</span>
                                        <Badge variant="outline">{objectMetric.l2_cg1_g || 0}</Badge>
                                    </div>
                                </div>
                            </div>


                            {/* CG3 - Bahasa Inggris */}
                            <div>
                                <h4 className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
                                    CG3 - Bahasa Inggris
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span>Content</span>
                                        <Badge variant="outline">{objectMetric.l2_cg3_a || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Accuracy</span>
                                        <Badge variant="outline">{objectMetric.l2_cg3_b || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Fluency</span>
                                        <Badge variant="outline">{objectMetric.l2_cg3_c || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Pronounciation</span>
                                        <Badge variant="outline">{objectMetric.l2_cg3_d || 0}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Overall Performance</span>
                                        <Badge variant="outline">{objectMetric.l2_cg3_e || 0}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
