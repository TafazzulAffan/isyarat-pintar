import { useEffect, useState } from 'react';
import { getCurrentUser, getAuthToken, isAuthenticated } from '@/lib/api-services';

export interface AuthUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Hook untuk mengakses informasi authentication user
 * Mengembalikan user info, token, dan status authentication dari cookies
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hanya jalankan di client side
    if (typeof window !== 'undefined') {
      const currentUser = getCurrentUser();
      const authToken = getAuthToken();
      
      setUser(currentUser);
      setToken(authToken);
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    token,
    isAuthenticated: isAuthenticated(),
    isLoading,
  };
}

/**
 * Hook untuk get user ID saja
 */
export function useUserId(): number | null {
  const { user } = useAuth();
  return user?.id || null;
}

/**
 * Hook untuk get user role
 */
export function useUserRole(): string | null {
  const { user } = useAuth();
  return user?.role || null;
}
