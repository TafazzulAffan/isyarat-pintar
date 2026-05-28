'use client';

import { useState, useCallback } from 'react';

interface UseLoadingOptions {
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
}

/**
 * Custom hook untuk mengelola loading state
 * @param options - Optional callbacks ketika loading start/end
 * @returns { isLoading, startLoading, stopLoading }
 */
export function useLoading(options?: UseLoadingOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    options?.onLoadingStart?.();
  }, [options]);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    options?.onLoadingEnd?.();
  }, [options]);

  const wrapAsync = useCallback(
    async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
      startLoading();
      try {
        const result = await asyncFn();
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    isLoading,
    startLoading,
    stopLoading,
    wrapAsync,
  };
}
