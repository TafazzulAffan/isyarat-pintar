'use client';

import React, { useState } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { LoadingPage } from '@/components/loading-page';
import { useLoading } from '@/hooks/use-loading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoadingDemoPage() {
  const [showFullLoadingPage, setShowFullLoadingPage] = useState(false);
  const [showProgressLoading, setShowProgressLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const { isLoading: isLoadingData, wrapAsync } = useLoading();

  const handleSimulateDataFetch = async () => {
    await wrapAsync(async () => {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    });
    alert('Data berhasil dimuat!');
  };

  const handleProgressLoading = () => {
    setShowProgressLoading(true);
    setProgressValue(0);

    const interval = setInterval(() => {
      setProgressValue((prev) => {
        const increment = Math.random() * 30;
        const newProgress = Math.min(prev + increment, 99);

        if (newProgress >= 99) {
          clearInterval(interval);
          setTimeout(() => {
            setProgressValue(100);
            setTimeout(() => {
              setShowProgressLoading(false);
              alert('Loading selesai! Dashboard terbuka.');
            }, 500);
          }, 500);
          return newProgress;
        }

        return newProgress;
      });
    }, 200);
  };

  if (showProgressLoading) {
    return (
      <div>
        <LoadingPage 
          message="Memuat dashboard Anda..." 
          showBrandInfo={false}
          progress={Math.round(progressValue)}
          showProgress={true}
        />
        <button
          onClick={() => setShowProgressLoading(false)}
          className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Kembali
        </button>
      </div>
    );
  }

  if (showFullLoadingPage) {
    return (
      <div>
        <LoadingPage message="Sedang mengambil data penting..." showBrandInfo={true} />
        <button
          onClick={() => setShowFullLoadingPage(false)}
          className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Component Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Berbagai contoh penggunaan loading spinner dan loading page
          </p>
        </div>

        {/* Grid of examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example 1: Small Spinner */}
          <Card className="p-8 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Spinner Kecil (sm)
            </h3>
            <LoadingSpinner size="sm" text="Loading..." showText={true} />
          </Card>

          {/* Example 2: Medium Spinner */}
          <Card className="p-8 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Spinner Sedang (md)
            </h3>
            <LoadingSpinner size="md" text="Tunggu sebentar..." showText={true} />
          </Card>

          {/* Example 3: Large Spinner */}
          <Card className="p-8 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Spinner Besar (lg)
            </h3>
            <LoadingSpinner size="lg" text="Memproses..." showText={true} />
          </Card>

          {/* Example 4: Spinner tanpa text */}
          <Card className="p-8 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Spinner Tanpa Text
            </h3>
            <LoadingSpinner size="md" showText={false} />
          </Card>
        </div>

        {/* Interactive Examples */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Simulate Data Fetch */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Simulasi Fetch Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Klik tombol untuk mensimulasikan pengambilan data. Spinner akan menunjukkan progress.
            </p>
            <div className="flex flex-col items-center">
              {isLoadingData ? (
                <LoadingSpinner size="md" text="Mengambil data..." showText={true} />
              ) : (
                <Button onClick={handleSimulateDataFetch} className="w-full">
                  Mulai Fetch
                </Button>
              )}
            </div>
          </Card>

          {/* Full Page Loading Demo */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Full Page Loading
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Lihat tampilan loading page yang fullscreen dengan brand info.
            </p>
            <Button
              onClick={() => setShowFullLoadingPage(true)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Tampilkan Full Loading
            </Button>
          </Card>

          {/* Progress Loading Demo */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Loading dengan Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Loading dengan progress bar yang meningkat. Saat progress 100%, dashboard otomatis terbuka.
            </p>
            <Button
              onClick={handleProgressLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Tampilkan Progress Loading
            </Button>
          </Card>
        </div>

        {/* Usage Guide */}
        <Card className="mt-8 p-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            📖 Cara Penggunaan
          </h3>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold mb-2">1. Menggunakan Loading Spinner</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-xs">
                {`impo
  progress={progressValue}
  showProgress={true}t { LoadingSpinner } from '@/components/loading-spinner';

<LoadingSpinner 
  size="md" 
  text="Loading..." 
  showText={true} 
/>`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Menggunakan Full Loading Page</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-xs">
                {`import { LoadingPage } from '@/components/loading-page';

<LoadingPage 
  message="Mengambil data..." 
  showBrandInfo={true} 
/>`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Menggunakan useLoading Hook</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-xs">
                {`import { useLoading } from '@/hooks/use-loading';

const { isLoading, wrapAsync } = useLoading();

const handleFetch = async () => {
  await wrapAsync(async () => {
    // Your async code here
  });
};`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">4. Automatic Loading Route</h4>
              <p className="text-xs">
                File <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">app/loading.tsx</code> sudah tersedia. Loading ini akan otomatis ditampilkan saat Next.js melakukan render/loading di routes.
              </p>
            </div>
          </div>
        </Card>

        {/* Props Documentation */}
        <Card className="mt-8 p-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            ⚙️ Props Documentation
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">LoadingSpinner</h4>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>• <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">size</code> - &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; (default: &apos;md&apos;)</p>
                <p>• <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">text</code> - String teks loading (default: &apos;Loading...&apos;)</p>
                <p>• <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">showText</code> - Boolean tampilkan teks (default: true)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">LoadingPage</h4>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>• <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">progress</code> - Number 0-100 untuk progress bar (default: 0)</p>
                <p>• <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">showProgress</code> - Boolean tampilkan progress (default: true)</p>
                <p>• <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">message</code> - String pesan loading</p>
                <p>• <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">showBrandInfo</code> - Boolean tampilkan brand (default: true)</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
