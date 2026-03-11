'use client';
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ImageUpload } from '@/components/ui/ImageUploader';
import toast from 'react-hot-toast';
import { UserProfileFormFields } from '@/components/user/UserProfileFormFields';

export default function EditarPerfil() {

  const {
    name, setName,
    loading, updateProfile,
    slug
  } = useUserProfile();

  console.log("slug:", slug)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading('Salvando alterações...');

    try {
      await updateProfile();
      toast.success('Perfil atualizado com sucesso!', { id: toastId });
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error); 
      toast.error('Erro ao atualizar o perfil.', { id: toastId });
    }
  };

  const formProps = {
    name, setName,
    loading,
    onSubmit: handleSubmit,
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-lg">
        <div className='bg-bg p-4 mb-4 rounded-md'>
          <h1 className="text-2xl font-bold mb-2 text-center">Editar Perfil</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Atualize suas informações pessoais e foto de perfil.
          </p>
        </div>
        <div className='bg-bg'>
          <ImageUpload label="Foto de Perfil" />

          <UserProfileFormFields {...formProps} />
        </div>
      </div>
    </section>
  );
}