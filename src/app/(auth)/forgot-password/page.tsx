'use client';

import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg text-text transition-colors duration-300">
      <div className="max-w-md w-full p-6 bg-bg rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-text">
          Recuperar Senha
        </h1>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
