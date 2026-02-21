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
   - **Analytics dashboard:** http://localhost:3000/dashboard.html — shows chats this week, all time, and requests by country (data is stored in `data/chat-analytics.ndjson` when you use the chat locally).

## Deploy (go live)

### Option A: All on Vercel (recommended)

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), import the GitHub repo.
3. In the project **Settings → Environment Variables**, add:
   - `OPENAI_API_KEY` = your OpenAI API key (Production, Preview, Development as needed).
   - For production analytics in the local dashboard: create a **Blob Store** under **Storage** in the project; Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
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

## Chat analytics (interaction count + geo)

Each time someone sends a message to the bot, the API logs an interaction with:

- **Count:** number of messages in that request (conversation length).
- **Geo (on Vercel):** country, region, and city from Vercel’s edge headers (`x-vercel-ip-country`, `x-vercel-ip-country-region`, `x-vercel-ip-city`). No extra service needed.

**How to see the data**

- **Vercel:** Project → **Logs** (or **Deployments** → select deployment → **Functions** → **api/chat**). Each request logs a line like:  
  `[chat-analytics] {"ts":"...","messageCount":3,"geo":{"country":"DE","region":"BY","city":"Munich"}}`
- **Local:** Same line appears in the terminal where you run `pnpm start`.

**Local dashboard with production (real-time) data**

1. **Vercel Blob:** In the Vercel project, go to **Storage** → create a **Blob Store** (or use an existing one). The project will get a `BLOB_READ_WRITE_TOKEN` env var automatically.
2. **Deploy:** Redeploy so `api/chat.ts` and `api/analytics.ts` use the token. Production chat requests are then appended to the blob; **GET /api/analytics** reads from it and returns the same stats as local (with CORS so the dashboard can call it).
3. **Dashboard:** Open the dashboard locally (http://localhost:3000/dashboard.html with `pnpm start`). In **config.js**, set `VERCEL_API_URL` to your production URL (e.g. `https://your-project.vercel.app`). In the dashboard, choose **Data source: Production** and click **Refresh**. You’ll see real-time production analytics (chats this week, all time, by country).

**Optional: persist to a spreadsheet or DB**

Set an env var in Vercel:

- `CHAT_ANALYTICS_WEBHOOK_URL` = URL that accepts POST JSON (e.g. a Zapier/Make webhook, or a small server that writes to Google Sheets / Airtable / Supabase).

Each interaction is sent as one POST with body:  
`{ "ts", "messageCount", "geo": { "country", "region", "city" } }`.

## Before you push

- **`.env`** is in `.gitignore` – never commit your OpenAI key.
- **CV PDF:** Put `Bram_Admiraal_CV.pdf` in the project root so the “Download PDF” button works.
- **Spotify:** Playlist ID is in the iframe in `index.html`; optional setup is documented in `SPOTIFY.md`.

## Tech

- **Chat:** OpenAI API (via Vercel AI SDK), resume-only system prompt + `resume-context.md`.
- **Hosting:** Static files + Vercel serverless (`api/chat.ts`), or static on GitHub Pages with API on Vercel.
