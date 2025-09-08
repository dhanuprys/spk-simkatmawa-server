<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CriteriaTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CriteriaTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = CriteriaTemplate::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $criteriaTemplates = $query->latest()->paginate(10);

        return Inertia::render('admin/criteria-templates/Index', [
            'criteriaTemplates' => $criteriaTemplates,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/criteria-templates/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',

            // L3 Criteria Values
            'l3_cg1_a_value' => 'required|numeric|between:0,10000',
            'l3_cg1_b_value' => 'required|numeric|between:0,10000',
            'l3_cg1_c_value' => 'required|numeric|between:0,10000',
            'l3_cg2_a_value' => 'required|numeric|between:0,10000',
            'l3_cg2_b_value' => 'required|numeric|between:0,10000',

            // L3 Criteria Max Flags
            'l3_cg1_a_max' => 'required|boolean',
            'l3_cg1_b_max' => 'required|boolean',
            'l3_cg1_c_max' => 'required|boolean',
            'l3_cg2_a_max' => 'required|boolean',
            'l3_cg2_b_max' => 'required|boolean',

            // L2 Criteria Values
            'l2_cg1_a_value' => 'required|numeric|between:0,10000',
            'l2_cg1_b_value' => 'required|numeric|between:0,10000',
            'l2_cg1_c_value' => 'required|numeric|between:0,10000',
            'l2_cg1_d_value' => 'required|numeric|between:0,10000',
            'l2_cg1_e_value' => 'required|numeric|between:0,10000',
            'l2_cg1_f_value' => 'required|numeric|between:0,10000',
            'l2_cg1_g_value' => 'required|numeric|between:0,10000',
            'l2_cg2_a_value' => 'required|numeric|between:0,10000',
            'l2_cg2_b_value' => 'required|numeric|between:0,10000',
            'l2_cg3_a_value' => 'required|numeric|between:0,10000',
            'l2_cg3_b_value' => 'required|numeric|between:0,10000',
            'l2_cg3_c_value' => 'required|numeric|between:0,10000',
            'l2_cg3_d_value' => 'required|numeric|between:0,10000',
            'l2_cg3_e_value' => 'required|numeric|between:0,10000',

            // L2 Criteria Max Flags
            'l2_cg1_a_max' => 'required|boolean',
            'l2_cg1_b_max' => 'required|boolean',
            'l2_cg1_c_max' => 'required|boolean',
            'l2_cg1_d_max' => 'required|boolean',
            'l2_cg1_e_max' => 'required|boolean',
            'l2_cg1_f_max' => 'required|boolean',
            'l2_cg1_g_max' => 'required|boolean',
            'l2_cg2_a_max' => 'required|boolean',
            'l2_cg2_b_max' => 'required|boolean',
            'l2_cg3_a_max' => 'required|boolean',
            'l2_cg3_b_max' => 'required|boolean',
            'l2_cg3_c_max' => 'required|boolean',
            'l2_cg3_d_max' => 'required|boolean',
            'l2_cg3_e_max' => 'required|boolean',

            // L1 Criteria Values
            'l1_cg1_a_value' => 'required|numeric|between:0,10000',
            'l1_cg1_b_value' => 'required|numeric|between:0,10000',
            'l1_cg1_c_value' => 'required|numeric|between:0,10000',

            // L1 Criteria Max Flags
            'l1_cg1_a_max' => 'required|boolean',
            'l1_cg1_b_max' => 'required|boolean',
            'l1_cg1_c_max' => 'required|boolean',

            // Result settings
            'limit' => 'required|integer|min:1|max:100',
            'ascending' => 'required|boolean',
        ]);

        CriteriaTemplate::create($validated);

        return redirect()->route('admin.criteria-templates.index')
            ->with('success', 'Template kriteria berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CriteriaTemplate $criteriaTemplate)
    {
        return Inertia::render('admin/criteria-templates/Show', [
            'criteriaTemplate' => $criteriaTemplate,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CriteriaTemplate $criteriaTemplate)
    {
        return Inertia::render('admin/criteria-templates/Edit', [
            'criteriaTemplate' => $criteriaTemplate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CriteriaTemplate $criteriaTemplate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',

            // L3 Criteria Values
            'l3_cg1_a_value' => 'required|numeric|between:0,10000',
            'l3_cg1_b_value' => 'required|numeric|between:0,10000',
            'l3_cg1_c_value' => 'required|numeric|between:0,10000',
            'l3_cg2_a_value' => 'required|numeric|between:0,10000',
            'l3_cg2_b_value' => 'required|numeric|between:0,10000',

            // L3 Criteria Max Flags
            'l3_cg1_a_max' => 'required|boolean',
            'l3_cg1_b_max' => 'required|boolean',
            'l3_cg1_c_max' => 'required|boolean',
            'l3_cg2_a_max' => 'required|boolean',
            'l3_cg2_b_max' => 'required|boolean',

            // L2 Criteria Values
            'l2_cg1_a_value' => 'required|numeric|between:0,10000',
            'l2_cg1_b_value' => 'required|numeric|between:0,10000',
            'l2_cg1_c_value' => 'required|numeric|between:0,10000',
            'l2_cg1_d_value' => 'required|numeric|between:0,10000',
            'l2_cg1_e_value' => 'required|numeric|between:0,10000',
            'l2_cg1_f_value' => 'required|numeric|between:0,10000',
            'l2_cg1_g_value' => 'required|numeric|between:0,10000',
            'l2_cg2_a_value' => 'required|numeric|between:0,10000',
            'l2_cg2_b_value' => 'required|numeric|between:0,10000',
            'l2_cg3_a_value' => 'required|numeric|between:0,10000',
            'l2_cg3_b_value' => 'required|numeric|between:0,10000',
            'l2_cg3_c_value' => 'required|numeric|between:0,10000',
            'l2_cg3_d_value' => 'required|numeric|between:0,10000',
            'l2_cg3_e_value' => 'required|numeric|between:0,10000',

            // L2 Criteria Max Flags
            'l2_cg1_a_max' => 'required|boolean',
            'l2_cg1_b_max' => 'required|boolean',
            'l2_cg1_c_max' => 'required|boolean',
            'l2_cg1_d_max' => 'required|boolean',
            'l2_cg1_e_max' => 'required|boolean',
            'l2_cg1_f_max' => 'required|boolean',
            'l2_cg1_g_max' => 'required|boolean',
            'l2_cg2_a_max' => 'required|boolean',
            'l2_cg2_b_max' => 'required|boolean',
            'l2_cg3_a_max' => 'required|boolean',
            'l2_cg3_b_max' => 'required|boolean',
            'l2_cg3_c_max' => 'required|boolean',
            'l2_cg3_d_max' => 'required|boolean',
            'l2_cg3_e_max' => 'required|boolean',

            // L1 Criteria Values
            'l1_cg1_a_value' => 'required|numeric|between:0,10000',
            'l1_cg1_b_value' => 'required|numeric|between:0,10000',
            'l1_cg1_c_value' => 'required|numeric|between:0,10000',

            // L1 Criteria Max Flags
            'l1_cg1_a_max' => 'required|boolean',
            'l1_cg1_b_max' => 'required|boolean',
            'l1_cg1_c_max' => 'required|boolean',

            // Result settings
            'limit' => 'required|integer|min:1|max:100',
            'ascending' => 'required|boolean',
        ]);

        $criteriaTemplate->update($validated);

        return redirect()->route('admin.criteria-templates.index')
            ->with('success', 'Template kriteria berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CriteriaTemplate $criteriaTemplate)
    {
        $criteriaTemplate->delete();

        return redirect()->route('admin.criteria-templates.index')
            ->with('success', 'Template kriteria berhasil dihapus.');
    }

    /**
     * Delete multiple criteria templates
     */
    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:criteria_templates,id'
        ]);

        CriteriaTemplate::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.criteria-templates.index')
            ->with('success', 'Template kriteria yang dipilih berhasil dihapus.');
    }

    /**
     * Import criteria templates from CSV
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
                if (count($data) >= 51) { // Ensure we have enough columns
                    CriteriaTemplate::create([
                        'name' => $data[0] ?? '',
                        'description' => $data[1] ?? '',
                        // L3 Criteria Values
                        'l3_cg1_a_value' => $data[2] ? (float) $data[2] : 0,
                        'l3_cg1_b_value' => $data[3] ? (float) $data[3] : 0,
                        'l3_cg1_c_value' => $data[4] ? (float) $data[4] : 0,
                        'l3_cg2_a_value' => $data[5] ? (float) $data[5] : 0,
                        'l3_cg2_b_value' => $data[6] ? (float) $data[6] : 0,
                        // L3 Criteria Max Flags
                        'l3_cg1_a_max' => (bool) ($data[7] ?? false),
                        'l3_cg1_b_max' => (bool) ($data[8] ?? false),
                        'l3_cg1_c_max' => (bool) ($data[9] ?? false),
                        'l3_cg2_a_max' => (bool) ($data[10] ?? false),
                        'l3_cg2_b_max' => (bool) ($data[11] ?? false),
                        // L2 Criteria Values
                        'l2_cg1_a_value' => $data[12] ? (float) $data[12] : 0,
                        'l2_cg1_b_value' => $data[13] ? (float) $data[13] : 0,
                        'l2_cg1_c_value' => $data[14] ? (float) $data[14] : 0,
                        'l2_cg1_d_value' => $data[15] ? (float) $data[15] : 0,
                        'l2_cg1_e_value' => $data[16] ? (float) $data[16] : 0,
                        'l2_cg1_f_value' => $data[17] ? (float) $data[17] : 0,
                        'l2_cg1_g_value' => $data[18] ? (float) $data[18] : 0,
                        'l2_cg2_a_value' => $data[19] ? (float) $data[19] : 0,
                        'l2_cg2_b_value' => $data[20] ? (float) $data[20] : 0,
                        'l2_cg3_a_value' => $data[21] ? (float) $data[21] : 0,
                        'l2_cg3_b_value' => $data[22] ? (float) $data[22] : 0,
                        'l2_cg3_c_value' => $data[23] ? (float) $data[23] : 0,
                        'l2_cg3_d_value' => $data[24] ? (float) $data[24] : 0,
                        'l2_cg3_e_value' => $data[25] ? (float) $data[25] : 0,
                        // L2 Criteria Max Flags
                        'l2_cg1_a_max' => (bool) ($data[26] ?? false),
                        'l2_cg1_b_max' => (bool) ($data[27] ?? false),
                        'l2_cg1_c_max' => (bool) ($data[28] ?? false),
                        'l2_cg1_d_max' => (bool) ($data[29] ?? false),
                        'l2_cg1_e_max' => (bool) ($data[30] ?? false),
                        'l2_cg1_f_max' => (bool) ($data[31] ?? false),
                        'l2_cg1_g_max' => (bool) ($data[32] ?? false),
                        'l2_cg2_a_max' => (bool) ($data[33] ?? false),
                        'l2_cg2_b_max' => (bool) ($data[34] ?? false),
                        'l2_cg3_a_max' => (bool) ($data[35] ?? false),
                        'l2_cg3_b_max' => (bool) ($data[36] ?? false),
                        'l2_cg3_c_max' => (bool) ($data[37] ?? false),
                        'l2_cg3_d_max' => (bool) ($data[38] ?? false),
                        'l2_cg3_e_max' => (bool) ($data[39] ?? false),
                        // L1 Criteria Values
                        'l1_cg1_a_value' => $data[40] ? (float) $data[40] : 0,
                        'l1_cg1_b_value' => $data[41] ? (float) $data[41] : 0,
                        'l1_cg1_c_value' => $data[42] ? (float) $data[42] : 0,
                        // L1 Criteria Max Flags
                        'l1_cg1_a_max' => (bool) ($data[43] ?? false),
                        'l1_cg1_b_max' => (bool) ($data[44] ?? false),
                        'l1_cg1_c_max' => (bool) ($data[45] ?? false),
                        // Result settings
                        'limit' => $data[46] ? (int) $data[46] : 10,
                        'ascending' => (bool) ($data[47] ?? false),
                    ]);
                    $imported++;
                }
            }

            fclose($handle);
            DB::commit();

            return redirect()->route('admin.criteria-templates.index')
                ->with('success', "Berhasil mengimpor {$imported} template kriteria.");

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.criteria-templates.index')
                ->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }

    /**
     * Export criteria templates to CSV
     */
    public function export()
    {
        $criteriaTemplates = CriteriaTemplate::all();

        $filename = 'criteria_templates_' . date('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($criteriaTemplates) {
            $file = fopen('php://output', 'w');

            // Header row
            fputcsv($file, [
                'Nama',
                'Deskripsi',
                'L3_CG1_A_Value',
                'L3_CG1_B_Value',
                'L3_CG1_C_Value',
                'L3_CG2_A_Value',
                'L3_CG2_B_Value',
                'L3_CG1_A_Max',
                'L3_CG1_B_Max',
                'L3_CG1_C_Max',
                'L3_CG2_A_Max',
                'L3_CG2_B_Max',
                'L2_CG1_A_Value',
                'L2_CG1_B_Value',
                'L2_CG1_C_Value',
                'L2_CG1_D_Value',
                'L2_CG1_E_Value',
                'L2_CG1_F_Value',
                'L2_CG1_G_Value',
                'L2_CG2_A_Value',
                'L2_CG2_B_Value',
                'L2_CG3_A_Value',
                'L2_CG3_B_Value',
                'L2_CG3_C_Value',
                'L2_CG3_D_Value',
                'L2_CG3_E_Value',
                'L2_CG1_A_Max',
                'L2_CG1_B_Max',
                'L2_CG1_C_Max',
                'L2_CG1_D_Max',
                'L2_CG1_E_Max',
                'L2_CG1_F_Max',
                'L2_CG1_G_Max',
                'L2_CG2_A_Max',
                'L2_CG2_B_Max',
                'L2_CG3_A_Max',
                'L2_CG3_B_Max',
                'L2_CG3_C_Max',
                'L2_CG3_D_Max',
                'L2_CG3_E_Max',
                'L1_CG1_A_Value',
                'L1_CG1_B_Value',
                'L1_CG1_C_Value',
                'L1_CG1_A_Max',
                'L1_CG1_B_Max',
                'L1_CG1_C_Max',
                'Limit',
                'Ascending'
            ]);

            // Data rows
            foreach ($criteriaTemplates as $template) {
                fputcsv($file, [
                    $template->name,
                    $template->description,
                    $template->l3_cg1_a_value,
                    $template->l3_cg1_b_value,
                    $template->l3_cg1_c_value,
                    $template->l3_cg2_a_value,
                    $template->l3_cg2_b_value,
                    $template->l3_cg1_a_max ? '1' : '0',
                    $template->l3_cg1_b_max ? '1' : '0',
                    $template->l3_cg1_c_max ? '1' : '0',
                    $template->l3_cg2_a_max ? '1' : '0',
                    $template->l3_cg2_b_max ? '1' : '0',
                    $template->l2_cg1_a_value,
                    $template->l2_cg1_b_value,
                    $template->l2_cg1_c_value,
                    $template->l2_cg1_d_value,
                    $template->l2_cg1_e_value,
                    $template->l2_cg1_f_value,
                    $template->l2_cg1_g_value,
                    $template->l2_cg2_a_value,
                    $template->l2_cg2_b_value,
                    $template->l2_cg3_a_value,
                    $template->l2_cg3_b_value,
                    $template->l2_cg3_c_value,
                    $template->l2_cg3_d_value,
                    $template->l2_cg3_e_value,
                    $template->l2_cg1_a_max ? '1' : '0',
                    $template->l2_cg1_b_max ? '1' : '0',
                    $template->l2_cg1_c_max ? '1' : '0',
                    $template->l2_cg1_d_max ? '1' : '0',
                    $template->l2_cg1_e_max ? '1' : '0',
                    $template->l2_cg1_f_max ? '1' : '0',
                    $template->l2_cg1_g_max ? '1' : '0',
                    $template->l2_cg2_a_max ? '1' : '0',
                    $template->l2_cg2_b_max ? '1' : '0',
                    $template->l2_cg3_a_max ? '1' : '0',
                    $template->l2_cg3_b_max ? '1' : '0',
                    $template->l2_cg3_c_max ? '1' : '0',
                    $template->l2_cg3_d_max ? '1' : '0',
                    $template->l2_cg3_e_max ? '1' : '0',
                    $template->l1_cg1_a_value,
                    $template->l1_cg1_b_value,
                    $template->l1_cg1_c_value,
                    $template->l1_cg1_a_max ? '1' : '0',
                    $template->l1_cg1_b_max ? '1' : '0',
                    $template->l1_cg1_c_max ? '1' : '0',
                    $template->limit,
                    $template->ascending ? '1' : '0',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}

