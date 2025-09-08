import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',

        // L3 Criteria
        l3_cg1_a: '',
        l3_cg1_b: '',
        l3_cg1_c: '',
        l3_cg2_a: '',
        l3_cg2_b: '',

        // L2 Criteria
        l2_cg1_a: '',
        l2_cg1_b: '',
        l2_cg1_c: '',
        l2_cg1_d: '',
        l2_cg1_e: '',
        l2_cg1_f: '',
        l2_cg1_g: '',
        l2_cg2_a: '',
        l2_cg2_b: '',
        l2_cg3_a: '',
        l2_cg3_b: '',
        l2_cg3_c: '',
        l2_cg3_d: '',
        l2_cg3_e: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.object-metrics.store'));
    };

    const handleInputChange = (field: string, value: string) => {
        setData(field, value === '' ? 0 : parseInt(value));
    };

    return (
        <AdminLayout title="Tambah Metrik" description="Buat metrik penilaian baru">
            <Head title="Tambah Metrik" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('admin.object-metrics.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Tambah Metrik</h2>
                        <p className="text-muted-foreground">Buat metrik penilaian baru untuk mahasiswa</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Mahasiswa *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama mahasiswa"
                                    error={errors.name}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* L3 Criteria */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Kriteria Level 3 (L3)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                                        CG1 - Penilaian Dasar
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg1_a">Penyajian *</Label>
                                            <Input
                                                id="l3_cg1_a"
                                                type="number"
                                                value={data.l3_cg1_a || ''}
                                                onChange={(e) => handleInputChange('l3_cg1_a', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg1_b">Substansi *</Label>
                                            <Input
                                                id="l3_cg1_b"
                                                type="number"
                                                value={data.l3_cg1_b || ''}
                                                onChange={(e) => handleInputChange('l3_cg1_b', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg1_c">Kualitas *</Label>
                                            <Input
                                                id="l3_cg1_c"
                                                type="number"
                                                value={data.l3_cg1_c || ''}
                                                onChange={(e) => handleInputChange('l3_cg1_c', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                                        CG2 - Penilaian Lanjutan
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg2_a">Presentasi *</Label>
                                            <Input
                                                id="l3_cg2_a"
                                                type="number"
                                                value={data.l3_cg2_a || ''}
                                                onChange={(e) => handleInputChange('l3_cg2_a', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l3_cg2_b">Tanya Jawab *</Label>
                                            <Input
                                                id="l3_cg2_b"
                                                type="number"
                                                value={data.l3_cg2_b || ''}
                                                onChange={(e) => handleInputChange('l3_cg2_b', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
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
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {/* CG1 - Penilaian Kompetensi */}
                                <div className="space-y-4">
                                    <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                                        CG1 - Kompetensi
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg1_a">Kompetisi *</Label>
                                            <Input
                                                id="l2_cg1_a"
                                                type="number"
                                                value={data.l2_cg1_a || ''}
                                                onChange={(e) => handleInputChange('l2_cg1_a', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg1_b">Pengakuan *</Label>
                                            <Input
                                                id="l2_cg1_b"
                                                type="number"
                                                value={data.l2_cg1_b || ''}
                                                onChange={(e) => handleInputChange('l2_cg1_b', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg1_c">Penghargaan *</Label>
                                            <Input
                                                id="l2_cg1_c"
                                                type="number"
                                                value={data.l2_cg1_c || ''}
                                                onChange={(e) => handleInputChange('l2_cg1_c', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg1_d">Karier Organisasi *</Label>
                                            <Input
                                                id="l2_cg1_d"
                                                type="number"
                                                value={data.l2_cg1_d || ''}
                                                onChange={(e) => handleInputChange('l2_cg1_d', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg1_e">Hasil Karya *</Label>
                                            <Input
                                                id="l2_cg1_e"
                                                type="number"
                                                value={data.l2_cg1_e || ''}
                                                onChange={(e) => handleInputChange('l2_cg1_e', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg1_f">Pemberdayaan / Aksi Kemanusiaan *</Label>
                                            <Input
                                                id="l2_cg1_f"
                                                type="number"
                                                value={data.l2_cg1_f || ''}
                                                onChange={(e) => handleInputChange('l2_cg1_f', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg1_g">Kewirausahaan *</Label>
                                            <Input
                                                id="l2_cg1_g"
                                                type="number"
                                                value={data.l2_cg1_g || ''}
                                                onChange={(e) => handleInputChange('l2_cg1_g', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CG2 - Penilaian GK */}
                                <div className="space-y-4">
                                    <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                                        CG2 - GK
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg2_a">Naskah GK *</Label>
                                            <Input
                                                id="l2_cg2_a"
                                                type="number"
                                                value={data.l2_cg2_a || ''}
                                                onChange={(e) => handleInputChange('l2_cg2_a', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg2_b">Presentasi GK *</Label>
                                            <Input
                                                id="l2_cg2_b"
                                                type="number"
                                                value={data.l2_cg2_b || ''}
                                                onChange={(e) => handleInputChange('l2_cg2_b', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CG3 - Penilaian Bahasa Inggris */}
                                <div className="space-y-4">
                                    <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                                        CG3 - Bahasa Inggris
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg3_a">Content *</Label>
                                            <Input
                                                id="l2_cg3_a"
                                                type="number"
                                                value={data.l2_cg3_a || ''}
                                                onChange={(e) => handleInputChange('l2_cg3_a', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg3_b">Accuracy *</Label>
                                            <Input
                                                id="l2_cg3_b"
                                                type="number"
                                                value={data.l2_cg3_b || ''}
                                                onChange={(e) => handleInputChange('l2_cg3_b', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg3_c">Fluency *</Label>
                                            <Input
                                                id="l2_cg3_c"
                                                type="number"
                                                value={data.l2_cg3_c || ''}
                                                onChange={(e) => handleInputChange('l2_cg3_c', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg3_d">Pronounciation *</Label>
                                            <Input
                                                id="l2_cg3_d"
                                                type="number"
                                                value={data.l2_cg3_d || ''}
                                                onChange={(e) => handleInputChange('l2_cg3_d', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="l2_cg3_e">Overall Performance *</Label>
                                            <Input
                                                id="l2_cg3_e"
                                                type="number"
                                                value={data.l2_cg3_e || ''}
                                                onChange={(e) => handleInputChange('l2_cg3_e', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('admin.object-metrics.index')}>
                            <Button variant="outline" type="button">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Metrik'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
