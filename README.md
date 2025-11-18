<<<<<<< HEAD

# Website : https://tusharsri464.github.io/tushar.cow-catalog/cows

# Cow Catalog --- Tushar---

A small but production-quality Angular 18 application implementing a **Cow Catalog** with:

- Cow list with search & filters
- Add cow form
- Cow detail page with timeline
- LocalStorage persistence
- Service-based state management
- PrimeNG UI components
- Clean, modular architecture (Core / Shared / Feature modules)
- Angular components (classic NgModule style)

## Tech Stack

- Angular 18 (NgModule-based, no standalone components)
- PrimeNG
- RxJS
- LocalStorage (via `LocalStorageService`)

## Project Structure

- `src/app/core` – singleton services, models, appplication-wide logic
  - `models/` – `Cow`, `CowEvent`, enums
  - `services/`
    - `LocalStorageService` – typed wrapper around `window.localStorage`
    - `CowService` – CRUD operations, mock seeding, filter state
- `src/app/shared` – reusable UI buiilding blocks
  - Shared PrimeNG module imports/exports
  - `ToolbarComponent`
  - `StatusLabelPipe`
- `src/app/cows` – feature module
  - `CowListComponent` – liist, table, pagination, row navigation
  - `CowFiltersComponent` – search + filters with persisted state
  - `CowFormComponent` – add/edit cow form with validation & unique tag check
  - `CowDetailComponent` – cow details + last 5 events using PrimeNG timeline

## Feature Notes

### CA-01: Cow List

- Implemented using PrimeNG Table with sorting & pagination.
- Row click navigates to `/cows/:id` detail page.
- Columns: Ear Tag, Sex, Pen, Status, Last Event Date.

### CA-02: Search & Filter

- `CowFiltersComponent` holds UI for:
  - Tag search (text)
  - Status filter (dropdown)
  - Pen filter (dropdown)
- Filter state is stored in `CowService` (`CowFilterState`) and persists while navigating
  between list & detail.
- `CowService.getFilteredCows$()` combines current cows + filters in a single observable.

### CA-03: Add New Cow Form

- Route: `/cows/new`
- Reactive form with validation:
  - Ear Tag – required + **unique** (validated through `CowService.hasCowWithEarTag()`)
  - Sex – required
  - Pen – required
  - Status – required, defaults to `ACTIVE`
  - Weight – optional, must be positive
  - Daily weight gain – optional, positive
- On save:
  - Builds a `Cow` model instance
  - Persists via `CowService.upsertCow()` (into LocalStorage)
  - Redirects back to `/cows`

### CA-04: Cow Detail Page

- Route: `/cows/:id`
- Shows:
  - Ear tag, sex, pen, status
  - Current weight
  - Daily weight gain (if available)
  - Last event date
- Uses **PrimeNG Timeline** to render up to **last 5 events** from `cow.events`.

## LocalStorage Persistence

- Data is stored under key: `cowCatalog.cows`.
- On first load:
  - `CowService` seeds mock data if no data is found in LocalStorage.
- Subsequent mutations call `CowService.persist()` which writes full collection back to LocalStorage.

## Setup & Run

1. Install dependencies:

   npm install

2. Run the development server:

   npm start

3. Open the app in your browser:

   http://localhost:4200

## Design Decisions

- **NgModule-based design** – Explicit requirement to avoid standalone components; clean separation
  between `CoreModule`, `SharedModule`, and feature modules.
- **Service-based state** – `CowService` centralises the cow collection and search/filter state without
  introducing external state libraries.
- **Strong typing** – All models and enums are strongly typed. LocalStorage wrapper is generic.
- **PrimeNG encapsulated in SharedModule** – Feature modules only import `SharedModule` to get access
  to PrimeNG UI modules and common Angular modules.
- **Filter persistence** – Instead of using query params, filters are stored in an in-memory `BehaviorSubject`
  inside `CowService`, which survives navigation within the SPA.

=======
# tushar.cow-catolog
>>>>>>> 5d21da98c4d540a9b0c65f6a4b85befdf2b30a8a
