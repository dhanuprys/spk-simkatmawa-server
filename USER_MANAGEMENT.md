# User Management - NITISARA Film Festival

## Overview

User accounts for the NITISARA Film Festival admin panel are now managed through Laravel Console commands instead of a public registration system. This provides better security and control over who can access the admin panel.

## Creating User Accounts

### Interactive Mode

```bash
php artisan user:create
```

This will prompt you for:

- **Nama lengkap** (Full name)
- **Alamat email** (Email address)
- **Kata sandi** (Password - minimum 8 characters)

### Non-Interactive Mode

```bash
php artisan user:create --name="Admin Name" --email="admin@nitisara.com" --password="securepassword123"
```

## Command Features

- ✅ **Validation**: Ensures email is unique and password meets requirements
- ✅ **Security**: Passwords are automatically hashed
- ✅ **User-friendly**: Interactive prompts in Bahasa Indonesia
- ✅ **Error handling**: Clear error messages for validation failures
- ✅ **Confirmation**: Shows created user details upon success

## Example Usage

```bash
# Interactive mode
$ php artisan user:create
🎬 NITISARA Film Festival - User Creation
==========================================
Masukkan nama lengkap: Admin Nitisara
Masukkan alamat email: admin@nitisara.com
Masukkan kata sandi: ********
✅ User berhasil dibuat!
📧 Email: admin@nitisara.com
👤 Nama: Admin Nitisara
🆔 ID: 1
🎉 User dapat login ke panel admin sekarang!

# Non-interactive mode
$ php artisan user:create --name="John Doe" --email="john@nitisara.com" --password="mypassword123"
✅ User berhasil dibuat!
📧 Email: john@nitisara.com
👤 Nama: John Doe
🆔 ID: 2
🎉 User dapat login ke panel admin sekarang!
```

## Security Benefits

1. **No Public Registration**: Eliminates the risk of unauthorized users creating accounts
2. **Controlled Access**: Only administrators can create new user accounts
3. **Audit Trail**: Console commands can be logged for accountability
4. **Strong Passwords**: Enforces minimum password requirements

## Troubleshooting

### Common Errors

**Email already exists:**

```
❌ User dengan email tersebut sudah ada!
```

**Invalid email format:**

```
The email field must be a valid email address.
```

**Password too short:**

```
The password field must be at least 8 characters.
```

### Database Issues

If you encounter database-related errors, ensure:

1. Database migrations are run: `php artisan migrate`
2. Database connection is properly configured
3. User table exists and has correct structure

## Migration from Registration System

The following components have been removed:

- ✅ Registration routes (`/register`)
- ✅ `RegisteredUserController`
- ✅ Registration page (`/auth/register`)
- ✅ Registration form components
- ✅ Registration links from login page

All existing user accounts remain intact and functional.
