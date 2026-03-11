import { ClockRecord } from '@/store/clockStore';
import {
  PlayIcon,
  ClockIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Registro({ formattedRecords }: { formattedRecords: ClockRecord[] }) {
  const formatTime = (record: ClockRecord) =>
    record
      ? new Date(record.timestamp).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '--';

  return (
        <div className="bg-bg rounded-xl shadow p-5">
      <h2 className="text-blue-900 font-bold text-xl text-center mb-6">
        REGISTRO
      </h2>

      <div className="space-y-5 text-blue-900">
        {/* Entrada */}
        <div className="flex items-start gap-3">
          <PlayIcon className="w-6 h-6 text-gray-400 mt-1" />
          <div>
            <p className="text-lg">Entrada</p>
            <p className="font-bold text-black text-lg">
              {formatTime(formattedRecords[0])}
            </p>
          </div>
        </div>

        {/* Saída */}
        <div className="flex items-start gap-3">
          <ClockIcon className="w-6 h-6 text-gray-400 mt-1" />
          <div>
            <p className="text-lg">Saída</p>
            <p className="font-bold text-black text-lg">
              {formatTime(formattedRecords[1])}
            </p>
          </div>
        </div>

        {/* Entrada */}
        <div className="flex items-start gap-3">
          <PlusCircleIcon className="w-6 h-6 text-gray-400 mt-1" />
          <div>
            <p className="text-lg">Entrada</p>
            <p className="font-bold text-black text-lg">
              {formatTime(formattedRecords[2])}
            </p>
          </div>
        </div>

        {/* Saída */}
        <div className="flex items-start gap-3">
          <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-400 mt-1" />
          <div>
            <p className="text-lg">Saída</p>
            <p className="font-bold text-black text-lg">
              {formatTime(formattedRecords[3])}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}