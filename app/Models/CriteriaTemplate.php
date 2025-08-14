<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CriteriaTemplate extends Model
{
    use HasFactory;

    protected $table = 'criteria_templates';

    protected $fillable = [
        'name',
        'description',

        // L3 Criteria
        'l3_cg1_a_value',
        'l3_cg1_a_max',
        'l3_cg1_b_value',
        'l3_cg1_b_max',
        'l3_cg1_c_value',
        'l3_cg1_c_max',
        'l3_cg2_a_value',
        'l3_cg2_a_max',
        'l3_cg2_b_value',
        'l3_cg2_b_max',

        // L2 Criteria
        'l2_cg1_a_value',
        'l2_cg1_a_max',
        'l2_cg1_b_value',
        'l2_cg1_b_max',
        'l2_cg1_c_value',
        'l2_cg1_c_max',
        'l2_cg1_d_value',
        'l2_cg1_d_max',
        'l2_cg1_e_value',
        'l2_cg1_e_max',
        'l2_cg1_f_value',
        'l2_cg1_f_max',
        'l2_cg1_g_value',
        'l2_cg1_g_max',
        'l2_cg2_a_value',
        'l2_cg2_a_max',
        'l2_cg2_b_value',
        'l2_cg2_b_max',
        'l2_cg3_a_value',
        'l2_cg3_a_max',
        'l2_cg3_b_value',
        'l2_cg3_b_max',
        'l2_cg3_c_value',
        'l2_cg3_c_max',
        'l2_cg3_d_value',
        'l2_cg3_d_max',
        'l2_cg3_e_value',
        'l2_cg3_e_max',

        // L1 Criteria
        'l1_cg1_a_value',
        'l1_cg1_a_max',
        'l1_cg1_b_value',
        'l1_cg1_b_max',
        'l1_cg1_c_value',
        'l1_cg1_c_max',

        // Result
        'limit',
        'ascending',
    ];

    protected $casts = [
        'l3_cg1_a_max' => 'boolean',
        'l3_cg1_b_max' => 'boolean',
        'l3_cg1_c_max' => 'boolean',
        'l3_cg2_a_max' => 'boolean',
        'l3_cg2_b_max' => 'boolean',
        'l2_cg1_a_max' => 'boolean',
        'l2_cg1_b_max' => 'boolean',
        'l2_cg1_c_max' => 'boolean',
        'l2_cg1_d_max' => 'boolean',
        'l2_cg1_e_max' => 'boolean',
        'l2_cg1_f_max' => 'boolean',
        'l2_cg1_g_max' => 'boolean',
        'l2_cg2_a_max' => 'boolean',
        'l2_cg2_b_max' => 'boolean',
        'l2_cg3_a_max' => 'boolean',
        'l2_cg3_b_max' => 'boolean',
        'l2_cg3_c_max' => 'boolean',
        'l2_cg3_d_max' => 'boolean',
        'l2_cg3_e_max' => 'boolean',
        'l1_cg1_a_max' => 'boolean',
        'l1_cg1_b_max' => 'boolean',
        'l1_cg1_c_max' => 'boolean',
        'ascending' => 'boolean',
        'limit' => 'integer',
    ];

    /**
     * Get all L3 criteria values
     */
    public function getL3Criteria(): array
    {
        return [
            'cg1_a' => [
                'value' => $this->l3_cg1_a_value,
                'max' => $this->l3_cg1_a_max,
                'label' => 'Penyajian'
            ],
            'cg1_b' => [
                'value' => $this->l3_cg1_b_value,
                'max' => $this->l3_cg1_b_max,
                'label' => 'Substansi'
            ],
            'cg1_c' => [
                'value' => $this->l3_cg1_c_value,
                'max' => $this->l3_cg1_c_max,
                'label' => 'Kualitas'
            ],
            'cg2_a' => [
                'value' => $this->l3_cg2_a_value,
                'max' => $this->l3_cg2_a_max,
                'label' => 'Presentasi'
            ],
            'cg2_b' => [
                'value' => $this->l3_cg2_b_value,
                'max' => $this->l3_cg2_b_max,
                'label' => 'Tanya Jawab'
            ],
        ];
    }

    /**
     * Get all L2 criteria values
     */
    public function getL2Criteria(): array
    {
        return [
            'cg1_a' => [
                'value' => $this->l2_cg1_a_value,
                'max' => $this->l2_cg1_a_max,
                'label' => 'Kompetisi'
            ],
            'cg1_b' => [
                'value' => $this->l2_cg1_b_value,
                'max' => $this->l2_cg1_b_max,
                'label' => 'Pengakuan'
            ],
            'cg1_c' => [
                'value' => $this->l2_cg1_c_value,
                'max' => $this->l2_cg1_c_max,
                'label' => 'Penghargaan'
            ],
            'cg1_d' => [
                'value' => $this->l2_cg1_d_value,
                'max' => $this->l2_cg1_d_max,
                'label' => 'Karier Organisasi'
            ],
            'cg1_e' => [
                'value' => $this->l2_cg1_e_value,
                'max' => $this->l2_cg1_e_max,
                'label' => 'Hasil Karya'
            ],
            'cg1_f' => [
                'value' => $this->l2_cg1_f_value,
                'max' => $this->l2_cg1_f_max,
                'label' => 'Pemberdayaan / Aksi Kemanusiaan'
            ],
            'cg1_g' => [
                'value' => $this->l2_cg1_g_value,
                'max' => $this->l2_cg1_g_max,
                'label' => 'Kewirausahaan'
            ],
            'cg2_a' => [
                'value' => $this->l2_cg2_a_value,
                'max' => $this->l2_cg2_a_max,
                'label' => 'Naskah GK'
            ],
            'cg2_b' => [
                'value' => $this->l2_cg2_b_value,
                'max' => $this->l2_cg2_b_max,
                'label' => 'Presentasi GK'
            ],
            'cg3_a' => [
                'value' => $this->l2_cg3_a_value,
                'max' => $this->l2_cg3_a_max,
                'label' => 'Content'
            ],
            'cg3_b' => [
                'value' => $this->l2_cg3_b_value,
                'max' => $this->l2_cg3_b_max,
                'label' => 'Accuracy'
            ],
            'cg3_c' => [
                'value' => $this->l2_cg3_c_value,
                'max' => $this->l2_cg3_c_max,
                'label' => 'Fluency'
            ],
            'cg3_d' => [
                'value' => $this->l2_cg3_d_value,
                'max' => $this->l2_cg3_d_max,
                'label' => 'Pronounciation'
            ],
            'cg3_e' => [
                'value' => $this->l2_cg3_e_value,
                'max' => $this->l2_cg3_e_max,
                'label' => 'Overall Performance'
            ],
        ];
    }

    /**
     * Get all L1 criteria values
     */
    public function getL1Criteria(): array
    {
        return [
            'cg1_a' => [
                'value' => $this->l1_cg1_a_value,
                'max' => $this->l1_cg1_a_max,
                'label' => 'Capaian Unggulan'
            ],
            'cg1_b' => [
                'value' => $this->l1_cg1_b_value,
                'max' => $this->l1_cg1_b_max,
                'label' => 'Gagasan Kreatif'
            ],
            'cg1_c' => [
                'value' => $this->l1_cg1_c_value,
                'max' => $this->l1_cg1_c_max,
                'label' => 'Bahasa Inggris'
            ],
        ];
    }
}
