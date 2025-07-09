<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');
Route::get('/contact', function () {
    return Inertia::render('contact');
});
Route::get('/registration', [App\Http\Controllers\RegistrationController::class, 'index'])->name('registration');
Route::post('/registration', [App\Http\Controllers\RegistrationController::class, 'store'])->name('registration.store');
Route::get('/registration/success', [App\Http\Controllers\RegistrationController::class, 'success'])->name('registration.success');
Route::get('/registration/{pin}/download/{type}', [App\Http\Controllers\RegistrationController::class, 'download'])->name('registration.download');

// Status tracking routes
Route::get('/status', [App\Http\Controllers\StatusController::class, 'index'])->name('status.index');
Route::post('/status/check', [App\Http\Controllers\StatusController::class, 'check'])->name('status.check');
Route::get('/status/{token}', [App\Http\Controllers\StatusController::class, 'show'])->name('status.show');
Route::post('/status/{token}/logout', [App\Http\Controllers\StatusController::class, 'logout'])->name('status.logout');
Route::post('/status/{token}/extend', [App\Http\Controllers\StatusController::class, 'extendSession'])->name('status.extend');
Route::get('/submission', [App\Http\Controllers\SubmissionController::class, 'index'])->name('submission');
Route::post('/submission/verify', [App\Http\Controllers\SubmissionController::class, 'verify'])->name('submission.verify');
Route::post('/submission', [App\Http\Controllers\SubmissionController::class, 'store'])->name('submission.store');
Route::put('/submission/{film}', [App\Http\Controllers\SubmissionController::class, 'update'])->name('submission.update');
Route::post('/submission/logout', [App\Http\Controllers\SubmissionController::class, 'logout'])->name('submission.logout');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
