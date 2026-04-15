"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/search/mode-toggle";
import { SearchBar } from "@/components/search/search-bar";
import { SearchResults } from "@/components/search/search-results";
import type { SearchMode, SearchResult } from "@/types";

const DEFAULT_CITY_SUGGESTIONS = [
  { slug: "minsk", name: "Минск" },
  { slug: "grodno", name: "Гродно" },
  { slug: "brest", name: "Брест" },
  { slug: "vitebsk", name: "Витебск" },
  { slug: "gomel", name: "Гомель" },
  { slug: "mogilev", name: "Могилёв" },
];

const DEFAULT_PLANT_SUGGESTIONS = [
  { slug: "sakura", name: "Сакура" },
  { slug: "magnoliya", name: "Магнолия" },
  { slug: "siren", name: "Сирень" },
  { slug: "podsolnuh", name: "Подсолнух" },
  { slug: "lipa", name: "Липа" },
  { slug: "vasilyok", name: "Василёк" },
];

export function HeroSearch() {
  const [mode, setMode] = useState<SearchMode>("plants");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleModeChange = (newMode: SearchMode) => {
    setMode(newMode);
    setQuery("");
    setSelectedSlug(null);
    setResults(null);
    setErrorMessage(null);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedSlug(null);
    setErrorMessage(null);
  };

  const handleSelect = (suggestion: { slug: string; name: string }) => {
    setQuery(suggestion.name);
    setSelectedSlug(suggestion.slug);
    setErrorMessage(null);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setErrorMessage(null);
  };

  const handleSearch = async () => {
    if (!selectedSlug) {
      setErrorMessage(
        mode === "cities"
          ? "Выберите город из списка"
          : "Выберите растение из списка"
      );
      return;
    }
    if (mode === "cities" && (!dateRange?.from || !dateRange?.to)) {
      setErrorMessage("Выберите диапазон дат");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    try {
      const startDate =
        mode === "cities" && dateRange?.from
          ? format(dateRange.from, "yyyy-MM-dd")
          : "2000-01-01";
      const endDate =
        mode === "cities" && dateRange?.to
          ? format(dateRange.to, "yyyy-MM-dd")
          : "2000-12-31";
      const params = new URLSearchParams({
        mode,
        slug: selectedSlug,
        startDate,
        endDate,
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result: SearchResult = await res.json();
      setResults(result);
    } catch (err) {
      console.error("Search error:", err);
      setErrorMessage("Что-то пошло не так. Попробуйте ещё раз");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-hero px-4 pb-12 pt-6">
        <div className="mb-16">
          <Logo />
        </div>

        <Container className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary text-center mb-[75px]">
            Найди свой цветок
          </h1>

          <div className="flex flex-col items-center gap-6 w-full">
            <ModeToggle mode={mode} onModeChange={handleModeChange} />
            <SearchBar
              placeholder={mode === "cities" ? "Введите город..." : "Введите растение..."}
              apiUrl={mode === "cities" ? "/api/suggestions/cities" : "/api/suggestions/plants"}
              queryValue={query}
              onQueryChange={handleQueryChange}
              onSelect={handleSelect}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              onSearch={handleSearch}
              isLoading={isLoading}
              isSelected={selectedSlug !== null}
              showDateRange={mode === "cities"}
              defaultSuggestions={
                mode === "cities" ? DEFAULT_CITY_SUGGESTIONS : DEFAULT_PLANT_SUGGESTIONS
              }
            />
            {errorMessage && (
              <p className="text-sm font-semibold text-accent-hover bg-white/80 px-4 py-2 rounded-full">
                {errorMessage}
              </p>
            )}
          </div>
        </Container>
      </section>

      {results && <SearchResults result={results} />}
    </>
  );
}
