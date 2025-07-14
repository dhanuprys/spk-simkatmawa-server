import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Award, Save } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description: string;
    max_duration: number;
    max_file_size: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    category: Category;
}

export default function CategoryEdit({ category, eventYearId }: { category: Category; eventYearId: number }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        is_active: category.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.event-years.categories.update', [eventYearId, category.id]));
    };

    return (
        <AdminLayout title="Edit Kategori" description="Edit kategori film">
            <Head title={`Edit Kategori - ${category.name} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('admin.event-years.show', eventYearId)}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Kategori</h1>
                        <p className="text-muted-foreground">Edit informasi kategori: {category.name}</p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Form Edit Kategori
                        </CardTitle>
                        <CardDescription>Update informasi kategori film</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Kategori *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Film Pendek, Dokumenter, Animasi"
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                />
                                <Label htmlFor="is_active">Kategori Aktif</Label>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Update Kategori'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('admin.event-years.show', eventYearId)}>Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
