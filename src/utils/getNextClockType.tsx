import { ClockRecord, ClockType } from '../store/clockStore';

export function getNextClockType(
  records: ClockRecord[],
): ClockType | null {
  const today = new Date().toDateString();

  const todayRecords = records.filter(
    (r) => new Date(r.timestamp).toDateString() === today,
  );

  const types = todayRecords.map((r) => r.type);

  if (!types.includes('ENTRADA')) return 'ENTRADA';
  if (!types.includes('INTERVALO_INICIO')) return 'INTERVALO_INICIO';
  if (!types.includes('INTERVALO_FIM')) return 'INTERVALO_FIM';
  if (!types.includes('SAIDA')) return 'SAIDA';

  return null;
}
