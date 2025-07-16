import { FilmCard, FilmRow, TheaterHeader, TheaterHero, type Film } from '@/components/theater';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Types for props (adjust as needed for your backend data)
type Category = { id: number; name: string };
type EventYear = { id: number; year: number; show_end?: string };

// Empty state component
function EmptyState() {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center text-gray-400">
                <svg className="mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                    />
                </svg>
                <p className="text-lg">Belum ada film tersedia</p>
                <p className="text-sm">Kembali lagi nanti untuk konten baru</p>
            </div>
        </div>
    );
}

// Search results component
function SearchResults({ films, searchQuery }: { films: Film[]; searchQuery: string }) {
    if (!searchQuery) return null;

    return (
        <section className="mb-8 md:mb-12">
            <div className="mb-3 px-4 md:mb-4 md:px-8">
                <h2 className="text-xl font-bold text-white md:text-2xl">Hasil Pencarian: "{searchQuery}"</h2>
                <p className="text-sm text-gray-400 md:text-base">{films.length} film ditemukan</p>
            </div>
            <div className="relative">
                <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-6 md:px-8 lg:grid-cols-3 xl:grid-cols-4">
                    {films.map((film) => (
                        <div key={film.id} className="flex-shrink-0">
                            <FilmCard film={film} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// No search results component
function NoSearchResults({ searchQuery }: { searchQuery: string }) {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center text-gray-400">
                <svg className="mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <p className="text-lg">Tidak ada hasil untuk "{searchQuery}"</p>
                <p className="text-sm">Coba kata kunci lain</p>
            </div>
        </div>
    );
}

// Scroll to top button
function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed right-8 bottom-8 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
            aria-label="Scroll to top"
        >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
}

function ComingSoonRow({ films }: { films: { id: number; poster_landscape_file?: string }[] }) {
    if (!films?.length) return null;
    return (
        <section className="mb-8 md:mb-12">
            <h2 className="mb-4 px-4 text-xl font-bold text-white md:mb-6 md:px-8 md:text-2xl">Segera Tayang</h2>
            <div className="relative">
                <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 pb-4 md:gap-6 md:px-8">
                    {films.map((film) => (
                        <div
                            key={film.id}
                            className="group relative aspect-video w-[300px] overflow-hidden rounded-lg bg-zinc-900 shadow-lg"
                        >
                            <div className="relative h-full w-full overflow-hidden">
                                {film.poster_landscape_file ? (
                                    <img
                                        src={`/storage/${film.poster_landscape_file}`}
                                        alt="Poster film segera tayang"
                                        className="h-full w-full object-cover object-center"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
                                )}
                                {/* SOON Badge */}
                                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                                    <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                                        SOON
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function TheaterIndex() {
    const { films, categories, eventYears, ongoingFilms } = usePage<{
        films: { data: Film[] };
        categories: Category[];
        eventYears: EventYear[];
        ongoingFilms: { id: number; poster_landscape_file?: string }[];
    }>().props;
    const allFilms = films?.data || [];

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Film[]>([]);

    // Initialize search from URL parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            setSearchQuery(searchParam);
            handleSearch(searchParam);
        }
    }, []);

    // Search function
    const handleSearch = (query: string) => {
        setSearchQuery(query);

        // Update URL with search parameter
        const url = new URL(window.location.href);
        if (query.trim()) {
            url.searchParams.set('search', query);
        } else {
            url.searchParams.delete('search');
        }
        window.history.replaceState({}, '', url.toString());

        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const results = allFilms.filter((film) => {
            const searchTerm = query.toLowerCase();
            const title = film.title.toLowerCase();
            const synopsis = film.synopsis.toLowerCase();
            const teamName = film.participant?.team_name?.toLowerCase() || '';
            const category = film.participant?.category?.name?.toLowerCase() || '';
            const year = film.participant?.event_year?.year?.toString() || '';

            return (
                title.includes(searchTerm) ||
                synopsis.includes(searchTerm) ||
                teamName.includes(searchTerm) ||
                category.includes(searchTerm) ||
                year.includes(searchTerm)
            );
        });

        setSearchResults(results);
    };

    // Show empty state if no films
    if (!allFilms.length) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
                <TheaterHeader onSearch={handleSearch} isSearching={!!searchQuery} homeUrl="/" />
                <main className="pb-16">
                    <EmptyState />
                </main>
                <footer className="bg-opacity-80 mt-8 w-full bg-black py-8 text-center text-xs text-zinc-500">
                    &copy; {new Date().getFullYear()} NITISARA VITHEATER. Hak cipta dilindungi.
                </footer>
            </div>
        );
    }

    // Show search results if searching
    if (searchQuery) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black pt-24 text-white">
                <TheaterHeader onSearch={handleSearch} isSearching={!!searchQuery} homeUrl="/" />
                <main className="min-h-screen pb-16">
                    {searchResults.length > 0 ? (
                        <SearchResults films={searchResults} searchQuery={searchQuery} />
                    ) : (
                        <NoSearchResults searchQuery={searchQuery} />
                    )}
                </main>
                <footer className="bg-opacity-80 mt-8 w-full bg-black py-8 text-center text-xs text-zinc-500">
                    &copy; {new Date().getFullYear()} NITISARA VITHEATER. Hak cipta dilindungi.
                </footer>
                <ScrollToTop />
            </div>
        );
    }

    // Create more realistic Netflix-style rows
    const rows = [
        {
            title: 'Sedang Tren',
            films: allFilms.slice(0, 8),
        },
        {
            title: 'Semua Film',
            films: allFilms,
        },
    ];

    // Add category-based rows if we have categories
    if (categories?.length > 0) {
        categories.slice(0, 3).forEach((category) => {
            const categoryFilms = allFilms.filter((film) => film.participant?.category?.id === category.id);
            if (categoryFilms.length > 0) {
                rows.push({
                    title: `Film ${category.name}`,
                    films: categoryFilms,
                });
            }
        });
    }

    // Add year-based rows if we have multiple years
    if (eventYears?.length > 1) {
        eventYears.slice(0, 2).forEach((eventYear) => {
            const yearFilms = allFilms.filter((film) => film.participant?.event_year?.id === eventYear.id);
            if (yearFilms.length > 0) {
                rows.push({
                    title: `Film ${eventYear.year}`,
                    films: yearFilms,
                });
            }
        });
    }

    // Add a random row
    if (allFilms.length > 6) {
        const shuffled = [...allFilms].sort(() => 0.5 - Math.random());
        rows.push({
            title: 'Karena Anda menonton...',
            films: shuffled.slice(0, 8),
        });
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black via-zinc-900 to-black text-white">
            <Head title="NITISARA Theater" />
            <TheaterHeader onSearch={handleSearch} isSearching={!!searchQuery} homeUrl="/" />
            <main className="pb-16">
                <TheaterHero films={allFilms} />
                {/* Coming Soon Section */}
                {ongoingFilms && ongoingFilms.length > 0 && <ComingSoonRow films={ongoingFilms} />}
                {rows.map((row, i) => (
                    <FilmRow key={i} title={row.title} films={row.films} />
                ))}
            </main>
            <footer className="bg-opacity-80 mt-8 w-full bg-black py-8 text-center text-xs text-zinc-500">
                &copy; {new Date().getFullYear()} NITISARA Virtual Theater. Hak cipta dilindungi.
            </footer>
            <ScrollToTop />
        </div>
    );
}
