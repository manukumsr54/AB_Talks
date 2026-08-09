# ABTalks — Student Hub

A dark-themed student hub UI (Dashboard, Feed, What You Missed, Opportunities,
Deadlines, Saved, Settings) built with React, Vite, Tailwind CSS, and
lucide-react icons.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
AB_Talks/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx      # React entry point
    ├── index.css     # Tailwind directives
    └── App.jsx       # All pages + components (single file for now)
```

## Wiring in your existing Opportunities / What You Missed pages

`App.jsx` currently contains its own `OpportunitiesPage` and `MissedPage`
with mock data, matching the reference screenshots. To use your real,
already-built versions instead:

1. Add your existing component files into `src/` (e.g.
   `src/OpportunitiesPage.jsx`, `src/MissedPage.jsx`).
2. In `App.jsx`, import them at the top:
   ```jsx
   import OpportunitiesPage from "./OpportunitiesPage";
   import MissedPage from "./MissedPage";
   ```
3. Delete the placeholder `OpportunitiesPage` / `MissedPage` function
   definitions already in `App.jsx`.
4. They'll now be used automatically via the `pages` object at the bottom
   of `App.jsx`:
   ```jsx
   const pages = {
     dashboard: <DashboardPage setPage={setPage} />,
     feed: <FeedPage />,
     missed: <MissedPage />,
     opportunities: <OpportunitiesPage />,
     deadlines: <DeadlinesPage />,
     saved: <SavedPage />,
     settings: <SettingsPage />,
   };
   ```

## Notes

- Navigation between pages is handled with local React state (no
  `react-router-dom`). If your project already uses routing, swap the
  `page` / `setPage` state and `pages[page]` lookup for `<Routes>` /
  `<Route>` and `navigate()` calls — the Sidebar's "active" highlighting
  can then key off `location.pathname` instead.
- All data in `App.jsx` (opportunities, feed items, deadlines, etc.) is
  mock data matching the reference screenshots — replace the arrays near
  the top of the file with real data or API calls as needed.
