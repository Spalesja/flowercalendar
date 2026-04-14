import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Container } from "@/components/container";
import type { SearchResult } from "@/types";

interface SearchResultsProps {
  result: SearchResult;
}

function formatDate(iso: string) {
  try {
    return format(parseISO(iso), "d MMM", { locale: ru });
  } catch {
    return iso;
  }
}

export function SearchResults({ result }: SearchResultsProps) {
  return (
    <section className="bg-surface-soft px-4 py-10 pb-0">
      <Container>
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
          {result.items.length === 0 ? (
            <p className="text-text-secondary text-center">
              Ничего не найдено в выбранном диапазоне
            </p>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
                {result.mode === "plants" ? "Цветущие растения" : "Города"}
              </h2>
              <p className="text-text-secondary mb-6">
                Найдено: {result.items.length}
              </p>
              <ul className="flex flex-col divide-y divide-divider">
                {result.mode === "plants"
                  ? result.items.map((item) => (
                      <li
                        key={item.plant.id}
                        className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1"
                      >
                        <div>
                          <span className="font-semibold text-text-primary">
                            {item.plant.name}
                          </span>
                          {item.plant.latinName && (
                            <span className="ml-2 text-sm italic text-text-tertiary">
                              {item.plant.latinName}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-text-secondary">
                          {formatDate(item.floweringStart)} – {formatDate(item.floweringEnd)}
                        </span>
                      </li>
                    ))
                  : result.items.map((item) => (
                      <li
                        key={item.city.id}
                        className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1"
                      >
                        <div>
                          <span className="font-semibold text-text-primary">
                            {item.city.name}
                          </span>
                          <span className="ml-2 text-sm text-text-tertiary">
                            {item.city.region}
                          </span>
                        </div>
                        <span className="text-sm text-text-secondary">
                          {formatDate(item.floweringStart)} – {formatDate(item.floweringEnd)}
                        </span>
                      </li>
                    ))}
              </ul>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
