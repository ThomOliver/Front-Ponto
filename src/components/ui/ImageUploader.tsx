'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useImageStore } from '@/store/useImageStore';
import { useImageUpload } from '@/hooks/useImageUpload';
import Button from './Button';

interface ImageUploadProps {
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { imageUrl, loading } = useImageStore();
  const { uploadImage } = useImageUpload();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImage(file);
  };

  return (
    <div className="p-8">
      {label && (
        <label className="block mb-2 text-sm font-medium text-text">
          {label}
        </label>
      )}

      <div className="flex flex-col items-center gap-4">
        {imageUrl ? (
          <div className="relative w-24 h-24">
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              sizes="96px"
              className="object-cover rounded-full border-4 border-[rgb(var(--color-primary))]"
            />
          </div>
        ) : (
          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full border border-dashed">
            <PhotoIcon className="h-8 w-8 text-gray-400" />
          </div>
        )}

        <input
          type="file"
          ref={inputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />

        <Button
          onClick={() => inputRef.current?.click()}
          className=" bg-primary w-auto"
          disabled={loading}
        >
          {loading ? (
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
          ) : (
            'Enviar Imagem'
          )}
        </Button>
      </div>
    </div>
  );
};
