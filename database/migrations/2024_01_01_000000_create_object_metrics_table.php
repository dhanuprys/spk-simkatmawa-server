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
        Schema::create('object_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            // Penyajian
            $table->integer('l3_cg1_a');
            // Substansi
            $table->integer('l3_cg1_b');
            // Kualitas
            $table->integer('l3_cg1_c');

            // Presentasi
            $table->integer('l3_cg2_a');
            // Tanya Jawab
            $table->integer('l3_cg2_b');

            // Kompetisi
            $table->integer('l2_cg1_a');
            // Pengakuan
            $table->integer('l2_cg1_b');
            // Penghargaan
            $table->integer('l2_cg1_c');
            // Karier Organisasi
            $table->integer('l2_cg1_d');
            // Hasil Karya
            $table->integer('l2_cg1_e');
            // Pemberdayaan / Aksi Kemanusiaan
            $table->integer('l2_cg1_f');
            // Kewirausahaan
            $table->integer('l2_cg1_g');

            // Naskah GK
            $table->integer('l2_cg2_a');
            // Presentasi GK
            $table->integer('l2_cg2_b');

            // Content
            $table->integer('l2_cg3_a');
            // Accuracy
            $table->integer('l2_cg3_b');
            // Fluency
            $table->integer('l2_cg3_c');
            // Pronounciation
            $table->integer('l2_cg3_d');
            // Overall Performance
            $table->integer('l2_cg3_e');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('object_metrics');
    }
};
