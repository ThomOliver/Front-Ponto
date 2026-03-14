'use client';

import { CrudDynamicForm } from '@/components/CrudDynamicForm';
import { useState } from 'react';
import { useAdjustment } from '@/hooks/useAdjustment';

export function AdjustmentForm({ clockRecordId }: { clockRecordId: string }) {
  const { createAdjustment } = useAdjustment();

  const [reason, setReason] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [newTimestamp, setNewTimestamp] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("date:", date);
    console.log("newTimestamp string:", newTimestamp);

    if (!date) return;

    const generatedDate = newTimestamp
      ? new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          parseInt(newTimestamp.split(':')[0]),
          parseInt(newTimestamp.split(':')[1])
        )
      : undefined;

    console.log("Date gerada:", generatedDate);
    console.log("ISO:", generatedDate?.toISOString());

    try {
      setLoading(true);

      await createAdjustment({
        clockRecordId,
        date: date.toISOString(),
        reason,
        newTimestamp: generatedDate?.toISOString(),
      });

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
          value: newTimestamp,
          onChange: (v) => setNewTimestamp(String(v)),
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
