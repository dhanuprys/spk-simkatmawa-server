<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'participant_id',
        'title',
        'synopsis',
        'direct_video_url',
        'film_url',
        'originality_file',
        'poster_file',
        'backdrop_file',
        'verified_by_user_id',
        'ranking',
    ];

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by_user_id');
    }

    public function votings()
    {
        return $this->hasMany(FilmVoting::class);
    }

    public function getVoteCountAttribute()
    {
        return $this->votings()->count();
    }


}
