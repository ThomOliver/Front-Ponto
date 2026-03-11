'use client';

import { useEffect, useMemo, useState } from 'react';
import { useClock } from '@/hooks/useClock';
import Registro from '@/components/dashboard/RegisterClock';
import TotalClock from '@/components/dashboard/TotalClock.';
import JourneyClock from '@/components/dashboard/JourneyClock';
import HistoryClock from '@/components/dashboard/HistoryClock';
import HeaderClock from '@/components/dashboard/HeaderClock';

export default function Dashboard() {
  const { records, fetchRecords, fetchdashboardClock } = useClock();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetchRecords();
    fetchdashboardClock();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const todayRecords = useMemo(() => {
    const today = new Date().toLocaleDateString('pt-BR');

    return records
      .filter((r) => {
        const day = new Date(r.timestamp).toLocaleDateString('pt-BR');
        return day === today;
      })
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() -
          new Date(b.timestamp).getTime(),
      );
  }, [records]);

  const formattedRecords = [
    todayRecords[0],
    todayRecords[1],
    todayRecords[2],
    todayRecords[3],
  ];



return (
  <div className="min-h-screen">

    <HeaderClock />

    <div className="grid grid-cols-1 min-[1248px]:grid-cols-2 gap-6 pt-4">

      <div className="order-1 min-[1248px]:order-2">
        <TotalClock />
      </div>

      <div className="order-2 min-[1248px]:order-1">
        <Registro formattedRecords={formattedRecords} />
      </div>

      <div className="order-3">
        <JourneyClock />
      </div>

      <div className="order-4">
        <HistoryClock />
      </div>

    </div>

  </div>
);
}