<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EventYearController;
use App\Http\Controllers\Admin\FilmController;
use App\Http\Controllers\Admin\ParticipantController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TicketController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VotingPagePinController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Test route
    Route::get('/test', function () {
        return Inertia::render('admin/test');
    })->name('test');

    // Participants Management
    Route::resource('participants', ParticipantController::class);
    Route::post('participants/{participant}/approve', [ParticipantController::class, 'approve'])->name('participants.approve');
    Route::post('participants/{participant}/reject', [ParticipantController::class, 'reject'])->name('participants.reject');
    Route::post('participants/{participant}/reset-status', [ParticipantController::class, 'resetStatus'])->name('participants.reset-status');
    Route::get('participants/{participant}/films', [ParticipantController::class, 'films'])->name('participants.films');

    // Films Management
    Route::resource('films', FilmController::class);
    Route::post('films/{film}/verify', [FilmController::class, 'verify'])->name('films.verify');
    Route::post('films/{film}/reject', [FilmController::class, 'reject'])->name('films.reject');
    Route::get('films/{film}/download', [FilmController::class, 'download'])->name('films.download');
    Route::get('films/{film}/download-poster', [FilmController::class, 'downloadPoster'])->name('films.download-poster');
    Route::get('films/{film}/download-backdrop', [FilmController::class, 'downloadBackdrop'])->name('films.download-backdrop');

    // Voting Page PINs Management
    Route::resource('voting-pins', VotingPagePinController::class)->parameters([
        'voting-pins' => 'votingPin'
    ]);
    Route::post('voting-pins/{votingPin}/toggle-active', [VotingPagePinController::class, 'toggleActive'])->name('voting-pins.toggle-active');
    Route::post('voting-pins/{votingPin}/regenerate', [VotingPagePinController::class, 'regenerate'])->name('voting-pins.regenerate');
    Route::get('voting-pins/{votingPin}/sessions', [VotingPagePinController::class, 'sessions'])->name('voting-pins.sessions');
    Route::delete('voting-pins/{votingPin}/sessions', [VotingPagePinController::class, 'terminateAllSessions'])->name('voting-pins.terminate-all-sessions');
    Route::delete('voting-sessions/{session}', [VotingPagePinController::class, 'terminateSession'])->name('voting-sessions.terminate');
    // Bulk actions
    Route::post('voting-pins/bulk-activate', [VotingPagePinController::class, 'bulkActivate'])->name('voting-pins.bulk-activate');
    Route::post('voting-pins/bulk-deactivate', [VotingPagePinController::class, 'bulkDeactivate'])->name('voting-pins.bulk-deactivate');

    // Categories Management (now nested under event-years)
    Route::prefix('event-years/{eventYear}')->name('event-years.')->group(function () {
        Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
        Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        // Tickets Management (nested under event-years)
        Route::get('tickets', [TicketController::class, 'index'])->name('tickets.index');
        Route::get('tickets/create', [TicketController::class, 'create'])->name('tickets.create');
        Route::post('tickets', [TicketController::class, 'store'])->name('tickets.store');
        Route::get('tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show');
        Route::delete('tickets/{ticket}', [TicketController::class, 'destroy'])->name('tickets.destroy');
        Route::post('tickets/{ticket}/reset', [TicketController::class, 'reset'])->name('tickets.reset');
        Route::get('tickets-export', [TicketController::class, 'export'])->name('tickets.export');
    });

    // Event Years Management
    Route::resource('event-years', EventYearController::class);
    // Support POST for update (for file uploads with method spoofing)
    Route::post('event-years/{eventYear}', [EventYearController::class, 'update'])->name('event-years.update');
    Route::get('event-years/{eventYear}/download-guide', [EventYearController::class, 'downloadEventGuide'])->name('event-years.download-guide');

    // Users Management
    Route::resource('users', UserController::class);

    // Settings
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingController::class, 'update'])->name('settings.update');

    // Statistics
    Route::get('statistics', [AdminController::class, 'statistics'])->name('statistics');
});