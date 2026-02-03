# Lendsqr (React + TypeScript + Vite)

Frontend assessment app: **Login**, **Dashboard**, **Users** (500 records), and **User Details** pages. Mock API via **mocky.io** or **json-generator.com**; User Details cached in **IndexedDB**. Mobile responsive.

## What’s in the repo

- **Pages:** Login (auth layout), Dashboard (stat cards), Users (table, filters, pagination), User Details (summary, tabs, sections).
- **Stack:** React 19, TypeScript, Vite 7, React Router, SCSS modules, Vitest + Testing Library.
- **Data:** Mock users (500); optional `VITE_MOCKY_USERS_URL` for mocky.io; User Details read/write via IndexedDB.
- **Structure:** Feature-style: each main page has `components/`, `constants/`, `hooks/`; shared UI in `src/components/`, shared constants in `src/constants/`.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`). Default route redirects to `/login`; after login you can use `/users`, `/users/:id`, `/dashboard`.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run generate-mock-users` | Generate 500-user JSON for mocky.io → `public/mock-users.json` |

## Mock API (mocky.io / json-generator.com)

- **Setup:** [MOCK_API.md](./MOCK_API.md) — how to use mocky.io or json-generator.com.
- **Generate payload:** `npm run generate-mock-users` → paste result into mocky.io, then set in `.env`:
  ```env
  VITE_MOCKY_USERS_URL=https://run.mocky.io/v3/your-id
  ```
- Without this env var, the app uses in-code fallback (500 users).

## Testing

- **Run tests:** `npm test` or `npx vitest run`
- **Coverage:** API (api.ts), storage (userDetailsStorage), AuthContext, Login (positive + negative), format utils (formatNGN, formatDateJoined, slugToTitle), UserDetails (formatNGN).
- **Assessment checklist:** [ASSESSMENT_CHECKLIST.md](./ASSESSMENT_CHECKLIST.md) — maps assessment criteria to what’s implemented and what to verify.

## Architecture (high level)

```
src/
├── app/           # Router, protected route
├── components/    # Shared UI (PageState, Pagination, StatCard, UsersTable, FilterDrawer, Header, Sidebar, …)
├── constants/    # PAGE_SIZES, STAT_CARDS
├── layouts/      # AppLayout, AuthLayout
├── pages/
│   ├── Login/
│   ├── Dashboard/
│   ├── Users/         # components/, constants/, hooks/, Users.tsx
│   └── UserDetails/   # components/, constants/, hooks/, UserDetails.tsx
├── services/     # api/, storage/ (IndexedDB)
├── styles/       # Variables, mixins, global
├── types/        # User, FilterState, …
└── utils/        # format (NGN, date, slugToTitle)
```

## GitHub / commits

- **README:** This file + MOCK_API.md + ASSESSMENT_CHECKLIST.md so a random engineer can run, test, and understand what’s done.
- **Commits:** Prefer small, clear commits with present-tense messages (e.g. “Add Users page with table and pagination”, “Fix User Details summary height to 210px”) so history explains what and why.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
