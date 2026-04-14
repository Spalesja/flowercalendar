"use client";

import { cn } from "@/lib/utils";
import type { SearchMode } from "@/types";

interface ModeToggleProps {
  mode: SearchMode;
  onModeChange?: (mode: SearchMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-full bg-white/40 p-1 shadow-sm">
      <button
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
          mode === "plants"
            ? "bg-white text-text-primary shadow-sm font-bold"
            : "text-text-primary"
        )}
        onClick={() => onModeChange?.("plants")}
      >
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#8e3ab5" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="6.5" rx="3" ry="4.5" />
          <ellipse cx="12" cy="6.5" rx="3" ry="4.5" transform="rotate(72 12 12)" />
          <ellipse cx="12" cy="6.5" rx="3" ry="4.5" transform="rotate(144 12 12)" />
          <ellipse cx="12" cy="6.5" rx="3" ry="4.5" transform="rotate(216 12 12)" />
          <ellipse cx="12" cy="6.5" rx="3" ry="4.5" transform="rotate(288 12 12)" />
          <circle cx="12" cy="12" r="3" fill="#c86dd7" />
        </svg>
        Цветы
      </button>
      <button
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
          mode === "cities"
            ? "bg-white text-text-primary shadow-sm font-bold"
            : "text-text-primary"
        )}
        onClick={() => onModeChange?.("cities")}
      >
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#8e3ab5" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21V7l7-4v4l7-2v16H3Zm2-2h3v-3H5v3Zm0-5h3v-3H5v3Zm5 5h3v-3h-3v3Zm0-5h3v-3h-3v3Zm5 5h3v-3h-3v3Zm0-5h3v-3h-3v3Z" />
          <path d="M19 9h2a1 1 0 0 1 1 1v11h-3V9Z" opacity="0.6" />
        </svg>
        Города
      </button>
    </div>
  );
}
