<?php

namespace App\Http\Controllers;

use App\Models\CriteriaTemplate;
use App\Modules\MagiqMarcos\MagiqMarcos;
use App\Modules\MagiqMarcos\UserCriteria;
use Illuminate\Http\Request;

class CalculationController extends Controller
{
    public function __construct(
        public MagiqMarcos $magiqMarcos
    ) {
    }

    public function calculate(Request $request)
    {
        $request->validate([
            'l3_cg1_a_value' => 'required|numeric|between:0,10000',
            'l3_cg1_b_value' => 'required|numeric|between:0,10000',
            'l3_cg1_c_value' => 'required|numeric|between:0,10000',
            'l3_cg2_a_value' => 'required|numeric|between:0,10000',
            'l3_cg2_b_value' => 'required|numeric|between:0,10000',
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
            'l1_cg1_a_value' => 'required|numeric|between:0,10000',
            'l1_cg1_b_value' => 'required|numeric|between:0,10000',
            'l1_cg1_c_value' => 'required|numeric|between:0,10000',
            'l3_cg1_a_max' => 'required|boolean',
            'l3_cg1_b_max' => 'required|boolean',
            'l3_cg1_c_max' => 'required|boolean',
            'l3_cg2_a_max' => 'required|boolean',
            'l3_cg2_b_max' => 'required|boolean',
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
            'l1_cg1_a_max' => 'required|boolean',
            'l1_cg1_b_max' => 'required|boolean',
            'l1_cg1_c_max' => 'required|boolean',
            'limit' => 'required|integer|min:1|max:100',
            'ascending' => 'required|boolean',
        ]);

        $criteria = new UserCriteria(
            l3_cg1_a_value: $request->l3_cg1_a_value,
            l3_cg1_b_value: $request->l3_cg1_b_value,
            l3_cg1_c_value: $request->l3_cg1_c_value,
            l3_cg2_a_value: $request->l3_cg2_a_value,
            l3_cg2_b_value: $request->l3_cg2_b_value,
            l2_cg1_a_value: $request->l2_cg1_a_value,
            l2_cg1_b_value: $request->l2_cg1_b_value,
            l2_cg1_c_value: $request->l2_cg1_c_value,
            l2_cg1_d_value: $request->l2_cg1_d_value,
            l2_cg1_e_value: $request->l2_cg1_e_value,
            l2_cg1_f_value: $request->l2_cg1_f_value,
            l2_cg1_g_value: $request->l2_cg1_g_value,
            l2_cg2_a_value: $request->l2_cg2_a_value,
            l2_cg2_b_value: $request->l2_cg2_b_value,
            l2_cg3_a_value: $request->l2_cg3_a_value,
            l2_cg3_b_value: $request->l2_cg3_b_value,
            l2_cg3_c_value: $request->l2_cg3_c_value,
            l2_cg3_d_value: $request->l2_cg3_d_value,
            l2_cg3_e_value: $request->l2_cg3_e_value,
            l1_cg1_a_value: $request->l1_cg1_a_value,
            l1_cg1_b_value: $request->l1_cg1_b_value,
            l1_cg1_c_value: $request->l1_cg1_c_value,
            l3_cg1_a_max: $request->l3_cg1_a_max,
            l3_cg1_b_max: $request->l3_cg1_b_max,
            l3_cg1_c_max: $request->l3_cg1_c_max,
            l3_cg2_a_max: $request->l3_cg2_a_max,
            l3_cg2_b_max: $request->l3_cg2_b_max,
            l2_cg1_a_max: $request->l2_cg1_a_max,
            l2_cg1_b_max: $request->l2_cg1_b_max,
            l2_cg1_c_max: $request->l2_cg1_c_max,
            l2_cg1_d_max: $request->l2_cg1_d_max,
            l2_cg1_e_max: $request->l2_cg1_e_max,
            l2_cg1_f_max: $request->l2_cg1_f_max,
            l2_cg1_g_max: $request->l2_cg1_g_max,
            l2_cg2_a_max: $request->l2_cg2_a_max,
            l2_cg2_b_max: $request->l2_cg2_b_max,
            l2_cg3_a_max: $request->l2_cg3_a_max,
            l2_cg3_b_max: $request->l2_cg3_b_max,
            l2_cg3_c_max: $request->l2_cg3_c_max,
            l2_cg3_d_max: $request->l2_cg3_d_max,
            l2_cg3_e_max: $request->l2_cg3_e_max,
            l1_cg1_a_max: $request->l1_cg1_a_max,
            l1_cg1_b_max: $request->l1_cg1_b_max,
            l1_cg1_c_max: $request->l1_cg1_c_max,
            limit: $request->limit,
            ascending: $request->ascending,
        );

        $result = $this->magiqMarcos->calculate($criteria);

        // transform
        return array_map(
            fn($res) => [
                'id' => $res->objectEntity->id,
                'name' => $res->objectEntity->name,
                'pref_score' => $res->prefScore
            ],
            $result
        );
    }

