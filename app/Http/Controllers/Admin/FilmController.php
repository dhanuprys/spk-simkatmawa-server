<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $films = Film::with(['participant', 'verifiedBy'])
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('participant', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
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

        return Inertia::render('admin/films/index', [
            'films' => $films,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(Film $film)
    {
        $film->load(['participant', 'verifiedBy']);

        return Inertia::render('admin/films/show', [
            'film' => $film,
        ]);
    }

    public function edit(Film $film)
    {
        $film->load(['participant']);

        return Inertia::render('admin/films/edit', [
            'film' => $film,
        ]);
    }

    public function update(Request $request, Film $film)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|integer|min:1',
            'director' => 'required|string|max:255',
            'producer' => 'required|string|max:255',
            'year_produced' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'language' => 'required|string|max:100',
            'subtitle_language' => 'nullable|string|max:100',
            'synopsis' => 'required|string',
            'crew' => 'nullable|string',
            'cast' => 'nullable|string',
            'technical_specs' => 'nullable|string',
        ]);

        $film->update($validated);

        return redirect()->route('admin.films.show', $film)
            ->with('success', 'Data film berhasil diperbarui');
    }

    public function destroy(Film $film)
    {
        // Delete film file if exists
        if ($film->file_path && Storage::exists($film->file_path)) {
            Storage::delete($film->file_path);
        }

        $film->delete();

        return redirect()->route('admin.films.index')
            ->with('success', 'Film berhasil dihapus');
    }

    public function verify(Film $film)
    {
        $film->update([
            'verified_by_user_id' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with('success', 'Film berhasil diverifikasi');
    }

    public function reject(Film $film)
    {
        $film->update([
            'verified_by_user_id' => null,
            'verified_at' => null,
        ]);

        return back()->with('success', 'Verifikasi film dibatalkan');
    }

    public function download(Film $film)
    {
        if (!$film->file_path || !Storage::exists($film->file_path)) {
            abort(404, 'File film tidak ditemukan');
        }

        return Storage::download($film->file_path, $film->title . '.mp4');
    }
}