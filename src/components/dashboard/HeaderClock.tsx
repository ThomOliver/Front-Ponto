import { useClock } from '@/hooks/useClock';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function HeaderClock( ) {

 const { name } = useUserProfile();

  return (
    <div className="bg-secondary text-white p-6 pb-20 flex items-center rounded-xl shadow">
      <h1 className="text-xl font-semibold">
        Bem vindo, {name}!
      </h1>
    </div>
  );
}