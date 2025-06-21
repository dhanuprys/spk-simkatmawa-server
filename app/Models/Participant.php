<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function eventYear()
    {
        return $this->belongsTo(EventYear::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by_user_id');
    }

    public function films()
    {
        return $this->hasMany(Film::class);
    }

}
