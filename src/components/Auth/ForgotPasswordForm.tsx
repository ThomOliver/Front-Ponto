'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Enviando instruções...');

    try {
      const res = await forgotPassword(email);
      toast.success(res.message || 'Verifique seu e-mail!', { id: toastId });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message, { id: toastId });
      } else {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(error.response?.data?.message || 'Erro ao enviar e-mail', { id: toastId });
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
    <InputField
      type="email"
      placeholder="Digite seu e-mail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar instruções'}
      </Button>
    </form>
  );
}
