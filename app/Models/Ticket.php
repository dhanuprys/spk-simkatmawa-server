<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'event_year_id',
        'used_at',
    ];

    protected $casts = [
        'used_at' => 'datetime',
    ];

    public function filmVotings()
    {
        return $this->hasMany(FilmVoting::class);
    }

    public function eventYear()
    {
        return $this->belongsTo(EventYear::class);
    }
}
