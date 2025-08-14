import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

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
    l1_cg2_a_value: number | null;
    l1_cg2_b_value: number | null;
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

export default function Edit({ criteriaTemplate }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: criteriaTemplate.name,
        description: criteriaTemplate.description || '',

        // L3 Criteria Values
        l3_cg1_a_value: criteriaTemplate.l3_cg1_a_value?.toString() || '',
        l3_cg1_b_value: criteriaTemplate.l3_cg1_b_value?.toString() || '',
        l3_cg1_c_value: criteriaTemplate.l3_cg1_c_value?.toString() || '',
        l3_cg2_a_value: criteriaTemplate.l3_cg2_a_value?.toString() || '',
        l3_cg2_b_value: criteriaTemplate.l3_cg2_b_value?.toString() || '',

        // L3 Criteria Max Flags
        l3_cg1_a_max: criteriaTemplate.l3_cg1_a_max,
        l3_cg1_b_max: criteriaTemplate.l3_cg1_b_max,
        l3_cg1_c_max: criteriaTemplate.l3_cg1_c_max,
        l3_cg2_a_max: criteriaTemplate.l3_cg2_a_max,
        l3_cg2_b_max: criteriaTemplate.l3_cg2_b_max,

        // L2 Criteria Values
        l2_cg1_a_value: criteriaTemplate.l2_cg1_a_value?.toString() || '',
        l2_cg1_b_value: criteriaTemplate.l2_cg1_b_value?.toString() || '',
        l2_cg1_c_value: criteriaTemplate.l2_cg1_c_value?.toString() || '',
        l2_cg1_d_value: criteriaTemplate.l2_cg1_d_value?.toString() || '',
        l2_cg1_e_value: criteriaTemplate.l2_cg1_e_value?.toString() || '',
        l2_cg1_f_value: criteriaTemplate.l2_cg1_f_value?.toString() || '',
        l2_cg1_g_value: criteriaTemplate.l2_cg1_g_value?.toString() || '',
        l2_cg2_a_value: criteriaTemplate.l2_cg2_a_value?.toString() || '',
        l2_cg2_b_value: criteriaTemplate.l2_cg2_b_value?.toString() || '',
        l2_cg3_a_value: criteriaTemplate.l2_cg3_a_value?.toString() || '',
        l2_cg3_b_value: criteriaTemplate.l2_cg3_b_value?.toString() || '',
        l2_cg3_c_value: criteriaTemplate.l2_cg3_c_value?.toString() || '',
        l2_cg3_d_value: criteriaTemplate.l2_cg3_d_value?.toString() || '',
        l2_cg3_e_value: criteriaTemplate.l2_cg3_e_value?.toString() || '',

        // L2 Criteria Max Flags
        l2_cg1_a_max: criteriaTemplate.l2_cg1_a_max,
        l2_cg1_b_max: criteriaTemplate.l2_cg1_b_max,
        l2_cg1_c_max: criteriaTemplate.l2_cg1_c_max,
        l2_cg1_d_max: criteriaTemplate.l2_cg1_d_max,
        l2_cg1_e_max: criteriaTemplate.l2_cg1_e_max,
        l2_cg1_f_max: criteriaTemplate.l2_cg1_f_max,
        l2_cg1_g_max: criteriaTemplate.l2_cg1_g_max,
        l2_cg2_a_max: criteriaTemplate.l2_cg2_a_max,
        l2_cg2_b_max: criteriaTemplate.l2_cg2_b_max,
        l2_cg3_a_max: criteriaTemplate.l2_cg3_a_max,
        l2_cg3_b_max: criteriaTemplate.l2_cg3_b_max,
        l2_cg3_c_max: criteriaTemplate.l2_cg3_c_max,
        l2_cg3_d_max: criteriaTemplate.l2_cg3_d_max,
        l2_cg3_e_max: criteriaTemplate.l2_cg3_e_max,

        // L1 Criteria Values
        l1_cg1_a_value: criteriaTemplate.l1_cg1_a_value?.toString() || '',
        l1_cg1_b_value: criteriaTemplate.l1_cg1_b_value?.toString() || '',
        l1_cg1_c_value: criteriaTemplate.l1_cg1_c_value?.toString() || '',

        // L1 Criteria Max Flags
        l1_cg1_a_max: criteriaTemplate.l1_cg1_a_max,
        l1_cg1_b_max: criteriaTemplate.l1_cg1_b_max,
        l1_cg1_c_max: criteriaTemplate.l1_cg1_c_max,

        // Result settings
        limit: criteriaTemplate.limit,
        ascending: criteriaTemplate.ascending,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.criteria-templates.update', criteriaTemplate.id));
    };

    return (
        <AdminLayout title={`Edit ${criteriaTemplate.name}`} description="Edit template kriteria">
            <Head title={`Edit ${criteriaTemplate.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.criteria-templates.show', criteriaTemplate.id)}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Edit Template Kriteria</h2>
                            <p className="text-muted-foreground">Edit template kriteria "{criteriaTemplate.name}"</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Dasar</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Template *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama template"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Deskripsi</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Masukkan deskripsi template"
                                            rows={3}
                                        />
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
                                    <h4 className="text-lg font-medium">CG1 - Penyajian</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg1_a_value">CG1 A - Substansi *</Label>
                                            <Input
                                                id="l3_cg1_a_value"
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data.l3_cg1_a_value}
                                                onChange={(e) => setData('l3_cg1_a_value', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="l3_cg1_a_max"
                                                    checked={data.l3_cg1_a_max}
                                                    onCheckedChange={(checked) => setData('l3_cg1_a_max', checked)}
                                                />
                                                <Label htmlFor="l3_cg1_a_max">
                                                    {data.l3_cg1_a_max ? 'MAX' : 'MIN'}
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg1_b_value">CG1 B - Pengakuan *</Label>
                                            <Input
                                                id="l3_cg1_b_value"
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data.l3_cg1_b_value}
                                                onChange={(e) => setData('l3_cg1_b_value', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="l3_cg1_b_max"
                                                    checked={data.l3_cg1_b_max}
                                                    onCheckedChange={(checked) => setData('l3_cg1_b_max', checked)}
                                                />
                                                <Label htmlFor="l3_cg1_b_max">
                                                    {data.l3_cg1_b_max ? 'MAX' : 'MIN'}
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg1_c_value">CG1 C - Penilaian *</Label>
                                            <Input
                                                id="l3_cg1_c_value"
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data.l3_cg1_c_value}
                                                onChange={(e) => setData('l3_cg1_c_value', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="l3_cg1_c_max"
                                                    checked={data.l3_cg1_c_max}
                                                    onCheckedChange={(checked) => setData('l3_cg1_c_max', checked)}
                                                />
                                                <Label htmlFor="l3_cg1_c_max">
                                                    {data.l3_cg1_c_max ? 'MAX' : 'MIN'}
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CG2 */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-medium">CG2 - Substansi</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg2_a_value">CG2 A - Kualitas *</Label>
                                            <Input
                                                id="l3_cg2_a_value"
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data.l3_cg2_a_value}
                                                onChange={(e) => setData('l3_cg2_a_value', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="l3_cg2_a_max"
                                                    checked={data.l3_cg2_a_max}
                                                    onCheckedChange={(checked) => setData('l3_cg2_a_max', checked)}
                                                />
                                                <Label htmlFor="l3_cg2_a_max">
                                                    {data.l3_cg2_a_max ? 'MAX' : 'MIN'}
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg2_b_value">CG2 B - Relevansi *</Label>
                                            <Input
                                                id="l3_cg2_b_value"
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data.l3_cg2_b_value}
                                                onChange={(e) => setData('l3_cg2_b_value', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="l3_cg2_b_max"
                                                    checked={data.l3_cg2_b_max}
                                                    onCheckedChange={(checked) => setData('l3_cg2_b_max', checked)}
                                                />
                                                <Label htmlFor="l3_cg2_b_max">
                                                    {data.l3_cg2_b_max ? 'MAX' : 'MIN'}
                                                </Label>
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
                                    <h4 className="text-lg font-medium">CG1 - Penyajian</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                        {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((letter) => (
                                            <div key={letter} className="space-y-2">
                                                <Label htmlFor={`l2_cg1_${letter}_value`}>
                                                    CG1 {letter.toUpperCase()} *
                                                </Label>
                                                <Input
                                                    id={`l2_cg1_${letter}_value`}
                                                    type="number"
                                                    step="0.000001"
                                                    min="0"
                                                    max="10000"
                                                    value={
                                                        data[`l2_cg1_${letter}_value` as keyof typeof data] as string
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `l2_cg1_${letter}_value` as keyof typeof data,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id={`l2_cg1_${letter}_max`}
                                                        checked={
                                                            data[`l2_cg1_${letter}_max` as keyof typeof data] as boolean
                                                        }
                                                        onCheckedChange={(checked) =>
                                                            setData(
                                                                `l2_cg1_${letter}_max` as keyof typeof data,
                                                                checked,
                                                            )
                                                        }
                                                    />
                                                    <Label htmlFor={`l2_cg1_${letter}_max`}>
                                                        {(data[`l2_cg1_${letter}_max` as keyof typeof data] as boolean)
                                                            ? 'MAX'
                                                            : 'MIN'}
                                                    </Label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CG2 */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-medium">CG2 - Substansi</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {['a', 'b'].map((letter) => (
                                            <div key={letter} className="space-y-2">
                                                <Label htmlFor={`l2_cg2_${letter}_value`}>
                                                    CG2 {letter.toUpperCase()} *
                                                </Label>
                                                <Input
                                                    id={`l2_cg2_${letter}_value`}
                                                    type="number"
                                                    step="0.000001"
                                                    min="0"
                                                    max="10000"
                                                    value={
                                                        data[`l2_cg2_${letter}_value` as keyof typeof data] as string
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `l2_cg2_${letter}_value` as keyof typeof data,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id={`l2_cg2_${letter}_max`}
                                                        checked={
                                                            data[`l2_cg2_${letter}_max` as keyof typeof data] as boolean
                                                        }
                                                        onCheckedChange={(checked) =>
                                                            setData(
                                                                `l2_cg2_${letter}_max` as keyof typeof data,
                                                                checked,
                                                            )
                                                        }
                                                    />
                                                    <Label htmlFor={`l2_cg2_${letter}_max`}>
                                                        {(data[`l2_cg2_${letter}_max` as keyof typeof data] as boolean)
                                                            ? 'MAX'
                                                            : 'MIN'}
                                                    </Label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CG3 */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-medium">CG3 - Penilaian</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                        {['a', 'b', 'c', 'd', 'e'].map((letter) => (
                                            <div key={letter} className="space-y-2">
                                                <Label htmlFor={`l2_cg3_${letter}_value`}>
                                                    CG3 {letter.toUpperCase()} *
                                                </Label>
                                                <Input
                                                    id={`l2_cg3_${letter}_value`}
                                                    type="number"
                                                    step="0.000001"
                                                    min="0"
                                                    max="10000"
                                                    value={
                                                        data[`l2_cg3_${letter}_value` as keyof typeof data] as string
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `l2_cg3_${letter}_value` as keyof typeof data,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id={`l2_cg3_${letter}_max`}
                                                        checked={
                                                            data[`l2_cg3_${letter}_max` as keyof typeof data] as boolean
                                                        }
                                                        onCheckedChange={(checked) =>
                                                            setData(
                                                                `l2_cg3_${letter}_max` as keyof typeof data,
                                                                checked,
                                                            )
                                                        }
                                                    />
                                                    <Label htmlFor={`l2_cg3_${letter}_max`}>
                                                        {(data[`l2_cg3_${letter}_max` as keyof typeof data] as boolean)
                                                            ? 'MAX'
                                                            : 'MIN'}
                                                    </Label>
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
                                    <h4 className="text-lg font-medium">CG1 - Penyajian</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        {['a', 'b', 'c'].map((letter) => (
                                            <div key={letter} className="space-y-2">
                                                <Label htmlFor={`l1_cg1_${letter}_value`}>
                                                    CG1 {letter.toUpperCase()} *
                                                </Label>
                                                <Input
                                                    id={`l1_cg1_${letter}_value`}
                                                    type="number"
                                                    step="0.000001"
                                                    min="0"
                                                    max="10000"
                                                    value={
                                                        data[`l1_cg1_${letter}_value` as keyof typeof data] as string
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `l1_cg1_${letter}_value` as keyof typeof data,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id={`l1_cg1_${letter}_max`}
                                                        checked={
                                                            data[`l1_cg1_${letter}_max` as keyof typeof data] as boolean
                                                        }
                                                        onCheckedChange={(checked) =>
                                                            setData(
                                                                `l1_cg1_${letter}_max` as keyof typeof data,
                                                                checked,
                                                            )
                                                        }
                                                    />
                                                    <Label htmlFor={`l1_cg1_${letter}_max`}>
                                                        {(data[`l1_cg1_${letter}_max` as keyof typeof data] as boolean)
                                                            ? 'MAX'
                                                            : 'MIN'}
                                                    </Label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CG2 */}
                            </CardContent>
                        </Card>

                        {/* Result Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan Hasil</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="limit">Limit Hasil *</Label>
                                        <Input
                                            id="limit"
                                            type="number"
                                            min="1"
                                            max="10000"
                                            value={data.limit}
                                            onChange={(e) => setData('limit', parseInt(e.target.value) || 10)}
                                            placeholder="10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ascending">Urutan</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="ascending"
                                                checked={data.ascending}
                                                onCheckedChange={(checked) => setData('ascending', checked)}
                                            />
                                            <Label htmlFor="ascending">
                                                {data.ascending
                                                    ? 'Ascending (Terendah ke Tertinggi)'
                                                    : 'Descending (Tertinggi ke Terendah)'}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <Link href={route('admin.criteria-templates.show', criteriaTemplate.id)}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Update Template'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
