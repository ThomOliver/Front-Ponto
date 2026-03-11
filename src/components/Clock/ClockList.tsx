'use client';

import { useEffect, useMemo, useState } from 'react';
import { useClock } from '@/hooks/useClock';
import { useAdjustment } from '@/hooks/useAdjustment';
import { Modal } from '@/components/ui/Modal';
import { CrudDynamicForm } from '@/components/CrudDynamicForm';

export function ClockList() {
  const { records, fetchRecords, loading } = useClock();

  const {
    createAdjustment,
    updateAdjustment,
    adjustments,
    fetchAdjustments,
  } = useAdjustment();

  const [selectedClockId, setSelectedClockId] = useState<string | null>(null);
  const [selectedAdjustmentId, setSelectedAdjustmentId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reason, setReason] = useState('');
  const [newEntryTime, setNewEntryTime] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [loadingAdjustment, setLoadingAdjustment] = useState(false);

  useEffect(() => {
    fetchRecords();
    fetchAdjustments();
  }, []);

  const recordsByDay = useMemo(() => {
    return records.reduce<Record<string, typeof records>>((acc, record) => {
      const day = new Date(record.timestamp).toLocaleDateString('pt-BR');

      if (!acc[day]) acc[day] = [];
      acc[day].push(record);
      return acc;
    }, {});
  }, [records]);

  const getAdjustment = (clockId: string) => {
    return adjustments.find((a) => a.clockRecordId === clockId);
  };

  const openAdjustmentModal = (clockId: string, recordDate: string) => {
    const adj = getAdjustment(clockId);

    setSelectedClockId(clockId);
    setDate(new Date(recordDate));

    if (adj) {
      setSelectedAdjustmentId(adj.id);
      setReason(adj.reason);
      setNewEntryTime(adj.newEntryTime ?? '');
      setStatus(adj.status);
    } else {
      setSelectedAdjustmentId(null);
      setReason('');
      setNewEntryTime('');
      setStatus(null);
    }

    setIsModalOpen(true);
  };

  const handleSubmitAdjustment = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!selectedClockId || !date) return;

    try {
      setLoadingAdjustment(true);

      if (selectedAdjustmentId && status === 'PENDING') {
        await updateAdjustment(selectedAdjustmentId, {
          clockRecordId: selectedClockId,
          date: date.toISOString(),
          reason,
          newEntryTime,
        });
      } else {
        await createAdjustment({
          clockRecordId: selectedClockId,
          date: date.toISOString(),
          reason,
          newEntryTime: newEntryTime || undefined,
        });
      }

      alert('Ajuste salvo com sucesso!');
      setIsModalOpen(false);

      await fetchAdjustments();
      await fetchRecords();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar ajuste!');
    } finally {
      setLoadingAdjustment(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="mt-6 space-y-6">
      {Object.entries(recordsByDay).map(([day, dayRecords]) => (
        <div key={day} className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400">{day}</h2>

          {dayRecords.map((r) => {
            const adj = getAdjustment(r.id);

            let effectiveTime = new Date(r.timestamp);

            if (adj?.status === 'APPROVED' && adj.newEntryTime) {
              const [h, m] = adj.newEntryTime.split(':');

              effectiveTime = new Date(r.timestamp);
              effectiveTime.setHours(Number(h));
              effectiveTime.setMinutes(Number(m));
            }

            return (
              <div
                key={r.id}
                className="flex justify-between items-center p-4 bg-neutral text-text rounded-xl"
              >
                <div>
                  <span>{r.type}</span> |{' '}
                  <span>
                    {effectiveTime.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  {adj?.status === 'APPROVED' && adj.newEntryTime && (
                    <span className="ml-2 text-green-400 text-sm">
                      (ajustado)
                    </span>
                  )}
                </div>

                <button
                  onClick={() => openAdjustmentModal(r.id, r.timestamp)}
                  className={`px-4 py-2 rounded-lg text-white
                    ${
                      adj?.status === 'APPROVED'
                        ? 'bg-green-600'
                        : adj?.status === 'REJECTED'
                        ? 'bg-red-600'
                        : adj?.status === 'PENDING'
                        ? 'bg-yellow-500'
                        : 'bg-blue-600'
                    }`}
                >
                  {adj?.status === 'APPROVED'
                    ? 'Ajuste aprovado'
                    : adj?.status === 'REJECTED'
                    ? 'Ajuste rejeitado'
                    : adj?.status === 'PENDING'
                    ? 'Solicitação pendente'
                    : 'Solicitar ajuste'}
                </button>
              </div>
            );
          })}
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Solicitar ajuste"
      >
        <CrudDynamicForm
          fields={[
            {
              label: 'Data do ajuste',
              type: 'date',
              value: date,
              disabled: status === 'APPROVED',
              onChange: (v) => setDate(v as Date),
            },
            {
              label: 'Novo horário',
              type: 'time',
              value: newEntryTime,
              disabled: status === 'APPROVED',
              onChange: (v) => setNewEntryTime(String(v)),
            },
            {
              label: 'Motivo do ajuste',
              type: 'textarea',
              value: reason,
              disabled: status === 'APPROVED',
              onChange: (v) => setReason(String(v)),
            },
          ]}
          onSubmit={handleSubmitAdjustment}
          submitLabel={
            status === 'APPROVED'
              ? 'Ajuste aprovado'
              : selectedAdjustmentId
              ? 'Atualizar ajuste'
              : 'Enviar ajuste'
          }
          loading={loadingAdjustment}
        />
      </Modal>
    </div>
  );
}