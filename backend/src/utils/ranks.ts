export type RankName =
  | "novato"
  | "aprendiz"
  | "explorador"
  | "crítico"
  | "experto"
  | "maestro"
  | "leyenda";

export const RANKS: Array<{ name: RankName; minPoints: number }> = [
  { name: "novato", minPoints: 0 },
  { name: "aprendiz", minPoints: 50 },
  { name: "explorador", minPoints: 120 },
  { name: "crítico", minPoints: 220 },
  { name: "experto", minPoints: 350 },
  { name: "maestro", minPoints: 500 },
  { name: "leyenda", minPoints: 700 },
];

// devuelve el rango más alto que cumples
export function getRank(points: number): RankName {
  const p = Number(points) || 0;

  let current: RankName = "novato";
  for (const r of RANKS) {
    if (p >= r.minPoints) current = r.name;
  }
  return current;
}