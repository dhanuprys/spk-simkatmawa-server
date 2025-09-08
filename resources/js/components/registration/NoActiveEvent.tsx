import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { AlertCircle } from 'lucide-react';

export default function NoActiveEvent() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header autoHide alwaysSeamless />
            <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24">
                <div className="mx-auto max-w-lg text-center">
                    <div className="mb-8 flex flex-col items-center gap-4">
                        <AlertCircle className="h-16 w-16 text-yellow-500" />
                        <h1 className="font-luckiest mb-2 text-4xl text-gray-900 md:text-6xl">
                            Pendaftaran Belum Dibuka
                        </h1>
                        <p className="max-w-xl text-lg text-gray-600 md:text-xl">
                            Saat ini belum ada event SIMKATMAWA yang sedang membuka pendaftaran.
                            <br />
                            Silakan cek kembali nanti atau hubungi panitia untuk informasi lebih lanjut.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
