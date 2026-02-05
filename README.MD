
# Sports Dashboard App

A web application for viewing sports scores, team details, and game summaries using public APIs (no API key required).

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Run Instructions

- After running `npm run dev`, open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).
- Use the sidebar to select leagues and view scoreboards, game details, and team information.

## Architecture Notes

- **Frontend:** Built with React and TypeScript, using Vite for fast development and builds.
- **State Management:** Uses React Context and Redux Toolkit for global state (e.g., league selection).
- **Data Fetching:** Utilizes React Query for API calls and caching.
- **Components:** Modular structure with reusable components for games, teams, modals, and selectors.
- **API Layer:** All API requests are made to public endpoints; no authentication or API key is required.
- **Styling:** Custom styles and color mode context for light/dark themes.

## Assumptions

- The app uses only public sports APIs that do not require authentication.
- API usage is subject to provider limits; please use responsibly.
- The app is intended for desktop browsers and may not be fully optimized for mobile devices.
- No sensitive or personal data is stored or processed.

---

**Note:** This app uses public APIs without a key. Please respect the API provider’s terms and avoid excessive requests.

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)

## License

MIT
