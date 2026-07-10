/* Hand-drawn-feeling SVG botanical elements used as page decorations. */

interface BotanicalProps {
  className?: string;
  size?: number;
  color?: string;
}

export function LeafSprig({ className, size = 40, color = "currentColor" }: BotanicalProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 36 C20 36 8 26 8 16 C8 10 13 6 20 6 C27 6 32 10 32 16 C32 26 20 36 20 36Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 36 L20 10"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M20 22 C20 22 14 18 12 14" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M20 22 C20 22 26 18 28 14" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M20 28 C20 28 16 25 15 22" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M20 28 C20 28 24 25 25 22" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export function TinyMushroom({ className, size = 32, color = "currentColor" }: BotanicalProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16 18 C16 18 10 18 8 13 C6 8 10 4 16 4 C22 4 26 8 24 13 C22 18 16 18 16 18Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M13 18 L13 26 C13 27.1 14.3 28 16 28 C17.7 28 19 27.1 19 26 L19 18" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="13" cy="9" r="1.2" fill={color} />
      <circle cx="19" cy="7" r="0.9" fill={color} />
      <circle cx="16" cy="11" r="0.7" fill={color} />
    </svg>
  );
}

export function Sprout({ className, size = 36, color = "currentColor" }: BotanicalProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 30 L18 14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M18 20 C18 20 12 18 10 12 C14 10 18 13 18 20Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 16 C18 16 24 13 26 8 C22 6 18 9 18 16Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M14 30 L22 30" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function FloralDivider({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      width="120"
      height="20"
      viewBox="0 0 120 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 10 L50 10" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="60" cy="10" r="2.5" stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M70 10 L110 10" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="60" cy="4" r="1.5" stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="60" cy="16" r="1.5" stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M56 6.5 L53 4" stroke={color} strokeWidth="0.7" strokeLinecap="round" />
      <path d="M64 6.5 L67 4" stroke={color} strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}

export function Fern({ className, size = 36, color = "currentColor" }: BotanicalProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 32 C18 24 17 12 20 4" stroke={color} strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M18.6 26 C14 25 11 22 10 18" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M18.2 21 C14.5 20 12.5 17.5 12 14" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M18.4 16 C15.5 15 14 13 13.8 10.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M18.8 25 C23 24 25.5 21.5 26.5 18" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M19 20 C22.5 19 24.5 16.5 25 13.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M19.2 15 C22 14 23.5 12 23.8 9.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export function WildFlower({ className, size = 36, color = "currentColor" }: BotanicalProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 32 L18 16" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M18 24 C18 24 13.5 22.5 12 18.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="18" cy="10" r="2.2" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="18" cy="4.6" r="1.8" stroke={color} strokeWidth="0.9" fill="none" />
      <circle cx="13" cy="8" r="1.8" stroke={color} strokeWidth="0.9" fill="none" />
      <circle cx="23" cy="8" r="1.8" stroke={color} strokeWidth="0.9" fill="none" />
      <circle cx="14.6" cy="13.4" r="1.8" stroke={color} strokeWidth="0.9" fill="none" />
      <circle cx="21.4" cy="13.4" r="1.8" stroke={color} strokeWidth="0.9" fill="none" />
    </svg>
  );
}

export function SmallLeaf({ className, size = 20, color = "currentColor" }: BotanicalProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 18 C10 18 3 12 4 6 C7 3 13 5 13 11 C13 14 10 18 10 18Z"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M10 18 L10 8" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
