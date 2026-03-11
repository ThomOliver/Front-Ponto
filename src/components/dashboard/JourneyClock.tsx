import { useClock } from '@/hooks/useClock';
import { ClockRecord } from '@/store/clockStore';
import { useMemo } from 'react';

export default function JourneyClock( ) {

  const { records } = useClock();

  const last7Days = useMemo(() => {
    const days: { date: Date; records: ClockRecord[] }[] = [];
  
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
  
      const key = d.toLocaleDateString('pt-BR');
  
      const dayRecords = records
        .filter(
          (r) =>
            new Date(r.timestamp).toLocaleDateString('pt-BR') === key,
        )
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() -
            new Date(b.timestamp).getTime(),
        );
      
      days.push({
        date: d,
        records: dayRecords,
      });
    }
  
    return days;
  }, [records]);

  const getWeekDay = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  };

 const formatTimes = (records: ClockRecord[]) => {
    if (!records.length) return '--';

    return records
      .map((r) =>
        new Date(r.timestamp).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
      .join(' - ');
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-blue-900 font-bold text-xl text-center mb-6">
        JORNADA
      </h2>
      <div className="space-y-5">
        {last7Days.map((day) => (
          <div key={day.date.toISOString()}>
            <p className="text-blue-900 text-lg">
              {getWeekDay(day.date)}
            </p>
            <p className="font-bold text-black text-lg">
              {formatTimes(day.records)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}