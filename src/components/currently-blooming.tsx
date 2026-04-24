"use client";

import { useEffect, useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Container } from "@/components/container";
import { PlantBloomCard } from "@/components/cards/plant-bloom-card";
import type { PlantSearchResult } from "@/types";

const CARDS_PER_PAGE = 4;

/** Предложный падеж для заголовка "в ..." */
const CITY_PREPOSITIONAL: Record<string, string> = {
  minsk: "Минске",
  grodno: "Гродно",
  brest: "Бресте",
  vitebsk: "Витебске",
  gomel: "Гомеле",
  mogilev: "Могилёве",
};

interface CurrentlyBloomingProps {
  /** slug города (default "minsk") */
  citySlug: string;
}

export function CurrentlyBlooming({ citySlug }: CurrentlyBloomingProps) {
  const cityName = CITY_PREPOSITIONAL[citySlug] ?? citySlug;
  const [items, setItems] = useState<PlantSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  const fetchBlooming = useCallback(async (slug: string) => {
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch(
        `/api/currently-blooming?city=${encodeURIComponent(slug)}&date=${today}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: PlantSearchResult[] = await res.json();
      setItems(data);
      setPage(0);
    } catch (err) {
      console.error("Currently blooming fetch error:", err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlooming(citySlug);
  }, [citySlug, fetchBlooming]);

  const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));
  const visibleItems = items.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  function formatEndDate(isoDate: string): string {
    const parsed = parseISO(isoDate);
    return format(parsed, "d MMMM", { locale: ru });
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="bg-surface-soft flex-1 px-4 py-10">
        <Container>
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Сейчас цветет
                </h2>
                <p className="text-text-secondary mt-0.5">в {cityName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 min-[950px]:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1 min-w-0">
                  <div className="aspect-square rounded-[20%] bg-surface-soft animate-pulse mb-2" />
                  <div className="h-4 bg-surface-soft animate-pulse rounded w-3/4 ml-[25px] mb-1" />
                  <div className="h-3 bg-surface-soft animate-pulse rounded w-1/2 ml-[25px]" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <section className="bg-surface-soft flex-1 px-4 py-10">
        <Container>
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Сейчас цветет
                </h2>
                <p className="text-text-secondary mt-0.5">в {cityName}</p>
              </div>
            </div>
            <p className="text-text-secondary text-center py-8">
              Сейчас ничего не цветёт в этом городе
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-surface-soft flex-1 px-4 py-10">
      <Container>
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                Сейчас цветет
              </h2>
              <p className="text-text-secondary mt-0.5">в {cityName}</p>
            </div>
            {totalPages > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={!canPrev}
                  className="w-8 h-8 rounded-full border border-divider flex items-center justify-center text-text-secondary hover:bg-surface-soft transition-colors disabled:opacity-30 disabled:cursor-default"
                >
                  &#8249;
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!canNext}
                  className="w-8 h-8 rounded-full border border-divider flex items-center justify-center text-text-secondary hover:bg-surface-soft transition-colors disabled:opacity-30 disabled:cursor-default"
                >
                  &#8250;
                </button>
              </div>
            )}
          </div>

          {/* Plant cards */}
          <div className="grid grid-cols-2 min-[950px]:grid-cols-4 gap-4">
            {visibleItems.map((item) => (
              <PlantBloomCard
                key={item.plant.slug}
                name={item.plant.name}
                endDate={formatEndDate(item.floweringEnd)}
                imageUrl={`/images/flowers-images/${item.plant.slug}.jpg`}
                href={`/plants/${item.plant.slug}`}
              />
            ))}
          </div>

          {/* "Все цветы" button */}
          <div className="mt-6 flex justify-center">
            <button className="rounded-full border border-divider px-8 py-2.5 text-sm font-bold text-text-secondary hover:bg-[#ffb1ed]/55 hover:border-[#ffb1ed]/55 transition-colors">
              Все цветы
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
