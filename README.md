# 12-Week Cut Tracker

Spin bike + bodyweight fat loss tracker with magic-link auth and real-time sync across all devices.

**Stack:** Vite · React · Supabase · Vercel

---

## Setup (one time, ~20 minutes)

### 1. Supabase

1. Go to [supabase.com](https://supabase.com) → **New project** → give it a name (e.g. `12-week-cut`)
2. Once created, go to **SQL Editor** → **New query** → paste the contents of `supabase-setup.sql` → **Run**
3. Go to **Project Settings → API**
   - Copy **Project URL** → this is your `VITE_SUPABASE_URL`
   - Copy **anon public** key → this is your `VITE_SUPABASE_ANON_KEY`
4. Go to **Authentication → URL Configuration**
   - Add your Vercel URL to **Site URL** (you'll get this in step 3 — come back and do this after deploying)
   - Add `http://localhost:5173` to **Redirect URLs** for local dev

### 2. GitHub

1. Create a new repo on GitHub (e.g. `12-week-cut`)
2. In your terminal:

```bash
cd 12-week-cut
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/12-week-cut.git
git push -u origin main
```

### 3. Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
2. In the **Environment Variables** section, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
3. Click **Deploy** — Vercel builds and gives you a URL (e.g. `https://12-week-cut.vercel.app`)
4. Go back to Supabase → **Authentication → URL Configuration** → add your Vercel URL to **Site URL**

That's it. Open your Vercel URL, enter your email, click the magic link, and you're in.

---

## Local development

```bash
# Install dependencies
npm install

# Copy env template and fill in your Supabase credentials
cp .env.example .env

# Start dev server
npm run dev
```

Open `http://localhost:5173`

---

## How it works

- **Auth:** Supabase magic link — enter email, click the link, no password ever needed. Works on any device.
- **Storage:** One row per user in Supabase (`progress` table). Every interaction debounces and writes to the database 800ms after the last change — fast enough to feel instant, efficient enough not to hammer the DB.
- **Cross-device:** Because data lives in Supabase, opening the app on your phone, desktop, or any browser while signed in with the same email shows the same progress.
- **Add to home screen (iOS):** Open your Vercel URL in Safari → Share → Add to Home Screen. Works as a PWA.

---

## Add a custom domain (optional)

In Vercel → your project → **Settings → Domains** → add your domain. Then update Supabase Site URL to match.
