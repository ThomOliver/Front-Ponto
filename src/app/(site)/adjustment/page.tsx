'use client';

import { AdjustmentForm } from '@/components/Adjustment/AdjustmentForm';

export default function AdjustmentPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Solicitar ajuste de ponto
      </h1>

      <AdjustmentForm clockRecordId="ID_AQUI" />
    </div>
  );
}
