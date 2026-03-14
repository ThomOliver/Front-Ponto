import { create } from 'zustand';

export type AdjustmentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Adjustment {
  id: string;
  date: string;
  reason: string;
  status: AdjustmentStatus;
  clockRecordId: string;
  newTimestamp?: string;

  user: {
    name: string;
    email: string;
  };
}

export interface CreateAdjustmentDTO {
  date: string;
  reason: string;
  clockRecordId: string;
  newTimestamp?: string;
}

interface AdjustmentState {
  adjustments: Adjustment[];
  loading: boolean;

  setAdjustments: (data: Adjustment[]) => void;
  setLoading: (loading: boolean) => void;
  clearAdjustments: () => void;
}

export const useAdjustmentStore = create<AdjustmentState>((set) => ({
  adjustments: [],
  loading: false,

  setAdjustments: (data) => set({ adjustments: data }),
  setLoading: (loading) => set({ loading }),
  clearAdjustments: () => set({ adjustments: [] }),
}));
