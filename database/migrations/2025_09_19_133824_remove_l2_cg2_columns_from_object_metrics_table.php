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
            $table->dropColumn(['l2_cg2_a', 'l2_cg2_b']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('object_metrics', function (Blueprint $table) {
            $table->decimal('l2_cg2_a', 13, 4)->nullable();
            $table->decimal('l2_cg2_b', 13, 4)->nullable();
        });
    }
};
