'use client';

import { useEffect } from 'react';
import { useClock } from '@/hooks/useClock';
import { getNextClockType } from '@/utils/getNextClockType';
import { ClockType } from '@/store/clockStore';

export function ClockRegister() {
  const { records, fetchRecords, registerClock } = useClock();

  useEffect(() => {
    fetchRecords();
  }, []);

  const nextType = getNextClockType(records);

  async function handleRegister(type: ClockType) {
    await registerClock(type);
  }

  if (!nextType) {
    return (
      <p className="text-gray-500">
        Ponto do dia finalizado ✅
      </p>
    );
  }

  return (
    <div className="flex gap-4">
      {nextType === 'ENTRADA' && (
        <button
          onClick={() => handleRegister('ENTRADA')}
          className="px-6 py-3 bg-success text-text rounded-xl"
        >
          Entrada
        </button>
      )}

      {nextType === 'INTERVALO_INICIO' && (
        <button
          onClick={() => handleRegister('INTERVALO_INICIO')}
          className="px-6 py-3 bg-warning text-text rounded-xl"
        >
          Início do intervalo
        </button>
      )}

      {nextType === 'INTERVALO_FIM' && (
        <button
          onClick={() => handleRegister('INTERVALO_FIM')}
          className="px-6 py-3 bg-warning text-text rounded-xl"
        >
          Fim do intervalo
        </button>
      )}

      {nextType === 'SAIDA' && (
        <button
          onClick={() => handleRegister('SAIDA')}
          className="px-6 py-3 bg-error text-text rounded-xl"
        >
          Saída
        </button>
      )}
    </div>
  );
}
