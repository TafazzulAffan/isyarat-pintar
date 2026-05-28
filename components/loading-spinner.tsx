'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showText?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  showText = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Animated Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-400 animate-spin`}
          style={{
            animation: 'spin 2s linear infinite',
          }}
        />

        {/* Inner moving dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-1 h-1 rounded-full bg-emerald-500"
            style={{
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Gradient glow effect */}
        <div
          className={`${sizeClasses[size]} absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-600 opacity-20 blur-lg animate-pulse`}
        />
      </div>

      {/* Loading text with fade animation */}
      {showText && (
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {text}
          </p>
          {/* Animated dots */}
          <div className="flex justify-center gap-1 mt-2">
            <span
              className="inline-block w-1 h-1 rounded-full bg-emerald-500"
              style={{
                animation: 'bounce 1.4s infinite',
                animationDelay: '0s',
              }}
            />
            <span
              className="inline-block w-1 h-1 rounded-full bg-emerald-500"
              style={{
                animation: 'bounce 1.4s infinite',
                animationDelay: '0.2s',
              }}
            />
            <span
              className="inline-block w-1 h-1 rounded-full bg-emerald-500"
              style={{
                animation: 'bounce 1.4s infinite',
                animationDelay: '0.4s',
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        @keyframes pulse-dot {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.5);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
