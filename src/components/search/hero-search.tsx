"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/search/mode-toggle";
import { SearchBar } from "@/components/search/search-bar";
import type { SearchMode } from "@/types";

export function HeroSearch() {
  const [mode, setMode] = useState<SearchMode>("cities");

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <ModeToggle mode={mode} onModeChange={setMode} />
      <SearchBar
        placeholder={mode === "cities" ? "Введите город..." : "Введите растение..."}
      />
    </div>
  );
}
