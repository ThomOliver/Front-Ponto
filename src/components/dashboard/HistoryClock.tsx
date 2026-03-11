import { useClock } from '@/hooks/useClock';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

export default function HistoryClock() {
  const { records } = useClock();
  const grouped = records.reduce<Record<string, string[]>>((acc, record) => {
    const date = new Date(record.timestamp).toLocaleDateString('pt-BR');

    const time = new Date(record.timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(time);

    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => {
    const da = new Date(a.split('/').reverse().join('-'));
    const db = new Date(b.split('/').reverse().join('-'));
    return db.getTime() - da.getTime();
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">

      <h2 className="text-blue-900 font-bold text-2xl text-center mb-8">
        MEU HISTÓRICO
      </h2>

      {/* BOTÕES */}
      <div className="flex justify-center gap-10 mb-6">

        <button className="flex items-center justify-center gap-3 bg-blue-900 text-white w-56 h-14 rounded-xl">
          <DocumentTextIcon className="h-6 w-6 hidden sm:block" />
          Folha ponto
        </button>

        <button className="flex items-center justify-center gap-3 bg-blue-900 text-white w-56 h-14 rounded-xl">
          <ArrowDownTrayIcon className="h-6 w-6 hidden sm:block" />
          Justificativa
        </button>

      </div>

      {/* LINHA */}
      <div className="flex justify-center mb-6">
        <div className="w-64 h-[2px] bg-blue-900 rounded"></div>
      </div>

      {/* HISTÓRICO */}
      <div className="text-center space-y-3 text-base text-gray-800 max-h-64 overflow-y-auto pr-2">

        {sortedDates.map((date) => (
          <p key={date} className="tracking-wide">
            {date}{' '}
            {grouped[date].join(' - ')}
          </p>
        ))}

      </div>

    </div>
  );
}