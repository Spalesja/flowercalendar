"use client";

import { useEffect, useState, useRef } from "react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Container } from "@/components/container";
import type { CitySearchResult } from "@/types";

const BLOOM_COLORS = [
  "#FFCE88", // песочно-жёлтый — самый ранний
  "#FFA088", // бледно-оранжевый
  "#FF87B7", // розовый
  "#FF9FFF", // бледно-сиреневый
  "#E787FF", // сиреневый
  "#B787FF", // фиолетовый — самый поздний
];

const CITY_TO_REGIONS: Record<string, string[]> = {
  gomel: ["BYHO"],
  brest: ["BYBR"],
  vitebsk: ["BYVI"],
  grodno: ["BYHR"],
  mogilev: ["BYMA"],
  minsk: ["BYMI", "BYHM"],
};

function formatMapDate(iso: string) {
  try {
    return format(parseISO(iso), "d MMMM", { locale: ru });
  } catch {
    return iso;
  }
}

interface BelarusBloomMapProps {
  items: CitySearchResult[];
  plantName: string;
}

export function BelarusBloomMap({ items, plantName }: BelarusBloomMapProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const svgFetchedRef = useRef<string>("");

  const sorted = [...items].sort((a, b) =>
    a.floweringStart.localeCompare(b.floweringStart)
  );

  const legendItems = sorted.map((item, index) => ({
    color: BLOOM_COLORS[index] || BLOOM_COLORS[BLOOM_COLORS.length - 1],
    cityName: item.city.name,
    dates: `${formatMapDate(item.floweringStart)} – ${formatMapDate(item.floweringEnd)}`,
  }));

  useEffect(() => {
    const colorMap: Record<string, string> = {};
    sorted.forEach((item, index) => {
      const color = BLOOM_COLORS[index] || BLOOM_COLORS[BLOOM_COLORS.length - 1];
      const regions = CITY_TO_REGIONS[item.city.slug];
      if (regions) {
        regions.forEach((regionId) => {
          colorMap[regionId] = color;
        });
      }
    });

    function applyColors(svgText: string): string {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, "image/svg+xml");

      const svgEl = doc.querySelector("svg");
      if (svgEl) {
        svgEl.removeAttribute("fill");
        svgEl.removeAttribute("width");
        svgEl.removeAttribute("height");
        svgEl.setAttribute("viewBox", "0 0 1000 871");
        svgEl.style.width = "100%";
        svgEl.style.height = "auto";
      }

      const features = doc.getElementById("features");
      if (features) {
        features.querySelectorAll("path").forEach((path) => {
          const regionColor = colorMap[path.id];
          path.setAttribute("fill", regionColor || "#e8e8e8");
          path.setAttribute("stroke", "#ffffff");
          path.setAttribute("stroke-width", "2.5");
        });
      }

      // Remove point markers
      doc.getElementById("points")?.remove();
      doc.getElementById("label_points")?.remove();

      // Add city name labels
      const labelsGroup = doc.createElementNS("http://www.w3.org/2000/svg", "g");
      labelsGroup.setAttribute("id", "city-labels");

      const labelPositions: Record<string, { x: number; y: number }> = {
        gomel: { x: 659, y: 685 },
        brest: { x: 287, y: 648 },
        vitebsk: { x: 588, y: 192 },
        grodno: { x: 248, y: 453 },
        mogilev: { x: 720, y: 435 },
        minsk: { x: 467, y: 420 },
      };

      sorted.forEach((item) => {
        const pos = labelPositions[item.city.slug];
        if (!pos) return;

        const text = doc.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", String(pos.x));
        text.setAttribute("y", String(pos.y));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "22");
        text.setAttribute("font-weight", "700");
        text.setAttribute("fill", "#1a1a1a");
        text.setAttribute("font-family", "system-ui, sans-serif");
        text.textContent = item.city.name;
        labelsGroup.appendChild(text);
      });

      svgEl?.appendChild(labelsGroup);

      const serializer = new XMLSerializer();
      return serializer.serializeToString(doc.documentElement);
    }

    if (svgFetchedRef.current) {
      setSvgContent(applyColors(svgFetchedRef.current));
    } else {
      fetch("/images/belarus-map.svg")
        .then((res) => res.text())
        .then((svgText) => {
          svgFetchedRef.current = svgText;
          setSvgContent(applyColors(svgText));
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (items.length === 0) return null;

  return (
    <section className="bg-surface-soft px-4 py-10 pb-0">
      <Container>
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 text-center">
            Карта цветения: {plantName}
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Map */}
            <div className="flex-1 w-full max-w-[780px]">
              {svgContent ? (
                <div dangerouslySetInnerHTML={{ __html: svgContent }} />
              ) : (
                <div className="aspect-[1000/871] bg-gray-100 rounded-xl animate-pulse" />
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-text-secondary mb-1 italic">
                от раннего к позднему цветению
              </p>
              {legendItems.map((item) => (
                <div key={item.cityName} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                    <span className="font-semibold text-text-primary text-sm">
                      {item.cityName}
                    </span>
                    <span className="text-text-secondary text-sm">
                      {item.dates}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
