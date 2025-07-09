<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\Participant;
use App\Models\EventYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function index(Request $request)
    {
        $participant = null;
        $existingFilm = null;
        $eventYear = null;
        $isSubmissionOpen = false;

        // Check if participant is in session
        if ($request->session()->has('participant_id')) {
            $participant = Participant::with('eventYear')->find($request->session()->get('participant_id'));

            if ($participant) {
                $eventYear = $participant->eventYear;
                $existingFilm = Film::where('participant_id', $participant->id)->first();

                // Check if submission period is open
                $now = now();
                $isSubmissionOpen = $eventYear &&
                    $now >= $eventYear->submission_start_date &&
                    $now <= $eventYear->submission_end_date;
            }
        }

        return Inertia::render('submission', [
            'participant' => $participant,
            'existingFilm' => $existingFilm,
            'eventYear' => $eventYear,
            'isSubmissionOpen' => $isSubmissionOpen,
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'pin' => 'required|string|size:6',
        ]);

        $participant = Participant::with('eventYear')->where('pin', $request->pin)->first();

        if (!$participant) {
            return back()->withErrors(['pin' => 'PIN tidak valid']);
        }

        // Check if submission period is open
        $eventYear = $participant->eventYear;
        $now = now();
        $isSubmissionOpen = $eventYear &&
            $now >= $eventYear->submission_start_date &&
            $now <= $eventYear->submission_end_date;

        if (!$isSubmissionOpen) {
            return back()->withErrors(['pin' => 'Periode submit film belum dibuka atau sudah berakhir']);
        }

        // Store participant in session
        $request->session()->put('participant_id', $participant->id);

        return redirect()->route('submission');
    }

    public function store(Request $request)
    {
        // Check if participant is in session
        if (!$request->session()->has('participant_id')) {
            return redirect()->route('submission')->withErrors(['error' => 'Silakan masukkan PIN terlebih dahulu']);
        }

        $participant = Participant::with('eventYear')->find($request->session()->get('participant_id'));

        if (!$participant) {
            $request->session()->forget('participant_id');
            return redirect()->route('submission')->withErrors(['error' => 'Sesi tidak valid']);
        }

        // Check if submission period is open
        $eventYear = $participant->eventYear;
        $now = now();
        $isSubmissionOpen = $eventYear &&
            $now >= $eventYear->submission_start_date &&
            $now <= $eventYear->submission_end_date;

        if (!$isSubmissionOpen) {
            return back()->withErrors(['error' => 'Periode submit film belum dibuka atau sudah berakhir']);
        }

        // Check if participant already has a film
        $existingFilm = Film::where('participant_id', $participant->id)->first();
        if ($existingFilm) {
            return back()->withErrors(['error' => 'Anda sudah mengirimkan film']);
        }

        $validated = $request->validate([
            'film_url' => 'required|url',
            'direct_video_url' => 'nullable|url',
            'originality_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:4096',
            'poster_file' => 'required|file|mimes:jpg,jpeg,png|max:4096',
            'backdrop_file' => 'nullable|file|mimes:jpg,jpeg,png|max:4096',
        ]);

        // Handle file uploads
        $originalityPath = $request->file('originality_file')->store('originality-files', 'public');
        $posterPath = $request->file('poster_file')->store('poster-files', 'public');
        $backdropPath = null;

        if ($request->hasFile('backdrop_file')) {
            $backdropPath = $request->file('backdrop_file')->store('backdrop-files', 'public');
        }

        $film = Film::create([
            'participant_id' => $participant->id,
            'film_url' => $validated['film_url'],
            'direct_video_url' => $validated['direct_video_url'],
            'originality_file' => $originalityPath,
            'poster_file' => $posterPath,
            'backdrop_file' => $backdropPath,
        ]);

        return redirect()->route('submission')
            ->with('success', 'Film berhasil dikirim');
    }

    public function update(Request $request, Film $film)
    {
        // Check if participant is in session and owns this film
        if (!$request->session()->has('participant_id')) {
            return redirect()->route('submission')->withErrors(['error' => 'Silakan masukkan PIN terlebih dahulu']);
        }

        $participant = Participant::with('eventYear')->find($request->session()->get('participant_id'));

        if (!$participant || $film->participant_id !== $participant->id) {
            return redirect()->route('submission')->withErrors(['error' => 'Tidak dapat mengakses film ini']);
        }

        // Check if submission period is open
        $eventYear = $participant->eventYear;
        $now = now();
        $isSubmissionOpen = $eventYear &&
            $now >= $eventYear->submission_start_date &&
            $now <= $eventYear->submission_end_date;

        if (!$isSubmissionOpen) {
            return back()->withErrors(['error' => 'Periode submit film belum dibuka atau sudah berakhir']);
        }

        $validated = $request->validate([
            'film_url' => 'required|url',
            'direct_video_url' => 'nullable|url',
            'originality_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:4096',
            'poster_file' => 'nullable|file|mimes:jpg,jpeg,png|max:4096',
            'backdrop_file' => 'nullable|file|mimes:jpg,jpeg,png|max:4096',
        ]);

        $updateData = [
            'film_url' => $validated['film_url'],
            'direct_video_url' => $validated['direct_video_url'],
        ];

        // Handle file uploads if provided
        if ($request->hasFile('originality_file')) {
            $updateData['originality_file'] = $request->file('originality_file')->store('originality-files', 'public');
        }

        if ($request->hasFile('poster_file')) {
            $updateData['poster_file'] = $request->file('poster_file')->store('poster-files', 'public');
        }

        if ($request->hasFile('backdrop_file')) {
            $updateData['backdrop_file'] = $request->file('backdrop_file')->store('backdrop-files', 'public');
        }

        $film->update($updateData);

        return redirect()->route('submission')
            ->with('success', 'Film berhasil diperbarui');
    }

    public function logout(Request $request)
    {
        $request->session()->forget('participant_id');
        return redirect()->route('submission');
    }
}