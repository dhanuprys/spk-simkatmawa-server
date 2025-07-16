<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

/**
 * Service class for handling user-related business logic.
 */
class UserService
{
    /**
     * Get users with pagination.
     *
     * @return LengthAwarePaginator
     */
    public function getUsers(): LengthAwarePaginator
    {
        return User::latest()->paginate(20);
    }

    /**
     * Create user.
     *
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Update user.
     *
     * @param User $user
     * @param array $data
     * @return bool
     */
    public function update(User $user, array $data): bool
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (isset($data['password']) && $data['password']) {
            $updateData['password'] = Hash::make($data['password']);
        }

        return $user->update($updateData);
    }

    /**
     * Delete user.
     *
     * @param User $user
     * @return bool
     * @throws \Exception
     */
    public function delete(User $user): bool
    {
        if ($user->id === auth()->id()) {
            throw new \Exception('Tidak dapat menghapus akun sendiri');
        }

        return $user->delete();
    }

    /**
     * Check if user can be deleted.
     *
     * @param User $user
     * @return bool
     */
    public function canDelete(User $user): bool
    {
        return $user->id !== auth()->id();
    }
}