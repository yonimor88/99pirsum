import {
  BookOpenText,
  Building,
  Construction,
  DoorOpen,
  Mailbox,
  MonitorSmartphone,
  Newspaper,
  Printer,
  Signpost,
  Sparkles,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

import type { ServiceIcon } from "@/content/service-nav";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  mailbox: Mailbox,
  boards: Newspaper,
  building: Building,
  door: DoorOpen,
  synagogue: BookOpenText,
  printer: Printer,
  signpost: Signpost,
  construction: Construction,
  sparkles: Sparkles,
  monitor: MonitorSmartphone,
};

export function ServiceGlyph({ icon, ...props }: { icon: ServiceIcon } & LucideProps) {
  const Icon = serviceIcons[icon];
  return <Icon aria-hidden strokeWidth={1.75} {...props} />;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    </svg>
  );
}

export function WazeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M20.54 6.63A9.6 9.6 0 0 0 12.06 2a9.4 9.4 0 0 0-8.9 6.32c-.48 1.38-.5 2.83-.51 4.28 0 .62-.39 1.18-.99 1.4-.26.1-.57.13-.66.4-.09.27.12.53.29.75a6.32 6.32 0 0 0 3.36 2.4 2.5 2.5 0 0 0 4.9.6c.86.06 1.73.07 2.6.02a2.5 2.5 0 0 0 4.9-.86 9.27 9.27 0 0 0 3.89-3.91 7.66 7.66 0 0 0-.4-6.77Zm-1.43 6.27a7.83 7.83 0 0 1-3.3 3.36 2.5 2.5 0 0 0-4.14.8c-.79.04-1.58.03-2.36-.03a2.5 2.5 0 0 0-4.23-1.27 4.82 4.82 0 0 1-1.89-1.27 2.94 2.94 0 0 0 1.07-2.29c.01-1.3.03-2.6.43-3.75a7.9 7.9 0 0 1 7.38-5.25 8.1 8.1 0 0 1 7.15 3.9c1 1.69 1.01 3.85.29 5.8ZM9.62 8.86a1.03 1.03 0 1 1-2.06 0 1.03 1.03 0 0 1 2.06 0Zm5.43 0a1.03 1.03 0 1 1-2.06 0 1.03 1.03 0 0 1 2.06 0Zm.48 2.94a.64.64 0 0 1 .25.87 4.63 4.63 0 0 1-8.13 0 .64.64 0 1 1 1.12-.62 3.35 3.35 0 0 0 5.89 0 .64.64 0 0 1 .87-.25Z" />
    </svg>
  );
}
