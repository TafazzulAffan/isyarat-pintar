'use client';

import React from 'react';
import { LoadingSpinner } from './loading-spinner';

interface LoadingPageProps {
  message?: string;
  showBrandInfo?: boolean;
  progress?: number;
  showProgress?: boolean;
}

export function LoadingPage({
  message = 'Mengambil data...',
  showBrandInfo = true,
  progress = 0,
  showProgress = true,
}: LoadingPageProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-slate-50 via-emerald-50 to-slate-100 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-900">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-500 opacity-10 blur-3xl"
          style={{
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-teal-500 opacity-10 blur-3xl"
          style={{
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '-2s',
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-emerald-600 opacity-5 blur-3xl"
          style={{
            animation: 'float 12s ease-in-out infinite',
            animationDelay: '-4s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Brand section */}
        {showBrandInfo && (
          <div className="mb-12 text-center animate-fade-in">
            <div className="mb-4 inline-block">
              <div className="text-5xl font-bold bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                IsyaratPintar
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-wide">
              Menghubungkan Ilmu Pengetahuan ke Seluruh Indera
            </p>
          </div>
        )}

        {/* Loading spinner */}
        <div className="mb-8">
          <LoadingSpinner size="lg" text={message} showText={true} />
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div className="w-64">
            <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {progress}%
            </p>
          </div>
        )}

        {/* Tip text */}
        <p className="mt-12 text-center text-xs text-gray-500 dark:text-gray-500 max-w-xs">
          💡 Sedang mempersiapkan konten berkualitas untuk Anda
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
