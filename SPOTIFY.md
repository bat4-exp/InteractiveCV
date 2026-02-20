# Spotify player setup

Your site already has a **small Spotify embed** (playlist in the right column). For that iframe embed you don’t need any Spotify Dashboard settings.

If you want to use the **Web Playback SDK** or **Web API** later (e.g. custom “Now Playing” or OAuth), configure your app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) as below.

---

## What to fill in the Dashboard form

### 1. Website
- Keep: `www.bramadmiraal.cv` (or your real CV domain).

### 2. Redirect URIs (required for OAuth / Web Playback SDK)
- Remove: `https://example.org/callback`
- Add a **valid** redirect URI. Use one of these (depending on where your site is served):

  - **Production (GitHub Pages / your live site):**
    - `https://www.bramadmiraal.cv/`  
    - or `https://www.bramadmiraal.cv/callback` if you add a `/callback` page later

  - **Local development:**
    - `http://localhost:3000/`  
    - or `http://localhost:3000/callback`

- Click **Add** after typing each URI. The redirect URI must match exactly (including `http` vs `https`, trailing slash, and port).

### 3. Which API/SDKs are you planning to use?
- **Web API** – check this if you will fetch playlists, track info, or control playback via API.
- **Web Playback SDK** – check this if you will embed a **custom** in-browser player (requires Spotify Premium for playback in the browser).
- Leave **Ads API**, **Android**, **iOS** unchecked unless you need them.

### 4. Terms
- Check: **“I understand and agree with Spotify’s Developer Terms of Service and Design Guidelines”**.

Save the app. You’ll get a **Client ID** (and optionally Client Secret) for OAuth/Web API/Web Playback SDK.

---

## Current player on the site

- The **iframe embed** (playlist in the right column) does **not** need:
  - Redirect URIs  
  - Web API / Web Playback SDK  
  - Client ID  

So you can leave the Dashboard as-is if you only use that embed. Configure the Dashboard when you’re ready to add a custom player or server-side API calls.

To use **your own** playlist, replace the playlist ID in `index.html`: find the iframe `src` and change `37i9dQZF1DXcBWIGoYBM5M` to your playlist’s ID from the Spotify share link.
