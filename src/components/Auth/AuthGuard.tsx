'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

type Props = { children: ReactNode };

export function AuthGuard({ children }: Props) {
  const { token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const handleHydration = () => setRehydrated(true);

    const unsub = useAuthStore.persist.onFinishHydration(handleHydration);
    const timeout = setTimeout(handleHydration, 3000);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!rehydrated) return;

    const isLoginPage = pathname === '/login';

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (isLoginPage) {
        router.replace('/dashboard');
      }
    } else if (!isLoginPage) {
      router.replace('/login');
    }
  }, [rehydrated, token, pathname, router]);

  if (!rehydrated) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-bg text-text">
        <p className="text-sm opacity-75">Carregando...</p>
      </main>
    );
  }

  return <>{children}</>;
}
