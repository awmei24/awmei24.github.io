interface TagProps {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
}

export function Tag({ children, className = "", size = "md" }: TagProps) {
  return (
    <span
      className={`inline-block font-mono text-[11px] ${
        size === "lg" ? "px-3 py-1.5" : "px-2.5 py-1"
      } rounded-full border border-sage/50 bg-sage/15 text-stone dark:text-sage-light tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
