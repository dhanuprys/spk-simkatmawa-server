import { useMemo } from 'react';
import { Film } from './film-card';

interface TheaterHeroProps {
    films: Film[];
}

export function TheaterHero({ films }: TheaterHeroProps) {
    const featured = useMemo(() => {
        if (!films?.length) return null;
        return films[Math.floor(Math.random() * films.length)];
    }, [films]);

    if (!featured) return null;

    return (
        <section className="relative mb-8 flex h-[75vh] w-full items-end overflow-hidden bg-gradient-to-t from-black via-black/60 to-transparent md:mb-12">
            {/* Bottom shadow overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <img
                src={
                    featured.poster_landscape_file
                        ? `/storage/${featured.poster_landscape_file}`
                        : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iNDAwIiB5Mj0iNjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzMzMzMzM7c3RvcC1vcGFjaXR5OjEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTExMTExO3N0b3Atb3BhY2l0eToxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2ZyB4PSIxNzAiIHk9IjI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiM5Q0EzQUYiPgo8cGF0aCBkPSJNOCA1djE0bDExLTd6Ii8+Cjwvc3ZnPgo8L3N2Zz4='
                }
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
                onError={(e) => {
                    e.currentTarget.src =
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iNDAwIiB5Mj0iNjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzMzMzMzM7c3RvcC1vcGFjaXR5OjEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTExMTExO3N0b3Atb3BhY2l0eToxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2ZyB4PSIxNzAiIHk9IjI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiM5Q0EzQUYiPgo8cGF0aCBkPSJNOCA1djE0bDExLTd6Ii8+Cjwvc3ZnPgo8L3N2Zz4=';
                }}
            />
            <div className="relative z-10 max-w-4xl p-4 md:p-8 lg:p-16">
                <h2 className="mb-4 text-2xl leading-tight font-bold text-white drop-shadow-2xl md:mb-6 md:text-3xl lg:text-4xl xl:text-5xl">
                    {featured.title}
                </h2>
                <div className="mb-3 flex flex-wrap items-center gap-2 text-gray-200 md:mb-4 md:gap-4">
                    <span className="text-sm md:text-lg">{featured.participant?.event_year?.year}</span>
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold md:px-3 md:py-1 md:text-sm">
                        {featured.participant?.category?.name}
                    </span>
                    <span className="hidden text-lg md:inline">•</span>
                    <span className="hidden text-lg md:inline">{featured.participant?.team_name}</span>
                </div>
                <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-200 md:mb-6 md:text-lg">
                    {featured.synopsis.slice(0, 150)}...
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <a
                        href={`/theater/film/${featured.id}`}
                        className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 font-bold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-200 md:px-8 md:py-3"
                    >
                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="text-sm md:text-base">Tonton Sekarang</span>
                    </a>
                    <a
                        href={`/theater/film/${featured.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-6 py-2.5 font-bold text-white shadow-lg transition-all duration-200 hover:bg-gray-700 md:px-8 md:py-3"
                    >
                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-sm md:text-base">Info Selengkapnya</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
