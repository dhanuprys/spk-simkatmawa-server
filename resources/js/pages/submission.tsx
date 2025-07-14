import SafeWidth from '@/components/safe-width';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { AlertCircle, AlertTriangle, CheckCircle, Clock, FileVideo, LogOut, Shield, Upload, User } from 'lucide-react';
import { useEffect, useState } from 'react';
dayjs.extend(duration);

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
    title: string;
    synopsis: string;
    film_url: string;
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
    submissionStatus: 'closed' | 'coming_soon' | 'open' | 'ended';
    countdownInfo?: {
        target_date: string;
        message: string;
    } | null;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Submission({
    participant,
    existingFilm,
    eventYear,
    isSubmissionOpen,
    submissionStatus,
    countdownInfo,
    flash,
}: Props) {
    const [dragOver, setDragOver] = useState<string | null>(null);
    const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
    const [currentDigit, setCurrentDigit] = useState(0);
    const [now, setNow] = useState(dayjs());

    const pinForm = useForm({
        pin: '',
    });

    const filmForm = useForm({
        title: existingFilm?.title || '',
        synopsis: existingFilm?.synopsis || '',
        film_url: existingFilm?.film_url || '',
        originality_file: null as File | null,
        poster_file: null as File | null,
        backdrop_file: null as File | null,
    });

    // Add state for confirmation checkbox
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    // Show success message when flash.success is present
    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
        }
    }, [flash?.success]);

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

    // Update countdown timer
    useEffect(() => {
        const timer = setInterval(() => setNow(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

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
        filmForm.post(route('submission.store'));
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

    const handleDrop = (e: React.DragEvent, field: 'originality_file' | 'poster_file' | 'backdrop_file') => {
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

    const getCountdownText = () => {
        if (!countdownInfo) return '';

        const target = dayjs(countdownInfo.target_date);
        const diff = target.diff(now);
        const d = dayjs.duration(diff);

        if (submissionStatus === 'coming_soon') {
            const pad = (n: number) => n.toString().padStart(2, '0');
            return `${pad(d.days())}:${pad(d.hours())}:${pad(d.minutes())}:${pad(d.seconds())}`;
        } else {
            return target.format('DD MMMM YYYY, HH:mm');
        }
    };

    const getSubmissionStatusMessage = () => {
        switch (submissionStatus) {
            case 'coming_soon':
                return {
                    title: 'Submit Film Belum Dibuka',
                    subtitle: 'Periode submit film akan segera dibuka',
                    description:
                        'Film Festival NITISARA sedang mempersiapkan sistem submit film. Silakan cek kembali nanti untuk mengirim karya Anda.',
                    icon: Clock,
                    color: 'text-yellow-600',
                    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
                    borderColor: 'border-yellow-200',
                    buttonText: 'Kembali ke Beranda',
                    buttonHref: '/',
                    showProgress: true,
                    progressText: 'Menunggu periode submit film',
                };
            case 'ended':
                return {
                    title: 'Submit Film Telah Ditutup',
                    subtitle: 'Periode submit film telah berakhir',
                    description:
                        'Terima kasih atas partisipasi Anda dalam Film Festival NITISARA. Semua film telah diterima dan sedang dalam proses penilaian.',
                    icon: AlertTriangle,
                    color: 'text-red-600',
                    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
                    borderColor: 'border-red-200',
                    buttonText: 'Lihat Status Film',
                    buttonHref: '/status',
                    showProgress: false,
                    progressText: 'Periode submit telah berakhir',
                };
            default:
                return {
                    title: 'Submit Film Tidak Tersedia',
                    subtitle: 'Sistem submit film sedang tidak aktif',
                    description:
                        'Submit film tidak tersedia saat ini. Silakan hubungi panitia untuk informasi lebih lanjut.',
                    icon: AlertCircle,
                    color: 'text-gray-600',
                    bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
                    borderColor: 'border-gray-200',
                    buttonText: 'Kembali ke Beranda',
                    buttonHref: '/',
                    showProgress: false,
                    progressText: 'Sistem tidak tersedia',
                };
        }
    };

    // If submission is not open and no participant, show closed message
    if (!participant && submissionStatus !== 'open') {
        const statusMessage = getSubmissionStatusMessage();
        const StatusIcon = statusMessage.icon;

        return (
            <>
                <Head title="Submit Film - NITISARA" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                    <Header autoHide alwaysSeamless />

                    <SafeWidth className="flex min-h-screen items-center justify-center py-24">
                        <div className="mx-auto w-full max-w-2xl text-center">
                            {/* Main Status Card */}
                            <div
                                className={`mb-8 rounded-2xl border shadow-xl backdrop-blur-sm ${statusMessage.bgColor} ${statusMessage.borderColor} overflow-hidden`}
                            >
                                <div className="p-8">
                                    <div className="mb-6">
                                        <div
                                            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${statusMessage.bgColor} shadow-lg`}
                                        >
                                            <StatusIcon className={`h-10 w-10 ${statusMessage.color}`} />
                                        </div>
                                        <h1 className="mb-2 text-3xl font-bold text-gray-900">{statusMessage.title}</h1>
                                        <p className="mb-4 text-lg font-medium text-gray-700">
                                            {statusMessage.subtitle}
                                        </p>
                                        <p className="leading-relaxed text-gray-600">{statusMessage.description}</p>
                                    </div>

                                    {countdownInfo && (
                                        <div className="mb-6 rounded-xl bg-white/50 p-6 backdrop-blur-sm">
                                            <p className="mb-3 text-sm font-medium text-gray-700">
                                                {countdownInfo.message}
                                            </p>
                                            <div className="font-mono text-4xl font-bold tracking-widest text-blue-600">
                                                {getCountdownText()}
                                            </div>
                                            <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500">
                                                <span>Hari</span>
                                                <span>Jam</span>
                                                <span>Menit</span>
                                                <span>Detik</span>
                                            </div>
                                        </div>
                                    )}

                                    {statusMessage.showProgress && (
                                        <div className="mb-6">
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="font-medium text-gray-700">
                                                    {statusMessage.progressText}
                                                </span>
                                                <span className="text-gray-500">Menunggu...</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-white/50">
                                                <div className="h-full w-full animate-pulse bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600"
                                >
                                    <a href={statusMessage.buttonHref}>{statusMessage.buttonText}</a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    <a href="/registration">Daftar Event</a>
                                </Button>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 rounded-lg bg-white/50 p-6 backdrop-blur-sm">
                                <h3 className="mb-3 text-lg font-semibold text-gray-900">Informasi Penting</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                        <span>Pastikan Anda telah mendaftar sebagai peserta terlebih dahulu</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                        <span>Simpan PIN registrasi Anda untuk akses submit film</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                        <span>Periksa email Anda untuk informasi terbaru tentang event</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SafeWidth>

                    <Footer />
                </div>
            </>
        );
    }

    // If participant is logged in but submission is not open, show status
    if (participant && !isSubmissionOpen) {
        const statusMessage = getSubmissionStatusMessage();
        const StatusIcon = statusMessage.icon;

        return (
            <>
                <Head title="Submit Film - NITISARA" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                    <Header autoHide alwaysSeamless />

                    <SafeWidth className="py-24">
                        {/* Profile Card */}
                        <Card className="mb-8 border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="from-primary to-primary/80 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg sm:h-12 sm:w-12">
                                            <User className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                                                {participant?.team_name}
                                            </h3>
                                            <p className="truncate text-xs text-gray-600 sm:text-sm">
                                                Ketua: {participant?.leader_name} • {participant?.city}
                                            </p>
                                            <p className="truncate text-xs text-gray-600 sm:text-sm">
                                                {participant?.company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                        <Badge
                                            variant="outline"
                                            className="w-fit border-blue-200 bg-blue-50 text-xs text-blue-700 sm:text-sm"
                                        >
                                            PIN: {participant?.pin}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleLogout}
                                            className="text-xs hover:bg-red-50 hover:text-red-600 sm:text-sm"
                                        >
                                            <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                            Keluar
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enhanced Submission Status */}
                        <Card
                            className={`border-0 shadow-xl backdrop-blur-sm ${statusMessage.bgColor} ${statusMessage.borderColor} overflow-hidden`}
                        >
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <div
                                        className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${statusMessage.bgColor} shadow-lg`}
                                    >
                                        <StatusIcon className={`h-10 w-10 ${statusMessage.color}`} />
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold text-gray-900">{statusMessage.title}</h2>
                                    <p className="mb-2 text-lg font-medium text-gray-700">{statusMessage.subtitle}</p>
                                    <p className="mb-6 leading-relaxed text-gray-600">{statusMessage.description}</p>

                                    {countdownInfo && (
                                        <div className="mb-6 rounded-xl bg-white/50 p-6 backdrop-blur-sm">
                                            <p className="mb-3 text-sm font-medium text-gray-700">
                                                {countdownInfo.message}
                                            </p>
                                            <div className="font-mono text-4xl font-bold tracking-widest text-blue-600">
                                                {getCountdownText()}
                                            </div>
                                            <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500">
                                                <span>Hari</span>
                                                <span>Jam</span>
                                                <span>Menit</span>
                                                <span>Detik</span>
                                            </div>
                                        </div>
                                    )}

                                    {statusMessage.showProgress && (
                                        <div className="mb-6">
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="font-medium text-gray-700">
                                                    {statusMessage.progressText}
                                                </span>
                                                <span className="text-gray-500">Menunggu...</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-white/50">
                                                <div className="h-full w-full animate-pulse bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600"
                                        >
                                            <a href={statusMessage.buttonHref}>{statusMessage.buttonText}</a>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                        >
                                            <a href="/">Kembali ke Beranda</a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information for Logged-in Users */}
                        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Persiapan Submit Film</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-800">Dokumen yang Diperlukan:</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                <span>File film (MP4, MOV, AVI)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                <span>Surat pernyataan orisinalitas</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                <span>Poster film (JPG, PNG)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                <span>Backdrop film (opsional)</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-800">Tips Submit Film:</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                <span>Pastikan kualitas video minimal 720p</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                <span>Durasi film sesuai ketentuan kategori</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                <span>Siapkan semua dokumen sebelum submit</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                <span>Periksa koneksi internet yang stabil</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </SafeWidth>

                    <Footer />
                </div>
            </>
        );
    }

    // PIN Input Form (when no participant is logged in)
    if (!participant) {
        return (
            <>
                <Head title="Submit Film - NITISARA" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                    <Header autoHide alwaysSeamless />

                    <SafeWidth className="flex min-h-screen items-center justify-center py-16">
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
                    </SafeWidth>

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

                <SafeWidth className="py-24">
                    {/* Profile Card */}
                    <Card className="mb-8 border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="from-primary to-primary/80 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg sm:h-12 sm:w-12">
                                        <User className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                                            {participant?.team_name}
                                        </h3>
                                        <p className="truncate text-xs text-gray-600 sm:text-sm">
                                            Ketua: {participant?.leader_name} • {participant?.city}
                                        </p>
                                        <p className="truncate text-xs text-gray-600 sm:text-sm">
                                            {participant?.company}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                    <Badge
                                        variant="outline"
                                        className="w-fit border-blue-200 bg-blue-50 text-xs text-blue-700 sm:text-sm"
                                    >
                                        PIN: {participant?.pin}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="text-xs hover:bg-red-50 hover:text-red-600 sm:text-sm"
                                    >
                                        <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        Keluar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Success Message with Summary */}
                    {showSuccess && (
                        <Card className="mb-6 border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-lg font-semibold text-green-900">
                                            Film Berhasil Dikirim!
                                        </h3>
                                        <p className="mb-4 text-green-700">
                                            Film Anda telah berhasil dikirim dan sedang dalam proses verifikasi oleh
                                            panitia.
                                        </p>

                                        {/* Film Summary */}
                                        {existingFilm && (
                                            <div className="rounded-lg bg-white/50 p-4 backdrop-blur-sm">
                                                <h4 className="mb-3 font-medium text-gray-900">Ringkasan Film:</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium text-gray-600">Judul:</span>
                                                        <span className="text-gray-900">{existingFilm.title}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="font-medium text-gray-600">Sinopsis:</span>
                                                        <span
                                                            className="max-w-xs truncate text-gray-900"
                                                            title={existingFilm.synopsis}
                                                        >
                                                            {existingFilm.synopsis}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="font-medium text-gray-600">URL Film:</span>
                                                        <span
                                                            className="max-w-xs truncate text-gray-900"
                                                            title={existingFilm.film_url}
                                                        >
                                                            {existingFilm.film_url}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="font-medium text-gray-600">Dikirim pada:</span>
                                                        <span className="text-gray-900">
                                                            {new Date(existingFilm.created_at).toLocaleDateString(
                                                                'id-ID',
                                                                {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowSuccess(false)}
                                                className="border-green-200 text-green-700 hover:bg-green-50"
                                            >
                                                Tutup
                                            </Button>
                                            <Button
                                                asChild
                                                size="sm"
                                                className="bg-green-600 text-white hover:bg-green-700"
                                            >
                                                <a href="/status">Lihat Status Film</a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

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
                    {existingFilm && (
                        <Card className="mb-6 border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    Film Sudah Dikirim
                                </CardTitle>
                                <CardDescription>
                                    Film Anda telah berhasil dikirim dan tidak dapat diubah lagi
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium">Judul Film</Label>
                                        <p className="text-muted-foreground text-sm">{existingFilm.title}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Sinopsis Film</Label>
                                        <p className="text-muted-foreground text-sm">{existingFilm.synopsis}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Film URL</Label>
                                        <p className="text-muted-foreground text-sm break-all">
                                            {existingFilm.film_url}
                                        </p>
                                    </div>
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
                                        <Alert className="border-blue-200 bg-blue-50">
                                            <AlertCircle className="h-4 w-4 text-blue-600" />
                                            <AlertDescription className="text-blue-800">
                                                Film telah dikirim dan tidak dapat diubah. Jika ada kesalahan, silakan
                                                hubungi panitia.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Film Submission Form */}
                    {!existingFilm && isSubmissionOpen && (
                        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileVideo className="h-5 w-5" />
                                    Submit Film
                                </CardTitle>
                                <CardDescription>Kirim film Anda untuk festival NITISARA</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleFilmSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Judul Film *</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={filmForm.data.title}
                                            onChange={(e) => filmForm.setData('title', e.target.value)}
                                            placeholder="Masukkan judul film Anda"
                                            className={filmForm.errors.title ? 'border-red-500' : ''}
                                        />
                                        {filmForm.errors.title && (
                                            <p className="text-sm text-red-600">{filmForm.errors.title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="synopsis">Sinopsis Film *</Label>
                                        <Textarea
                                            id="synopsis"
                                            value={filmForm.data.synopsis}
                                            onChange={(e) => filmForm.setData('synopsis', e.target.value)}
                                            placeholder="Masukkan sinopsis singkat tentang film Anda"
                                            rows={4}
                                            className={filmForm.errors.synopsis ? 'border-red-500' : ''}
                                        />
                                        {filmForm.errors.synopsis && (
                                            <p className="text-sm text-red-600">{filmForm.errors.synopsis}</p>
                                        )}
                                    </div>

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

                                    <Separator />

                                    {/* Originality File - Full Width */}
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
                                                <p className="text-muted-foreground text-xs">PDF, JPG, PNG (max 4MB)</p>
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
                                            <p className="text-sm text-red-600">{filmForm.errors.originality_file}</p>
                                        )}
                                    </div>

                                    {/* Poster and Backdrop Files - Half Width Each */}
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Poster File */}
                                        <div className="space-y-2">
                                            <Label>Poster Film *</Label>
                                            <div
                                                className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
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
                                                    <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                                    <p className="text-sm font-medium">Upload Poster</p>
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
                                                {/* Image Preview */}
                                                {filmForm.data.poster_file && (
                                                    <div className="mt-3">
                                                        <p className="mb-2 text-xs font-medium text-gray-700">
                                                            Preview:
                                                        </p>
                                                        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100">
                                                            <img
                                                                src={URL.createObjectURL(filmForm.data.poster_file)}
                                                                alt="Poster preview"
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {filmForm.errors.poster_file && (
                                                <p className="text-sm text-red-600">{filmForm.errors.poster_file}</p>
                                            )}
                                        </div>

                                        {/* Backdrop File */}
                                        <div className="space-y-2">
                                            <Label>Backdrop Film (Opsional)</Label>
                                            <div
                                                className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
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
                                                    <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                                    <p className="text-sm font-medium">Upload Backdrop</p>
                                                    <p className="text-muted-foreground text-xs">JPG, PNG (max 4MB)</p>
                                                    <Input
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png"
                                                        onChange={(e) =>
                                                            filmForm.setData(
                                                                'backdrop_file',
                                                                e.target.files?.[0] || null,
                                                            )
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                {/* Image Preview */}
                                                {filmForm.data.backdrop_file && (
                                                    <div className="mt-3">
                                                        <p className="mb-2 text-xs font-medium text-gray-700">
                                                            Preview:
                                                        </p>
                                                        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100">
                                                            <img
                                                                src={URL.createObjectURL(filmForm.data.backdrop_file)}
                                                                alt="Backdrop preview"
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {filmForm.errors.backdrop_file && (
                                                <p className="text-sm text-red-600">{filmForm.errors.backdrop_file}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Confirmation Checkbox */}
                                    <div className="space-y-4 pt-4">
                                        {/* Warning Alert */}
                                        <Alert className="border-amber-200 bg-amber-50">
                                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                                            <AlertDescription className="text-amber-800">
                                                <strong>Peringatan Penting:</strong> Setelah film berhasil dikirim, data
                                                tidak dapat diubah lagi. Pastikan semua informasi dan file yang diupload
                                                sudah benar sebelum melakukan submit.
                                            </AlertDescription>
                                        </Alert>

                                        <div className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                id="confirm-submission"
                                                checked={isConfirmed}
                                                onChange={(e) => setIsConfirmed(e.target.checked)}
                                                className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300"
                                            />
                                            <div className="text-sm">
                                                <label
                                                    htmlFor="confirm-submission"
                                                    className="font-medium text-gray-700"
                                                >
                                                    Saya mengkonfirmasi bahwa film yang saya kirim adalah karya orisinal
                                                </label>
                                                <p className="mt-1 text-gray-500">
                                                    Dengan mencentang kotak ini, saya menyatakan bahwa film yang akan
                                                    dikirim adalah karya orisinal tim saya dan tidak melanggar hak cipta
                                                    pihak lain.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            type="submit"
                                            disabled={filmForm.processing || !isConfirmed}
                                            className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r"
                                        >
                                            {filmForm.processing ? 'Menyimpan...' : 'Submit Film (Tidak Dapat Diubah)'}
                                        </Button>
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
                </SafeWidth>

                <Footer />
            </div>
        </>
    );
}
