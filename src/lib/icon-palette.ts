// Paleta de acento para íconos: roja de marca + 5 tonos saturados, no neón.
export const ICON_COLORS = {
  red: "#E30613",
  amber: "#F59E0B",
  teal: "#0D9488",
  violet: "#7C3AED",
  green: "#16A34A",
  sky: "#0284C7",
} as const;

export type IconColorName = keyof typeof ICON_COLORS;

export const ICON_COLOR_CYCLE: IconColorName[] = ["red", "amber", "teal", "violet", "green", "sky"];

export function iconColorAt(index: number): string {
  return ICON_COLORS[ICON_COLOR_CYCLE[index % ICON_COLOR_CYCLE.length]];
}
