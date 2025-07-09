import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Main Heading */}
                    <h1 className="font-luckiest mb-6 text-4xl text-gray-900 md:text-6xl">
                        Bergabung dengan{' '}
                        <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                            NITISARA
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-600 md:text-xl">Festival Film Mahasiswa Terbesar di Indonesia</p>

                    {/* Status Check Shortcut */}
                    <div className="mt-12 w-full rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md md:p-8">
                        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
                            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-start md:gap-4 md:text-left">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                    <Search className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Sudah mendaftar?</h3>
                                    <p className="text-gray-600">Cek status pendaftaran Anda dengan mudah</p>
                                </div>
                            </div>
                            <Link
                                href="/status"
                                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:w-auto"
                            >
                                Cek Status
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                <div className="flex flex-col items-center gap-2 text-gray-600">
                    <ChevronDown className="h-6 w-6" />
                    <span className="text-sm font-medium">Scroll untuk mendaftar</span>
                </div>
            </div>
        </section>
    );
}
