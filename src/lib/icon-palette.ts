// Una sola voz visual: todos los iconos usan el rojo institucional de LAD.
export const ICON_COLORS = {
  red: "#E30613",
  amber: "#E30613",
  teal: "#E30613",
  violet: "#E30613",
  green: "#E30613",
  sky: "#E30613",
} as const;

export type IconColorName = keyof typeof ICON_COLORS;

export const ICON_COLOR_CYCLE: IconColorName[] = ["red", "amber", "teal", "violet", "green", "sky"];

export function iconColorAt(index: number): string {
  return ICON_COLORS[ICON_COLOR_CYCLE[index % ICON_COLOR_CYCLE.length]];
}
