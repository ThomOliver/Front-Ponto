'use client';

import { AdjustmentList } from '@/components/Adjustment/AdjustmentList';

export default function AdjustmentPage() {
  return (
    <div className="min-h-screen bg-bg p-10 rounded-lg">
      <h1 className="text-2xl text-text mb-6">Solicitar ajuste de ponto</h1>

      <AdjustmentList/>
    </div>
  );
}
