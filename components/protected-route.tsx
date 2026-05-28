'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/api-services';
import { LoadingSpinner } from '@/components/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

/**
 * Component untuk melindungi route yang memerlukan authentication
 * Akan redirect ke login page jika user belum login
 */
export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuth = isAuthenticated();
    
    if (!isAuth) {
      router.push('/');
      return;
    }

    // Check role jika diperlukan
    if (requiredRole) {
      // TODO: Check user role from cookie
      // Implement role checking logic
    }
  }, [router, requiredRole]);

  // Show loading while checking auth
  if (!isAuthenticated()) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
