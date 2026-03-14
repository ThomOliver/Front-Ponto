import axios from 'axios';
import {
  useAdjustmentStore,
  CreateAdjustmentDTO,
} from '@/store/adjustmentStore';
import { useAuthStore } from '@/store/authStore';
import { useMemo } from 'react';

export function useAdjustment() {
  const {
    adjustments,
    loading,
    setAdjustments,
    setLoading,
    clearAdjustments,
  } = useAdjustmentStore();

  const { token } = useAuthStore();

  const api = useMemo(() => {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
  }, [token]);

  const fetchAdjustments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/adjustments');
      setAdjustments(res.data);
    } finally {
      setLoading(false);
    }
  };

  const createAdjustment = async (data: CreateAdjustmentDTO) => {
     console.log("PAYLOAD ENVIADO PARA API:", data);
    await api.post('/adjustments', data);
    await fetchAdjustments();
  };

  const updateAdjustment = async (
    id: string,
    data: Partial<CreateAdjustmentDTO>
  ) => {
    await api.patch(`/adjustments/${id}`, data);
    await fetchAdjustments();
  };

  const approve = async (id: string) => {
    await api.patch(`/adjustments/${id}/approve`);
    await fetchAdjustments();
  };

  const reject = async (id: string) => {
    await api.patch(`/adjustments/${id}/reject`);
    await fetchAdjustments();
  };

  return {
    adjustments,
    loading,
    fetchAdjustments,
    createAdjustment,
    updateAdjustment,
    approve,
    reject,
    clearAdjustments,
  };
}
