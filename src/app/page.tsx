'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const destination = token ? '/dashboard' : '/login';
    router.replace(destination);
  }, [token, router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-bg text-text">
      <p className="text-sm opacity-75">Redirecionando...</p>
    </main>
  );
}
