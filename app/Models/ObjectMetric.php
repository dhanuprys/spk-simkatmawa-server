<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjectMetric extends Model
{
    use HasFactory;

    protected $table = 'object_metrics';

    protected $fillable = [
        'name',

        // L3 Criteria
        'l3_cg1_a', // Penyajian
        'l3_cg1_b', // Substansi
        'l3_cg1_c', // Kualitas
        'l3_cg2_a', // Presentasi
        'l3_cg2_b', // Tanya Jawab

        // L2 Criteria
        'l2_cg1_a', // Kompetisi
        'l2_cg1_b', // Pengakuan
        'l2_cg1_c', // Penghargaan
        'l2_cg1_d', // Karier Organisasi
        'l2_cg1_e', // Hasil Karya
        'l2_cg1_f', // Pemberdayaan / Aksi Kemanusiaan
        'l2_cg1_g', // Kewirausahaan
        'l2_cg3_a', // Content
        'l2_cg3_b', // Accuracy
        'l2_cg3_c', // Fluency
        'l2_cg3_d', // Pronounciation
        'l2_cg3_e', // Overall Performance
    ];

    protected $casts = [
        'l3_cg1_a' => 'decimal:4',
        'l3_cg1_b' => 'decimal:4',
        'l3_cg1_c' => 'decimal:4',
        'l3_cg2_a' => 'decimal:4',
        'l3_cg2_b' => 'decimal:4',
        'l2_cg1_a' => 'decimal:4',
        'l2_cg1_b' => 'decimal:4',
        'l2_cg1_c' => 'decimal:4',
        'l2_cg1_d' => 'decimal:4',
        'l2_cg1_e' => 'decimal:4',
        'l2_cg1_f' => 'decimal:4',
        'l2_cg1_g' => 'decimal:4',
        'l2_cg3_a' => 'decimal:4',
        'l2_cg3_b' => 'decimal:4',
        'l2_cg3_c' => 'decimal:4',
        'l2_cg3_d' => 'decimal:4',
        'l2_cg3_e' => 'decimal:4',
    ];

    /**
     * Get all L3 criteria values
     */
    public function getL3Criteria(): array
    {
        return [
            'cg1_a' => [
                'value' => $this->l3_cg1_a,
                'label' => 'Penyajian'
            ],
            'cg1_b' => [
                'value' => $this->l3_cg1_b,
                'label' => 'Substansi'
            ],
            'cg1_c' => [
                'value' => $this->l3_cg1_c,
                'label' => 'Kualitas'
            ],
            'cg2_a' => [
                'value' => $this->l3_cg2_a,
                'label' => 'Presentasi'
            ],
            'cg2_b' => [
                'value' => $this->l3_cg2_b,
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
                'value' => $this->l2_cg1_a,
                'label' => 'Kompetisi'
            ],
            'cg1_b' => [
                'value' => $this->l2_cg1_b,
                'label' => 'Pengakuan'
            ],
            'cg1_c' => [
                'value' => $this->l2_cg1_c,
                'label' => 'Penghargaan'
            ],
            'cg1_d' => [
                'value' => $this->l2_cg1_d,
                'label' => 'Karier Organisasi'
            ],
            'cg1_e' => [
                'value' => $this->l2_cg1_e,
                'label' => 'Hasil Karya'
            ],
            'cg1_f' => [
                'value' => $this->l2_cg1_f,
                'label' => 'Pemberdayaan / Aksi Kemanusiaan'
            ],
            'cg1_g' => [
                'value' => $this->l2_cg1_g,
                'label' => 'Kewirausahaan'
            ],
            'cg3_a' => [
                'value' => $this->l2_cg3_a,
                'label' => 'Content'
            ],
            'cg3_b' => [
                'value' => $this->l2_cg3_b,
                'label' => 'Accuracy'
            ],
            'cg3_c' => [
                'value' => $this->l2_cg3_c,
                'label' => 'Fluency'
            ],
            'cg3_d' => [
                'value' => $this->l2_cg3_d,
                'label' => 'Pronounciation'
            ],
            'cg3_e' => [
                'value' => $this->l2_cg3_e,
                'label' => 'Overall Performance'
            ],
        ];
    }

    /**
     * Calculate total score for L3 criteria
     */
    public function getL3TotalScore(): int
    {
        return $this->l3_cg1_a + $this->l3_cg1_b + $this->l3_cg1_c +
            $this->l3_cg2_a + $this->l3_cg2_b;
    }

    /**
     * Calculate total score for L2 criteria
     */
    public function getL2TotalScore(): int
    {
        return $this->l2_cg1_a + $this->l2_cg1_b + $this->l2_cg1_c +
            $this->l2_cg1_d + $this->l2_cg1_e + $this->l2_cg1_f + $this->l2_cg1_g +
            $this->l2_cg3_a + $this->l2_cg3_b + $this->l2_cg3_c +
            $this->l2_cg3_d + $this->l2_cg3_e;
    }

    /**
     * Calculate overall total score
     */
    public function getTotalScore(): int
    {
        return $this->getL3TotalScore() + $this->getL2TotalScore();
    }
}
