<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\Category;
use App\Models\EventYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TheaterController extends Controller
{
    public function index(Request $request)
    {
        $now = now();
        $search = $request->query('search');

        // Eager loads and structure must match frontend
        $filmRelations = [
            'participant',
            'participant.eventYear', // Correct method name
            'participant.category',
            'votings',
            'castings'
        ];

        // Only verified films
        $filmQuery = Film::query()
            ->whereNotNull('verified_by_user_id')
            ->with($filmRelations);

        // Server-side search
        if ($search) {
            $filmQuery->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('synopsis', 'like', "%$search%");
                // Search inside relationships
                $q->orWhereHas('participant', function ($q2) use ($search) {
                    $q2->where('team_name', 'like', "%$search%")
                        // Category name
                        ->orWhereHas('category', function ($q3) use ($search) {
                            $q3->where('name', 'like', "%$search%");
                        })
                        // Event year year
                        ->orWhereHas('eventYear', function ($q4) use ($search) {
                            $q4->where('year', 'like', "%$search%");
                        });
                });
            });
        }

        // Films whose event has finished
        $films = $filmQuery->whereHas('participant.eventYear', function ($query) {
            $query->where('show_end', '<', now()); // Ensure the event has ended
        })->orderByDesc('id')->paginate(12)->appends($request->query());

        // Randomize "Terbaru Ditambahkan" films
        $latestFilms = Film::whereNotNull('verified_by_user_id')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->with($filmRelations)
            ->whereHas('participant.eventYear', function ($query) {
                $query->where('show_end', '<', now()); // Ensure event has finished
            })
            ->get();

        // Randomize "Sedang Tren" films to ensure variety
        $trendingFilms = Film::whereNotNull('verified_by_user_id')
            ->inRandomOrder()  // Ensure random order
            ->limit(8)
            ->with($filmRelations)
            ->whereHas('participant.eventYear', function ($query) {
                $query->where('show_end', '<', now()); // Ensure event has finished
            })
            ->get();

        // Randomize "Film Tahun Ini" films
        $currentYearFilms = Film::whereNotNull('verified_by_user_id')
            ->whereHas('participant.eventYear', function ($query) use ($now) {
                $query->where('year', $now->year);
            })
            ->with($filmRelations)
            ->inRandomOrder()  // Random order for variety
            ->whereHas('participant.eventYear', function ($query) {
                $query->where('show_end', '<', now()); // Ensure event has finished
            })
            ->get();

        // Randomize "Semua Film"
        $allFilms = Film::whereNotNull('verified_by_user_id')
            ->whereHas('participant.eventYear', function ($query) {
                $query->where('show_end', '<', now()); // Ensure event has finished
            })
            ->inRandomOrder()  // Randomize all films
            ->get();

        // For category and year-based rows, ensuring no repetition
        $categories = Category::orderBy('id')->get(['id', 'name']);
        $eventYears = EventYear::orderBy('year', 'desc')->get(['id', 'year', 'show_end']);

        return Inertia::render('theater/index', [
            'films' => $films,
            'search' => $search,
            'categories' => $categories,
            'eventYears' => $eventYears,
            'latestFilms' => $latestFilms,
            'trendingFilms' => $trendingFilms,
            'currentYearFilms' => $currentYearFilms,
            'allFilms' => $allFilms,  // Include randomized "Semua Film"
        ]);
    }

    public function show($filmId)
    {
        $film = Film::with([
            'participant',
            'participant.eventYear',
            'participant.category',
            'castings'
        ])
            ->withCount('votings')
            ->where('id', $filmId)
            ->whereNotNull('verified_by_user_id')
            ->firstOrFail();

        $recommended = Film::whereNotNull('verified_by_user_id')
            ->where('id', '!=', $film->id)
            ->whereHas('participant.eventYear', function ($q) {
                $q->where('show_end', '<', now()); // Ensure event has finished
            })
            ->with([
                'participant',
                'participant.eventYear',
                'participant.category'
            ])
            ->inRandomOrder()
            ->limit(6)
            ->get();

        return Inertia::render('theater/film-show', [
            'film' => $film,
            'recommended' => $recommended,
        ]);
    }
}
