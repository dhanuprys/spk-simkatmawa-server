<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\EventYear;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    public function index(Request $request)
    {
        $participants = Participant::with(['eventYear', 'category', 'verifiedBy', 'films'])
            ->when($request->search, function ($query, $search) {
                $query->where('team_name', 'like', "%{$search}%")
                    ->orWhere('leader_name', 'like', "%{$search}%")
                    ->orWhere('leader_email', 'like', "%{$search}%")
                    ->orWhere('leader_whatsapp', 'like', "%{$search}%");
            })
            ->when($request->category_id, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($request->event_year_id, function ($query, $eventYearId) {
                $query->where('event_year_id', $eventYearId);
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'approved') {
                    $query->where('verification_status', 'approved');
                } elseif ($status === 'pending') {
                    $query->where('verification_status', 'pending');
                } elseif ($status === 'rejected') {
                    $query->where('verification_status', 'rejected');
                }
            })
            ->latest()
            ->paginate(20);

        $categories = Category::all();
        $event_years = EventYear::all();

        return Inertia::render('admin/participants/index', [
            'participants' => $participants,
            'categories' => $categories,
            'event_years' => $event_years,
            'filters' => $request->only(['search', 'category_id', 'event_year_id', 'status']),
        ]);
    }

    public function show(Participant $participant)
    {
        $participant->load(['eventYear', 'category', 'verifiedBy', 'films']);

        return Inertia::render('admin/participants/show', [
            'participant' => $participant,
        ]);
    }

    public function edit(Participant $participant)
    {
        $participant->load(['eventYear', 'category', 'verifiedBy']);
        $categories = Category::all();
        $event_years = EventYear::all();

        return Inertia::render('admin/participants/edit', [
            'participant' => $participant,
            'categories' => $categories,
            'event_years' => $event_years,
        ]);
    }

    public function update(Request $request, Participant $participant)
    {
        $validated = $request->validate([
            'team_name' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'company' => 'required|string|max:100',
            'category_id' => 'required|exists:categories,id',
            'event_year_id' => 'required|exists:event_years,id',
            'leader_name' => 'required|string|max:100',
            'leader_email' => 'required|email|max:100',
            'leader_whatsapp' => 'required|string|max:20',
            'pin' => 'required|integer|unique:participants,pin,' . $participant->id,
        ]);

        $participant->update($validated);

        return redirect()->route('admin.participants.show', $participant)
            ->with('success', 'Data peserta berhasil diperbarui');
    }

    public function destroy(Participant $participant)
    {
        // Delete associated films first
        $participant->films()->delete();

        $participant->delete();

        return redirect()->route('admin.participants.index')
            ->with('success', 'Peserta berhasil dihapus');
    }

    public function approve(Participant $participant)
    {
        $participant->update([
            'verification_status' => 'approved',
            'verified_by_user_id' => auth()->id(),
            'rejection_reason' => null, // Clear any previous rejection reason
        ]);

        return back()->with('success', 'Peserta berhasil disetujui');
    }

    public function reject(Request $request, Participant $participant)
    {
        $validated = $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        $participant->update([
            'verification_status' => 'rejected',
            'verified_by_user_id' => auth()->id(),
            'rejection_reason' => $validated['rejection_reason'],
        ]);

        return back()->with('success', 'Peserta berhasil ditolak');
    }

    public function resetStatus(Participant $participant)
    {
        $participant->update([
            'verification_status' => 'pending',
            'verified_by_user_id' => null,
            'rejection_reason' => null,
        ]);

        return back()->with('success', 'Status verifikasi peserta berhasil direset');
    }

    public function films(Participant $participant)
    {
        $films = $participant->films()->with('verifiedBy')->latest()->get();

        return Inertia::render('admin/participants/films', [
            'participant' => $participant->load(['eventYear', 'category']),
            'films' => $films,
        ]);
    }
}