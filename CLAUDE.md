# Цветочный календарь Беларуси

Поисковый веб-сервис для поиска цветущих растений по городам Беларуси и датам.

## Документация 
- **docs/dev-plan.md** - план разработки
- **docs/tech-spec.md** - техническая документация
- **docs/belarus_blooming_database_plus_forsythia.json** - данные о городах и растениях для базы

## Стек

- **Framework:** Next.js (App Router) + TypeScript + React
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** SQLite (better-sqlite3), данные загружаются из JSON
- **Content:** Markdown/MDX для длинных текстов (описания растений и городов)
- **Date utils:** date-fns, react-day-picker
- **Autocomplete:** cmdk или кастомный
- **Testing:** Vitest
- **Deploy:** Vercel

## Структура проекта

```
src/
  app/
    layout.tsx
    page.tsx                    # Главная страница
    globals.css
    plants/[slug]/page.tsx      # Страница растения
    cities/[slug]/page.tsx      # Страница города
    api/
      suggestions/cities/       # Autocomplete городов
      suggestions/plants/       # Autocomplete растений
      currently-blooming/       # Блок "Сейчас цветет"
  components/
    layout/                     # Container, Section, PageTitle
    search/                     # SearchBar, ModeToggle, DateRangePicker
    cards/                      # PlantResultCard, CityResultCard
    common/                     # PrimaryButton, Card
  features/
    search/
      components/
      services/
      types/
      utils/
    plants/
    cities/
  lib/
    db.ts                       # SQLite подключение
    data-loader.ts              # Загрузка данных из JSON в SQLite
    date/
    seo/
  server/
    services/
    repositories/
  types/                        # City, Plant, FloweringRecord, Place, SearchParams, SearchResult
  data/
    flower-data.json            # Исходные данные (города, растения, записи цветения)
  content/
    plants/                     # MDX-файлы растений
    cities/                     # MDX-файлы городов
public/
  images/
data/
  flower-calendar.db            # SQLite база
```

## Модели данных

### City
id, slug, name, region, shortDescription, fullDescription, heroImage

### Plant
id, slug, name, latinName, shortDescription, fullDescription, heroImage

### FloweringRecord
id, cityId, plantId, startDate (ISO), endDate (ISO)

### Place
id, cityId, slug, name, type (парк/ботсад/заказник/аллея/лес), description, image

### PlantPlace
id, plantId, placeId, notes

## Ключевая бизнес-логика

Правило пересечения диапазонов для поиска:
```
record.start_date <= selectedEnd AND record.end_date >= selectedStart
```

### Два режима поиска
- **Города:** пользователь выбирает город + диапазон дат -> получает список цветущих растений
- **Растения:** пользователь выбирает растение + диапазон дат -> получает список городов

### Блок "Сейчас цветет"
- По умолчанию — Минск
- Обновляется при выборе другого города
- Показывает до 3 карточек растений, цветущих на текущую дату
- НЕ зависит от поля диапазона дат — всегда показывает актуальное на сегодня

## Функции доступа к данным

- `getCities()`, `getPlants()`
- `searchPlantsByCity(citySlug, startDate, endDate)`
- `searchCitiesByPlant(plantSlug, startDate, endDate)`
- `getCurrentlyBloomingByCity(citySlug, currentDate)`
- `searchCitySuggestions(query)`, `searchPlantSuggestions(query)`

## Цветовая палитра

### Primary (розово-фиолетовая тема)
- `#ffb1ed` — hero background, основной розовый
- `#e59cd3` — мягкий розовый (градиенты/hover)
- `#c86dd7` — акцентный розово-фиолетовый
- `#a64ac9` — primary button (CTA)
- `#8e3ab5` — primary button hover
- `#d9b3e6` — disabled / secondary

### Neutral
- `#ffffff` — фон карточек
- `#f5f5f5` — фон секций
- `#eaeaea` — границы / divider
- `#d6d6d6` — инпуты / неактивные элементы

### Text
- `#1a1a1a` — основной текст, заголовки
- `#4a4a4a` — вторичный текст
- `#7a7a7a` — подписи, плейсхолдеры

## Правила разработки

1. Один маленький шаг за раз. После каждого шага — проверка, что ничего не сломано
2. Сначала рабочий MVP, потом улучшения
3. Бизнес-логику выносить из компонентов в сервисы
4. Не смешивать UI, данные и бизнес-логику в одном компоненте
5. Не добавлять лишние библиотеки без необходимости
6. Не трогать рабочий код без причины
7. Данные из SQLite через единый data access layer
8. Длинные тексты — в MDX, не в базе

### Что агенту можно
- Создавать файлы и папки
- Настраивать проект
- Писать компоненты
- Писать типы
- Писать простые route handlers
- Писать SQLite-слой
- Добавлять тестовые данные
- Подключать UI-библиотеки
- Делать постепенные коммиты

### Что агенту нельзя
- Сразу делать "идеальную архитектуру" на 100 файлов
- Добавлять лишние библиотеки без необходимости
- Смешивать UI, данные и бизнес-логику в одном компоненте
- Переходить к сложным страницам до завершения главной
- Трогать готовый рабочий код без причины
- Делать огромные рефакторы между шагами

## Definition of Done для каждого шага

- Код компилируется (нет TypeScript ошибок)
- Нет runtime ошибок
- Интерфейс или логика реально работают
- Не ломает предыдущий функционал
- `npm run dev` работает

## Команды

```bash
npm run dev          # Запуск dev-сервера
npm run build        # Production сборка
npm run lint         # Линтинг
npm test             # Запуск тестов (Vitest)
```

## Порядок разработки (этапы)

1. Инициализация проекта (Next.js + TS + Tailwind + shadcn/ui)
2. Базовые стили, layout и UI-компоненты
3. TypeScript типы
4. SQLite и schema
5. Заполнение данными из JSON
6. Data access functions (репозитории и сервисы)
7. Статическая верстка главной
8. Переключатель режимов Города / Растения
9. Autocomplete (debounce 200-300ms)
10. Date range picker (react-day-picker)
11. Реальный поиск
12. Блок "Сейчас цветет"
13. Карточки результатов (PlantResultCard, CityResultCard)
14. Страницы растений (/plants/[slug])
15. Страницы городов (/cities/[slug])
16. MDX контентный слой
17. Логотип и сброс состояния
18. Empty / loading / error states
19. SEO и метаданные
20. Тесты (Vitest)
21. Полировка мобильной версии
22. Подготовка к деплою на Vercel

## Поведение логотипа

- На внутренней странице — переход на главную
- На главной — сброс: режим = Города, поля пустые, город = Минск, результаты очищены

## MVP scope

**Обязательно:** главная, 2 режима поиска, autocomplete, диапазон дат, результаты, "Сейчас цветет", карточки, страницы растений и городов, SQLite с данными

**Отложено:** карта, личный кабинет, мультиязычность, AI-рекомендации, погодная интеграция, push-уведомления
