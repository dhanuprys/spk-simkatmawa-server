import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isSearching: boolean;
}

export function SearchBar({ onSearch, isSearching }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const handleClear = () => {
        setSearchQuery('');
        onSearch('');
        setIsExpanded(false);
    };

    const handleIconClick = () => {
        setIsExpanded(true);
    };

    return (
        <div className="relative">
            {/* Mobile: Icon only, Desktop: Full search bar */}
            <div className="hidden md:block">
                <form onSubmit={handleSearch} className="relative w-64 lg:w-80">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari film..."
                            className="w-full rounded-lg bg-zinc-800 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none md:text-base"
                        />
                        <svg
                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 md:h-5 md:w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                            >
                                <svg
                                    className="h-4 w-4 md:h-5 md:w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Mobile: Expandable search */}
            <div className="md:hidden">
                {!isExpanded ? (
                    <button
                        onClick={handleIconClick}
                        className="rounded-lg bg-zinc-800 p-2 text-gray-400 transition-colors hover:bg-zinc-700 hover:text-white"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                ) : (
                    <form onSubmit={handleSearch} className="relative w-48">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari film..."
                                className="w-full rounded-lg bg-zinc-800 px-4 py-2 pr-10 pl-10 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                autoFocus
                            />
                            <svg
                                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
