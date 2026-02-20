# Interactive CV – Bram Admiraal

Interactive resume site with an AI chatbot that answers only from Bram’s resume, a compact Spotify player, and PDF download.

## What’s in the repo

- **Frontend:** `index.html`, `style.css`, `config.js` – static site (chat UI, Spotify embed, LinkedIn, Download CV).
- **Chat API:** `api/chat.ts` – Vercel serverless function; uses `content/resume-context.md` and OpenAI.
- **Local dev server:** `server.ts` – Express server for running the site and `/api/chat` locally.
- **Resume content:** `content/resume-context.md` – single source of truth for the chatbot; edit this to update experience, skills, certificates.

## Run locally

1. **Clone and install**
   ```bash
   git clone <your-repo-url>
   cd InteractiveCV
   pnpm install
   ```

2. **Environment**
   - Create a `.env` in the project root (not committed).
   - Add: `OPENAI_API_KEY=sk-...` (your OpenAI API key).

3. **Start**
   ```bash
   pnpm start
   ```
   - Site: http://localhost:3000  
   - Chat uses `/api/chat` on the same server.

## Deploy (go live)

### Option A: All on Vercel (recommended)

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), import the GitHub repo.
3. In the project **Settings → Environment Variables**, add:
   - `OPENAI_API_KEY` = your OpenAI API key (Production, Preview, Development as needed).
4. Deploy. Vercel will:
   - Serve the root (e.g. `index.html`, `style.css`, `config.js`, `Bram_Admiraal_CV.pdf`).
   - Run `api/chat.ts` as a serverless function at `/api/chat`.

No change to `config.js` is needed when frontend and API are on the same Vercel deployment (same origin).

### Option B: Frontend on GitHub Pages, API on Vercel

1. Deploy the API to Vercel as in Option A and note the deployment URL (e.g. `https://your-project.vercel.app`).
2. In `config.js`, set:
   ```js
   VERCEL_API_URL: 'https://your-project.vercel.app',
   ```
3. Host the frontend on GitHub Pages (e.g. push the repo and enable Pages for the branch).  
   The chat will call the Vercel API URL for `/api/chat`.

## Before you push

- **`.env`** is in `.gitignore` – never commit your OpenAI key.
- **CV PDF:** Put `Bram_Admiraal_CV.pdf` in the project root so the “Download PDF” button works.
- **Spotify:** Playlist ID is in the iframe in `index.html`; optional setup is documented in `SPOTIFY.md`.

## Tech

- **Chat:** OpenAI API (via Vercel AI SDK), resume-only system prompt + `resume-context.md`.
- **Hosting:** Static files + Vercel serverless (`api/chat.ts`), or static on GitHub Pages with API on Vercel.
