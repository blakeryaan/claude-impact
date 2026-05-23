import { sdgChipClass } from '@/lib/sdgColors';

export default function SDGTag({ sdg }: { sdg: string }) {
  return (
    <span className={`inline-block text-xs font-medium rounded-full px-2.5 py-0.5 ${sdgChipClass(sdg)}`}>
      {sdg}
    </span>
  );
}
