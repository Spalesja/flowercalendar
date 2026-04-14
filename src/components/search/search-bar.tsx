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
        <div className="flex-1 flex items-center px-4 py-3 border-b sm:border-b-0 sm:border-r border-divider">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-transparent text-text-primary placeholder:text-text-tertiary outline-none text-sm"
            readOnly
          />
        </div>
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
      <PrimaryButton className="px-8 py-3 text-base font-semibold whitespace-nowrap">
        Найти цветы
      </PrimaryButton>
    </div>
  );
}
