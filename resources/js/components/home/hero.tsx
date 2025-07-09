import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Clock, Rocket, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import SafeWidth from '../safe-width';
import { Button } from '../ui/button';
dayjs.extend(duration);

const images = ['/assets/images/1.avif', '/assets/images/2.avif'];

interface HeroProps {
    activeEvent?: {
        id: number;
        year: number;
        title: string;
        participants_count: number;
        registration_start?: string;
        registration_end?: string;
    } | null;
}

export default function Hero({ activeEvent }: HeroProps) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [now, setNow] = useState(dayjs());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        let currentIndex = 0;
        const counter = setInterval(() => {
            if (currentIndex >= images.length - 1) {
                currentIndex = -1;
            }
            currentIndex++;
            setActiveSlideIndex(currentIndex);
        }, 4000);
        const timer = setInterval(() => setNow(dayjs()), 1000);
        return () => {
            clearInterval(counter);
            clearInterval(timer);
        };
    }, []);

    let registrationNotOpened = false;
    let countdownText = '';
    let countdownParts: string[] = [];
    if (activeEvent && activeEvent.registration_start) {
        const regStart = dayjs(activeEvent.registration_start);
        if (now.isBefore(regStart)) {
            registrationNotOpened = true;
            const diff = regStart.diff(now);
            const d = dayjs.duration(diff);
            const pad = (n: number) => n.toString().padStart(2, '0');
            countdownParts = [pad(d.days()), pad(d.hours()), pad(d.minutes()), pad(d.seconds())];
            countdownText = countdownParts.join(':');
        }
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-black">
            <div className="absolute top-0 left-0 size-full bg-slate-950">
                {images.map((image) => (
                    <img
                        key={image}
                        className={cn(
                            'absolute top-0 left-0 size-full object-cover opacity-0 transition-opacity duration-1000',
                            image === images[activeSlideIndex] && 'opacity-5',
                        )}
                        src={image}
                    />
                ))}
            </div>
            <SafeWidth className="relative z-[1] max-w-[65rem] space-y-6 pt-8 pb-8">
                <h1
                    className={cn(
                        'font-luckiest bg-gradient-to-b from-blue-800 to-blue-500 bg-clip-text text-center text-8xl text-transparent drop-shadow-[0_0_1px_#1D4ED8] transition-all duration-700 sm:text-6xl md:text-8xl md:text-9xl',
                        mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                    )}
                >
                    Satu Layar,
                    <br />
                    Seribu Cerita
                </h1>
                <p
                    className={cn(
                        'text-center text-base text-white opacity-85 transition-all duration-700 sm:text-lg md:text-xl',
                        mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 delay-100',
                    )}
                >
                    Selamat datang di Film Festival Nitisara — sebuah selebrasi sinema yang menyatukan imajinasi,
                    budaya, dan suara generasi.
                </p>
                {activeEvent && (
                    <div
                        className={cn(
                            'mx-auto flex w-full max-w-md flex-col items-end justify-center gap-x-0 gap-y-3 transition-all duration-700 sm:flex-row sm:gap-x-2 sm:gap-y-0 md:gap-x-4',
                            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 delay-200',
                        )}
                    >
                        <div className="flex w-full flex-col items-center sm:w-auto">
                            {registrationNotOpened && (
                                <span className="mb-1 text-xs font-medium tracking-wide text-blue-300 uppercase">
                                    Pendaftaran dibuka dalam:
                                </span>
                            )}
                            <Button
                                className="flex w-full items-center gap-2 rounded-full bg-white py-4 text-lg font-semibold text-black shadow-md sm:w-auto md:p-8 md:text-xl"
                                disabled={registrationNotOpened}
                                aria-label={registrationNotOpened ? 'Countdown menuju pendaftaran' : 'Jumlah peserta'}
                            >
                                {registrationNotOpened ? (
                                    <>
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        <span className="font-mono text-base tracking-widest tabular-nums md:text-xl">
                                            {countdownText}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <User className="h-5 w-5 text-blue-600" />
                                        <span>{activeEvent.participants_count} Peserta</span>
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="w-full sm:w-auto">
                            {registrationNotOpened ? (
                                <Button
                                    className="flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-lg text-white shadow-md sm:w-auto md:p-8 md:text-xl"
                                    disabled
                                    aria-label="Pendaftaran segera dibuka"
                                >
                                    <Rocket className="h-5 w-5" />
                                    Segera Dibuka
                                </Button>
                            ) : (
                                <Button
                                    className="flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-lg text-white shadow-md transition-transform hover:scale-105 active:scale-95 sm:w-auto md:p-8 md:text-xl"
                                    asChild
                                    aria-label="Daftar sekarang"
                                >
                                    <a href="/registration">
                                        <Rocket className="h-5 w-5" />
                                        Daftar Sekarang!
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </SafeWidth>
        </div>
    );
}
