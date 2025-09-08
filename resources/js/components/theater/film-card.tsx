import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export interface Film {
    id: number;
    title: string;
    synopsis: string;
    poster_landscape_file?: string;
    poster_portrait_file?: string;
    backdrop_file?: string;
    direct_video_url?: string;
    participant?: {
        team_name?: string;
        event_year?: { id: number; year: number; show_end?: string };
        category?: { id: number; name: string };
    };
    vote_count?: number;
    director?: string;
    castings?: Array<{ real_name: string; film_name: string }>;
}

interface FilmCardProps {
    film: Film;
    className?: string;
}

export function FilmCard({ film, className = '' }: FilmCardProps) {
    const [landscapeError, setLandscapeError] = useState(false);
    const [portraitError, setPortraitError] = useState(false);

    // Check if film is newly added (event year ended < 30 days ago)
    const isNewlyAdded = useMemo(() => {
        if (!film.participant?.event_year?.show_end) return false;

        const showEndDate = new Date(film.participant.event_year.show_end);
        const daysSinceShowEnd = Math.floor((Date.now() - showEndDate.getTime()) / (1000 * 60 * 60 * 24));

        return daysSinceShowEnd >= 0 && daysSinceShowEnd < 30;
    }, [film.participant?.event_year?.show_end]);

    return (
        <Link
            href={`/theater/film/${film.id}`}
            className={`group relative block aspect-video cursor-pointer overflow-hidden rounded-lg bg-zinc-900 shadow-lg transition-all duration-300 hover:z-10 hover:scale-105 md:hover:scale-110 ${className}`}
        >
            {/* Image with fallback */}
            <div className="relative h-full w-full overflow-hidden">
                {!landscapeError && film.poster_landscape_file ? (
                    <img
                        src={`/storage/${film.poster_landscape_file}`}
                        alt={film.title}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                        onError={() => setLandscapeError(true)}
                    />
                ) : !portraitError && film.poster_portrait_file ? (
                    <div className="relative size-full">
                        <img
                            src={`/storage/${film.poster_portrait_file}`}
                            className="absolute top-0 left-0 size-full object-cover object-center opacity-30"
                        />
                        <img
                            src={`/storage/${film.poster_portrait_file}`}
                            alt={film.title}
                            className="relative z-[2] mx-auto aspect-[2/3] h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                            onError={() => setPortraitError(true)}
                        />
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
                )}

                {/* Badges Container */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                    {/* Newly Added Badge */}
                    {isNewlyAdded && (
                        <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                            BARU
                        </span>
                    )}
                </div>
            </div>

            {/* Hover overlay */}
            <div className="bg-opacity-50 absolute inset-0 z-[3] bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="flex h-full items-center justify-center">
                    <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black">
                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="text-sm font-semibold md:text-base">Tonton</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
