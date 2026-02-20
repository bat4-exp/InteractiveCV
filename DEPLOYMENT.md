# Deployment Guide: GitHub Pages + Vercel Functions

This guide explains how to deploy your resume website with:
- **Frontend**: GitHub Pages (public, visible source code)
- **Backend API**: Vercel Functions (private, API keys hidden)

## Architecture

```
┌─────────────────┐         ┌──────────────────┐
│  GitHub Pages   │  ─────> │  Vercel Function  │
│  (Public HTML)  │  HTTP   │  (Private API)    │
└─────────────────┘         └──────────────────┘
```

## Step 1: Deploy Backend to Vercel

### 1.1 Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 1.2 Login to Vercel
```bash
vercel login
```

### 1.3 Deploy to Vercel
From your project root:
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name? (e.g., `interactive-cv-api`)
- Directory? **./** (current directory)
- Override settings? **No**

### 1.4 Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-proj-...`)
   - **Environment**: Production, Preview, Development (select all)

### 1.5 Get Your Vercel Function URL

After deployment, Vercel will give you a URL like:
```
https://your-project-name.vercel.app
```

Your API endpoint will be:
```
https://your-project-name.vercel.app/api/chat
```

**Save this URL** - you'll need it for the next step.

## Step 2: Configure Frontend for GitHub Pages

### 2.1 Update config.js

Edit `config.js` and set your Vercel API URL:

```javascript
const API_CONFIG = {
  VERCEL_API_URL: 'https://your-project-name.vercel.app', // ← Your Vercel URL here
  // ... rest stays the same
};
```

### 2.2 Commit and Push to GitHub

```bash
git add .
git commit -m "Configure for GitHub Pages + Vercel deployment"
git push origin main
```

## Step 3: Deploy Frontend to GitHub Pages

### 3.1 Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/` (root)
4. Click **Save**

### 3.2 Your Site Will Be Live At

```
https://your-username.github.io/your-repo-name/
```

## Step 4: Update CORS (if needed)

If you encounter CORS errors, the Vercel function already includes CORS headers. If issues persist:

1. Go to Vercel Dashboard → Your Project → Settings → Functions
2. Ensure the CORS headers in `api/chat.ts` are correct

## Step 5: Test Everything

1. **Test Vercel Function directly:**
   ```bash
   curl -X POST https://your-project.vercel.app/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"Hello"}]}'
   ```

2. **Test GitHub Pages site:**
   - Visit your GitHub Pages URL
   - Try sending a chat message
   - Check browser console for any errors

## Security Checklist

✅ **API keys are in Vercel environment variables** (not in GitHub)  
✅ **Backend code (`api/chat.ts`) is in GitHub** (but API keys are not)  
✅ **Frontend code is public** (as intended for GitHub Pages)  
✅ **CORS is configured** (allows GitHub Pages domain)

## Troubleshooting

### CORS Errors
- Ensure `Access-Control-Allow-Origin: *` is set in `api/chat.ts`
- Check that your GitHub Pages URL is allowed

### API Not Found
- Verify `config.js` has the correct Vercel URL
- Check that Vercel deployment succeeded
- Ensure environment variable `OPENAI_API_KEY` is set in Vercel

### Function Timeout
- Vercel Functions have a timeout limit (10s on free tier, 60s on Pro)
- For longer conversations, consider upgrading or optimizing

## Local Development

For local development, keep `config.js` with empty `VERCEL_API_URL`:

```javascript
VERCEL_API_URL: '', // Empty = uses relative /api/chat
```

Then run your local server:
```bash
pnpm start
```

The frontend will use `http://localhost:3000/api/chat` automatically.

## Updating the Deployment

### Update Backend (Vercel)
```bash
vercel --prod
```

### Update Frontend (GitHub Pages)
```bash
git add .
git commit -m "Update frontend"
git push origin main
```

GitHub Pages will automatically rebuild.

## File Structure

```
InteractiveCV/
├── api/
│   └── chat.ts          # Vercel serverless function (deployed to Vercel)
├── index.html           # Frontend (deployed to GitHub Pages)
├── style.css            # Frontend (deployed to GitHub Pages)
├── config.js            # Frontend config (deployed to GitHub Pages)
├── server.ts            # Local dev server (not deployed)
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies
└── .env                 # Local only (NOT committed to GitHub)
```

## Important Notes

⚠️ **Never commit `.env` to GitHub** - it's already in `.gitignore`  
⚠️ **API keys are only in Vercel** - never hardcode them in code  
⚠️ **`config.js` only contains the Vercel URL** - no API keys  
✅ **Backend code can be public** - it doesn't contain secrets
