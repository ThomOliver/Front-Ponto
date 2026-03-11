'use client';

import { useEffect } from 'react';
import { useAdjustment } from '@/hooks/useAdjustment';
import { Adjustment } from '@/store/adjustmentStore';

export function AdjustmentList() {
  const { adjustments, fetchAdjustments, approve, reject, loading } =
    useAdjustment();

  useEffect(() => {
    fetchAdjustments();
  }, []);

  function getRequestedTime(adj: Adjustment) {
    if (adj.newEntryTime && adj.newEntryTime !== '') {
      return { label: 'Entrada', value: adj.newEntryTime };
    }

    if (adj.newExitTime && adj.newExitTime !== '') {
      return { label: 'Saída', value: adj.newExitTime };
    }

    if (adj.newBreakStart && adj.newBreakStart !== '') {
      return { label: 'Início do intervalo', value: adj.newBreakStart };
    }

    if (adj.newBreakEnd && adj.newBreakEnd !== '') {
      return { label: 'Fim do intervalo', value: adj.newBreakEnd };
    }

    return null;
  }

  if (loading) return <p>Carregando ajustes...</p>;

  return (
    <div className="space-y-4">
      {adjustments.map((adj) => {
        const requested = getRequestedTime(adj);

        return (
          <div
            key={adj.id}
            className="rounded-lg p-4 bg-neutral shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold text-[rgb(var(--color-text))]">
                  {adj.user.name}
                </p>

                <p className="text-sm opacity-70">
                  {new Date(adj.date).toLocaleDateString()}
                </p>
              </div>

              {/* Status */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  adj.status === 'PENDING'
                    ? 'bg-[rgb(var(--color-warning)/0.15)] text-[rgb(var(--color-warning))]'
                    : adj.status === 'APPROVED'
                    ? 'bg-[rgb(var(--color-success)/0.15)] text-[rgb(var(--color-success))]'
                    : 'bg-[rgb(var(--color-error)/0.15)] text-[rgb(var(--color-error))]'
                }`}
              >
                {adj.status}
              </span>
            </div>

            {/* Motivo */}
            <div className="mb-3">
              <p className="text-sm font-medium opacity-70">Motivo</p>
              <p>{adj.reason}</p>
            </div>

            {/* Horário solicitado */}
            {requested && (
              <div className="bg-bg p-3 rounded mb-3">
                <p className="text-sm font-medium opacity-70 mb-1">
                  Correção solicitada
                </p>

                <p className="text-sm">
                  <span className="font-medium">{requested.label}</span>
                  <span className="mx-2">→</span>
                  <span className="font-semibold">{requested.value}</span>
                </p>
              </div>
            )}

            {/* Registro */}
            <div className="bg-bg p-2 rounded mb-3">
              <p className="text-sm font-medium opacity-70">Registro</p>

              <p className="text-xs break-all">{adj.clockRecordId}</p>
            </div>

            {/* Ações */}
            {adj.status === 'PENDING' && (
              <div className="flex gap-3">
                <button
                  onClick={() => approve(adj.id)}
                  className="px-4 py-2 rounded text-white text-sm
                  bg-[rgb(var(--color-success))] hover:opacity-90"
                >
                  Aprovar
                </button>

                <button
                  onClick={() => reject(adj.id)}
                  className="px-4 py-2 rounded text-white text-sm
                  bg-[rgb(var(--color-error))] hover:opacity-90"
                >
                  Rejeitar
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}