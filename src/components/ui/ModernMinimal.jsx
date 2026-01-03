// components/templates/ModernMinimal.tsx
import { InvitationData } from '@/types';

export default function ModernMinimal({ data }) {
  return (
    <div className="bg-white font-sans text-black min-h-screen flex flex-col items-center pt-20">
      <h1 className="text-6xl font-bold tracking-tighter uppercase">{data.wedding.couple_names}</h1>
      <div className="w-20 h-1 bg-black my-8"></div>
      <p className="text-xl">Invitación para: {data.invitation.family_name}</p>
      {/* ... resto del diseño Moderno ... */}
    </div>
  );
}