<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventYearController extends Controller
{
    public function index()
    {
        $event_years = EventYear::withCount(['participants', 'categories'])->latest()->paginate(20);

        // Add ticket statistics for each event year
        $event_years->getCollection()->transform(function ($eventYear) {
            $ticketStats = \App\Models\Ticket::where('event_year_id', $eventYear->id)
                ->selectRaw('
                    COUNT(*) as total,
                    COUNT(CASE WHEN used_at IS NOT NULL THEN 1 END) as used,
                    COUNT(CASE WHEN used_at IS NULL THEN 1 END) as unused
                ')
                ->first();

            $eventYear->ticket_stats = [
                'total' => $ticketStats->total ?? 0,
                'used' => $ticketStats->used ?? 0,
                'unused' => $ticketStats->unused ?? 0,
            ];

            return $eventYear;
        });

        return Inertia::render('admin/event-years/index', [
            'event_years' => $event_years,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/event-years/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2020|max:2030|unique:event_years',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'registration_start' => 'required|date',
            'registration_end' => 'required|date|after:registration_start',
            'submission_start_date' => 'required|date',
            'submission_end_date' => 'required|date|after:submission_start_date',
            'show_start' => 'required|date',
            'show_end' => 'required|date|after:show_start',
            'event_guide_document' => 'nullable|file|mimes:pdf,doc,docx|max:10240', // 10MB max
        ]);

        // Handle file upload
        if ($request->hasFile('event_guide_document')) {
            $file = $request->file('event_guide_document');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('event-guides', $fileName, 'public');
            $validated['event_guide_document'] = $filePath;
        }

        EventYear::create($validated);

        return redirect()->route('admin.event-years.index')
            ->with('success', 'Tahun event berhasil dibuat');
    }

    public function show(EventYear $eventYear)
    {
        // Load participants with their relationships
        $eventYear->load([
            'participants' => function ($query) {
                $query->with(['category', 'verifiedBy'])->latest();
            },
            'categories' => function ($query) {
                $query->withCount('participants')->latest();
            }
        ]);

        // Calculate total participants count
        $participantsCount = $eventYear->participants()->count();
        $eventYear->participants_count = $participantsCount;

        // Get ticket statistics for this event year
        $ticketStats = \App\Models\Ticket::where('event_year_id', $eventYear->id)
            ->selectRaw('
                COUNT(*) as total,
                COUNT(CASE WHEN used_at IS NOT NULL THEN 1 END) as used,
                COUNT(CASE WHEN used_at IS NULL THEN 1 END) as unused
            ')
            ->first();

        $eventYear->ticket_stats = [
            'total' => $ticketStats->total ?? 0,
            'used' => $ticketStats->used ?? 0,
            'unused' => $ticketStats->unused ?? 0,
        ];

        // Get favorite films by category with voting statistics
        $favoriteFilmsByCategory = \App\Models\Category::where('event_year_id', $eventYear->id)
            ->with(['participants.films.votings'])
            ->get()
            ->map(function ($category) {
                // Get films for this category with their voting counts
                $films = \App\Models\Film::whereHas('participant', function ($query) use ($category) {
                    $query->where('category_id', $category->id);
                })
                    ->with(['participant', 'votings'])
                    ->get()
                    ->map(function ($film) {
                    return [
                        'id' => $film->id,
                        'title' => $film->title,
                        'synopsis' => $film->synopsis,
                        'participant' => [
                            'id' => $film->participant->id,
                            'team_name' => $film->participant->team_name,
                            'leader_name' => $film->participant->leader_name,
                        ],
                        'vote_count' => $film->votings->count(),
                    ];
                })
                    ->sortByDesc('vote_count')
                    ->take(3); // Get top 3 films by votes
    
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'is_active' => $category->is_active,
                    'participants_count' => $category->participants_count,
                    'top_films' => $films->values(),
                    'total_films' => $films->count(),
                ];
            });

        $eventYear->favorite_films_by_category = $favoriteFilmsByCategory;

        return Inertia::render('admin/event-years/show', [
            'event_year' => $eventYear,
        ]);
    }

    public function edit(EventYear $eventYear)
    {
        return Inertia::render('admin/event-years/edit', [
            'event_year' => $eventYear,
        ]);
    }

    public function update(Request $request, EventYear $eventYear)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2020|max:2030|unique:event_years,year,' . $eventYear->id,
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'registration_start' => 'required|date',
            'registration_end' => 'required|date|after:registration_start',
            'submission_start_date' => 'required|date',
            'submission_end_date' => 'required|date|after:submission_start_date',
            'show_start' => 'required|date',
            'show_end' => 'required|date|after:show_start',
            'event_guide_document' => 'nullable|file|mimes:pdf,doc,docx|max:10240', // 10MB max
        ]);

        // Handle file upload
        if ($request->hasFile('event_guide_document')) {
            // Delete old file if exists
            if ($eventYear->event_guide_document) {
                \Storage::disk('public')->delete($eventYear->event_guide_document);
            }

            $file = $request->file('event_guide_document');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('event-guides', $fileName, 'public');
            $validated['event_guide_document'] = $filePath;
        }

        $eventYear->update($validated);

        return redirect()->route('admin.event-years.show', $eventYear)
            ->with('success', 'Tahun event berhasil diperbarui');
    }

    public function downloadEventGuide(EventYear $eventYear)
    {
        if (!$eventYear->event_guide_document) {
            return back()->with('error', 'Dokumen panduan event tidak ditemukan');
        }

        $filePath = storage_path('app/public/' . $eventYear->event_guide_document);

        if (!file_exists($filePath)) {
            return back()->with('error', 'File tidak ditemukan');
        }

        return response()->download($filePath);
    }

    public function destroy(EventYear $eventYear)
    {
        if ($eventYear->participants()->count() > 0) {
            return back()->with('error', 'Tidak dapat menghapus tahun event yang memiliki peserta');
        }

        // Delete event guide document if exists
        if ($eventYear->event_guide_document) {
            \Storage::disk('public')->delete($eventYear->event_guide_document);
        }

        $eventYear->delete();

        return redirect()->route('admin.event-years.index')
            ->with('success', 'Tahun event berhasil dihapus');
    }
}