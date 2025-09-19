<?php

namespace App\Modules\MagiqMarcos;

class ObjectEntity
{
    public function __construct(
        public int $id,
        public string $name,

        // Penyajian
        public int $l3_cg1_a,
        // Substansi
        public int $l3_cg1_b,
        // Kualitas
        public int $l3_cg1_c,

        // Presentasi
        public int $l3_cg2_a,
        // Tanya Jawab
        public int $l3_cg2_b,

        // Kompetisi
        public int $l2_cg1_a,
        // Pengakuan
        public int $l2_cg1_b,
        // Penghargaan
        public int $l2_cg1_c,
        // Karier Organisasi
        public int $l2_cg1_d,
        // Hasil Karya
        public int $l2_cg1_e,
        // Pemberdayaan / Aksi Kemanusiaan
        public int $l2_cg1_f,
        // Kewirausahaan
        public int $l2_cg1_g,

        // Naskah GK
        public int $l2_cg2_a = 0,
        // Presentasi GK
        public int $l2_cg2_b = 0,

        // Content
        public int $l2_cg3_a,
        // Accuracy
        public int $l2_cg3_b,
        // Fluency
        public int $l2_cg3_c,
        // Pronounciation
        public int $l2_cg3_d,
        // Overall Performance
        public int $l2_cg3_e,
    ) {
    }
}