import { PrimaryButton } from "@/components/primary-button";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  dateLabel?: string;
}

export function SearchBar({
  placeholder = "Минск",
  dateLabel = "Когда",
}: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-3xl">
      <div className="flex flex-col sm:flex-row flex-1 rounded-xl bg-white shadow-sm overflow-hidden border border-divider">
        <div className="flex-1 flex items-center px-4 py-3">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-transparent text-text-primary placeholder:text-text-tertiary outline-none text-sm"
            readOnly
          />
        </div>
        <div className="hidden sm:block w-px self-stretch my-2 bg-hero-soft" />
        <hr className="sm:hidden border-t border-hero-soft mx-3" />
        <div className="flex-1 flex items-center px-4 py-3">
          <input
            type="text"
            placeholder={dateLabel}
            className="w-full bg-transparent text-text-primary placeholder:text-text-tertiary outline-none text-sm"
            readOnly
          />
          <span className="text-text-tertiary ml-2 text-lg">📅</span>
        </div>
      </div>
      <PrimaryButton className="px-8 py-3 text-base font-bold whitespace-nowrap">
        Найти цветы
      </PrimaryButton>
    </div>
  );
}
