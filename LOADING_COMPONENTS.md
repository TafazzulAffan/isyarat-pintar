# Loading Components Documentation

## 📦 Files Created

### 1. **LoadingSpinner** (`components/loading-spinner.tsx`)
Component spinner yang bisa digunakan di berbagai tempat.

**Features:**
- 3 ukuran: `sm`, `md`, `lg`
- Customizable text
- Animated spinner dengan gradient glow
- Bouncing dots animation
- Support dark mode

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showText?: boolean;
}
```

**Usage:**
```tsx
import { LoadingSpinner } from '@/components/loading-spinner';

export default function MyComponent() {
  return <LoadingSpinner size="lg" text="Loading..." />;
}
```

---

### 2. **LoadingPage** (`components/loading-page.tsx`)
Full-page loading component dengan brand info dan animated background.

**Features:**
- Modern gradient background dengan animated blobs
- Large spinner di tengah
- Brand branding (IsyaratPintar)
- Animated progress bar
- Responsive design
- Dark mode support
- Motivational tip text

**Props:**
```typescript
interface LoadingPageProps {
  message?: string;
  showBrandInfo?: boolean;
}
```

**Usage:**
```tsx
import { LoadingPage } from '@/components/loading-page';

export default function MyPage() {
  return <LoadingPage message="Mengambil data..." />;
}
```

---

### 3. **Next.js Loading Route** (`app/loading.tsx`)
Automatic loading component yang ditampilkan Next.js saat render halaman.

Auto-triggered oleh Next.js ketika:
- Navigasi ke route baru
- Server component masih rendering
- Suspense boundary loading

**Usage:** Sudah otomatis, cukup buat route baru dan loading akan ditampilkan.

---

### 4. **useLoading Hook** (`hooks/use-loading.ts`)
Custom React hook untuk manage loading state dengan easy.

**Features:**
- Simple state management
- Auto-wrap async functions
- Optional callbacks (onLoadingStart, onLoadingEnd)
- TypeScript support

**Methods:**
- `isLoading` - Boolean flag status loading
- `startLoading()` - Mulai loading
- `stopLoading()` - Hentikan loading
- `wrapAsync(fn)` - Wrap async function dengan auto start/stop

**Usage:**
```tsx
'use client';

import { useLoading } from '@/hooks/use-loading';

export default function MyComponent() {
  const { isLoading, wrapAsync } = useLoading();

  const handleFetch = async () => {
    await wrapAsync(async () => {
      const res = await fetch('/api/data');
      return res.json();
    });
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button onClick={handleFetch}>Fetch Data</button>
      )}
    </div>
  );
}
```

---

## 🎨 Design Features

### Animations
- **Spinning Gradient Ring** - Smooth 360° rotation
- **Bouncing Dots** - 3 dots dengan staggered animation
- **Floating Blobs** - Background gradients yang bergerak
- **Progress Bar** - Loading bar yang animated
- **Pulse Effect** - Glow effect di sekitar spinner

### Color Scheme
- Primary: Blue gradient (#3b82f6 → #a855f7)
- Supports light & dark modes
- Uses Tailwind CSS classes

### Responsive
- Mobile-first design
- Works on all screen sizes
- Optimized spacing

---

## 📋 Examples

### Example 1: Simple Loading Spinner
```tsx
<LoadingSpinner size="md" text="Sedang memuat..." />
```

### Example 2: Full Page Loading
```tsx
<LoadingPage message="Mengambil data penting..." showBrandInfo={true} />
```

### Example 3: Dynamic Loading with Hook
```tsx
const { isLoading, startLoading, stopLoading } = useLoading();

useEffect(() => {
  startLoading();
  fetchData().finally(() => stopLoading());
}, []);
```

### Example 4: Using in Server Component
```tsx
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" />}>
      <YourServerComponent />
    </Suspense>
  );
}
```

---

## 🧬 Technical Details

### Technologies Used
- React 18+
- Next.js 16
- Tailwind CSS
- CSS-in-JS (styled-jsx)

### Performance
- ✅ CSS animations (GPU accelerated)
- ✅ No external animation libraries
- ✅ Lightweight (~3KB)
- ✅ Zero dependencies

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## 🎯 Use Cases

1. **Page Navigation** - Show while navigating between pages
2. **Data Fetching** - Show while API calls are happening
3. **File Upload** - Show progress during upload
4. **Server Processing** - Show while server is processing
5. **Authentication** - Show while authenticating user

---

## 🔧 Customization

### Change Colors
Edit gradient colors di:
- `components/loading-page.tsx` - Background gradients
- `components/loading-spinner.tsx` - Spinner colors

### Change Animation Speed
Modify `animation` property di `style jsx` sections

### Change Size
Adjust tailwind classes di `sizeClasses` object

---

## 📱 Demo Page
Visit `/demo-loading` untuk melihat semua contoh dan interaksi loading components!

---

**Created:** March 26, 2026  
**Framework:** Next.js 16  
**UI Library:** Radix UI + Tailwind CSS
