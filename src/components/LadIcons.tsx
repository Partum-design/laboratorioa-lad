import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, className = "h-7 w-7", ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="8.75" /><path d="M12 7.5v5l3.4 2" /></IconBase>;
}

export function IconShieldCheck(props: IconProps) {
  return <IconBase {...props}><path d="M12 3 5.5 5.8v5.1c0 4.4 2.7 8.2 6.5 10.1 3.8-1.9 6.5-5.7 6.5-10.1V5.8L12 3Z" /><path d="m8.7 11.8 2.1 2.1 4.5-4.6" /></IconBase>;
}

export function IconResults(props: IconProps) {
  return <IconBase {...props}><rect x="4" y="3.5" width="16" height="17" rx="2.5" /><path d="M8 8h8M8 12h3M8 16h2" /><path d="m14 15 1.3 1.3L18 13.5" /></IconBase>;
}

export function IconTestTubes(props: IconProps) {
  return <IconBase {...props}><path d="M7 3.5v10.8a3 3 0 0 0 6 0V3.5M5.5 3.5h9M7 10h6" /><path d="M16 7.5v8.8a2.5 2.5 0 0 0 5 0V7.5M15 7.5h7M16 13h5" /></IconBase>;
}

export function IconPackage(props: IconProps) {
  return <IconBase {...props}><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10M8 5l8 4" /></IconBase>;
}

export function IconPhone(props: IconProps) {
  return <IconBase {...props}><path d="M8.2 4.2 6.7 3.5c-.8-.4-1.8 0-2.1.8l-1 2.5c-.3.7-.2 1.5.2 2.1 2.7 4.8 6.5 8.6 11.3 11.3.6.4 1.4.5 2.1.2l2.5-1c.8-.3 1.2-1.3.8-2.1l-.7-1.5c-.4-.8-1.3-1.2-2.1-.9l-2.4.8a18 18 0 0 1-7-7l.8-2.4c.3-.8-.1-1.7-.9-2.1Z" /></IconBase>;
}

export function IconFocus(props: IconProps) {
  return <IconBase {...props}><path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M21 16v4a1 1 0 0 1-1 1h-4M8 21H4a1 1 0 0 1-1-1v-4" /><circle cx="12" cy="12" r="3.25" /><path d="m14.2 9.6 2-2" /></IconBase>;
}

export function IconUsers(props: IconProps) {
  return <IconBase {...props}><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.3A4.7 4.7 0 0 1 8.2 13h1.6a4.7 4.7 0 0 1 4.7 4.7V19M15.5 5.5a3 3 0 0 1 0 5.8M17 13.5a4.7 4.7 0 0 1 3.5 4.5v1" /></IconBase>;
}

export function IconCheck(props: IconProps) {
  return <IconBase {...props}><path d="m4.5 12.5 4.6 4.6L19.5 6.8" /></IconBase>;
}

export function IconTarget(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="8.75" /><circle cx="12" cy="12" r="4.25" /><path d="m14.8 9.2 4.4-4.4M16.8 4.8h2.4v2.4" /></IconBase>;
}

export function IconEye(props: IconProps) {
  return <IconBase {...props}><path d="M2.8 12s3.4-6 9.2-6 9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z" /><circle cx="12" cy="12" r="2.7" /></IconBase>;
}

export function IconScan(props: IconProps) {
  return <IconBase {...props}><path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M21 16v4a1 1 0 0 1-1 1h-4M8 21H4a1 1 0 0 1-1-1v-4M7 12h10M12 7v10" /><circle cx="12" cy="12" r="3.5" /></IconBase>;
}

export function IconXRay(props: IconProps) {
  return <IconBase {...props}><path d="M7.3 4.2c1.2 1.7 1.8 3.9 1.8 6.5v8.1M16.7 4.2c-1.2 1.7-1.8 3.9-1.8 6.5v8.1M9.1 11.2h5.8M9.1 15h5.8" /><path d="M6.2 3.4c2.1 1.2 3.5 1.8 5.8 1.8s3.7-.6 5.8-1.8M9.1 18.8c.8.6 1.8 1 2.9 1s2.1-.4 2.9-1" /></IconBase>;
}

