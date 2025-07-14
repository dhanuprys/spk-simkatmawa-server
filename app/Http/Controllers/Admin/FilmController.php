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
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('synopsis', 'like', "%{$search}%")
                        ->orWhereHas('participant', function ($participantQuery) use ($search) {
                            $participantQuery->where('team_name', 'like', "%{$search}%")
                                ->orWhere('leader_name', 'like', "%{$search}%")
                                ->orWhere('city', 'like', "%{$search}%")
                                ->orWhere('company', 'like', "%{$search}%");
                        });
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

    public function destroy(Film $film)
    {
        // Delete uploaded files if they exist
        if ($film->originality_file && Storage::disk('public')->exists($film->originality_file)) {
            Storage::disk('public')->delete($film->originality_file);
        }

        if ($film->poster_file && Storage::disk('public')->exists($film->poster_file)) {
            Storage::disk('public')->delete($film->poster_file);
        }

        if ($film->backdrop_file && Storage::disk('public')->exists($film->backdrop_file)) {
            Storage::disk('public')->delete($film->backdrop_file);
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
        if (!$film->originality_file || !Storage::disk('public')->exists($film->originality_file)) {
            abort(404, 'File tidak ditemukan');
        }

        return Storage::disk('public')->download($film->originality_file, 'surat_orisinalitas_' . $film->title . '.pdf');
    }

    public function downloadPoster(Film $film)
    {
        if (!$film->poster_file || !Storage::disk('public')->exists($film->poster_file)) {
            abort(404, 'File poster tidak ditemukan');
        }

        return Storage::disk('public')->download($film->poster_file, 'poster_' . $film->title . '.jpg');
    }

    public function downloadBackdrop(Film $film)
    {
        if (!$film->backdrop_file || !Storage::disk('public')->exists($film->backdrop_file)) {
            abort(404, 'File backdrop tidak ditemukan');
        }

        return Storage::disk('public')->download($film->backdrop_file, 'backdrop_' . $film->title . '.jpg');
    }

    public function update(Request $request, Film $film)
    {
        $validated = $request->validate([
            'ranking' => 'nullable|integer',
        ]);
        $film->update($validated);
        return back()->with('success', 'Peringkat film berhasil diperbarui.');
    }
}