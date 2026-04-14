"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { ModeToggle } from "@/components/search/mode-toggle";
import { SearchBar } from "@/components/search/search-bar";
import type { SearchMode } from "@/types";

export function HeroSearch() {
  const [mode, setMode] = useState<SearchMode>("cities");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleModeChange = (newMode: SearchMode) => {
    setMode(newMode);
    setQuery("");
    setSelectedSlug(null);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedSlug(null);
  };

  const handleSelect = (suggestion: { slug: string; name: string }) => {
    setSelectedSlug(suggestion.slug);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <ModeToggle mode={mode} onModeChange={handleModeChange} />
      <SearchBar
        placeholder={mode === "cities" ? "Введите город..." : "Введите растение..."}
        apiUrl={mode === "cities" ? "/api/suggestions/cities" : "/api/suggestions/plants"}
        queryValue={query}
        onQueryChange={handleQueryChange}
        onSelect={handleSelect}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
    </div>
  );
}
