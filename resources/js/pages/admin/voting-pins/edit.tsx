import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Key, Save } from 'lucide-react';

interface VotingPagePin {
    id: number;
    pin: string;
    name: string;
    is_active: boolean;
    lifetime_minutes: number;
    expires_at: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    votingPin: VotingPagePin;
}

export default function VotingPinEdit({ votingPin }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: votingPin.name,
        lifetime_minutes: votingPin.lifetime_minutes.toString(),
        is_active: votingPin.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.voting-pins.update', votingPin.id));
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
        <AdminLayout title={`Edit PIN: ${votingPin.name}`} description="Edit voting page PIN">
            <Head title={`Edit ${votingPin.name} - NITISARA Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.voting-pins.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Edit PIN</h1>
                            <p className="text-muted-foreground">Edit informasi voting page PIN</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* PIN Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="h-5 w-5" />
                                    Informasi PIN
                                </CardTitle>
                                <CardDescription>Update informasi voting page PIN</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama PIN</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama PIN"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lifetime_minutes">Durasi (menit)</Label>
                                    <Input
                                        id="lifetime_minutes"
                                        type="number"
                                        min="5"
                                        value={data.lifetime_minutes}
                                        onChange={(e) => setData('lifetime_minutes', e.target.value)}
                                        placeholder="60"
                                        required
                                    />
                                    {errors.lifetime_minutes && (
                                        <p className="text-sm text-red-600">{errors.lifetime_minutes}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">Aktif</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* PIN Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Detail PIN</CardTitle>
                                <CardDescription>Informasi detail PIN saat ini</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Kode PIN</Label>
                                    <div className="bg-muted rounded p-2 font-mono text-lg font-bold">
                                        {votingPin.pin}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <div className="text-sm">
                                        {votingPin.is_active ? (
                                            <span className="font-medium text-green-600">Aktif</span>
                                        ) : (
                                            <span className="text-gray-600">Tidak Aktif</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Kadaluarsa</Label>
                                    <div className="text-muted-foreground text-sm">
                                        {formatDate(votingPin.expires_at)}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Dibuat</Label>
                                    <div className="text-muted-foreground text-sm">
                                        {formatDate(votingPin.created_at)}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Terakhir Diupdate</Label>
                                    <div className="text-muted-foreground text-sm">
                                        {formatDate(votingPin.updated_at)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex gap-2 pt-6">
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('admin.voting-pins.index')}>Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
