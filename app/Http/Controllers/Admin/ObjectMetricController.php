<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ObjectMetric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ObjectMetricController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ObjectMetric::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $objectMetrics = $query->latest()->paginate(10);

        return Inertia::render('admin/object-metrics/Index', [
            'objectMetrics' => $objectMetrics,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/object-metrics/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',

            // L3 Criteria
            'l3_cg1_a' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg1_b' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg1_c' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg2_a' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg2_b' => 'required|numeric|min:0|max:999999999.9999',

            // L2 Criteria
            'l2_cg1_a' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_b' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_c' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_d' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_e' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_f' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_g' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_a' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_b' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_c' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_d' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_e' => 'required|numeric|min:0|max:999999999.9999',
        ]);

        ObjectMetric::create($validated);

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ObjectMetric $objectMetric)
    {
        return Inertia::render('admin/object-metrics/Show', [
            'objectMetric' => $objectMetric,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ObjectMetric $objectMetric)
    {
        return Inertia::render('admin/object-metrics/Edit', [
            'objectMetric' => $objectMetric,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ObjectMetric $objectMetric)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',

            // L3 Criteria
            'l3_cg1_a' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg1_b' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg1_c' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg2_a' => 'required|numeric|min:0|max:999999999.9999',
            'l3_cg2_b' => 'required|numeric|min:0|max:999999999.9999',

            // L2 Criteria
            'l2_cg1_a' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_b' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_c' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_d' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_e' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_f' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg1_g' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_a' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_b' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_c' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_d' => 'required|numeric|min:0|max:999999999.9999',
            'l2_cg3_e' => 'required|numeric|min:0|max:999999999.9999',
        ]);

        $objectMetric->update($validated);

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ObjectMetric $objectMetric)
    {
        $objectMetric->delete();

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik berhasil dihapus.');
    }

    /**
     * Delete multiple object metrics
     */
    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:object_metrics,id'
        ]);

        ObjectMetric::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik yang dipilih berhasil dihapus.');
    }

    /**
     * Import object metrics from CSV
     */
    public function import(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:2048'
        ]);

        try {
            DB::beginTransaction();

            $file = $request->file('csv_file');
            $handle = fopen($file->getPathname(), 'r');

            // Skip header row
            $header = fgetcsv($handle);

            $imported = 0;
            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) >= 18) { // Ensure we have enough columns (reduced from 19 to 18)
                    ObjectMetric::create([
                        'name' => $data[0] ?? '',
                        'l2_cg1_a' => $data[1] ? (float) $data[1] : 0,
                        'l2_cg1_b' => $data[2] ? (float) $data[2] : 0,
                        'l2_cg1_c' => $data[3] ? (float) $data[3] : 0,
                        'l2_cg1_d' => $data[4] ? (float) $data[4] : 0,
                        'l2_cg1_e' => $data[5] ? (float) $data[5] : 0,
                        'l2_cg1_f' => $data[6] ? (float) $data[6] : 0,
                        'l2_cg1_g' => $data[7] ? (float) $data[7] : 0,
                        'l2_cg3_a' => $data[8] ? (float) $data[8] : 0,
                        'l2_cg3_b' => $data[9] ? (float) $data[9] : 0,
                        'l2_cg3_c' => $data[10] ? (float) $data[10] : 0,
                        'l2_cg3_d' => $data[11] ? (float) $data[11] : 0,
                        'l2_cg3_e' => $data[12] ? (float) $data[12] : 0,
                        'l3_cg1_a' => $data[13] ? (float) $data[13] : 0,
                        'l3_cg1_b' => $data[14] ? (float) $data[14] : 0,
                        'l3_cg1_c' => $data[15] ? (float) $data[15] : 0,
                        'l3_cg2_a' => $data[16] ? (float) $data[16] : 0,
                        'l3_cg2_b' => $data[17] ? (float) $data[17] : 0,
                    ]);
                    $imported++;
                }
            }

            fclose($handle);
            DB::commit();

            return redirect()->route('admin.object-metrics.index')
                ->with('success', "Berhasil mengimpor {$imported} data metrik.");

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.object-metrics.index')
                ->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }


    /**
     * Download import template CSV
     */
    public function downloadTemplate()
    {
        $filename = 'object_metrics_template_' . date('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () {
            $file = fopen('php://output', 'w');

            // Header row with descriptions
            fputcsv($file, [
                'Nama Mahasiswa',
                'L2_CG1_A (Kompetisi)',
                'L2_CG1_B (Pengakuan)',
                'L2_CG1_C (Penghargaan)',
                'L2_CG1_D (Karier Organisasi)',
                'L2_CG1_E (Hasil Karya)',
                'L2_CG1_F (Pemberdayaan / Aksi Kemanusiaan)',
                'L2_CG1_G (Kewirausahaan)',
                'L2_CG3_A (Content)',
                'L2_CG3_B (Accuracy)',
                'L2_CG3_C (Fluency)',
                'L2_CG3_D (Pronounciation)',
                'L2_CG3_E (Overall Performance)',
                'L3_CG1_A (Penyajian)',
                'L3_CG1_B (Substansi)',
                'L3_CG1_C (Kualitas)',
                'L3_CG2_A (Presentasi)',
                'L3_CG2_B (Tanya Jawab)'
            ]);

            // Sample data row
            fputcsv($file, [
                'John Doe',
                '8.5',
                '7.2',
                '9.1',
                '6.8',
                '8.9',
                '7.5',
                '8.0',
                '7.8',
                '8.2',
                '7.9',
                '8.1',
                '7.7',
                '8.3',
                '7.6',
                '8.4',
                '7.8',
                '8.0'
            ]);

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
