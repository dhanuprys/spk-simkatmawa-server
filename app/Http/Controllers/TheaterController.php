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
        // Only show films that are verified and whose event year has ended
        $films = \App\Models\Film::whereNotNull('verified_by_user_id')
            ->whereHas('participant.eventYear', function ($query) {
                $query->where('show_end', '<', now());
            })
            ->with(['participant', 'participant.eventYear', 'participant.category'])
            ->orderByDesc('id')
            ->paginate(24);

        // Fetch up to 8 random ongoing films (verified, ongoing event)
        $ongoingFilms = \App\Models\Film::whereNotNull('verified_by_user_id')
            ->whereHas('participant.eventYear', function ($query) {
                $now = now();
                $query->where('show_start', '<=', $now)
                    ->where('show_end', '>=', $now);
            })
            ->inRandomOrder()
            ->limit(8)
            ->get(['id', 'poster_landscape_file']);

        $categories = \App\Models\Category::all();
        $eventYears = \App\Models\EventYear::all();

        return \Inertia\Inertia::render('theater/index', [
            'films' => $films,
            'categories' => $categories,
            'eventYears' => $eventYears,
            'ongoingFilms' => $ongoingFilms,
        ]);
    }

    public function show($filmId)
    {
        $film = \App\Models\Film::with(['participant', 'participant.eventYear', 'participant.category', 'castings'])
            ->where('id', $filmId)
            ->whereNotNull('verified_by_user_id')
            ->firstOrFail();

        // Get random recommended films (excluding the current one)
        $recommended = \App\Models\Film::whereNotNull('verified_by_user_id')
            ->where('id', '!=', $film->id)
            ->whereHas('participant.eventYear', function ($query) {
                $query->where('show_end', '<', now());
            })
            ->with(['participant', 'participant.eventYear', 'participant.category'])
            ->inRandomOrder()
            ->limit(6)
            ->get();

        // Add vote_count to film
        $filmData = $film->toArray();
        $filmData['vote_count'] = $film->votings()->count();

        return \Inertia\Inertia::render('theater/film-show', [
            'film' => $filmData,
            'recommended' => $recommended,
        ]);
    }
}