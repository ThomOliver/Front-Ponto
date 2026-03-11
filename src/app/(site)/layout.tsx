'use client';

import '@/styles/globals.css';
import { ReactNode } from 'react';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { Footer } from '@/components/ui/Footer';
import { AuthGuard } from '@/components/Auth/AuthGuard';
import { useUIStore } from '@/store/useUIStore';
import { Toaster } from 'react-hot-toast';

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { collapsed } = useUIStore();
  const sidebarWidth = collapsed ? 'md:ml-20' : 'md:ml-64';

  return (
    <AuthGuard>
      <Header />
      <Sidebar />
      <main
        className={`min-h-screen bg-neutral text-text dark:bg-neutral dark:text-text transition-all duration-300 p-6 mt-14 ${sidebarWidth}`}
      >
        {children}
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Footer />
    </AuthGuard>
  );
}
