# FE Home Work — Real Estate Analytics Dashboard

Single-page React + TypeScript dashboard with ag-Grid and Recharts. Data comes from local JSON files, styles use BEM with CSS Modules, and a minimal UI kit (buttons, checkbox, dropdown, tags, icons). Docker/Docker Compose included for cross-platform build/run.

## Stack
- Vite, React (FC + hooks), TypeScript
- ag-Grid (community) for the table
- Recharts for scatter charts
- CSS Modules (BEM naming)
- Docker + Nginx for prod image, docker-compose for dev/prod runs

## Project structure
- `src/components/` — UI kit, header, charts, table, tags, KPIs
  - `src/types/`, `src/utils/`, `src/services/` — types, formatting, data loading/transforms
  - `public/data/` — local JSON/JS data (`table-lines-data.js`, `fit-score.json`, etc.)
- `docker-compose.yml` — services definition
- `Dockerfile`, `nginx.conf` — prod image

## Scripts (from `frontend/`)
- `npm install` — install deps
- `npm run dev` — dev server (Vite)
- `npm run build` — production build
- `npm run preview` — preview built app

## Docker / Compose (from this folder)
- Build & run via compose:  
  `docker-compose up --build`
- Stop:  
  `docker-compose down`
- Prod image build only:  
  `docker-compose build`

## Running locally without Docker
```bash
npm install
npm run dev
```
Open the URL Vite prints (default http://localhost:5173).

## Features aligned to spec
- Header with data levels, segments, actions, profile
- KPI cards (rent growth avg, fit score, overall)
- Two scatter charts (left KPI-selectable, right fixed axes), filtered by table selection
- ag-Grid table with multi-row selection, master checkbox, formatted % and currency, selection tags, search + “selected only” toggle
- Custom UI kit components (Button, Checkbox, Dropdown, Tag, Arrow icons), BEM styling

## Notes
- Ensure Docker Desktop is running on Windows before `docker-compose up`.
- All labels and data fields use English naming per spec.

