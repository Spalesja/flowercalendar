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

### Этап 8. Статическая вёрстка главной страницы
- Hero-секция (bg-hero): SVG-логотип + заголовок (font-extrabold), ModeToggle, SearchBar
- Логотип: src/components/logo.tsx — SVG-цветок (белые лепестки, фиолетовые обводки между ними, фиолетовая серединка) + надпись "цветочный календарь" в 2 строки (белый, bold, 24.6px). На < 375px надпись скрывается. Кликабелен: на главной — reload, на внутренних — переход на главную
- ModeToggle: фон панельки bg-[#c86dd7]/40, неактивный таб text-white/80, активный — bg-white + font-bold. SVG-иконки (цветок и город) через currentColor
- SearchBar: розовый разделитель (2px, hero-soft) между полями, SVG-иконка календаря (#8e3ab5)
- Секция "Сейчас цветет в Минске": 4 карточки PlantBloomCard (надписи с pl-25px), стрелки навигации, кнопка "Все цветы" (hover: bg-hero/55)
- Новые компоненты:
  - src/components/logo.tsx ("use client") — SVG-логотип + название сайта
  - src/components/search/mode-toggle.tsx ("use client") — переключатель Цветы/Города с SVG-иконками
  - src/components/search/search-bar.tsx — поле поиска + дата (SVG-календарь) + кнопка
  - src/components/cards/plant-bloom-card.tsx — карточка цветущего растения
- Моковые данные, без бизнес-логики

### Этап 9. Переключатель режимов Города / Растения
- src/components/search/hero-search.tsx ("use client") — состояние режима useState<SearchMode>("cities")
- ModeToggle получает onModeChange, переключение без перезагрузки
- Placeholder меняется: "Введите город..." / "Введите растение..." по режиму
- page.tsx остался серверным, клиентская логика вынесена в HeroSearch

## Следующий этап: 10 — Autocomplete для первого поля

## Важные решения
- Логотип — SVG-цветок в компоненте, не эмодзи
- Данные в БД через JSON-импорт, идемпотентный
- Бизнес-логика вынесена в server/repositories.ts, отдельно от UI
