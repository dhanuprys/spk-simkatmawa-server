import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { SearchBar } from './search-bar';

interface TheaterHeaderProps {
    onSearch: (query: string) => void;
    isSearching: boolean;
    homeUrl?: string;
}

export function TheaterHeader({ onSearch, isSearching, homeUrl = '/' }: TheaterHeaderProps) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 z-50 w-full bg-gradient-to-b from-black/50 to-transparent py-3 transition-all duration-[900] md:py-4',
                scrollY > 20 && '!bg-black/90 backdrop-blur-md',
            )}
        >
            <div className="flex items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2 md:gap-8">
                    <h1 className="font-mono text-lg font-extrabold tracking-widest text-blue-500 md:text-2xl lg:text-3xl">
                        NITHEATER
                    </h1>
                    <Link
                        href={homeUrl}
                        className="hidden text-xs text-white transition-colors hover:text-blue-400 md:block md:text-sm lg:text-base"
                    >
                        kembali ke beranda
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <SearchBar onSearch={onSearch} isSearching={isSearching} />
                    {/* Mobile home button */}
                    <Link
                        href={homeUrl}
                        className="rounded-lg bg-zinc-800 p-2 text-gray-400 transition-colors hover:bg-zinc-700 hover:text-white md:hidden"
                        title="Kembali ke beranda"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}
