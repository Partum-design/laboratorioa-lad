import { IconGrid } from "@/components/LadIcons";

interface EdenWordmarkProps {
  suffix?: string;
  className?: string;
  suffixClassName?: string;
}

// Reproduce el wordmark "eden [producto]" del ecosistema Eden: "eden" en bold,
// el nombre del producto en peso ligero, en minúsculas, tal como en su marca.
export function EdenWordmark({ suffix, className = "text-base", suffixClassName = "" }: EdenWordmarkProps) {
  return (
    <span className={`font-display lowercase tracking-tight ${className}`}>
      <span className="font-black">eden</span>
      {suffix && <span className={`ml-1 font-light ${suffixClassName}`}>{suffix}</span>}
    </span>
  );
}

interface EdenMarkProps {
  suffix?: string;
  size?: string;
  textClassName?: string;
}

// Icono tipo "app launcher" + wordmark, para usarse como logo del portal Eden.
export function EdenMark({ suffix, size = "h-5 w-5", textClassName = "text-base text-white" }: EdenMarkProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <IconGrid className={`${size} text-lad-red`} />
      <EdenWordmark suffix={suffix} className={textClassName} />
    </span>
  );
}
