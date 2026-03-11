'use client';

import React, { useRef, useState } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import Button from '@/components/ui/Button';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const { uploadImage } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
    {value && (
      <ImageWithSkeleton src={value} size="w-32 h-32" />
    )}


      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      <Button
        onClick={handleClick}
        disabled={loading}
        className="bg-primary w-fit"
      >
        {loading ? 'Enviando...' : value ? 'Alterar Imagem' : 'Enviar Imagem'}
      </Button>
    </div>
  );
};
