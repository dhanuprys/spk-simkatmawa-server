import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface ParticipantEditProps {
    participant: {
        id: number;
        team_name: string;
        city: string;
        company: string;
        category_id: number;
        event_year_id: number;
        leader_name: string;
        leader_email: string;
        leader_whatsapp: string;
        pin: number;
        category: { id: number; name: string };
        event_year: { id: number; year: string };
    };
    categories: Array<{ id: number; name: string }>;
    event_years: Array<{ id: number; year: string }>;
}

export default function ParticipantEdit({ participant, categories, event_years }: ParticipantEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        team_name: participant.team_name,
        city: participant.city,
        company: participant.company,
        category_id: participant.category_id,
        event_year_id: participant.event_year_id,
        leader_name: participant.leader_name,
        leader_email: participant.leader_email,
        leader_whatsapp: participant.leader_whatsapp,
        pin: participant.pin,
    });

    // Filter categories by selected event year
    const filteredCategories = categories.filter((category: any) => category.event_year_id === data.event_year_id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.participants.update', participant.id));
    };

    return (
        <AdminLayout title="Edit Peserta" description="Edit data peserta festival">
            <Head title="Edit Peserta - NITISARA Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('admin.participants.show', participant.id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Edit Peserta</h1>
                            <p className="text-muted-foreground">Edit data peserta: {participant.team_name}</p>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Form Edit Peserta</CardTitle>
                        <CardDescription>Perbarui informasi peserta festival film NITISARA</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Team Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Informasi Tim</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="team_name">Nama Tim *</Label>
                                        <Input
                                            id="team_name"
                                            value={data.team_name}
                                            onChange={(e) => setData('team_name', e.target.value)}
                                            placeholder="Masukkan nama tim"
                                            className={errors.team_name ? 'border-red-500' : ''}
                                        />
                                        {errors.team_name && <p className="text-sm text-red-500">{errors.team_name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="city">Kota *</Label>
                                        <Input
                                            id="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            placeholder="Masukkan kota"
                                            className={errors.city ? 'border-red-500' : ''}
                                        />
                                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company">Perusahaan/Institusi *</Label>
                                        <Input
                                            id="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            placeholder="Masukkan nama perusahaan"
                                            className={errors.company ? 'border-red-500' : ''}
                                        />
                                        {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="pin">PIN *</Label>
                                        <Input
                                            id="pin"
                                            type="number"
                                            value={data.pin}
                                            onChange={(e) => setData('pin', parseInt(e.target.value))}
                                            placeholder="Masukkan PIN"
                                            className={errors.pin ? 'border-red-500' : ''}
                                        />
                                        {errors.pin && <p className="text-sm text-red-500">{errors.pin}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Category and Event Year */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Kategori & Event</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="category_id">Kategori *</Label>
                                        <Select
                                            value={data.category_id.toString()}
                                            onValueChange={(value) => setData('category_id', parseInt(value))}
                                        >
                                            <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredCategories.length > 0 ? (
                                                    filteredCategories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="text-muted-foreground px-4 py-2">
                                                        Tidak ada kategori untuk tahun event ini
                                                    </div>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {errors.category_id && (
                                            <p className="text-sm text-red-500">{errors.category_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="event_year_id">Tahun Event *</Label>
                                        <Select
                                            value={data.event_year_id.toString()}
                                            onValueChange={(value) => setData('event_year_id', parseInt(value))}
                                        >
                                            <SelectTrigger className={errors.event_year_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih tahun event" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {event_years.map((year) => (
                                                    <SelectItem key={year.id} value={year.id.toString()}>
                                                        {year.year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.event_year_id && (
                                            <p className="text-sm text-red-500">{errors.event_year_id}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Leader Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Informasi Ketua Tim</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="leader_name">Nama Ketua *</Label>
                                        <Input
                                            id="leader_name"
                                            value={data.leader_name}
                                            onChange={(e) => setData('leader_name', e.target.value)}
                                            placeholder="Masukkan nama ketua tim"
                                            className={errors.leader_name ? 'border-red-500' : ''}
                                        />
                                        {errors.leader_name && (
                                            <p className="text-sm text-red-500">{errors.leader_name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="leader_email">Email *</Label>
                                        <Input
                                            id="leader_email"
                                            type="email"
                                            value={data.leader_email}
                                            onChange={(e) => setData('leader_email', e.target.value)}
                                            placeholder="Masukkan email"
                                            className={errors.leader_email ? 'border-red-500' : ''}
                                        />
                                        {errors.leader_email && (
                                            <p className="text-sm text-red-500">{errors.leader_email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="leader_whatsapp">WhatsApp *</Label>
                                        <Input
                                            id="leader_whatsapp"
                                            value={data.leader_whatsapp}
                                            onChange={(e) => setData('leader_whatsapp', e.target.value)}
                                            placeholder="Masukkan nomor WhatsApp"
                                            className={errors.leader_whatsapp ? 'border-red-500' : ''}
                                        />
                                        {errors.leader_whatsapp && (
                                            <p className="text-sm text-red-500">{errors.leader_whatsapp}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('admin.participants.show', participant.id)}>Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
