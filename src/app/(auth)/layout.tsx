'use client';

import ThemeToggleButton from '@/components/ui/ThemeToggleButton';
import '@/styles/globals.css';
import { ReactNode, useEffect, useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Toaster } from 'react-hot-toast';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isDark } = useUIStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    setHydrated(true);
  }, [isDark]);

  if (!hydrated) return null;

  return (
    <main className="min-h-screen bg-bg text-text transition-colors duration-300 p-4">
      {children}
      <div className="fixed bottom-4 right-4">
        <ThemeToggleButton />
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </main>
  );
}
