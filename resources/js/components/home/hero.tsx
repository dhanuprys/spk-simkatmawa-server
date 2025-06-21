import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import SafeWidth from '../safe-width';
import { Button } from '../ui/button';

const images = ['/assets/images/1.avif', '/assets/images/2.avif'];

export default function Hero() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    useEffect(() => {
        let currentIndex = 0;
        const counter = setInterval(() => {
            if (currentIndex >= images.length - 1) {
                currentIndex = -1;
            }

            currentIndex++;
            setActiveSlideIndex(currentIndex);
        }, 4000);

        return () => clearInterval(counter);
    }, []);

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
            <SafeWidth className="relative z-[1] max-w-[65rem] space-y-4">
                <h1 className="font-luckiest bg-gradient-to-b from-blue-800 to-blue-500 bg-clip-text text-center text-8xl text-transparent drop-shadow-[0_0_1px_#1D4ED8] md:text-9xl">
                    Satu Layar,
                    <br />
                    Seribu Cerita
                </h1>
                <p className="text-center text-white opacity-85 md:text-xl">
                    Selamat datang di Film Festival Nitisara — sebuah selebrasi sinema yang menyatukan imajinasi,
                    budaya, dan suara generasi.
                </p>
                <div className="flex items-center justify-center gap-x-2 md:gap-x-4">
                    <Button className="rounded-full bg-white font-semibold text-black md:p-8 md:text-xl">
                        54 Peserta
                    </Button>
                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white md:p-8 md:text-xl">
                        Daftar Sekarang!
                    </Button>
                </div>
            </SafeWidth>
        </div>
    );
}