export function IconCulture(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="8.75" /><path d="M5.2 15.6c3.8-2.5 8.4-3.4 13.5-2.5" /><circle cx="8.3" cy="9" r="1" /><circle cx="13.8" cy="8.3" r=".8" /><circle cx="15.5" cy="16.2" r="1" /><circle cx="10.3" cy="14.6" r=".65" /></IconBase>;
}

export function IconCertificate(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="10" r="6.5" /><path d="m8.8 10 2.1 2.1 4.3-4.3M8.5 15.7 7.3 21l4.7-2.5 4.7 2.5-1.2-5.3" /></IconBase>;
}

export function IconLock(props: IconProps) {
  return <IconBase {...props}><rect x="4.5" y="10" width="15" height="11" rx="2.5" /><path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14.5v2" /></IconBase>;
}

export function IconAward(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="9" r="6" /><path d="m9 14.2-1.5 6.3 4.5-2.3 4.5 2.3-1.5-6.3M9.6 9l1.5 1.5L14.7 7" /></IconBase>;
}

export function IconMapPin(props: IconProps) {
  return <IconBase {...props}><path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></IconBase>;
}

export function IconSend(props: IconProps) {
  return <IconBase {...props}><path d="m3 4 18 8-18 8 3.6-8L3 4Z" /><path d="M6.6 12H21" /></IconBase>;
}

export function IconCheckCircle(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="m7.8 12.2 2.7 2.7 5.9-6" /></IconBase>;
}

export function IconDroplet(props: IconProps) {
  return <IconBase {...props}><path d="M12 3.2s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" /><path d="M9.2 15.2a3 3 0 0 0 2.8 2" /></IconBase>;
}

export function IconTag(props: IconProps) {
  return <IconBase {...props}><path d="M20.5 13.5 13 21l-10-10V3h8l9.5 9.5a.7.7 0 0 1 0 1Z" /><circle cx="7.5" cy="7.5" r="1.2" /></IconBase>;
}

export function IconFilter(props: IconProps) {
  return <IconBase {...props}><path d="M4 6h16M7 12h10M10 18h4" /><circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" /></IconBase>;
}

export function IconHeartPulse(props: IconProps) {
  return <IconBase {...props}><path d="M20.8 5.7a5.2 5.2 0 0 0-7.4 0L12 7.1l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.9a5.2 5.2 0 0 0 0-7.4Z" /><path d="M5.7 12h3l1.3-2.7 2.2 5.6 1.5-2.9h4.5" /></IconBase>;
}

export function IconGraduation(props: IconProps) {
  return <IconBase {...props}><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 12v4c2.8 2.2 7.2 2.2 10 0v-4M21 9v6" /></IconBase>;
}

export function IconTrendUp(props: IconProps) {
  return <IconBase {...props}><path d="m4 17 5-5 3.5 3.5L20 8" /><path d="M15 8h5v5" /></IconBase>;
}

export function IconSmile(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5c.8 1.3 2 2 3.5 2s2.7-.7 3.5-2M9 9.5h.01M15 9.5h.01" /></IconBase>;
}

export function IconChevronDown(props: IconProps) {
  return <IconBase {...props}><path d="m6 9 6 6 6-6" /></IconBase>;
}

export function IconPaperclip(props: IconProps) {
  return <IconBase {...props}><path d="m9.5 12.5 5.7-5.7a3 3 0 0 1 4.3 4.2l-7.8 7.8a5 5 0 0 1-7.1-7.1l7.6-7.6" /><path d="m7.4 14.8 7.4-7.4" /></IconBase>;
}

export function IconCatalog(props: IconProps) {
  return <IconBase {...props}><rect x="4" y="3" width="16" height="18" rx="2.5" /><path d="M8 8h8M8 12h8M8 16h5" /></IconBase>;
}
