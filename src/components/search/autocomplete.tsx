"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Suggestion {
  slug: string;
  name: string;
}

interface AutocompleteProps {
  placeholder?: string;
  apiUrl: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: Suggestion) => void;
}

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function Autocomplete({
  placeholder,
  apiUrl,
  value,
  onChange,
  onSelect,
}: AutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const justSelected = useRef(false);
  const debouncedQuery = useDebounce(value, 250);

  // Fetch suggestions
  useEffect(() => {
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }

    if (debouncedQuery.length < 1) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    fetch(`${apiUrl}?q=${encodeURIComponent(debouncedQuery)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Suggestion[]) => {
        setSuggestions(data);
        setIsOpen(data.length > 0);
        setActiveIndex(-1);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Autocomplete fetch error:", err);
        }
      });

    return () => controller.abort();
  }, [debouncedQuery, apiUrl]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (suggestion: Suggestion) => {
      justSelected.current = true;
      onSelect(suggestion);
      onChange(suggestion.name);
      setIsOpen(false);
      setSuggestions([]);
    },
    [onSelect, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent text-text-primary placeholder:text-text-tertiary outline-none text-sm"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-3 bg-white rounded-xl shadow-lg border border-divider z-50 max-h-60 overflow-y-auto py-1">
          {suggestions.map((s, i) => (
            <li
              key={s.slug}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                i === activeIndex
                  ? "bg-hero/30 text-text-primary"
                  : "text-text-secondary hover:bg-surface-soft"
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(s);
              }}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
