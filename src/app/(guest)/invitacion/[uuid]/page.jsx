// app/(guest)/invitacion/[uuid]/page.tsx
import { notFound } from 'next/navigation';
import { getInvitationByUuid } from '@/lib/api';
import { getThemeComponent } from '@/components/templates';

export default async function InvitationPage({ params }) {
  // 1. Obtenemos el UUID de la URL
  const { uuid } = await params;

  // 2. Fetch de datos al backend (Server-side)
  const invitation = await getInvitationByUuid(uuid);

  // 3. Si no existe o devuelve error, mostramos 404
  if (!invitation) {
    return notFound();
  }

  // 4. Seleccionamos el template
  // Si tu backend no devuelve theme_config aún, usará el default del helper
  const themeId = invitation.wedding?.theme_config?.template_id;
  const ThemeComponent = getThemeComponent(themeId);

  // 5. Renderizamos
  return <ThemeComponent data={invitation}/>;
}