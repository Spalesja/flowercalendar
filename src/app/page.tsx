import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/search/mode-toggle";
import { SearchBar } from "@/components/search/search-bar";
import { PlantBloomCard } from "@/components/cards/plant-bloom-card";

const mockBlooming = [
  { name: "Одуванчик", endDate: "16 мая" },
  { name: "Сакура", endDate: "21 апреля" },
  { name: "Яблоня", endDate: "1 мая" },
  { name: "Магнолия", endDate: "14 апреля" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero section */}
      <section className="bg-hero px-4 pb-12 pt-6">
        {/* Logo */}
        <div className="mb-16">
          <Logo />
        </div>

        <Container className="flex flex-col items-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary text-center mb-[75px]">
            Найди свой цветок
          </h1>

          {/* Mode toggle & Search bar */}
          <div className="flex flex-col items-center gap-6 w-full">
            <ModeToggle mode="cities" />
            <SearchBar placeholder="Минск" />
          </div>
        </Container>
      </section>

      {/* "Сейчас цветет" section */}
      <section className="bg-surface-soft flex-1 px-4 py-10">
        <Container>
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Сейчас цветет
                </h2>
                <p className="text-text-secondary mt-0.5">в Минске</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-divider flex items-center justify-center text-text-secondary hover:bg-surface-soft transition-colors">
                  ‹
                </button>
                <button className="w-8 h-8 rounded-full border border-divider flex items-center justify-center text-text-secondary hover:bg-surface-soft transition-colors">
                  ›
                </button>
              </div>
            </div>

            {/* Plant cards */}
            <div className="grid grid-cols-2 min-[950px]:grid-cols-4 gap-4">
              {mockBlooming.map((plant) => (
                <PlantBloomCard
                  key={plant.name}
                  name={plant.name}
                  endDate={plant.endDate}
                />
              ))}
            </div>

            {/* "Все цветы" button */}
            <div className="mt-6 flex justify-center">
              <button className="rounded-full border border-divider px-8 py-2.5 text-sm font-bold text-text-secondary hover:bg-hero hover:border-hero transition-colors">
                Все цветы
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
