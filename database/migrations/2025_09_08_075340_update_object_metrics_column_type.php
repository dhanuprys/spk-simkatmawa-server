<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('object_metrics', function (Blueprint $table) {
            // Level 3 Criteria - Change integer to decimal(13,4)
            $table->decimal('l3_cg1_a', 13, 4)->change(); // Penyajian
            $table->decimal('l3_cg1_b', 13, 4)->change(); // Substansi
            $table->decimal('l3_cg1_c', 13, 4)->change(); // Kualitas
            $table->decimal('l3_cg2_a', 13, 4)->change(); // Presentasi
            $table->decimal('l3_cg2_b', 13, 4)->change(); // Tanya Jawab

            // Level 2 Criteria Group 1 - Change integer to decimal(13,4)
            $table->decimal('l2_cg1_a', 13, 4)->change(); // Kompetisi
            $table->decimal('l2_cg1_b', 13, 4)->change(); // Pengakuan
            $table->decimal('l2_cg1_c', 13, 4)->change(); // Penghargaan
            $table->decimal('l2_cg1_d', 13, 4)->change(); // Karier Organisasi
            $table->decimal('l2_cg1_e', 13, 4)->change(); // Hasil Karya
            $table->decimal('l2_cg1_f', 13, 4)->change(); // Pemberdayaan / Aksi Kemanusiaan
            $table->decimal('l2_cg1_g', 13, 4)->change(); // Kewirausahaan

            // Level 2 Criteria Group 2 - Change integer to decimal(13,4)
            $table->decimal('l2_cg2_a', 13, 4)->change(); // Naskah GK
            $table->decimal('l2_cg2_b', 13, 4)->change(); // Presentasi GK

            // Level 2 Criteria Group 3 - Change integer to decimal(13,4)
            $table->decimal('l2_cg3_a', 13, 4)->change(); // Content
            $table->decimal('l2_cg3_b', 13, 4)->change(); // Accuracy
            $table->decimal('l2_cg3_c', 13, 4)->change(); // Fluency
            $table->decimal('l2_cg3_d', 13, 4)->change(); // Pronounciation
            $table->decimal('l2_cg3_e', 13, 4)->change(); // Overall Performance
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('object_metrics', function (Blueprint $table) {
            // Level 3 Criteria - Revert decimal back to integer
            $table->integer('l3_cg1_a')->change(); // Penyajian
            $table->integer('l3_cg1_b')->change(); // Substansi
            $table->integer('l3_cg1_c')->change(); // Kualitas
            $table->integer('l3_cg2_a')->change(); // Presentasi
            $table->integer('l3_cg2_b')->change(); // Tanya Jawab

            // Level 2 Criteria Group 1 - Revert decimal back to integer
            $table->integer('l2_cg1_a')->change(); // Kompetisi
            $table->integer('l2_cg1_b')->change(); // Pengakuan
            $table->integer('l2_cg1_c')->change(); // Penghargaan
            $table->integer('l2_cg1_d')->change(); // Karier Organisasi
            $table->integer('l2_cg1_e')->change(); // Hasil Karya
            $table->integer('l2_cg1_f')->change(); // Pemberdayaan / Aksi Kemanusiaan
            $table->integer('l2_cg1_g')->change(); // Kewirausahaan

            // Level 2 Criteria Group 2 - Revert decimal back to integer
            $table->integer('l2_cg2_a')->change(); // Naskah GK
            $table->integer('l2_cg2_b')->change(); // Presentasi GK

            // Level 2 Criteria Group 3 - Revert decimal back to integer
            $table->integer('l2_cg3_a')->change(); // Content
            $table->integer('l2_cg3_b')->change(); // Accuracy
            $table->integer('l2_cg3_c')->change(); // Fluency
            $table->integer('l2_cg3_d')->change(); // Pronounciation
            $table->integer('l2_cg3_e')->change(); // Overall Performance
        });
    }
};
