// app/(guest)/invitacion/[uuid]/page.jsx
import { notFound } from 'next/navigation';
import { getInvitationByUuid } from '@/lib/api'; // Tu función fetch
import { getThemeComponent } from '@/components/templates';

export default async function InvitationPage({ params }) {
  // 1. Obtener datos del Backend (Server Component)
  const invitationData = await getInvitationByUuid(params.uuid);

  if (!invitationData) {
    return notFound();
  }

  // 2. Identificar qué diseño quieren los novios
  // Asumimos que viene en data.wedding.theme_config.template_id o data.wedding.template_id
  const themeId = invitationData.wedding.theme_config?.template_id || 'classic_elegant';

  // 3. Obtener el componente visual correcto
  const ThemeComponent = getThemeComponent(themeId);

  // 4. Renderizar
  return (
    <main>
       {/* Le pasamos todos los datos al componente de diseño */}
       <ThemeComponent data={invitationData} />
    </main>
  );
}