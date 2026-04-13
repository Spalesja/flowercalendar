import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className, href }: CardProps) {
  const cardClasses = cn(
    "rounded-2xl bg-card border border-divider p-4 transition-shadow",
    "hover:shadow-md",
    className
  );

  if (href) {
    return (
      <a href={href} className={cn(cardClasses, "block")}>
        {children}
      </a>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}
