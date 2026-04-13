import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "soft";
}

export function Section({
  children,
  className,
  variant = "default",
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-10 sm:py-14",
        variant === "soft" && "bg-surface-soft",
        className
      )}
    >
      {children}
    </section>
  );
}
