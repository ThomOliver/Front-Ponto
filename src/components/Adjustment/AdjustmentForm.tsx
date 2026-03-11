'use client';

import { CrudDynamicForm } from '@/components/CrudDynamicForm';
import { useState } from 'react';
import { useAdjustment } from '@/hooks/useAdjustment';

export function AdjustmentForm({ clockRecordId }: { clockRecordId: string }) {
  const { createAdjustment } = useAdjustment();

  const [reason, setReason] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [newEntryTime, setNewEntryTime] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!date) return;

    try {
      setLoading(true);

      await createAdjustment({
        clockRecordId,
        date: date.toISOString(), // ISO 8601 certinho
        reason,
        newEntryTime: newEntryTime || undefined,
      });

      alert('Solicitação enviada!');
      setReason('');
      setDate(null);
      setNewEntryTime('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CrudDynamicForm
      fields={[
        {
          label: 'Data do ajuste',
          type: 'date',
          value: date,
          onChange: (v) => setDate(v as Date),
        },
        {
          label: 'Novo horário',
          type: 'time',
          value: newEntryTime,
          onChange: (v) => setNewEntryTime(String(v)),
        },
        {
          label: 'Motivo do ajuste',
          type: 'textarea',
          value: reason,
          onChange: (v) => setReason(String(v)),
        },
      ]}
      onSubmit={handleSubmit}
      submitLabel="Solicitar ajuste"
      loading={loading}
    />
  );
}
