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
        Schema::create('criteria_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');

            // ---------------- BASE ---------------------
            // Penyajian
            $table->decimal('l3_cg1_a_value', 10, 6);
            $table->boolean('l3_cg1_a_max');
            // Substansi
            $table->decimal('l3_cg1_b_value', 10, 6);
            $table->boolean('l3_cg1_b_max');
            // Kualitas
            $table->decimal('l3_cg1_c_value', 10, 6);
            $table->boolean('l3_cg1_c_max');

            // Presentasi
            $table->decimal('l3_cg2_a_value', 10, 6);
            $table->boolean('l3_cg2_a_max');
            // Tanya Jawab
            $table->decimal('l3_cg2_b_value', 10, 6);
            $table->boolean('l3_cg2_b_max');

            // Kompetisi
            $table->decimal('l2_cg1_a_value', 10, 6);
            $table->boolean('l2_cg1_a_max');
            // Pengakuan
            $table->decimal('l2_cg1_b_value', 10, 6);
            $table->boolean('l2_cg1_b_max');
            // Penghargaan
            $table->decimal('l2_cg1_c_value', 10, 6);
            $table->boolean('l2_cg1_c_max');
            // Karier Organisasi
            $table->decimal('l2_cg1_d_value', 10, 6);
            $table->boolean('l2_cg1_d_max');
            // Hasil Karya
            $table->decimal('l2_cg1_e_value', 10, 6);
            $table->boolean('l2_cg1_e_max');
            // Pemberdayaan / Aksi Kemanusiaan
            $table->decimal('l2_cg1_f_value', 10, 6);
            $table->boolean('l2_cg1_f_max');
            // Kewirausahaan
            $table->decimal('l2_cg1_g_value', 10, 6);
            $table->boolean('l2_cg1_g_max');

            // Naskah GK
            $table->decimal('l2_cg2_a_value', 10, 6);
            $table->boolean('l2_cg2_a_max');
            // Presentasi GK
            $table->decimal('l2_cg2_b_value', 10, 6);
            $table->boolean('l2_cg2_b_max');

            // Content
            $table->decimal('l2_cg3_a_value', 10, 6);
            $table->boolean('l2_cg3_a_max');
            // Accuracy
            $table->decimal('l2_cg3_b_value', 10, 6);
            $table->boolean('l2_cg3_b_max');
            // Fluency
            $table->decimal('l2_cg3_c_value', 10, 6);
            $table->boolean('l2_cg3_c_max');
            // Pronounciation
            $table->decimal('l2_cg3_d_value', 10, 6);
            $table->boolean('l2_cg3_d_max');
            // Overall Performance
            $table->decimal('l2_cg3_e_value', 10, 6);
            $table->boolean('l2_cg3_e_max');

            // Capaian Unggulan
            $table->decimal('l1_cg1_a_value', 10, 6);
            $table->boolean('l1_cg1_a_max');
            // Gagasan Kreatif
            $table->decimal('l1_cg1_b_value', 10, 6);
            $table->boolean('l1_cg1_b_max');
            // Bahasa Inggris
            $table->decimal('l1_cg1_c_value', 10, 6);
            $table->boolean('l1_cg1_c_max');

            // ----------- RESULT -----------------
            $table->integer('limit')->default(10);
            $table->boolean('ascending')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criteria_templates');
    }
};
