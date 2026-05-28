import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get current user ID dari cookie
 */
export function getCurrentUserId(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  try {
    const userJson = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_user='))
      ?.substring('auth_user='.length);
    
    if (userJson) {
      const user = JSON.parse(decodeURIComponent(userJson));
      return user?.id ? String(user.id) : null;
    }
  } catch (error) {
    console.error('Error parsing user ID from cookie:', error);
  }
  
  return null;
}
