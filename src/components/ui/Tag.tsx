interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block text-xs px-2.5 py-1 rounded-full border border-[var(--color-sage-light)] text-[var(--color-stone)] font-medium tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
