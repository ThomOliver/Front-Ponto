import { create } from 'zustand';

export type ClockType =
  | 'ENTRADA'
  | 'SAIDA'
  | 'INTERVALO_INICIO'
  | 'INTERVALO_FIM';

export interface ClockRecord {
  id: string;
  type: ClockType;
  timestamp: string;
  location?: string;
  device?: string;
}

export interface ClockDashboard {
  todayHours: string;
  weekHours: string;
  monthHours?: string;
  lastRecord?: string;
  nextRecord?: string;
}

interface ClockState {
  records: ClockRecord[];
  loading: boolean;
  dashboardClock: ClockDashboard;
  setRecords: (records: ClockRecord[]) => void;
  setLoading: (loading: boolean) => void;
  clearRecords: () => void;
  setDashboardClock: (dashboardClock: ClockDashboard) => void;
}

export const useClockStore = create<ClockState>((set) => ({
  records: [],
  loading: false,
  dashboardClock: {
    todayHours: '00:00',
    weekHours: '00:00',
    monthHours: '00:00',
    lastRecord: undefined,
    nextRecord: undefined,
  },
  setRecords: (records) => set({ records }),
  setLoading: (loading) => set({ loading }),
  clearRecords: () => set({ records: [] }),
  setDashboardClock: (dashboardClock) => set({ dashboardClock }),
}));
