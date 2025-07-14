<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_active',
        'event_year_id',
    ];


    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function films()
    {
        return $this->hasMany(Film::class);
    }

    public function eventYear()
    {
        return $this->belongsTo(EventYear::class);
    }
}
