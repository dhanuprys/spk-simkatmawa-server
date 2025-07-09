<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EventYearController;
use App\Http\Controllers\Admin\FilmController;
use App\Http\Controllers\Admin\ParticipantController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
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

    // Categories Management
    Route::resource('categories', CategoryController::class);

    // Event Years Management
    Route::resource('event-years', EventYearController::class);

    // Users Management
    Route::resource('users', UserController::class);

    // Settings
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingController::class, 'update'])->name('settings.update');

    // Statistics and Reports
    Route::get('statistics', [AdminController::class, 'statistics'])->name('statistics');
    Route::get('reports/participants', [AdminController::class, 'participantsReport'])->name('reports.participants');
    Route::get('reports/films', [AdminController::class, 'filmsReport'])->name('reports.films');
});