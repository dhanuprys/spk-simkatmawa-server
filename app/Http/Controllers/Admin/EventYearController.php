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
        $event_years = EventYear::withCount('participants')->latest()->paginate(20);

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
        ]);

        EventYear::create($validated);

        return redirect()->route('admin.event-years.index')
            ->with('success', 'Tahun event berhasil dibuat');
    }

    public function show(EventYear $eventYear)
    {
        $eventYear->load([
            'participants' => function ($query) {
                $query->with(['category', 'verifiedBy'])->latest();
            }
        ]);

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
        ]);

        $eventYear->update($validated);

        return redirect()->route('admin.event-years.show', $eventYear)
            ->with('success', 'Tahun event berhasil diperbarui');
    }

    public function destroy(EventYear $eventYear)
    {
        if ($eventYear->participants()->count() > 0) {
            return back()->with('error', 'Tidak dapat menghapus tahun event yang memiliki peserta');
        }

        $eventYear->delete();

        return redirect()->route('admin.event-years.index')
            ->with('success', 'Tahun event berhasil dihapus');
    }
}