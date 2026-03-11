'use client';
import React from 'react';
import { useSettingsProfile } from '@/hooks/useSettingsProfile';
import toast from 'react-hot-toast';
import { ImageUploader } from '../ImageUploader';
import { SettingsAppearanceFormFields } from '@/components/settings/SettingsAppearanceFormFields'; 

export default function EditarSettings() {
  const {
    loading,
    updateProfile,
    logo, setLogo,
    colorPrimary, setColorPrimary,
    colorPrimaryDark, setColorPrimaryDark,
    colorSecondary, setColorSecondary,
    colorSecondaryDark, setColorSecondaryDark,
    colorText, setColorText,
    colorTextDark, setColorTextDark,
    colorBg, setColorBg,
    colorBgDark, setColorBgDark,
    colorBgLight, setColorBgLight,
    colorBgLightDark, setColorBgLightDark,
    userDash, setUserDash,
    category, setCategory,
    artwork, setArtwork,
    exhibition, setExhibition,
    graphic, setGraphic,
    setting, setSetting,
    dashboard, setDashboard  
  } = useSettingsProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading('Salvando alterações...');

    try {
      await updateProfile();
      toast.success('Perfil atualizado com sucesso!', { id: toastId });
    } catch (error) {
      toast.error('Erro ao atualizar o perfil.', { id: toastId });
    }
  };

  const colorProps = {
    colorPrimary, setColorPrimary,
    colorPrimaryDark, setColorPrimaryDark,
    colorSecondary, setColorSecondary,
    colorSecondaryDark, setColorSecondaryDark,
    colorText, setColorText,
    colorTextDark, setColorTextDark,
    colorBg, setColorBg,
    colorBgDark, setColorBgDark,
    colorBgLight, setColorBgLight,
    colorBgLightDark, setColorBgLightDark,
    userDash, setUserDash,  
    category, setCategory,
    artwork, setArtwork,
    exhibition, setExhibition,
    graphic, setGraphic,
    setting, setSetting,
    dashboard, setDashboard,  
    loading,
    onSubmit: handleSubmit,
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-lg">
        <div className='bg-bg p-4 rounded-md mb-4'>
          <h1 className="text-2xl font-bold mb-2 text-center">Editar Configurações</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Atualize sua logo e cores.
          </p>
        </div>
        <div className="bg-bg rounded-md">
          <div className="p-8">
            <p className='mb-4 text-text'>Logo</p>
            <ImageUploader
                value={logo as string}
                onChange={(url) => setLogo(url)}
            />
          </div>
          <SettingsAppearanceFormFields {...colorProps} />
        </div>
      </div>
    </section>
  );
}