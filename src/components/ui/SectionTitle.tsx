interface SectionTitleProps {
  children: React.ReactNode;
  className?: string; // Added for optional custom styling
}

export const SectionTitle = ({ children, className = '' }: SectionTitleProps) => (
  <h2 
    className={`text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight 
               text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500
               ${className}`}
  >
    {children}
  </h2>
);