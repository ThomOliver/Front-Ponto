import { create } from 'zustand';

interface ImageState {
  imageUrl: string;
  loading: boolean;
  setImageUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useImageStore = create<ImageState>((set) => ({
  imageUrl: '',
  loading: false,
  setImageUrl: (url) => set({ imageUrl: url }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ imageUrl: '', loading: false }),
}));
