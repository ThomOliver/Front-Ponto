import { useImageStore } from '@/store/useImageStore';
import api from '@/services/axios';

export const useImageUpload = () => {
  const { setImageUrl, setLoading } = useImageStore();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImageUrl(res.data.url);
      return res.data.url;
    } catch (err) {
      console.error('Erro ao enviar imagem:', err);
      alert('Erro ao enviar imagem');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage };
};
