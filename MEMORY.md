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

### Этап 11. Date range picker
- Установлены `react-day-picker` v9 и `date-fns`
- src/components/search/date-range-picker.tsx ("use client") — popover с DayPicker (mode="range", locale=ru, 1 месяц), закрытие по клику снаружи
- Триггер — `<div role="button">` (а НЕ `<button>`), чтобы вложенный крестик-сброс не нарушал HTML (button не может быть потомком button → hydration error)
- Отображение в поле "Когда": "15 апр – 30 апр" (date-fns format с ru, font-semibold), плейсхолдер если пусто
- Крестик-сброс в поле ввода вместо иконки календаря, когда диапазон выбран
- Кнопка "Применить" в попапе (rounded-md, фиолетовая #a64ac9) — закрывает календарь, сохраняя диапазон. Disabled пока ничего не выбрано
- Цвета через CSS-переменные `--rdp-*` в `style` пропе DayPicker (НЕ на родителе — переменные объявлены на `.rdp-root` со значениями по умолчанию и не наследуются с родителя):
  - `--rdp-accent-color` / `--rdp-range_start-date-background-color` / `--rdp-range_end-date-background-color` = #ffb1ed
  - `--rdp-range_middle-background-color` = #ffe4f7 (бледно-розовый)
  - `--rdp-day_button-border-radius`: 8px (скруглённые прямоугольники)
  - `--rdp-today-color`: #8e3ab5
- chevron (стрелки навигации) — fill #a64ac9 через classNames
- SearchBar получает `dateRange` и `onDateRangeChange` пропсы; HeroSearch держит состояние useState<DateRange | undefined>
- z-50 на popover, чтобы не перекрывался autocomplete

### Этап 10. Autocomplete для первого поля
- src/components/search/autocomplete.tsx ("use client") — реюзабельный компонент: debounce 250мс, dropdown, keyboard (ArrowUp/Down/Enter/Escape), закрытие по клику снаружи, AbortController для отмены предыдущих fetch
- Флаг `justSelected` (useRef) — предотвращает повторное открытие dropdown после выбора варианта
- Обработка ошибок fetch с логированием (не AbortError)
- SearchBar и HeroSearch обновлены: query, selectedSlug, apiUrl переключается по режиму (/api/suggestions/cities | /api/suggestions/plants)
- overflow-visible на контейнере полей, чтобы dropdown не обрезался
- Фикс: npm rebuild better-sqlite3 при несовпадении NODE_MODULE_VERSION

### Этап 12. Реальный поиск на главной
- HeroSearch теперь рендерит ВСЮ hero-секцию (Logo, заголовок, ModeToggle, SearchBar) + секцию результатов под ней (вне hero, на bg-surface-soft, pb-0) — чтобы сдвигать "Сейчас цветет" вниз и не тащить page.tsx в client. page.tsx упрощён: `<HeroSearch />` + секция "Сейчас цветет"
- Route handler `GET /api/search?mode=&slug=&startDate=&endDate=` (src/app/api/search/route.ts) — единый стиль с autocomplete. HeroSearch шлёт `fetch('/api/search?...')`. Server action в src/server/actions.ts остался, но в UI не используется
- Даты конвертируются в ISO `yyyy-MM-dd` через date-fns `format`
- Состояние в HeroSearch: `results: SearchResult | null`, `isLoading`, `errorMessage`
- Inline-сообщение об ошибке (white/80 пилюля под SearchBar) если: не выбран slug из autocomplete, не выбран диапазон дат, или поиск упал. Сбрасывается при изменении любого поля или смене режима
- Кнопка disabled пока isLoading, текст меняется на "Поиск..."
- При смене режима результаты сбрасываются (results=null)
- src/components/search/search-results.tsx — простой список (имя + регион/латинское + диапазон цветения форматированный date-fns "d MMM"), пустое состояние "Ничего не найдено..."
- Красивые карточки результатов — отложены на этап 13
- SearchBar получил пропсы `onSearch` и `isLoading`

**Полировка UX после этапа 12:**
- Инпут автокомплита становится `font-semibold`, когда `selectedSlug` выбран (через prop `isSelected` у Autocomplete и SearchBar)
- На `onBlur` инпута автокомплита: если введённый текст точно совпадает (без учёта регистра) с одним из текущих suggestions — авто-выбор этого варианта (чтобы кнопка Найти работала и при ручном вводе)
- В режиме **Цветы** скрыт `DateRangePicker` и разделитель — поле "Введите растение..." растягивается на всю ширину. Валидация дат отключена для этого режима, в API передаётся диапазон `2000-01-01`..`2000-12-31` (полный год, благодаря MM-DD сравнению возвращает все города, где растение цветёт)
- SearchBar получил проп `showDateRange` (default true); HeroSearch передаёт `mode === "cities"`

**Важные баги, исправленные на этапе 12:**
- **Autocomplete сбрасывал selectedSlug:** при клике на вариант autocomplete вызывал `onSelect(suggestion)` (родитель ставил slug), затем `onChange(suggestion.name)` → `handleQueryChange` → `setSelectedSlug(null)`. Фикс: убрал `onChange(suggestion.name)` из autocomplete `handleSelect`; родительский `handleSelect` теперь сам ставит и `query`, и `selectedSlug` атомарно
- **Поиск ничего не находил из-за года:** даты цветения в БД хранятся с годом-плейсхолдером `2000` (цикличные), а поиск шёл с реальным годом (например 2026). Лексикографическое сравнение `"2026-04-16" <= "2000-04-30"` всегда false. Фикс: все три search-функции в src/server/repositories.ts (`searchPlantsByCity`, `searchCitiesByPlant`, `getCurrentlyBloomingByCity`) теперь сравнивают только `MM-DD` через `substr(date, 6, 5)`. Edge case: диапазоны через Новый год пока не поддержаны

**Дополнительные правки после этапа 12 (UX + данные):**
- **Данные:** Яблоня и Магнолия сдвинуты на -10 дней по всем 6 городам. Добавлены Берёза (id 37), Тополь (id 38), Сакура (id 39) со сроками цветения по 6 городам, сдвинутыми на -10 дней от официальных (у Сакуры — дополнительный сдвиг ещё -10 дней, итого -20). Дуб (id 14) и Липа (id 21) уже были в базе, их сроки не тронуты. Итого 39 растений, 234 записи
- **Дефолтный режим:** изменён с `"cities"` на `"plants"` в [hero-search.tsx](src/components/search/hero-search.tsx#L14). `window.location.reload()` по клику на лого возвращает к дефолту
- **Дефолтные подсказки:** при фокусе на пустое поле открывается список. Города (все 6): Минск, Гродно, Брест, Витебск, Гомель, Могилёв. Растения: Сакура, Магнолия, Сирень, Подсолнух, Липа, Василёк. Пропы `defaultSuggestions` + `defaultSuggestionsTitle` (шапка *italic* `font-semibold`: "Популярные города"/"Популярные растения") прокинуты Autocomplete ← SearchBar ← HeroSearch
- **Мгновенный показ дефолтов:** отдельный useEffect в Autocomplete без debounce срабатывает на `value.length === 0` — при очистке поля список появляется сразу. Debounce 250мс остался только для API-фетча
- **Enter = поиск:** если `isSelected && !isOpen` (или dropdown открыт, но ничего не выделено) и есть `onSubmit` — Enter запускает поиск. SearchBar прокидывает `onSearch` как `onSubmit` в Autocomplete

## Следующий этап: 13 — Блок "Сейчас цветет" (переделать заново после отката)

Предыдущая попытка этапа 13 откачена (`git reset --hard 2a22918` + force push). Коммиты `blooming now section` и `update memory` удалены.

Уточнённые требования к этапу 13:
- По умолчанию показывать Минск
- При выборе другого города в режиме "Города" — обновлять блок
- Показывать **все** растения, цветущие сегодня в выбранном городе (НЕ только 3)
- Вернуть стрелочки-переключатели карточек справа вверху
- Вернуть бледно-розовую кнопку "Все цветы" внизу блока
- Если ничего не цветёт — аккуратное пустое состояние
- Карточки кликабельны (ссылка на страницу растения — возможно отложить до этапа 14)

Что уже есть:
- Репозиторий `getCurrentlyBloomingByCity(citySlug, currentDate)` — src/server/repositories.ts
- API `GET /api/currently-blooming?city=&date=` — src/app/api/currently-blooming/route.ts
- Статическая секция "Сейчас цветет в Минске" с 4 моковыми карточками PlantBloomCard в page.tsx — нужно заменить на живые данные (и подрезать до 3)
- MM-DD сравнение уже работает в getCurrentlyBloomingByCity

## Важные решения
- Логотип — SVG-цветок в компоненте, не эмодзи
- Данные в БД через JSON-импорт, идемпотентный
- Бизнес-логика вынесена в server/repositories.ts, отдельно от UI
