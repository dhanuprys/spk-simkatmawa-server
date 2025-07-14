<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('participants')->latest()->paginate(20);

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    public function create($eventYearId)
    {
        // Load the event year to display its information
        $eventYear = \App\Models\EventYear::findOrFail($eventYearId);

        return Inertia::render('admin/categories/create', [
            'eventYearId' => $eventYearId,
            'eventYear' => $eventYear,
        ]);
    }

    public function store(Request $request, $eventYearId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,NULL,id,event_year_id,' . $eventYearId,
            'is_active' => 'boolean',
        ]);
        $validated['event_year_id'] = $eventYearId;
        Category::create($validated);
        return redirect()->route('admin.event-years.show', $eventYearId)
            ->with('success', 'Kategori berhasil dibuat');
    }

    public function show(Category $category)
    {
        $category->load([
            'participants' => function ($query) {
                $query->with(['eventYear', 'verifiedBy', 'films'])->latest();
            }
        ]);

        return Inertia::render('admin/categories/show', [
            'category' => $category,
        ]);
    }

    public function edit($eventYearId, Category $category)
    {
        // Ensure the category belongs to the specified event year
        if ($category->event_year_id != $eventYearId) {
            return redirect()->route('admin.event-years.show', $eventYearId)
                ->with('error', 'Kategori tidak ditemukan dalam tahun event ini');
        }

        return Inertia::render('admin/categories/edit', [
            'category' => $category->load('eventYear'),
            'eventYearId' => $eventYearId,
        ]);
    }

    public function update(Request $request, $eventYearId, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id . ',id,event_year_id,' . $eventYearId,
            'is_active' => 'boolean',
        ]);
        $category->update($validated);
        return redirect()->route('admin.event-years.show', $eventYearId)
            ->with('success', 'Kategori berhasil diperbarui');
    }

    public function destroy($eventYearId, Category $category)
    {
        if ($category->participants()->count() > 0) {
            return back()->with('error', 'Tidak dapat menghapus kategori yang memiliki peserta');
        }
        $category->delete();
        return redirect()->route('admin.event-years.show', $eventYearId)
            ->with('success', 'Kategori berhasil dihapus');
    }
}