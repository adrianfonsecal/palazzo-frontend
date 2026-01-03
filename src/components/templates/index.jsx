// components/templates/index.jsx
import ClassicElegant from './ClassicElegant';
import RusticBoho from './RusticBoho';
import ModernMinimal from './ModernMinimal';
import { InvitationData } from '@/types';

// Definimos el tipo del mapa
const THEMES = {
  'classic_elegant': ClassicElegant,
  'rustic_boho': RusticBoho,
  'modern_minimal': ModernMinimal,
};

export const getThemeComponent = (themeId) => {
  // Retorna el tema seleccionado o uno por defecto si no existe
  return THEMES[themeId] || ClassicElegant;
};