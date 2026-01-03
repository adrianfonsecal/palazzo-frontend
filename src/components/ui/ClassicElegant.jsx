// components/templates/ClassicElegant.tsx
import { InvitationData } from '@/types'; // Tu interfaz de datos

export default function ClassicElegant({ data }) {
  return (
    <div className="bg-cream-100 font-serif text-gold-600 p-10 border-4 border-double border-gold-500">
      <h1 className="text-4xl text-center">Boda de {data.wedding.couple_names}</h1>
      <p className="text-center mt-4">Nos complace invitar a la {data.invitation.family_name}</p>
      {/* ... resto del diseño Clásico ... */}
    </div>
  );
}