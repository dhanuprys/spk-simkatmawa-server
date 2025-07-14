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
        // Get current year for filtering
        $currentYear = date('Y');

        // Participants by month for current year
        $participants_by_month = Participant::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $currentYear)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Films by category: count films where participant.category_id matches category
        $films_by_category = Category::withCount(['participants as total_participants'])
            ->get()
            ->map(function ($category) {
                $total_films = \App\Models\Film::whereHas('participant', function ($q) use ($category) {
                    $q->where('category_id', $category->id);
                })->count();
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'total_participants' => $category->total_participants,
                    'total_films' => $total_films,
                ];
            });

        // Films by month for current year
        $films_by_month = Film::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $currentYear)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Verification statistics
        $verification_stats = [
            'participants' => [
                'pending' => Participant::whereNull('verified_by_user_id')->count(),
                'verified' => Participant::whereNotNull('verified_by_user_id')->count(),
                'total' => Participant::count(),
            ],
            'films' => [
                'pending' => Film::whereNull('verified_by_user_id')->count(),
                'verified' => Film::whereNotNull('verified_by_user_id')->count(),
                'total' => Film::count(),
            ],
        ];

        // Event year statistics
        $event_years_stats = EventYear::withCount(['participants', 'films'])
            ->orderBy('show_start', 'desc')
            ->get()
            ->map(function ($eventYear) {
                return [
                    'id' => $eventYear->id,
                    'title' => $eventYear->title,
                    'show_start' => $eventYear->show_start,
                    'show_end' => $eventYear->show_end,
                    'submission_start_date' => $eventYear->submission_start_date,
                    'submission_end_date' => $eventYear->submission_end_date,
                    'participants_count' => $eventYear->participants_count,
                    'films_count' => $eventYear->films_count,
                    'is_active' => ($eventYear->show_start && $eventYear->show_end)
                        ? now()->between($eventYear->show_start, $eventYear->show_end)
                        : false,
                    'submission_status' => $this->getSubmissionStatus($eventYear),
                ];
            });

        // Recent activity (last 30 days)
        $recent_activity = [
            'new_participants' => Participant::where('created_at', '>=', now()->subDays(30))->count(),
            'new_films' => Film::where('created_at', '>=', now()->subDays(30))->count(),
            'verified_participants' => Participant::where('verified_at', '>=', now()->subDays(30))->count(),
            'verified_films' => Film::where('verified_at', '>=', now()->subDays(30))->count(),
        ];

        // Overall statistics
        $overall_stats = [
            'total_participants' => Participant::count(),
            'total_films' => Film::count(),
            'total_categories' => Category::count(),
            'total_event_years' => EventYear::count(),
            'total_users' => User::count(),
            'avg_films_per_participant' => Participant::count() > 0 ? round(Film::count() / Participant::count(), 2) : 0,
        ];

        return Inertia::render('admin/statistics', [
            'participants_by_month' => $participants_by_month,
            'films_by_month' => $films_by_month,
            'films_by_category' => $films_by_category,
            'verification_stats' => $verification_stats,
            'event_years_stats' => $event_years_stats,
            'recent_activity' => $recent_activity,
            'overall_stats' => $overall_stats,
            'current_year' => $currentYear,
        ]);
    }

    private function getSubmissionStatus($eventYear)
    {
        $now = now();
        $submissionStart = $eventYear->submission_start_date;
        $submissionEnd = $eventYear->submission_end_date;

        if ($now < $submissionStart) {
            return 'coming_soon';
        } elseif ($now >= $submissionStart && $now <= $submissionEnd) {
            return 'open';
        } else {
            return 'ended';
        }
    }


}