// =============================================================================
// Sistema de Roles / Rangos
// Los usuarios ganan puntos al interactuar con la página:
//   - Cada comentario publicado: +5 puntos
//   - Cada valoración realizada: +3 puntos
// Los rangos se asignan automáticamente según los puntos acumulados.
// =============================================================================

export interface UserRole {
  name: string;
  minPoints: number;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
}

export const ROLES: UserRole[] = [
  {
    name: 'Novato',
    minPoints: 0,
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    icon: '1',
    description: 'Acabas de llegar. Comienza a comentar y valorar para subir de rango.',
  },
  {
    name: 'Aficionado',
    minPoints: 10,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: '2',
    description: 'Ya estás cogiendo el ritmo. Sigue compartiendo tus opiniones.',
  },
  {
    name: 'Entusiasta',
    minPoints: 25,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: '3',
    description: 'Tu voz se hace escuchar. La comunidad valora tus aportes.',
  },
  {
    name: 'Experto',
    minPoints: 50,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    icon: '4',
    description: 'Un verdadero conocedor. Tus reseñas son referencia para otros.',
  },
  {
    name: 'Leyenda',
    minPoints: 100,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    icon: '5',
    description: 'Has alcanzado la cima. Eres una leyenda de CritiX.',
  },
];

export interface UserStats {
  points: number;
  commentsCount: number;
  ratingsCount: number;
  username: string;
}

/**
 * Obtiene el rol actual basado en los puntos del usuario.
 * Usa find con el array invertido para encontrar el rol de mayor rango que aplique.
 */
export function getCurrentRole(points: number): UserRole {
  const sortedRoles = [...ROLES].sort((a, b) => b.minPoints - a.minPoints);
  return sortedRoles.find((role) => points >= role.minPoints) || ROLES[0];
}

/**
 * Obtiene el siguiente rol al que puede aspirar el usuario.
 */
export function getNextRole(points: number): UserRole | null {
  const currentRole = getCurrentRole(points);
  const currentIndex = ROLES.findIndex((r) => r.name === currentRole.name);
  return currentIndex < ROLES.length - 1 ? ROLES[currentIndex + 1] : null;
}

/**
 * Calcula el progreso hacia el siguiente rango (0-100).
 */
export function getProgressToNextRole(points: number): number {
  const currentRole = getCurrentRole(points);
  const nextRole = getNextRole(points);

  if (!nextRole) return 100;

  const pointsInCurrentTier = points - currentRole.minPoints;
  const pointsNeeded = nextRole.minPoints - currentRole.minPoints;

  return Math.min(100, Math.round((pointsInCurrentTier / pointsNeeded) * 100));
}
