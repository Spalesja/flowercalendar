# Прогресс разработки

## Завершённые этапы

### Этап 1. Инициализация проекта
- Next.js 16 + TypeScript + Tailwind 4 + App Router
- shadcn/ui установлен и настроен
- Структура папок: src/app, components, features, lib, types, content, data
- layout.tsx (lang="ru", Geist с кириллицей)
- page.tsx — временная главная с логотипом 🌸

### Этап 2. Дизайн-система и цветовые токены
- globals.css — CSS-переменные палитры (hero, accent, text, surface и др.)
- shadcn токены перенастроены на розово-фиолетовую палитру
- Компоненты: Container, Section, PageTitle, PrimaryButton, Card

### Этап 3. TypeScript типы
- src/types/index.ts — City, Plant, FloweringRecord, Place, PlaceType, PlantPlace
- SearchMode, SearchParams, SearchResult, PlantSearchResult, CitySearchResult

### Этап 4. SQLite и schema
- better-sqlite3, src/lib/db.ts — getDb(), initSchema()
- Таблицы: cities, plants, flowering_records (FK + индексы)
- scripts/init-db.ts, команда `npm run db:init`

### Этап 5. Заполнение данными из JSON
- src/lib/data-loader.ts — initDatabaseFromJson()
- Источник: docs/belarus_blooming_database_plus_forsythia.json
- 6 городов, 36 растений, 216 записей цветения
- Названия растений в единственном числе (кроме "Первоцветы")

### Этап 6. Репозитории и сервисы поиска
- src/server/repositories.ts:
  - getCities(), getPlants(), getCityBySlug(), getPlantBySlug()
  - searchPlantsByCity(), searchCitiesByPlant()
  - getCurrentlyBloomingByCity()
  - searchCitySuggestions(), searchPlantSuggestions()

### Этап 7. Route handlers и server actions
- Route handlers (GET, JSON):
  - /api/suggestions/cities?q= — autocomplete городов
  - /api/suggestions/plants?q= — autocomplete растений
  - /api/currently-blooming?city=&date= — "Сейчас цветёт"
- Server action: src/server/actions.ts — searchAction(mode, slug, startDate, endDate)
- Исправлен case-insensitive поиск для кириллицы (SQLite LIKE + capitalize)

## Следующий этап: 8 — Статическая вёрстка главной страницы

## Важные решения
- Логотип — эмодзи 🌸, не SVG-файл
- Данные в БД через JSON-импорт, идемпотентный
- Бизнес-логика вынесена в server/repositories.ts, отдельно от UI
