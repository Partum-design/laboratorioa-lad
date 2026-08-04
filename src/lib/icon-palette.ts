// Una sola voz visual: todos los iconos usan el rojo institucional de LAD.
export const ICON_COLORS = {
  red: "#ED3237",
  amber: "#A63336",
  teal: "#ED3237",
  violet: "#A63336",
  green: "#ED3237",
  sky: "#A63336",
} as const;

export type IconColorName = keyof typeof ICON_COLORS;

export const ICON_COLOR_CYCLE: IconColorName[] = ["red", "amber", "teal", "violet", "green", "sky"];

export function iconColorAt(index: number): string {
  return ICON_COLORS[ICON_COLOR_CYCLE[index % ICON_COLOR_CYCLE.length]];
}
