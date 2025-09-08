<?php

namespace Database\Seeders;

use App\Models\ObjectMetric;
use Illuminate\Database\Seeder;

class ObjectMetricSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $metrics = [
            [1, 'Nama Mahasiswa 01', 10, 10, 10, 10, 10, 10, 10, 0_1, 0_1, 8, 8, 8, 8, 8, 9, 9, 9, 7, 7],
            [2, 'Nama Mahasiswa 02', 1, 1, 1, 1, 1, 1, 1, 0_1, 0_1, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3],
            [3, 'Nama Mahasiswa 03', 4, 8, 3, 5, 6, 4, 1, 0_1, 0_1, 8, 8, 2, 2, 7, 5, 10, 9, 8, 2],
            [4, 'Nama Mahasiswa 04', 4, 2, 3, 2, 7, 7, 10, 0_1, 0_1, 3, 4, 9, 9, 9, 9, 2, 8, 4, 9],
            [5, 'Nama Mahasiswa 05', 6, 6, 2, 1, 2, 4, 3, 0_1, 0_1, 6, 5, 2, 2, 4, 10, 6, 9, 5, 2],
            [6, 'Nama Mahasiswa 06', 9, 3, 7, 8, 8, 2, 7, 0_1, 0_1, 3, 2, 3, 3, 3, 8, 2, 9, 2, 3],
            [7, 'Nama Mahasiswa 07', 3, 1, 8, 7, 7, 8, 7, 0_1, 0_1, 4, 1, 3, 3, 10, 2, 5, 10, 1, 3],
            [8, 'Nama Mahasiswa 08', 4, 2, 7, 7, 3, 6, 2, 0_1, 0_1, 9, 3, 8, 8, 8, 5, 10, 2, 3, 8],
            [9, 'Nama Mahasiswa 09', 10, 4, 10, 8, 3, 6, 5, 0_1, 0_1, 3, 10, 4, 4, 1, 10, 6, 4, 10, 4],
            [10, 'Nama Mahasiswa 10', 3, 8, 6, 7, 1, 3, 7, 0_1, 0_1, 3, 10, 4, 4, 1, 1, 9, 5, 10, 4],
            [11, 'Nama Mahasiswa 11', 2, 10, 1, 8, 1, 5, 9, 0_1, 0_1, 7, 9, 3, 3, 5, 9, 7, 8, 9, 3],
            [12, 'Nama Mahasiswa 12', 8, 1, 6, 5, 7, 9, 10, 0_1, 0_1, 3, 8, 2, 2, 1, 8, 10, 6, 8, 2],
            [13, 'Nama Mahasiswa 13', 7, 5, 6, 6, 7, 1, 1, 0_1, 0_1, 10, 7, 6, 6, 7, 4, 10, 7, 7, 6],
            [14, 'Nama Mahasiswa 14', 2, 10, 4, 4, 8, 7, 5, 0_1, 0_1, 5, 6, 9, 9, 7, 6, 4, 9, 6, 9],
            [15, 'Nama Mahasiswa 15', 9, 3, 10, 7, 10, 1, 2, 0_1, 0_1, 8, 7, 10, 10, 1, 7, 5, 7, 7, 10],
            [16, 'Nama Mahasiswa 16', 1, 9, 8, 9, 6, 2, 9, 0_1, 0_1, 3, 6, 3, 3, 8, 4, 9, 1, 6, 3],
            [17, 'Nama Mahasiswa 17', 2, 10, 1, 5, 8, 3, 2, 0_1, 0_1, 3, 10, 9, 9, 4, 8, 8, 9, 10, 9]
        ];

        foreach ($metrics as $metric) {
            ObjectMetric::create([
                'id' => $metric[0],
                'name' => $metric[1],

                // L2 Criteria
                'l2_cg1_a' => $metric[2],  // Kompetisi
                'l2_cg1_b' => $metric[3],  // Pengakuan
                'l2_cg1_c' => $metric[4],  // Penghargaan
                'l2_cg1_d' => $metric[5],  // Karier Organisasi
                'l2_cg1_e' => $metric[6],  // Hasil Karya
                'l2_cg1_f' => $metric[7],  // Pemberdayaan / Aksi Kemanusiaan
                'l2_cg1_g' => $metric[8],  // Kewirausahaan
                'l2_cg2_a' => $metric[9],  // Naskah GK
                'l2_cg2_b' => $metric[10], // Presentasi GK
                'l2_cg3_a' => $metric[11], // Content
                'l2_cg3_b' => $metric[12], // Accuracy
                'l2_cg3_c' => $metric[13], // Fluency
                'l2_cg3_d' => $metric[14], // Pronounciation
                'l2_cg3_e' => $metric[15], // Overall Performance

                // L3 Criteria
                'l3_cg1_a' => $metric[16], // Penyajian
                'l3_cg1_b' => $metric[17], // Substansi
                'l3_cg1_c' => $metric[18], // Kualitas
                'l3_cg2_a' => $metric[19], // Presentasi
                'l3_cg2_b' => $metric[20], // Tanya Jawab
            ]);
        }
    }
}
