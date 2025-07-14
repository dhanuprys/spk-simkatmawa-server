<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventYear extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'year',
        'title',
        'description',
        'registration_start',
        'registration_end',
        'submission_start_date',
        'submission_end_date',
        'show_start',
        'show_end',
        'event_guide_document',
    ];

    protected $casts = [
        'registration_start' => 'datetime',
        'registration_end' => 'datetime',
        'submission_start_date' => 'datetime',
        'submission_end_date' => 'datetime',
        'show_start' => 'datetime',
        'show_end' => 'datetime',
    ];

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function films()
    {
        return $this->hasManyThrough(
            \App\Models\Film::class,
            \App\Models\Participant::class,
            'event_year_id', // Foreign key on participants table
            'participant_id', // Foreign key on films table
            'id', // Local key on event_years table
            'id'  // Local key on participants table
        );
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
