import { FilmCard, RecommendedFilms, TheaterHeader, type Film } from '@/components/theater';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

function ShareButton({ url, title }: { url: string; title: string }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch {}
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert('Link berhasil disalin!');
            } catch {}
        }
    };
    return (
        <Button
            onClick={handleShare}
            className="w-full bg-zinc-800 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-zinc-700 md:w-auto md:px-6 md:py-2.5"
        >
            <svg className="mr-2 inline h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
            </svg>
            <span className="text-sm md:text-base">Bagikan</span>
        </Button>
    );
}

function FilmPlayer({ film }: { film: Film }) {
    if (!film.direct_video_url) {
        return (
            <div className="mb-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg md:mb-6">
                <div className="text-center text-gray-400">
                    <svg
                        className="mx-auto mb-3 h-12 w-12 md:mb-4 md:h-16 md:w-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-base md:text-lg">Video tidak tersedia</p>
                </div>
            </div>
        );
    }

    // Check if the URL is a YouTube URL
    const isYouTubeUrl = (url: string): boolean => {
        const youtubePatterns = [
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/,
            /^https?:\/\/youtu\.be\//,
            /^https?:\/\/(www\.)?youtube\.com\/embed\//,
        ];
        return youtubePatterns.some((pattern) => pattern.test(url));
    };

    // Convert YouTube URL to embed URL
    const getYouTubeEmbedUrl = (url: string): string => {
        let videoId = '';

        // Handle different YouTube URL formats
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0] || '';
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
        } else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('embed/')[1]?.split('?')[0] || '';
        }

        return `https://www.youtube.com/embed/${videoId}`;
    };

    const videoUrl = film.direct_video_url;
    const showYTBadge = isYouTubeUrl(videoUrl);

    return (
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg md:mb-6">
            {/* YT badge removed from here */}
            {showYTBadge ? (
                // YouTube iframe
                <iframe
                    src={getYouTubeEmbedUrl(videoUrl)}
                    title={film.title}
                    className="h-full w-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                // Direct MP4 video
                <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="h-full w-full bg-black object-contain"
                    poster={
                        film.poster_landscape_file
                            ? `/storage/${film.poster_landscape_file}`
                            : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iNDAwIiB5Mj0iNjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzMzMzMzM7c3RvcC1vcGFjaXR5OjEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTExMTExO3N0b3Atb3BhY2l0eToxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2ZyB4PSIxNzAiIHk9IjI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiM5Q0EzQUYiPgo8cGF0aCBkPSJNOCA1djE0bDExLTd6Ii8+Cjwvc3ZnPgo8L3N2Zz4='
                    }
                />
            )}
        </div>
    );
}

function FilmMeta({ film }: { film: Film }) {
    // Check if the URL is a YouTube URL
    const isYouTubeUrl = (url: string): boolean => {
        const youtubePatterns = [
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/,
            /^https?:\/\/youtu\.be\//,
            /^https?:\/\/(www\.)?youtube\.com\/embed\//,
        ];
        return youtubePatterns.some((pattern) => pattern.test(url));
    };
    const showYTBadge = isYouTubeUrl(film.direct_video_url || '');
    return (
        <div className="mb-6 md:mb-8">
            <h2 className="mb-4 text-xl leading-tight font-bold text-white md:mb-4 md:text-4xl lg:text-5xl">
                {film.title}
            </h2>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-gray-300 md:mb-4 md:gap-4">
                <span className="text-sm md:text-lg">{film.participant?.event_year?.year}</span>
                <span className="rounded-full bg-blue-700 px-2 py-1 text-xs font-semibold text-white md:px-3 md:py-1 md:text-sm">
                    {film.participant?.category?.name}
                </span>
                {showYTBadge && (
                    <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        Streaming via Youtube
                    </span>
                )}
                <span className="hidden text-lg md:inline">•</span>
                <span className="hidden text-lg md:inline">Festival Film</span>
            </div>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-gray-200 md:mb-6 md:text-lg">{film.synopsis}</p>
            <div className="flex flex-col gap-3 text-sm text-gray-400 md:flex-row md:gap-6 md:text-sm">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-500">Tim:</span>
                    <span className="text-white">{film.participant?.team_name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-500">Kategori:</span>
                    <span className="text-white">{film.participant?.category?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-500">Tahun:</span>
                    <span className="text-white">{film.participant?.event_year?.year}</span>
                </div>
            </div>
        </div>
    );
}

function FilmRow({ title, films }: { title: string; films: Film[] }) {
    if (!films?.length) return null;

    return (
        <section className="mb-8 md:mb-12">
            <h2 className="mb-4 text-xl font-bold text-white md:mb-6 md:text-2xl">{title}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </section>
    );
}

// Loading skeleton for film cards
function FilmCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-32 w-full rounded-lg bg-zinc-800"></div>
            <div className="mt-2 space-y-2">
                <div className="h-4 w-3/4 rounded bg-zinc-800"></div>
                <div className="h-3 w-1/2 rounded bg-zinc-800"></div>
            </div>
        </div>
    );
}

function FilmShow() {
    const { film, recommended } = usePage<{ film: Film; recommended: Film[] }>().props;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        if (query.trim()) {
            window.location.href = `/theater?search=${encodeURIComponent(query)}`;
        }
    };

    if (!film) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black pt-24 text-white">
                <TheaterHeader onSearch={handleSearch} isSearching={!!searchQuery} homeUrl="/theater" />
                <main className="mx-auto max-w-6xl px-4 pb-16">
                    <div className="pt-6 md:pt-8">
                        <div className="mb-4 aspect-video w-full animate-pulse rounded-lg bg-zinc-800 md:mb-6"></div>
                        <div className="space-y-3 md:space-y-4">
                            <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-800 md:h-8"></div>
                            <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-800"></div>
                            <div className="h-4 w-full animate-pulse rounded bg-zinc-800"></div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black pt-24 text-white">
            <TheaterHeader onSearch={handleSearch} isSearching={!!searchQuery} homeUrl="/theater" />
            <main className="mx-auto max-w-6xl px-4 pb-16">
                <div className="pt-6 md:pt-8">
                    <FilmPlayer film={film} />
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                            <FilmMeta film={film} />
                        </div>
                        <div className="flex !flex-shrink-0 flex-col gap-3 md:flex-row md:items-end md:gap-2">
                            {film.vote_count && film.vote_count > 0 ? (
                                <Button className="px-4 py-3 text-sm font-bold text-pink-600 shadow-lg md:px-3 md:py-1 md:text-xs">
                                    {film.vote_count} vote{film.vote_count > 1 ? 's' : ''}
                                </Button>
                            ) : null}
                            <ShareButton url={url} title={film.title} />
                        </div>
                    </div>
                </div>

                {/* Recommended Films (responsive) */}
                <div className="hidden sm:block">
                    {recommended?.length > 0 && <RecommendedFilms films={recommended} title="Film Serupa" />}
                </div>
            </main>
            <footer className="bg-opacity-80 mt-8 w-full bg-black py-6 text-center text-xs text-zinc-500 md:py-8">
                &copy; {new Date().getFullYear()} NITISARA NITHEATER. Hak cipta dilindungi.
            </footer>
        </div>
    );
}

export default FilmShow;
