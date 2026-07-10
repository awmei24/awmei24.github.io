interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block font-mono text-[11px] px-2.5 py-1 rounded-full border border-sage-light text-stone dark:text-sage-light tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
