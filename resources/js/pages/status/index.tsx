import SafeWidth from '@/components/safe-width';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Clock, Eye, Search, Shield, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const statusCheckSchema = z.object({
    pin: z.string().length(6, 'PIN harus 6 digit'),
});

type StatusCheckFormData = z.infer<typeof statusCheckSchema>;

interface StatusIndexProps {
    errors?: {
        pin?: string;
        session?: string;
    };
    flash?: {
        success?: string;
    };
}

export default function StatusIndex() {
    const { errors, flash } = usePage<SharedData>().props as StatusIndexProps;

    const form = useForm<StatusCheckFormData>({
        resolver: zodResolver(statusCheckSchema),
        defaultValues: {
            pin: '',
        },
    });

    // Ensure errors and flash are properly initialized
    const safeErrors = errors || {};
    const safeFlash = flash || {};

    const onSubmit = (data: StatusCheckFormData) => {
        router.post(route('status.check'), data);
    };

    return (
        <>
            <Head title="Cek Status - NITISARA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div>
                <Header autoHide alwaysSeamless />
                <SafeWidth className="py-24">
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <Search className="h-8 w-8 text-blue-600" />
                            </div>
                            <h1 className="font-luckiest mb-2 text-3xl">Cek Status Pendaftaran</h1>
                            <p className="text-muted-foreground">
                                Masukkan PIN pendaftaran Anda untuk melihat status verifikasi dan informasi tim
                            </p>
                        </div>

                        {/* Error Messages */}
                        {safeErrors.pin && (
                            <Alert className="mb-6 border-red-200 bg-red-50">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-800">{safeErrors.pin}</AlertDescription>
                            </Alert>
                        )}

                        {safeErrors.session && (
                            <Alert className="mb-6 border-red-200 bg-red-50">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-800">{safeErrors.session}</AlertDescription>
                            </Alert>
                        )}

                        {safeFlash.success && (
                            <Alert className="mb-6 border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">{safeFlash.success}</AlertDescription>
                            </Alert>
                        )}

                        {/* Status Check Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Masukkan PIN Pendaftaran
                                </CardTitle>
                                <CardDescription>
                                    PIN 6 digit yang Anda terima setelah pendaftaran berhasil
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="pin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>PIN Pendaftaran</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Contoh: 123456"
                                                            className="text-center font-mono text-lg tracking-widest"
                                                            maxLength={6}
                                                            autoComplete="off"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full" size="lg">
                                            <Eye className="mr-2 h-4 w-4" />
                                            Cek Status
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>

                        {/* Information Cards */}
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-sm">
                                        <Clock className="h-4 w-4" />
                                        Status Verifikasi
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                            <span>Menunggu - Sedang diverifikasi</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <span>Disetujui - Siap upload film</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                            <span>Ditolak - Perlu perbaikan</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-sm">
                                        <Users className="h-4 w-4" />
                                        Informasi yang Tersedia
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-3 w-3 text-green-600" />
                                            <span>Status verifikasi tim</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-3 w-3 text-green-600" />
                                            <span>Informasi tim dan ketua</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-3 w-3 text-green-600" />
                                            <span>Download dokumen</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-3 w-3 text-green-600" />
                                            <span>Status film yang diupload</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Help Section */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-sm">Butuh Bantuan?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">
                                    Jika Anda kehilangan PIN atau mengalami masalah, silakan hubungi tim support kami
                                    melalui halaman{' '}
                                    <a href="/contact" className="text-primary hover:underline">
                                        Kontak
                                    </a>
                                    .
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </SafeWidth>
                <Footer />
            </div>
        </>
    );
}
