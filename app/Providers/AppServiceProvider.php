<?php

namespace App\Providers;

use App\Models\ObjectMetric;
use App\Modules\MagiqMarcos\MagiqMarcos;
use App\Modules\MagiqMarcos\ObjectEntity;
use App\Services\FileUploadService;
use App\Services\UserService;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('production')) {
            $this->app['request']->server->set('HTTPS', 'on');
            URL::forceScheme('https');
        }

        // Register services
        $this->app->singleton(FileUploadService::class);
        $this->app->singleton(UserService::class);
        $this->app->singleton(MagiqMarcos::class, function () {
            $objectMetrics = ObjectMetric::all()->map(
                fn(ObjectMetric $objectMetric) => new ObjectEntity(
                    id: $objectMetric->id,
                    name: $objectMetric->name,
                    l3_cg1_a: $objectMetric->l3_cg1_a,
                    l3_cg1_b: $objectMetric->l3_cg1_b,
                    l3_cg1_c: $objectMetric->l3_cg1_c,
                    l3_cg2_a: $objectMetric->l3_cg2_a,
                    l3_cg2_b: $objectMetric->l3_cg2_b,
                    l2_cg1_a: $objectMetric->l2_cg1_a,
                    l2_cg1_b: $objectMetric->l2_cg1_b,
                    l2_cg1_c: $objectMetric->l2_cg1_c,
                    l2_cg1_d: $objectMetric->l2_cg1_d,
                    l2_cg1_e: $objectMetric->l2_cg1_e,
                    l2_cg1_f: $objectMetric->l2_cg1_f,
                    l2_cg1_g: $objectMetric->l2_cg1_g,
                    l2_cg2_a: $objectMetric->l2_cg2_a,
                    l2_cg2_b: $objectMetric->l2_cg2_b,
                    l2_cg3_a: $objectMetric->l2_cg3_a,
                    l2_cg3_b: $objectMetric->l2_cg3_b,
                    l2_cg3_c: $objectMetric->l2_cg3_c,
                    l2_cg3_d: $objectMetric->l2_cg3_d,
                    l2_cg3_e: $objectMetric->l2_cg3_e,

                )
            )->toArray();

            return new MagiqMarcos($objectMetrics);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
