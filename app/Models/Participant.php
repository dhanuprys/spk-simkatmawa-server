<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'event_year_id',
        'pin',
        'team_name',
        'city',
        'company',
        'category_id',
        'leader_name',
        'leader_email',
        'leader_whatsapp',
        'student_card_file',
        'payment_evidence_file',
        'verified_by_user_id',
        'verification_status',
        'rejection_reason',
    ];

    protected $casts = [
        'verification_status' => 'string',
    ];

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

    // Helper methods for verification status
    public function isPending()
    {
        return $this->verification_status === 'pending';
    }

    public function isApproved()
    {
        return $this->verification_status === 'approved';
    }

    public function isRejected()
    {
        return $this->verification_status === 'rejected';
    }

    public function getStatusBadgeClass()
    {
        return match ($this->verification_status) {
            'approved' => 'bg-green-100 text-green-800',
            'rejected' => 'bg-red-100 text-red-800',
            'pending' => 'bg-yellow-100 text-yellow-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }

    public function getStatusText()
    {
        return match ($this->verification_status) {
            'approved' => 'Disetujui',
            'rejected' => 'Ditolak',
            'pending' => 'Menunggu',
            default => 'Tidak Diketahui',
        };
    }
}
