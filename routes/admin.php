<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ObjectMetricController;
use App\Http\Controllers\Admin\CriteriaTemplateController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard & Statistics
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Users Management
    Route::resource('users', UserController::class);

    // Object Metrics Management
    Route::resource('object-metrics', ObjectMetricController::class);
    Route::post('object-metrics/import', [ObjectMetricController::class, 'import'])->name('object-metrics.import');
    Route::get('object-metrics/export', [ObjectMetricController::class, 'export'])->name('object-metrics.export');
    Route::delete('object-metrics/destroy-multiple', [ObjectMetricController::class, 'destroyMultiple'])->name('object-metrics.destroy-multiple');

    // Criteria Templates Management
    Route::resource('criteria-templates', CriteriaTemplateController::class);
    Route::post('criteria-templates/import', [CriteriaTemplateController::class, 'import'])->name('criteria-templates.import');
    Route::get('criteria-templates/export', [CriteriaTemplateController::class, 'export'])->name('criteria-templates.export');
    Route::delete('criteria-templates/destroy-multiple', [CriteriaTemplateController::class, 'destroyMultiple'])->name('criteria-templates.destroy-multiple');
});