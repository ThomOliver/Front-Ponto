'use client';

import { useClock } from '@/hooks/useClock';
import { getNextClockType } from '@/utils/getNextClockType';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function TotalClock() {

  const { records, fetchRecords, registerClock, dashboardClock, } = useClock();
  const nextType = getNextClockType(records);

  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function handleRegister() {
    if (!nextType) return;

    await registerClock(nextType);
    await fetchRecords();
  }

  const buttonLabel = {
    ENTRADA: 'Registrar Entrada',
    INTERVALO_INICIO: 'Início Intervalo',
    INTERVALO_FIM: 'Fim Intervalo',
    SAIDA: 'Registrar Saída',
  };

  return (
    <div className="relative w-full">

      {/* BOTÃO CENTRAL */}
      <div className="absolute left-1/2 -translate-x-1/2 xl:-top-28 -top-16">
        <div className="w-56 h-56 rounded-full bg-[#F5F5F5]/50 flex items-center justify-center shadow-md">
          <button
            onClick={handleRegister}
            disabled={!nextType}
            className="
              w-48 h-48
              p-2
              rounded-full
              bg-blue-900
              text-white
              font-semibold
              text-3xl
              flex items-center justify-center text-center
              hover:scale-105
              transition
              disabled:opacity-50
            "
          >
            {nextType ? buttonLabel[nextType] : 'PONTO FINALIZADO'}
          </button>
        </div>
      </div>

      <div className="pt-48">

        {/* RELÓGIO */}
        <div className="text-center mb-8">
          <span className="text-4xl font-bold text-blue-900">
            {now.format('HH:mm')} <span className="font-normal">-</span>
          </span>
          <span className="text-4xl text-blue-900"> {now.format('DD/MM/YYYY')} </span>
        </div>

        {/* CARD TOTAL */}
        <div className="flex items-center bg-bg rounded-2xl shadow-md p-6 mx-auto">

          {/* HOJE */}
          <div className="flex-1 text-center">
            <p className="text-gray-700 text-lg">
              Total de horas hoje
            </p>

            <p className="font-bold text-xl mt-2">
              {dashboardClock.todayHours}
            </p>
          </div>

          {/* DIVISOR */}
          <div className="w-px h-12 bg-blue-800 mx-6"></div>

          {/* SEMANA */}
          <div className="flex-1 text-center">
            <p className="text-gray-700 text-lg">
              Total de horas semana
            </p>

            <p className="font-bold text-xl mt-2">
              {dashboardClock.weekHours}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}