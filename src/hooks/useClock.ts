import axios from 'axios';
import { useClockStore, ClockType } from '@/store/clockStore';
import { useAuthStore } from '@/store/authStore';

export function useClock() {
  const { records, loading, setRecords, setLoading, clearRecords, setDashboardClock, dashboardClock } =
    useClockStore();

  const { token } = useAuthStore();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clock');
      setRecords(response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchdashboardClock = async () => {
    try {
      setLoading(true);
      const res = await api.get('/clock/dashboard');
      setDashboardClock(res.data);
    } finally {
      setLoading(false);
    }
  };

  const registerClock = async (type: ClockType) => {
    await api.post('/clock', {
      type,
      device: 'web',
    });

    await fetchRecords();
  };

  const clearClock = () => {
    clearRecords();
  };

  return {
    records,
    loading,
    dashboardClock,
    fetchRecords,
    registerClock,
    clearClock,
    fetchdashboardClock
  };
}
