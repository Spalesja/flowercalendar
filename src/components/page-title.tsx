import { cn } from "@/lib/utils";

interface PageTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ children, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn("text-center", className)}>
      <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
        {children}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
