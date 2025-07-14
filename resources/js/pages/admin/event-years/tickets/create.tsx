import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Info, Ticket, Users } from 'lucide-react';
import { useState } from 'react';

interface EventYear {
    id: number;
    year: number;
    title: string;
}

interface Props {
    eventYears: EventYear[];
    currentEventYear: EventYear;
    preselectedEventYear?: string;
}

export default function CreateTickets({ eventYears, currentEventYear, preselectedEventYear }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        quantity: 10,
        event_year_id: preselectedEventYear || String(currentEventYear.id),
    });

    const [showPreview, setShowPreview] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.event-years.tickets.store', currentEventYear.id));
    };

    const handleQuantityChange = (value: number) => {
        setData('quantity', value);
        setShowPreview(value > 0);
    };

    const estimatedTime = Math.ceil(data.quantity / 50); // Rough estimate: 50 tickets per second

    return (
        <AdminLayout title={`Buat Tiket Baru - ${currentEventYear.title}`}>
            <Head title={`Buat Tiket Baru - ${currentEventYear.title}`} />

            <div className="mb-6">
                <Button variant="outline" asChild>
                    <Link href={route('admin.event-years.tickets.index', currentEventYear.id)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Manajemen Tiket
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                    <Ticket className="text-primary h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle>Buat Tiket Baru</CardTitle>
                                    <CardDescription>
                                        Generate tiket voting untuk event {currentEventYear.title}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-6">
                                {/* Event Information */}
                                <div className="bg-muted/50 rounded-lg border p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Info className="text-muted-foreground h-4 w-4" />
                                        <h4 className="font-medium">Event Information</h4>
                                    </div>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div>
                                            <Label className="text-sm font-medium">Event</Label>
                                            <p className="text-muted-foreground text-sm">
                                                {currentEventYear.year} - {currentEventYear.title}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Status</Label>
                                            <p className="text-muted-foreground text-sm">Active</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Quantity Input */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Users className="text-muted-foreground h-4 w-4" />
                                        <Label htmlFor="quantity" className="text-base font-medium">
                                            Jumlah Tiket
                                        </Label>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Input
                                                id="quantity"
                                                type="number"
                                                min={1}
                                                max={1000}
                                                value={data.quantity}
                                                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                                                className="font-mono text-lg"
                                                placeholder="10"
                                            />
                                            {errors.quantity && (
                                                <div className="flex items-center gap-2 text-sm text-red-500">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.quantity}
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(10)}
                                                    className="flex-1"
                                                >
                                                    10
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(50)}
                                                    className="flex-1"
                                                >
                                                    50
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(100)}
                                                    className="flex-1"
                                                >
                                                    100
                                                </Button>
                                            </div>
                                            <p className="text-muted-foreground text-xs">
                                                Maksimal 1000 tiket per batch
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Event Year Selection (Hidden but required) */}
                                <input type="hidden" name="event_year_id" value={data.event_year_id} />
                                {errors.event_year_id && (
                                    <div className="flex items-center gap-2 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.event_year_id}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex gap-3">
                                <Button type="submit" disabled={processing} className="flex-1">
                                    {processing ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Membuat {data.quantity} Tiket...
                                        </>
                                    ) : (
                                        <>
                                            <Ticket className="mr-2 h-4 w-4" />
                                            Buat {data.quantity} Tiket
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    disabled={processing}
                                >
                                    Batal
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                {/* Preview & Info Panel */}
                <div className="space-y-6">
                    {/* Preview Card */}
                    {showPreview && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Preview</CardTitle>
                                <CardDescription>Informasi tiket yang akan dibuat</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Jumlah Tiket</span>
                                        <span className="font-medium">{data.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Event</span>
                                        <span className="font-medium">{currentEventYear.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Estimasi Waktu</span>
                                        <span className="font-medium">{estimatedTime}s</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="bg-primary/5 rounded-lg p-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Info className="text-primary h-4 w-4" />
                                        <span className="text-primary">
                                            Tiket akan dibuat dengan kode unik 4 karakter
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Informasi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="text-xs font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Kode Unik</h4>
                                        <p className="text-muted-foreground text-xs">
                                            Setiap tiket akan memiliki kode unik 4 karakter
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <span className="text-xs font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Terkait Event</h4>
                                        <p className="text-muted-foreground text-xs">
                                            Tiket hanya bisa digunakan untuk event ini
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                        <span className="text-xs font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Satu Kali Pakai</h4>
                                        <p className="text-muted-foreground text-xs">
                                            Setiap tiket hanya bisa digunakan sekali untuk voting
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
