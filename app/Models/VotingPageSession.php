<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VotingPageSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'voting_page_pin_id',
        'token',
        'ip_address',
        'user_agent',
        'expires_at',
        'last_accessed_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'last_accessed_at' => 'datetime',
    ];

    /**
     * Get the voting page pin associated with this session
     */
    public function votingPagePin()
    {
        return $this->belongsTo(VotingPagePin::class);
    }

    /**
     * Create a new session for a voting page pin
     *
     * @param VotingPagePin $pin
     * @param string|null $ipAddress
     * @param string|null $userAgent
     * @return self
     */
    public static function createSession(VotingPagePin $pin, ?string $ipAddress = null, ?string $userAgent = null): self
    {
        // Expire any existing sessions for this pin
        self::where('voting_page_pin_id', $pin->id)->delete();

        // Use default lifetime if PIN is deactivated or lifetime is not set
        $lifetimeMinutes = $pin->lifetime_minutes ?: 1440; // Default to 24 hours

        // Create a new session
        return self::create([
            'voting_page_pin_id' => $pin->id,
            'token' => Str::random(64),
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'expires_at' => now()->addMinutes($lifetimeMinutes),
            'last_accessed_at' => now(),
        ]);
    }

    /**
     * Find a session by token
     *
     * @param string $token
     * @return self|null
     */
    public static function findByToken(string $token): ?self
    {
        return self::where('token', $token)->first();
    }

    /**
     * Check if the session is valid
     *
     * @return bool
     */
    public function isValid(): bool
    {
        // Check if session has expired
        if (now()->gt($this->expires_at)) {
            return false;
        }

        // Don't check PIN validity here - let the checkSession method handle that
        // This allows sessions to be created even for deactivated PINs
        return true;
    }

    /**
     * Update the last accessed timestamp
     *
     * @return void
     */
    public function updateLastAccessed(): void
    {
        $this->update(['last_accessed_at' => now()]);

        // Also update the pin's last active timestamp
        $this->votingPagePin->updateLastActive();
    }
}
