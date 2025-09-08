import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, FileText } from 'lucide-react';

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
    criteriaTemplate: CriteriaTemplate;
}

export default function Show({ criteriaTemplate }: Props) {
    const formatValue = (value: number | string | null) => {
        if (value === null) return '-';
        return parseFloat(value as string).toFixed(6);
    };

    const getMaxBadge = (isMax: boolean) => {
        return isMax ? (
            <Badge variant="default" className="ml-2">
                MAX
            </Badge>
        ) : (
            <Badge variant="secondary" className="ml-2">
                MIN
            </Badge>
        );
    };

    return (
        <AdminLayout title={criteriaTemplate.name} description="Detail template kriteria">
            <Head title={criteriaTemplate.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.criteria-templates.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{criteriaTemplate.name}</h2>
                            <p className="text-muted-foreground">Detail template kriteria penilaian</p>
                        </div>
                    </div>
                    <Link href={route('admin.criteria-templates.edit', criteriaTemplate.id)}>
                        <Button size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Template
                        </Button>
                    </Link>
                </div>

                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Informasi Dasar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Nama Template</label>
                                <p className="text-lg font-semibold">{criteriaTemplate.name}</p>
                            </div>
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Deskripsi</label>
                                <p className="text-lg">{criteriaTemplate.description || '-'}</p>
                            </div>
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Limit Hasil</label>
                                <p className="text-lg font-semibold">{criteriaTemplate.limit}</p>
                            </div>
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Urutan</label>
                                <p className="text-lg font-semibold">
                                    {criteriaTemplate.ascending
                                        ? 'Ascending (Terendah ke Tertinggi)'
                                        : 'Descending (Tertinggi ke Terendah)'}
                                </p>
                            </div>
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Dibuat Pada</label>
                                <p className="text-lg">
                                    {new Date(criteriaTemplate.created_at).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <label className="text-muted-foreground text-sm font-medium">Terakhir Diupdate</label>
                                <p className="text-lg">
                                    {new Date(criteriaTemplate.updated_at).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* L3 Criteria */}
                <Card>
                    <CardHeader>
                        <CardTitle>Kriteria L3 (Level 3)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* CG1 */}
                        <div className="space-y-4">
                            <h4 className="border-b pb-2 text-lg font-medium">CG1 - Penyajian</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label className="text-muted-foreground text-sm font-medium">
                                        CG1 A - Substansi
                                    </label>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold">
                                            {formatValue(criteriaTemplate.l3_cg1_a_value)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate.l3_cg1_a_max)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-muted-foreground text-sm font-medium">
                                        CG1 B - Pengakuan
                                    </label>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold">
                                            {formatValue(criteriaTemplate.l3_cg1_b_value)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate.l3_cg1_b_max)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-muted-foreground text-sm font-medium">
                                        CG1 C - Penilaian
                                    </label>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold">
                                            {formatValue(criteriaTemplate.l3_cg1_c_value)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate.l3_cg1_c_max)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CG2 */}
                        <div className="space-y-4">
                            <h4 className="border-b pb-2 text-lg font-medium">CG2 - Substansi</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-muted-foreground text-sm font-medium">
                                        CG2 A - Kualitas
                                    </label>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold">
                                            {formatValue(criteriaTemplate.l3_cg2_a_value)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate.l3_cg2_a_max)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-muted-foreground text-sm font-medium">
                                        CG2 B - Relevansi
                                    </label>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold">
                                            {formatValue(criteriaTemplate.l3_cg2_b_value)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate.l3_cg2_b_max)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* L2 Criteria */}
                <Card>
                    <CardHeader>
                        <CardTitle>Kriteria L2 (Level 2)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* CG1 */}
                        <div className="space-y-4">
                            <h4 className="border-b pb-2 text-lg font-medium">CG1 - Penyajian</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((letter) => (
                                    <div key={letter} className="space-y-2">
                                        <label className="text-muted-foreground text-sm font-medium">
                                            CG1 {letter.toUpperCase()}
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold">
                                                {formatValue(
                                                    criteriaTemplate[
                                                        `l2_cg1_${letter}_value` as keyof typeof criteriaTemplate
                                                    ] as number | null,
                                                )}
                                            </span>
                                            {getMaxBadge(
                                                criteriaTemplate[
                                                    `l2_cg1_${letter}_max` as keyof typeof criteriaTemplate
                                                ] as boolean,
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CG2 */}
                        <div className="space-y-4">
                            <h4 className="border-b pb-2 text-lg font-medium">CG2 - Substansi</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {['a', 'b'].map((letter) => (
                                    <div key={letter} className="space-y-2">
                                        <label className="text-muted-foreground text-sm font-medium">
                                            CG2 {letter.toUpperCase()}
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold">
                                                {formatValue(
                                                    criteriaTemplate[
                                                        `l2_cg2_${letter}_value` as keyof typeof criteriaTemplate
                                                    ] as number | null,
                                                )}
                                            </span>
                                            {getMaxBadge(
                                                criteriaTemplate[
                                                    `l2_cg2_${letter}_max` as keyof typeof criteriaTemplate
                                                ] as boolean,
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CG3 */}
                        <div className="space-y-4">
                            <h4 className="border-b pb-2 text-lg font-medium">CG3 - Penilaian</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                {['a', 'b', 'c', 'd', 'e'].map((letter) => (
                                    <div key={letter} className="space-y-2">
                                        <label className="text-muted-foreground text-sm font-medium">
                                            CG3 {letter.toUpperCase()}
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold">
                                                {formatValue(
                                                    criteriaTemplate[
                                                        `l2_cg3_${letter}_value` as keyof typeof criteriaTemplate
                                                    ] as number | null,
                                                )}
                                            </span>
                                            {getMaxBadge(
                                                criteriaTemplate[
                                                    `l2_cg3_${letter}_max` as keyof typeof criteriaTemplate
                                                ] as boolean,
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* L1 Criteria */}
                <Card>
                    <CardHeader>
                        <CardTitle>Kriteria L1 (Level 1)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* CG1 */}
                        <div className="space-y-4">
                            <h4 className="border-b pb-2 text-lg font-medium">CG1 - Penyajian</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {['a', 'b', 'c'].map((letter) => (
                                    <div key={letter} className="space-y-2">
                                        <label className="text-muted-foreground text-sm font-medium">
                                            CG1 {letter.toUpperCase()}
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold">
                                                {formatValue(
                                                    criteriaTemplate[
                                                        `l1_cg1_${letter}_value` as keyof typeof criteriaTemplate
                                                    ] as number | null,
                                                )}
                                            </span>
                                            {getMaxBadge(
                                                criteriaTemplate[
                                                    `l1_cg1_${letter}_max` as keyof typeof criteriaTemplate
                                                ] as boolean,
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link href={route('admin.criteria-templates.index')}>
                        <Button variant="outline">Kembali ke Daftar</Button>
                    </Link>
                    <Link href={route('admin.criteria-templates.edit', criteriaTemplate.id)}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Template
                        </Button>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
