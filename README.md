# AI Resume Analyzer

A beginner-friendly MERN app that compares a PDF resume with a job description and returns an AI-generated, structured review. The React app is built with Vite and Tailwind CSS; Express handles PDF extraction and AI requests; MongoDB stores the analysis history.

## What it does

- Compares a resume and job description, then reports ATS score, match percentage, matching and missing skills, strengths, weaknesses, keywords, improvement suggestions, and a recommendation.
- Accepts one text-based PDF up to 4 MiB. This leaves room for multipart upload overhead under Vercel Functions' 4.5 MB request-body limit. Scanned/image-only PDFs need OCR and are not supported in this version.
- Keeps the AI API key on the server. The resume text is extracted in memory and is not saved; the uploaded file is never written to disk.
- Saves the job description, original file name, and analysis result to MongoDB. History is scoped to a random ID in the current browser, without user accounts. Clearing browser storage means that browser can no longer access its earlier history.
- Shows the 50 most recent analyses for the current browser.

## Requirements

- Node.js 20.19 or newer and npm.
- A MongoDB Atlas cluster and database user.
- A Google Gemini API key with access to the Gemini API.

## Run locally

1. Install packages:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the server values:

   ```dotenv
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   GEMINI_API_KEY=<your Google Gemini API key>
   PORT=5000
   ```

   In MongoDB Atlas, create a database user and allow your development IP in Network Access. Use a URL-encoded password if it contains reserved URI characters.

3. Start the frontend and API together:

   ```bash
   npm run dev
   ```

   Open the Vite URL shown in the terminal (normally `http://localhost:5173`). Vite forwards `/api` requests to Express on port 5000.

4. Create a production frontend build with `npm run build`. To run the standalone Express API, use `npm start`.

The API health endpoint at `/api/health` does not require MongoDB. Analysis and history endpoints need both environment variables configured.

## Deploy to Vercel

1. Push this project to a Git provider and import that repository in Vercel. Set the project root to the folder containing `package.json` and `vercel.json`; use the Vite preset, `npm run build`, and `dist` as the output directory.
2. In **Project Settings → Environment Variables**, add:
   - `MONGODB_URI` — the MongoDB Atlas connection string for your application database.
   - `GEMINI_API_KEY` — the Google Gemini API key.

   Add both variables to every Vercel environment you plan to use (Production, Preview, and/or Development). Do not add `PORT`; Vercel assigns the function port automatically. Never upload `.env` or put secrets in `VITE_` variables.
3. In MongoDB Atlas **Security → Network Access**, allow connections from Vercel. Atlas does not provide a fixed outbound IP for all Vercel plans; a broad `0.0.0.0/0` rule may be required, so use a strong, rotated database password and a least-privilege database user if you choose that option.
4. Deploy. The existing `vercel.json` builds the frontend into `dist`, routes `/api/*` through `api/index.js` to Express, and sends other paths to the SPA entry point.
5. After changing Vercel environment variables, redeploy so the new values are applied. Test `/api/health`, then try an analysis and confirm it appears in History.

Never put `GEMINI_API_KEY` in a `VITE_` variable or frontend code. Vite variables are included in the browser bundle. For compatibility with existing local setups, the server also accepts `GOOGLE_API_KEY` or the previous `AI_API_KEY` variable name.

## API

All analysis endpoints expect an `X-Client-ID` UUID header. The frontend creates and stores this anonymous browser-scoped ID; it is not an account or login.

- `POST /api/analyze` — multipart form with `jobDescription` and one `resume` PDF. Returns `201 { "analysis": { "_id", "result", ... } }`.
- `GET /api/analyses` — returns up to 50 recent analyses belonging to the current browser ID.
- `GET /api/analyses/:id` — returns one analysis belonging to the current browser ID.
- `GET /api/health` — API process health check.

Invalid PDFs, unreadable PDFs, oversized files, invalid IDs, and upstream AI failures return JSON errors in the form `{ "error": "..." }`.
