# Deploying SahayakAI for Free

This guide will walk you through deploying your **Backend to Railway** and your **Frontend to Vercel**, both on their free tiers.

---

## Step 0: Push your code to GitHub
Before deploying, both Vercel and Railway need access to your code via GitHub.
1. Go to [GitHub](https://github.com/) and create a new repository (e.g., `sahayakai`).
2. Open your terminal in your project's root folder (`Project21`) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sahayakai.git
   git push -u origin main
   ```
*(Make sure your `.env` files are ignored — we've already set up the `.gitignore` files for you!)*

---

## Step 1: Deploy the Backend on Railway

Railway is a great platform for hosting Node.js backends easily and offers a free starter tier.

1. **Sign Up**: Go to [Railway.app](https://railway.app/) and sign in with your GitHub account.
2. **Create Project**: Click **"New Project"** -> **"Deploy from GitHub repo"**.
3. **Select Repo**: Choose the `sahayakai` repository you just created.
4. **Configure Root Directory**: 
   - Because your backend is inside a subfolder, click on **"Add Variables"** or go to the project **Settings** -> **Deploy**.
   - Look for **"Root Directory"** and type `/backend`. This tells Railway to only deploy the backend code.
5. **Add Environment Variables**:
   - Go to the **Variables** tab in Railway.
   - Add the following variable:
     - **Name**: `HUGGINGFACE_API_KEY`
     - **Value**: *(Paste your actual Hugging Face key here)*
6. **Generate a Domain**:
   - Go to the **Settings** tab.
   - Scroll down to **"Domains"** and click **"Generate Domain"**.
   - Railway will give you a public URL (e.g., `sahayakai-backend-production.up.railway.app`).
   - **Copy this URL** — you will need it for the frontend!

---

## Step 2: Deploy the Frontend on Vercel

Vercel is the best platform for hosting Vite/React frontends and offers an incredibly generous free tier.

1. **Sign Up**: Go to [Vercel.com](https://vercel.com/) and sign in with GitHub.
2. **Add New Project**: Click **"Add New..."** -> **"Project"**.
3. **Import Repo**: Find your `sahayakai` repository and click **"Import"**.
4. **Configure Project Settings**:
   - **Framework Preset**: Make sure it is set to **Vite**.
   - **Root Directory**: Click "Edit" and select the `frontend` folder.
5. **Add Environment Variables**:
   - Expand the **"Environment Variables"** dropdown.
   - Add the following variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://<YOUR_RAILWAY_URL_FROM_STEP_1>` *(e.g., `https://sahayakai-backend-production.up.railway.app` - make sure to remove any trailing slash `/` at the end).*
6. **Deploy**:
   - Click the **"Deploy"** button.
   - Vercel will build your frontend. Once finished (usually takes less than a minute), you'll see a celebration screen!
   - Click **"Continue to Dashboard"** and then click the generated domain (e.g., `sahayakai.vercel.app`) to view your live website.

---

## Troubleshooting

- **"Failed to Fetch" or Network Errors on Frontend**: This usually means the frontend can't reach the backend. Ensure your `VITE_API_URL` in Vercel is set correctly to your Railway domain, starts with `https://`, and has no trailing slash.
- **AI Explain Feature fails**: Ensure your `HUGGINGFACE_API_KEY` is properly set in the Railway Variables tab. If you update the key, Railway will automatically redeploy the backend.
- **Routing Issues**: Vercel handles React Router perfectly out of the box with Vite, so page reloads on `/schemes` should work natively without any extra config files!
