'use client';

import AuthForm from '@/components/Auth/AuthForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg text-text transition-colors duration-300">
      <div className="max-w-md w-full p-6 bg-bg rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-text">
          Login
        </h1>
        <AuthForm />
      </div>
    </main>
  );
}
