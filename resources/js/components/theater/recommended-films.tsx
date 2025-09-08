import { FilmCard, type Film } from './film-card';

interface RecommendedFilmsProps {
    films: Film[];
    title?: string;
}

export function RecommendedFilms({ films, title = 'Film Serupa' }: RecommendedFilmsProps) {
    if (!films?.length) return null;

    return (
        <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-white md:text-2xl">{title}</h2>
            {/* Mobile: horizontal scroll, Desktop: grid */}
            <div>
                {/* Desktop: grid */}
                <div className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4">
                    {films.map((film) => (
                        <FilmCard key={film.id} film={film} className="col-span-1" />
                    ))}
                </div>
            </div>
        </section>
    );
}
