<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ObjectMetric;
use App\Models\CriteriaTemplate;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_metrics' => ObjectMetric::count(),
            'total_templates' => CriteriaTemplate::count(),
            'total_users' => User::count(),
            'recent_metrics' => ObjectMetric::latest()->take(5)->get(),
            'recent_templates' => CriteriaTemplate::latest()->take(5)->get(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}