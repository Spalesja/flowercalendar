"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
}

export function DateRangePicker({ value, onChange, placeholder = "Когда" }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const formatRange = (range: DateRange | undefined) => {
    if (!range?.from) return "";
    if (!range.to) return format(range.from, "d MMM", { locale: ru });
    return `${format(range.from, "d MMM", { locale: ru })} – ${format(range.to, "d MMM", { locale: ru })}`;
  };

  const display = formatRange(value);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center text-left bg-transparent outline-none"
      >
        <span
          className={`flex-1 text-sm truncate ${display ? "text-text-primary" : "text-text-tertiary"}`}
        >
          {display || placeholder}
        </span>
        {display ? (
          <button
            type="button"
            onClick={handleReset}
            aria-label="Сбросить даты"
            className="ml-2 w-5 h-5 shrink-0 flex items-center justify-center text-text-tertiary hover:text-accent-hover"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : (
          <svg
            className="ml-2 w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="#8e3ab5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1ZM4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9H4Zm5 2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2Z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 right-0 sm:right-auto sm:left-0 bg-white rounded-xl shadow-lg border border-divider p-3">
          <DayPicker
            mode="range"
            locale={ru}
            numberOfMonths={1}
            selected={value}
            onSelect={onChange}
            showOutsideDays
            classNames={{
              caption_label: "text-sm font-bold text-text-primary capitalize",
              nav_button: "text-accent hover:text-accent-hover",
              day_selected: "!bg-accent !text-white hover:!bg-accent-hover",
              day_range_start: "!bg-accent !text-white !rounded-l-md",
              day_range_end: "!bg-accent !text-white !rounded-r-md",
              day_range_middle: "!bg-hero !text-text-primary !rounded-none",
              day_today: "font-bold text-accent-hover",
            }}
          />
          {value?.from && (
            <div className="flex justify-end pt-2 border-t border-divider mt-2">
              <button
                type="button"
                onClick={() => onChange(undefined)}
                className="text-xs text-accent hover:text-accent-hover font-medium"
              >
                Сбросить
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
