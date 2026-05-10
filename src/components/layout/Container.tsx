interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className = "", narrow = false }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-12 lg:px-16 ${
        narrow ? "max-w-2xl" : "max-w-5xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}
