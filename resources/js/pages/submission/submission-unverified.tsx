import { Head } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';

export default function SubmissionUnverified({ message }: { message: string }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
            <Head title="Akun Belum Diverifikasi" />
            <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                <div className="mb-4 flex justify-center">
                    <AlertTriangle className="h-12 w-12 text-yellow-500" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-gray-800">Akun Belum Diverifikasi</h1>
                <p className="mb-4 text-gray-700">
                    {message ||
                        'Akun Anda belum diverifikasi oleh admin. Silakan menunggu verifikasi sebelum dapat mengupload film.'}
                </p>
                <a
                    href="/"
                    className="mt-4 inline-block rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-white shadow transition hover:bg-yellow-600"
                >
                    Kembali ke Beranda
                </a>
            </div>
        </div>
    );
}
