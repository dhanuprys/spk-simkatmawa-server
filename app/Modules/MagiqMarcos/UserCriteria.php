<?php

namespace App\Modules\MagiqMarcos;

class UserCriteria
{
    public function __construct(
        // ---------------- BASE ---------------------
        // Penyajian
        public float $l3_cg1_a_value,
        public bool $l3_cg1_a_max,
        // Substansi
        public float $l3_cg1_b_value,
        public float $l3_cg1_b_max,
        // Kualitas
        public float $l3_cg1_c_value,
        public bool $l3_cg1_c_max,

        // Presentasi
        public float $l3_cg2_a_value,
        public bool $l3_cg2_a_max,
        // Tanya Jawab
        public float $l3_cg2_b_value,
        public bool $l3_cg2_b_max,

        // Kompetisi
        public float $l2_cg1_a_value,
        public bool $l2_cg1_a_max,
        // Pengakuan
        public float $l2_cg1_b_value,
        public bool $l2_cg1_b_max,
        // Penghargaan
        public float $l2_cg1_c_value,
        public bool $l2_cg1_c_max,
        // Karier Organisasi
        public float $l2_cg1_d_value,
        public bool $l2_cg1_d_max,
        // Hasil Karya
        public float $l2_cg1_e_value,
        public bool $l2_cg1_e_max,
        // Pemberdayaan / Aksi Kemanusiaan
        public float $l2_cg1_f_value,
        public bool $l2_cg1_f_max,
        // Kewirausahaan
        public float $l2_cg1_g_value,
        public bool $l2_cg1_g_max,

        // Naskah GK
        public float $l2_cg2_a_value,
        public bool $l2_cg2_a_max,
        // Presentasi GK
        public float $l2_cg2_b_value,
        public bool $l2_cg2_b_max,

        // Content
        public float $l2_cg3_a_value,
        public bool $l2_cg3_a_max,
        // Accuracy
        public float $l2_cg3_b_value,
        public bool $l2_cg3_b_max,
        // Fluency
        public float $l2_cg3_c_value,
        public bool $l2_cg3_c_max,
        // Pronounciation
        public float $l2_cg3_d_value,
        public bool $l2_cg3_d_max,
        // Overall Performance
        public float $l2_cg3_e_value,
        public bool $l2_cg3_e_max,

        // Capaian Unggulan
        public float $l1_cg1_a_value,
        public bool $l1_cg1_a_max,
        // Gagasan Kreatif
        public float $l1_cg1_b_value,
        public bool $l1_cg1_b_max,
        // Bahasa Inggris
        public float $l1_cg1_c_value,
        public bool $l1_cg1_c_max,

        // ----------- RESULT -----------------
        public int $limit = 10,
        public bool $ascending = false,
    ) {
    }
}