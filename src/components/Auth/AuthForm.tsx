'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading('Entrando...');

    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!', { id: loadingToast });
      router.push('/dashboard');
    } catch {
      toast.error('E-mail ou senha inválidos', { id: loadingToast });
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seuemail@exemplo.com"
      
      />

      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
       
      />

      <div className="flex justify-end text-sm">
        <Link
          href="/forgot-password"
          className="text-blue-500 hover:underline"
        >
          Esqueci minha senha
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white"
      >
        Entrar
      </Button>
    </form>
  );
};

export default AuthForm;
