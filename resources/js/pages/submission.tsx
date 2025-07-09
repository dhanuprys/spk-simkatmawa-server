import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Clock, FileVideo, LogOut, Shield, Upload, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Participant {
    id: number;
    team_name: string;
    leader_name: string;
    city: string;
    company: string;
    pin: string;
    eventYear: {
        id: number;
        title: string;
        submission_start_date: string;
        submission_end_date: string;
    };
}

interface Film {
    id: number;
    film_url: string;
    direct_video_url: string | null;
    originality_file: string;
    poster_file: string;
    backdrop_file: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    participant: Participant | null;
    existingFilm: Film | null;
    eventYear: any;
    isSubmissionOpen: boolean;
}

export default function Submission({ participant, existingFilm, eventYear, isSubmissionOpen }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [dragOver, setDragOver] = useState<string | null>(null);
    const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
    const [currentDigit, setCurrentDigit] = useState(0);

    const pinForm = useForm({
        pin: '',
    });

    const filmForm = useForm({
        film_url: existingFilm?.film_url || '',
        direct_video_url: existingFilm?.direct_video_url || '',
        originality_file: null as File | null,
        poster_file: null as File | null,
        backdrop_file: null as File | null,
    });

    // Auto-focus first input on mount
    useEffect(() => {
        const firstInput = document.getElementById('pin-0');
        if (firstInput) {
            firstInput.focus();
        }
    }, []);

    // Reset PIN digits when there's an error
    useEffect(() => {
        if (pinForm.errors.pin) {
            setPinDigits(['', '', '', '', '', '']);
            setCurrentDigit(0);
            // Focus back to first input after reset
            setTimeout(() => {
                const firstInput = document.getElementById('pin-0');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        }
    }, [pinForm.errors.pin]);

    const handlePinDigitChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit

        const newPinDigits = [...pinDigits];
        newPinDigits[index] = value;
        setPinDigits(newPinDigits);

        // Auto-focus next input
        if (value && index < 5) {
            setCurrentDigit(index + 1);
            const nextInput = document.getElementById(`pin-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }

        // Update form data
        const fullPin = newPinDigits.join('');
        pinForm.setData('pin', fullPin);
    };

    const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
            // Move to previous input on backspace if current is empty
            setCurrentDigit(index - 1);
            const prevInput = document.getElementById(`pin-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullPin = pinDigits.join('');
        if (fullPin.length === 6) {
            pinForm.setData('pin', fullPin);
            pinForm.post(route('submission.verify'));
        }
    };

    const handleFilmSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (existingFilm) {
            filmForm.put(route('submission.update', existingFilm.id));
        } else {
            filmForm.post(route('submission.store'));
        }
    };

    const handleLogout = () => {
        // @ts-ignore
        window.location.href = route('submission.logout');
    };

    const handleDragOver = (e: React.DragEvent, field: string) => {
        e.preventDefault();
        setDragOver(field);
    };

    const handleDragLeave = () => {
        setDragOver(null);
    };

    const handleDrop = (e: React.DragEvent, field: string) => {
        e.preventDefault();
        setDragOver(null);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            filmForm.setData(field, files[0]);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (!participant) {
        return (
            <>
                <Head title="Submit Film - NITISARA" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                    <Header autoHide alwaysSeamless />

                    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
                        <div className="mx-auto w-full max-w-lg">
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <h1 className="mb-2 text-3xl font-bold text-gray-900">Submit Film NITISARA</h1>
                                <p className="text-lg text-gray-600">
                                    Masukkan PIN registrasi Anda untuk mengakses halaman submit film
                                </p>
                            </div>

                            {/* PIN Input Form */}
                            <form onSubmit={handlePinSubmit} className="space-y-6">
                                {/* PIN Input Fields */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-medium text-gray-700">Masukkan PIN Anda</Label>
                                    <div className="flex justify-center gap-3">
                                        {pinDigits.map((digit, index) => (
                                            <div key={index} className="relative">
                                                <Input
                                                    id={`pin-${index}`}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handlePinDigitChange(index, e.target.value)}
                                                    onKeyDown={(e) => handlePinKeyDown(index, e)}
                                                    className={`h-12 w-12 border-2 text-center text-lg font-semibold transition-all duration-200 ${
                                                        currentDigit === index
                                                            ? 'border-primary ring-primary/20 ring-2'
                                                            : digit
                                                              ? 'border-green-500 bg-green-50'
                                                              : 'border-gray-300 hover:border-gray-400'
                                                    } ${pinForm.errors.pin ? 'border-red-500' : ''}`}
                                                    placeholder="•"
                                                />
                                                {digit && (
                                                    <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-green-500" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {pinForm.errors.pin && (
                                        <div className="text-center">
                                            <p className="rounded-md bg-red-50 p-2 text-sm text-red-600">
                                                {pinForm.errors.pin}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 w-full transform bg-gradient-to-r text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                                    disabled={pinForm.processing || pinDigits.join('').length !== 6}
                                >
                                    {pinForm.processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Memverifikasi...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-4 w-4" />
                                            Verifikasi PIN
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>

                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Submit Film - NITISARA" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <Header autoHide alwaysSeamless />

                <div className="container mx-auto px-4 py-8">
                    {/* Profile Card */}
                    <Card className="mb-8 border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="from-primary to-primary/80 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{participant.team_name}</h3>
                                        <p className="text-sm text-gray-600">
                                            Ketua: {participant.leader_name} • {participant.city}
                                        </p>
                                        <p className="text-sm text-gray-600">{participant.company}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                                        PIN: {participant.pin}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="hover:bg-red-50 hover:text-red-600"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Ganti PIN
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submission Status */}
                    {!isSubmissionOpen && (
                        <Alert className="mb-6 border-amber-200 bg-amber-50">
                            <Clock className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800">
                                Periode submit film: {formatDate(eventYear.submission_start_date)} -{' '}
                                {formatDate(eventYear.submission_end_date)}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Existing Film Display */}
                    {existingFilm && !isEditing && (
                        <Card className="mb-6 border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    Film Sudah Dikirim
                                </CardTitle>
                                <CardDescription>
                                    Film Anda telah berhasil dikirim dan tersimpan di server
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium">Film URL</Label>
                                        <p className="text-muted-foreground text-sm break-all">
                                            {existingFilm.film_url}
                                        </p>
                                    </div>
                                    {existingFilm.direct_video_url && (
                                        <div>
                                            <Label className="text-sm font-medium">Direct Video URL</Label>
                                            <p className="text-muted-foreground text-sm break-all">
                                                {existingFilm.direct_video_url}
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex gap-4">
                                        <div>
                                            <Label className="text-sm font-medium">Originality File</Label>
                                            <p className="text-muted-foreground text-sm">✓ Terupload</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Poster File</Label>
                                            <p className="text-muted-foreground text-sm">✓ Terupload</p>
                                        </div>
                                        {existingFilm.backdrop_file && (
                                            <div>
                                                <Label className="text-sm font-medium">Backdrop File</Label>
                                                <p className="text-muted-foreground text-sm">✓ Terupload</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-4">
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r"
                                        >
                                            Edit Film
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Film Submission Form */}
                    {(!existingFilm || isEditing) && isSubmissionOpen && (
                        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileVideo className="h-5 w-5" />
                                    {existingFilm ? 'Edit Film' : 'Submit Film'}
                                </CardTitle>
                                <CardDescription>
                                    {existingFilm
                                        ? 'Perbarui informasi film Anda'
                                        : 'Kirim film Anda untuk festival NITISARA'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleFilmSubmit} className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="film_url">Film URL *</Label>
                                            <Input
                                                id="film_url"
                                                type="url"
                                                value={filmForm.data.film_url}
                                                onChange={(e) => filmForm.setData('film_url', e.target.value)}
                                                placeholder="https://example.com/film.mp4"
                                                className={filmForm.errors.film_url ? 'border-red-500' : ''}
                                            />
                                            {filmForm.errors.film_url && (
                                                <p className="text-sm text-red-600">{filmForm.errors.film_url}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="direct_video_url">Direct Video URL (Opsional)</Label>
                                            <Input
                                                id="direct_video_url"
                                                type="url"
                                                value={filmForm.data.direct_video_url}
                                                onChange={(e) => filmForm.setData('direct_video_url', e.target.value)}
                                                placeholder="https://example.com/direct-video.mp4"
                                            />
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Originality File */}
                                        <div className="space-y-2">
                                            <Label>Surat Pernyataan Orisinalitas *</Label>
                                            <div
                                                className={`rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
                                                    dragOver === 'originality_file'
                                                        ? 'border-primary bg-primary/5 scale-105'
                                                        : filmForm.data.originality_file
                                                          ? 'border-green-300 bg-green-50'
                                                          : 'border-primary/30 hover:border-primary/50'
                                                }`}
                                                onDragOver={(e) => handleDragOver(e, 'originality_file')}
                                                onDragLeave={handleDragLeave}
                                                onDrop={(e) => handleDrop(e, 'originality_file')}
                                            >
                                                <div className="text-center">
                                                    <Upload className="text-primary mx-auto mb-4 h-8 w-8" />
                                                    <p className="text-sm font-medium">Upload File</p>
                                                    <p className="text-muted-foreground text-xs">
                                                        PDF, JPG, PNG (max 4MB)
                                                    </p>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) =>
                                                            filmForm.setData(
                                                                'originality_file',
                                                                e.target.files?.[0] || null,
                                                            )
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {filmForm.errors.originality_file && (
                                                <p className="text-sm text-red-600">
                                                    {filmForm.errors.originality_file}
                                                </p>
                                            )}
                                        </div>

                                        {/* Poster File */}
                                        <div className="space-y-2">
                                            <Label>Poster Film *</Label>
                                            <div
                                                className={`rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
                                                    dragOver === 'poster_file'
                                                        ? 'border-primary bg-primary/5 scale-105'
                                                        : filmForm.data.poster_file
                                                          ? 'border-green-300 bg-green-50'
                                                          : 'border-primary/30 hover:border-primary/50'
                                                }`}
                                                onDragOver={(e) => handleDragOver(e, 'poster_file')}
                                                onDragLeave={handleDragLeave}
                                                onDrop={(e) => handleDrop(e, 'poster_file')}
                                            >
                                                <div className="text-center">
                                                    <Upload className="text-primary mx-auto mb-4 h-8 w-8" />
                                                    <p className="text-sm font-medium">Upload File</p>
                                                    <p className="text-muted-foreground text-xs">JPG, PNG (max 4MB)</p>
                                                    <Input
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png"
                                                        onChange={(e) =>
                                                            filmForm.setData('poster_file', e.target.files?.[0] || null)
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {filmForm.errors.poster_file && (
                                                <p className="text-sm text-red-600">{filmForm.errors.poster_file}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Backdrop File */}
                                    <div className="space-y-2">
                                        <Label>Backdrop Film (Opsional)</Label>
                                        <div
                                            className={`rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
                                                dragOver === 'backdrop_file'
                                                    ? 'border-primary bg-primary/5 scale-105'
                                                    : filmForm.data.backdrop_file
                                                      ? 'border-green-300 bg-green-50'
                                                      : 'border-primary/30 hover:border-primary/50'
                                            }`}
                                            onDragOver={(e) => handleDragOver(e, 'backdrop_file')}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'backdrop_file')}
                                        >
                                            <div className="text-center">
                                                <Upload className="text-primary mx-auto mb-4 h-8 w-8" />
                                                <p className="text-sm font-medium">Upload File</p>
                                                <p className="text-muted-foreground text-xs">JPG, PNG (max 4MB)</p>
                                                <Input
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={(e) =>
                                                        filmForm.setData('backdrop_file', e.target.files?.[0] || null)
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        {filmForm.errors.backdrop_file && (
                                            <p className="text-sm text-red-600">{filmForm.errors.backdrop_file}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            type="submit"
                                            disabled={filmForm.processing}
                                            className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r"
                                        >
                                            {filmForm.processing
                                                ? 'Menyimpan...'
                                                : existingFilm
                                                  ? 'Update Film'
                                                  : 'Submit Film'}
                                        </Button>
                                        {isEditing && (
                                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                                Batal
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {!isSubmissionOpen && (
                        <Alert className="border-amber-200 bg-amber-50">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800">
                                Periode submit film belum dibuka atau sudah berakhir. Silakan cek kembali nanti.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
