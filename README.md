# GitHub Explorer

## Live Demo

<!--TBF-->

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/VSAithal/github-explorer.git
cd github-explorer
npm install
```

### Running the app

```bash
npm run dev
```

### Running tests

```bash
npm run test
```

---

## Tech Stack and Decisions

### Vite

Vite uses native ES modules instead of pre-bundling the entire codebase like Webpack. The dev server starts instantly because it only processes files the browser actually requests, and HMR updates only the changed file rather than rebuilding everything. It is the current standard for React projects and the natural choice here.

### React Query

Using plain `fetch` inside `useEffect` requires manually managing loading, error and data state for every endpoint, plus handling race conditions and cleanup on unmount. React Query eliminates all of that — it manages loading and error states automatically, caches responses, and refetches stale data in the background when the user returns to the window. The `enabled` option also lets queries be conditionally skipped without any if statements in effects, which is used here to prevent searches firing on short queries and to skip the repository fetch when no user is selected.

### Tailwind CSS

Tailwind's utility classes and responsive prefixes (`sm`, `md`, `lg`) make implementing responsive layouts significantly faster than writing custom CSS with media queries. Vite's build step purges unused classes so only what is actually used ends up in production.

### shadcn/ui

Unlike MUI or Ant Design where components live in `node_modules` and updates can silently break your app, shadcn copies component source code directly into the project. Each component is built on Radix UI primitives which handle keyboard navigation, focus management and ARIA attributes correctly out of the box. The result is full visual control without sacrificing accessibility.

### Vitest and React Testing Library

Vitest shares the same configuration and transformation pipeline as Vite so TypeScript and path aliases work without any additional setup. With Jest, a separate transformer like Babel or `ts-jest` would be required. React Testing Library encourages testing user-visible behaviour rather than implementation details, which makes tests more resilient to refactoring.

---

## Architecture

### Component Structure

Application components live in `src/components/` and are separated by concern — data fetching logic lives in `src/hooks/`, raw API functions in `src/api/`, and TypeScript types in `src/types/`. shadcn UI primitives live in `src/components/ui/` and are treated as owned but stable base components.

### State Management

Server state is managed entirely by React Query. UI state is minimal — `App.tsx` owns three pieces of state: the raw input value, the debounced query, and the selected username. `selectedUsername` lives in App rather than inside `UserItem` so only one user can be expanded at a time without components needing to communicate with each other.

### Two-State Debounce Pattern

The search uses two separate state variables — `inputValue` drives the input display and updates on every keystroke, while `debouncedQuery` drives the API call and only updates after 300ms of inactivity. This keeps the input feeling responsive while preventing unnecessary API requests. The Search button bypasses the debounce and sets `debouncedQuery` immediately.

---

## Testing Approach

Tests are written with Vitest and React Testing Library across 8 test files with 40 tests total. The suite covers four layers — utility functions (`debounce`, `getRateLimitMessage`), custom hooks (`useSearchUsers`, `useUserRepositories`), and UI components (`SearchInput`, `UserList`, `RepositoryList`, `UserItem`).

Hooks are tested with a real React Query setup using a dedicated `QueryWrapper` with retries disabled, and the API layer is mocked at the function level using `vi.mock`. Components are tested in isolation by mocking their hook dependencies directly, keeping each test focused on rendering behaviour rather than data fetching logic. Shared test fixtures live in `src/test/fixtures.ts` to avoid duplication across test files.

---

## Known Limitations and Future Improvements

- **API rate limits:** The GitHub API limits unauthenticated requests to 10 searches per minute and 60 general requests per hour. Adding an optional personal access token via an environment variable would increase these limits significantly and is a straightforward improvement.
- **Repository pagination:** Users with more than 100 repositories will only see the first 100. Implementing pagination or infinite scroll would address this.
- **Viewport layout:** The current layout uses natural page scroll. A fixed viewport layout where the header remains sticky and the user list scrolls independently would improve the experience on longer result sets.

---
