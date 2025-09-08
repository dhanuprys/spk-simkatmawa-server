<?php

use App\Http\Controllers\CalculationController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'api', 'as' => 'api.'], function () {
    Route::post('calculate', [CalculationController::class, 'calculate'])->name('calculate');
    Route::post('calculate-template', [CalculationController::class, 'calculateTemplate'])->name('calculate-template');
    Route::get('templates', [CalculationController::class, 'templates'])->name('templates');
});