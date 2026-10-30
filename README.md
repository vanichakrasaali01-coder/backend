# Northbridge College Management Website

Full-stack React/Vite college website with Vercel serverless APIs and Supabase PostgreSQL.

## Local setup
1. Install Node.js 20+.
2. Run `npm install` in the repository root and `cd frontend && npm install`.
3. Copy `.env.example` to `.env.local` and add the public Supabase values.
4. Run `npm run dev` for the frontend.
5. Apply `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor.
6. Use Supabase dashboard environment variables when running APIs locally or deploying to Vercel.

## Configuration
Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the frontend environment. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and a strong `JWT_SECRET` only in server-side environments. Never commit secret values.

## Vercel
The repository root contains a Vite frontend and serverless REST handlers under `api/`. Import the repository in Vercel, configure environment variables, and deploy. Vercel cannot run a continuously executing Express server; this project uses isolated Node-compatible API handlers.

## Supabase
Run the SQL migration before connecting the application. Public content policies are included; server-side administrative operations use the service-role key and remain protected by application JWT authorization.

## GitHub
Connect the repository URL supplied for this project. Push `main` only after confirming that `.env*` files are ignored.
