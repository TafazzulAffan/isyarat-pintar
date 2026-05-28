# Authentication & Login Implementation Guide

## Overview
Sistem login telah diintegrasikan dengan backend dan menyimpan token serta informasi user di cookies.

## Komponen yang Telah Diimplementasikan

### 1. **Login Page** (`app/page.tsx`)
- Form login dengan email dan password
- Validasi input
- Error handling dengan pesan yang jelas
- Loading state saat proses login
- Redirect otomatis ke dashboard sesuai role user (guru/admin atau siswa)
- Toggle show/hide password

**Fitur:**
- ✅ Koneksi dengan backend `/auth/user/login`
- ✅ Simpan auth token di cookie `auth_token`
- ✅ Simpan user info di cookie `auth_user`
- ✅ Error handling dan user feedback
- ✅ Loading state management

### 2. **Authentication Service** (`lib/api-services.ts`)

#### `authService.login(email, password)`
```typescript
// Contoh penggunaan:
const response = await authService.login('user@example.com', 'password123');
// Otomatis menyimpan token dan user info di cookies
```

#### `authService.register(data)`
```typescript
await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirmation: 'password123'
});
```

#### `authService.logout()`
```typescript
await authService.logout();
// Otomatis clear auth_token dan auth_user cookies
```

#### Helper Functions
```typescript
// Dapatkan current user dari cookie
const user = getCurrentUser(); // { id, name, email, role, ... }

// Dapatkan auth token
const token = getAuthToken();

// Check apakah user sudah login
const loggedIn = isAuthenticated();
```

### 3. **Custom Hooks** (`hooks/use-auth.ts`)

#### `useAuth()`
Hook untuk akses user info dan authentication state di komponen.

```typescript
'use client';

import { useAuth } from '@/hooks/use-auth';

export function MyComponent() {
  const { user, token, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    return <div>Please login first</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

#### `useUserId()`
Get user ID saja:
```typescript
const userId = useUserId(); // number | null
```

#### `useUserRole()`
Get user role saja:
```typescript
const role = useUserRole(); // string | null
```

### 4. **Protected Route Component** (`components/protected-route.tsx`)

Untuk melindungi route yang memerlukan authentication:

```typescript
import { ProtectedRoute } from '@/components/protected-route';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <YourDashboardContent />
    </ProtectedRoute>
  );
}
```

## Cookie Structure

### `auth_token`
- **Value:** JWT token dari backend
- **Expiry:** 7 hari
- **Used for:** Authorization header di API requests

### `auth_user`
- **Value:** JSON string berisi user data
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "siswa",
  ...
}
```
- **Expiry:** 7 hari
- **Used for:** Display user info tanpa perlu fetch dari backend

## API Integration

### Request Flow
```
Login Form → authService.login() 
→ POST /auth/user/login 
→ Save token & user to cookies 
→ API interceptor menambahkan Authorization header 
→ Redirect to dashboard
```

### API Client Setup (`lib/api-client.ts`)
Axios instance sudah dikonfigurasi dengan:
- ✅ Base URL dari environment variable
- ✅ Automatic token inclusion di header
- ✅ FormData handling
- ✅ Error interceptor

Token otomatis ditambahkan ke semua request (kecuali public endpoints):
```
Authorization: Bearer <token>
```

## Environment Setup

Pastikan file `.env.local` memiliki:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Ubah URL sesuai dengan backend URL Anda.

## Role-Based Redirect

Login page akan redirect ke dashboard berbeda sesuai user role:

```typescript
const userRole = response?.data?.user?.role;
if (userRole === 'guru' || userRole === 'admin') {
  router.push('/admin-guru');  // Admin/Teacher dashboard
} else {
  router.push('/(siswa)/dashboard');  // Student dashboard
}
```

Anda dapat menyesuaikan route path sesuai struktur folder Anda.

## Error Handling

Login form menampilkan error message yang jelas:
- Email/password salah
- Network error
- Backend error message

Error ditampilkan di UI dengan styling:
```
❌ Login gagal. Silakan cek email dan password Anda.
```

## Security Considerations

### ✅ Implemented
- Token disimpan di cookie dengan `samesite=lax`
- Public auth endpoints tidak memerlukan token
- Token otomatis dikirim di header untuk protected requests
- Password tidak disimpan di cookie

### ⚠️ Rekomendasi Tambahan
1. **HTTPS Only**: Set cookie dengan `secure` flag di production
   ```typescript
   // Tambahkan di api-services.ts
   const isSecure = process.env.NODE_ENV === 'production';
   document.cookie = `...;${isSecure ? 'secure;' : ''}...`;
   ```

2. **CSRF Protection**: Jika backend menggunakan CSRF tokens
   ```typescript
   await authService.initializeCsrf();
   ```

3. **Token Refresh**: Implementasikan token refresh logic jika backend mendukung

## Testing Login

Untuk test login functionality:

1. Pastikan backend running dan accessible
2. Set correct `NEXT_PUBLIC_API_URL` di `.env.local`
3. Gunakan test credentials yang ada di backend
4. Check browser DevTools → Application → Cookies untuk verify token & user info tersimpan

## Troubleshooting

### Cookie tidak tersimpan?
- Check if `typeof document !== 'undefined'` (must be client-side)
- Verify cookie path is `/` 
- Check browser console untuk error messages

### Token tidak dikirim ke backend?
- Verify `auth_token` cookie ada di DevTools
- Check API interceptor logging: `[AXIOS] Token attached to request`
- Ensure base URL matching dengan backend URL

### Redirect tidak terjadi setelah login?
- Check browser console untuk error messages
- Verify dashboard route path correct
- Check if `next/navigation` import used (client component)

## Next Steps

1. **Setup Dashboard**: Buat dashboard page yang menggunakan `useAuth()` hook
2. **Implement Logout**: Tambahkan logout button di navbar
3. **Token Refresh**: Implement token refresh jika backend support
4. **Role-Based Access**: Implement role checking untuk protected routes
5. **Session Timeout**: Implement logout otomatis saat token expired
