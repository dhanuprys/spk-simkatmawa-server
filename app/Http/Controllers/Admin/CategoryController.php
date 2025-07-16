<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryService $categoryService
    ) {
    }

    public function index()
    {
        $categories = $this->categoryService->getCategoriesWithParticipantCount();

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

    public function store(CategoryRequest $request, $eventYearId)
    {
        $this->categoryService->createForEventYear($eventYearId, $request->validated());

        return redirect()->route('admin.event-years.show', $eventYearId)
            ->with('success', 'Kategori berhasil dibuat');
    }

    public function show(\App\Models\EventYear $eventYear, \App\Models\Category $category)
    {
        // Optionally ensure the category belongs to the event year
        if ($category->event_year_id !== $eventYear->id) {
            abort(404, 'Kategori tidak ditemukan dalam tahun event ini');
        }
        $category = $this->categoryService->getCategoryWithFilms($category);

        return Inertia::render('admin/categories/show', [
            'category' => new CategoryResource($category),
        ]);
    }

    public function edit($eventYearId, Category $category)
    {
        try {
            $this->categoryService->ensureCategoryBelongsToEventYear($category, $eventYearId);
        } catch (\Exception $e) {
            return redirect()->route('admin.event-years.show', $eventYearId)
                ->with('error', $e->getMessage());
        }

        return Inertia::render('admin/categories/edit', [
            'category' => $category->load('eventYear'),
            'eventYearId' => $eventYearId,
        ]);
    }

    public function update(CategoryRequest $request, $eventYearId, Category $category)
    {
        $this->categoryService->update($category, $request->validated());

        return redirect()->route('admin.event-years.show', $eventYearId)
            ->with('success', 'Kategori berhasil diperbarui');
    }

    public function destroy($eventYearId, Category $category)
    {
        try {
            $this->categoryService->delete($category);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('admin.event-years.show', $eventYearId)
            ->with('success', 'Kategori berhasil dihapus');
    }
}