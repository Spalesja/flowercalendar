import { cn } from "@/lib/utils";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({
  children,
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full px-8 py-3 text-base font-medium text-white transition-colors",
        "bg-primary hover:bg-accent-hover",
        "disabled:bg-accent-disabled disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
