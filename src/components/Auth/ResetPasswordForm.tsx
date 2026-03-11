'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

function ResetPasswordFormInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Token inválido ou expirado');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Alterando senha...');

    try {
      const res = await resetPassword(token, newPassword);
      toast.success(res.message || 'Senha alterada com sucesso!', { id: toastId });
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message, { id: toastId });
      } else {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(
          error.response?.data?.message || 'Erro ao enviar e-mail',
          { id: toastId }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        type="password"
        placeholder="Nova senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full bg-green-600 text-white"
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Redefinir Senha'}
      </Button>
    </form>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordFormInner />
    </Suspense>
  );
}
