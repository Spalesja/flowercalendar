import { PrimaryButton } from "@/components/primary-button";
import { Autocomplete } from "@/components/search/autocomplete";
import { DateRangePicker } from "@/components/search/date-range-picker";
import type { DateRange } from "react-day-picker";

interface SearchBarProps {
  placeholder?: string;
  apiUrl: string;
  queryValue: string;
  onQueryChange: (value: string) => void;
  onSelect: (suggestion: { slug: string; name: string }) => void;
  dateLabel?: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function SearchBar({
  placeholder,
  apiUrl,
  queryValue,
  onQueryChange,
  onSelect,
  dateLabel = "Когда",
  dateRange,
  onDateRangeChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-3xl">
      <div className="flex flex-col sm:flex-row flex-1 rounded-xl bg-white shadow-sm overflow-visible border border-divider">
        <div className="flex-1 flex items-center px-4 py-3">
          <Autocomplete
            placeholder={placeholder}
            apiUrl={apiUrl}
            value={queryValue}
            onChange={onQueryChange}
            onSelect={onSelect}
          />
        </div>
        <div className="hidden sm:block w-[2px] bg-hero-soft my-2 self-stretch" />
        <hr className="sm:hidden border-t border-hero-soft mx-3" />
        <div className="flex-1 flex items-center px-4 py-3">
          <DateRangePicker
            value={dateRange}
            onChange={onDateRangeChange}
            placeholder={dateLabel}
          />
        </div>
      </div>
      <PrimaryButton className="px-8 py-3 text-base font-bold whitespace-nowrap">
        Найти цветы
      </PrimaryButton>
    </div>
  );
}
