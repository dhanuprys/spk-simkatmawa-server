import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function CreateVotingPin() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        lifetime_minutes: 1440, // Default to 24 hours
        is_active: true,
    });

    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check for errors before submitting
        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            setErrorDialogOpen(true);
            return;
        }

        post(route('admin.voting-pins.store'));
    };

    return (
        <AdminLayout title="Buat PIN Page Login Baru">
            <Head title="Buat PIN Page Login Baru" />

            <div className="mb-6">
                <Button variant="outline" onClick={() => window.history.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                </Button>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Buat PIN Page Login Baru</CardTitle>
                    <CardDescription>PIN ini akan digunakan untuk Page Login (akses halaman voting)</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama PIN</Label>
                            <Input
                                id="name"
                                placeholder="Nama untuk identifikasi PIN"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            <p className="text-sm text-gray-500">Nama ini hanya untuk identifikasi internal</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lifetime_minutes">Durasi Aktif</Label>
                            <div className="flex space-x-2">
                                <Input
                                    id="lifetime_minutes"
                                    type="number"
                                    min={5}
                                    value={data.lifetime_minutes}
                                    onChange={(e) => setData('lifetime_minutes', Number(e.target.value))}
                                />
                                <span className="flex items-center">menit</span>
                            </div>
                            {errors.lifetime_minutes && (
                                <p className="text-sm text-red-500">{errors.lifetime_minutes}</p>
                            )}
                            <p className="text-sm text-gray-500">
                                Durasi PIN akan aktif setelah digunakan (1440 menit = 24 jam)
                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active">PIN aktif</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Error Dialog */}
            <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Terdapat Kesalahan</DialogTitle>
                        <DialogDescription>
                            <div className="mt-2 space-y-2">
                                {Object.entries(errorMessages).map(([field, message]) => (
                                    <p key={field} className="text-sm">
                                        <span className="font-medium">{field}:</span> {message}
                                    </p>
                                ))}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end">
                        <Button onClick={() => setErrorDialogOpen(false)}>Tutup</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
