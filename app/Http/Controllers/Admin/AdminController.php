<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\EventYear;
use App\Models\Film;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_participants' => Participant::count(),
            'pending_participants' => Participant::where('verification_status', 'pending')->count(),
            'approved_participants' => Participant::where('verification_status', 'approved')->count(),
            'rejected_participants' => Participant::where('verification_status', 'rejected')->count(),
            'total_films' => Film::count(),
            'pending_films' => Film::whereNull('verified_by_user_id')->count(),
            'verified_films' => Film::whereNotNull('verified_by_user_id')->count(),
            'total_categories' => Category::count(),
            'total_event_years' => EventYear::count(),
            'total_users' => User::count(),
        ];

        $recent_participants = Participant::with(['eventYear', 'category', 'verifiedBy'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($participant) {
                return [
                    'id' => $participant->id,
                    'team_name' => $participant->team_name,
                    'leader_name' => $participant->leader_name,
                    'city' => $participant->city,
                    'verification_status' => $participant->verification_status,
                    'verified_by_user_id' => $participant->verified_by_user_id,
                    'created_at' => $participant->created_at,
                ];
            });

        $recent_films = Film::with(['participant', 'verifiedBy'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($film) {
                return [
                    'id' => $film->id,
                    'title' => $film->title,
                    'participant' => $film->participant ? [
                        'id' => $film->participant->id,
                        'team_name' => $film->participant->team_name,
                    ] : null,
                    'verified_by_user_id' => $film->verified_by_user_id,
                    'created_at' => $film->created_at,
                ];
            });

        $categories = Category::withCount('participants')->get();
        $event_years = EventYear::withCount('participants')->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_participants' => $recent_participants,
            'recent_films' => $recent_films,
            'categories' => $categories,
            'event_years' => $event_years,
        ]);
    }

    public function statistics()
    {
        $participants_by_month = Participant::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $films_by_category = Category::withCount('participants')
            ->get();

        $verification_stats = [
            'participants' => [
                'pending' => Participant::whereNull('verified_by_user_id')->count(),
                'verified' => Participant::whereNotNull('verified_by_user_id')->count(),
            ],
            'films' => [
                'pending' => Film::whereNull('verified_by_user_id')->count(),
                'verified' => Film::whereNotNull('verified_by_user_id')->count(),
            ],
        ];

        return Inertia::render('admin/statistics', [
            'participants_by_month' => $participants_by_month,
            'films_by_category' => $films_by_category,
            'verification_stats' => $verification_stats,
        ]);
    }

    public function participantsReport(Request $request)
    {
        $participants = Participant::with(['eventYear', 'category', 'verifiedBy', 'films'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($request->category_id, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($request->event_year_id, function ($query, $eventYearId) {
                $query->where('event_year_id', $eventYearId);
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'verified') {
                    $query->whereNotNull('verified_by_user_id');
                } elseif ($status === 'pending') {
                    $query->whereNull('verified_by_user_id');
                }
            })
            ->latest()
            ->paginate(20);

        $categories = Category::all();
        $event_years = EventYear::all();

        return Inertia::render('admin/reports/participants', [
            'participants' => $participants,
            'categories' => $categories,
            'event_years' => $event_years,
            'filters' => $request->only(['search', 'category_id', 'event_year_id', 'status']),
        ]);
    }

    public function filmsReport(Request $request)
    {
        $films = Film::with(['participant', 'verifiedBy'])
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'verified') {
                    $query->whereNotNull('verified_by_user_id');
                } elseif ($status === 'pending') {
                    $query->whereNull('verified_by_user_id');
                }
            })
            ->latest()
            ->paginate(20);

        return Inertia::render('admin/reports/films', [
            'films' => $films,
            'filters' => $request->only(['search', 'status']),
        ]);
    }
}