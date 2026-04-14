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
        <div className="hidden sm:block w-[2px] bg-hero-soft my-2 self-stretch" />
        <hr className="sm:hidden border-t border-hero-soft mx-3" />
        <div className="flex-1 flex items-center px-4 py-3">
          <input
            type="text"
            placeholder={dateLabel}
            className="w-full bg-transparent text-text-primary placeholder:text-text-tertiary outline-none text-sm"
            readOnly
          />
          <svg className="ml-2 w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#8e3ab5" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1ZM4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9H4Zm5 2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2Z" />
          </svg>
        </div>
      </div>
      <PrimaryButton className="px-8 py-3 text-base font-bold whitespace-nowrap">
        Найти цветы
      </PrimaryButton>
    </div>
  );
}
