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
            // Level 2 Criteria Group 1 - Change integer to decimal(13,4)
            $table->decimal('l2_cg1_a', 13, 4)->change(); // Ukuran File
            $table->decimal('l2_cg1_b', 13, 4)->change(); // Total Rating
            $table->decimal('l2_cg1_c', 13, 4)->change(); // User Rated
            $table->decimal('l2_cg1_d', 13, 4)->change(); // Total Install
            $table->decimal('l2_cg1_e', 13, 4)->change(); // Release Date

            // Level 2 Criteria Group 2 - Change integer to decimal(13,4)
            $table->decimal('l2_cg2_a', 13, 4)->change(); // Giro
            $table->decimal('l2_cg2_b', 13, 4)->change(); // Tabungan
            $table->decimal('l2_cg2_c', 13, 4)->change(); // Deposito
            $table->decimal('l2_cg2_d', 13, 4)->change(); // Laba Bersih

            // Level 2 Criteria Group 3 - Change integer to decimal(13,4)
            $table->decimal('l2_cg3_a', 13, 4)->change(); // Happiness
            $table->decimal('l2_cg3_b', 13, 4)->change(); // Engagement
            $table->decimal('l2_cg3_c', 13, 4)->change(); // Adoption
            $table->decimal('l2_cg3_d', 13, 4)->change(); // Retention
            $table->decimal('l2_cg3_e', 13, 4)->change(); // Task Success
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('object_metrics', function (Blueprint $table) {
            // Level 2 Criteria Group 1 - Revert decimal back to integer
            $table->integer('l2_cg1_a')->change(); // Ukuran File
            $table->integer('l2_cg1_b')->change(); // Total Rating
            $table->integer('l2_cg1_c')->change(); // User Rated
            $table->integer('l2_cg1_d')->change(); // Total Install
            $table->integer('l2_cg1_e')->change(); // Release Date

            // Level 2 Criteria Group 2 - Revert decimal back to integer
            $table->integer('l2_cg2_a')->change(); // Giro
            $table->integer('l2_cg2_b')->change(); // Tabungan
            $table->integer('l2_cg2_c')->change(); // Deposito
            $table->integer('l2_cg2_d')->change(); // Laba Bersih

            // Level 2 Criteria Group 3 - Revert decimal back to integer
            $table->integer('l2_cg3_a')->change(); // Happiness
            $table->integer('l2_cg3_b')->change(); // Engagement
            $table->integer('l2_cg3_c')->change(); // Adoption
            $table->integer('l2_cg3_d')->change(); // Retention
            $table->integer('l2_cg3_e')->change(); // Task Success
        });
    }
};
