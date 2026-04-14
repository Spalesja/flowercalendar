"use client";

import { cn } from "@/lib/utils";
import type { SearchMode } from "@/types";

interface ModeToggleProps {
  mode: SearchMode;
  onModeChange?: (mode: SearchMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-full bg-white/80 p-1 shadow-sm">
      <button
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
          mode === "plants"
            ? "bg-white text-text-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        )}
        onClick={() => onModeChange?.("plants")}
      >
        <span className="text-base">🌷</span>
        Цветы
      </button>
      <button
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
          mode === "cities"
            ? "bg-white text-text-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        )}
        onClick={() => onModeChange?.("cities")}
      >
        <span className="text-base">🏙️</span>
        Города
      </button>
    </div>
  );
}