    public function calculateTemplate(Request $request)
    {
        $request->validate([
            'template_id' => ['required', 'exists:criteria_templates,id'],
            'ascending' => ['nullable', 'boolean'],
            'limit' => ['nullable', 'numeric', 'min:1', 'max:100']
        ]);

        $template = CriteriaTemplate::find($request->template_id);

        $criteria = new UserCriteria(
            l3_cg1_a_value: $template->l3_cg1_a_value,
            l3_cg1_b_value: $template->l3_cg1_b_value,
            l3_cg1_c_value: $template->l3_cg1_c_value,
            l3_cg2_a_value: $template->l3_cg2_a_value,
            l3_cg2_b_value: $template->l3_cg2_b_value,
            l2_cg1_a_value: $template->l2_cg1_a_value,
            l2_cg1_b_value: $template->l2_cg1_b_value,
            l2_cg1_c_value: $template->l2_cg1_c_value,
            l2_cg1_d_value: $template->l2_cg1_d_value,
            l2_cg1_e_value: $template->l2_cg1_e_value,
            l2_cg1_f_value: $template->l2_cg1_f_value,
            l2_cg1_g_value: $template->l2_cg1_g_value,
            l2_cg2_a_value: $template->l2_cg2_a_value,
            l2_cg2_b_value: $template->l2_cg2_b_value,
            l2_cg3_a_value: $template->l2_cg3_a_value,
            l2_cg3_b_value: $template->l2_cg3_b_value,
            l2_cg3_c_value: $template->l2_cg3_c_value,
            l2_cg3_d_value: $template->l2_cg3_d_value,
            l2_cg3_e_value: $template->l2_cg3_e_value,
            l1_cg1_a_value: $template->l1_cg1_a_value,
            l1_cg1_b_value: $template->l1_cg1_b_value,
            l1_cg1_c_value: $template->l1_cg1_c_value,
            l3_cg1_a_max: $template->l3_cg1_a_max,
            l3_cg1_b_max: $template->l3_cg1_b_max,
            l3_cg1_c_max: $template->l3_cg1_c_max,
            l3_cg2_a_max: $template->l3_cg2_a_max,
            l3_cg2_b_max: $template->l3_cg2_b_max,
            l2_cg1_a_max: $template->l2_cg1_a_max,
            l2_cg1_b_max: $template->l2_cg1_b_max,
            l2_cg1_c_max: $template->l2_cg1_c_max,
            l2_cg1_d_max: $template->l2_cg1_d_max,
            l2_cg1_e_max: $template->l2_cg1_e_max,
            l2_cg1_f_max: $template->l2_cg1_f_max,
            l2_cg1_g_max: $template->l2_cg1_g_max,
            l2_cg2_a_max: $template->l2_cg2_a_max,
            l2_cg2_b_max: $template->l2_cg2_b_max,
            l2_cg3_a_max: $template->l2_cg3_a_max,
            l2_cg3_b_max: $template->l2_cg3_b_max,
            l2_cg3_c_max: $template->l2_cg3_c_max,
            l2_cg3_d_max: $template->l2_cg3_d_max,
            l2_cg3_e_max: $template->l2_cg3_e_max,
            l1_cg1_a_max: $template->l1_cg1_a_max,
            l1_cg1_b_max: $template->l1_cg1_b_max,
            l1_cg1_c_max: $template->l1_cg1_c_max,
            limit: $request->limit ?? $template->limit,
            ascending: $request->ascending ?? $template->ascending,
        );

        $result = $this->magiqMarcos->calculate($criteria);

        return array_map(
            fn($res) => [
                'id' => $res->objectEntity->id,
                'name' => $res->objectEntity->name,
                'pref_score' => $res->prefScore
            ],
            $result
        );
    }

    public function templates(Request $request)
    {
        return CriteriaTemplate::select(['id', 'name', 'description'])->get()->toArray();
    }
}
