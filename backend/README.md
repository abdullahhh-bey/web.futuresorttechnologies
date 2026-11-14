# FutureSort FastAPI backend

## Configure Supabase

1. In Supabase, open **Project Settings -> Database -> Connection string -> Session pooler** and copy the URI. Use the pooler when the deployment host does not support IPv6.
2. Paste the URI into `backend/.env` as `DATABASE_URL`. Keep the `.env` file private and never use a Supabase `service_role` key here; this backend connects directly to Postgres.
3. Keep the URI format supplied by Supabase (`postgresql://...`). The app selects the installed Psycopg 3 driver automatically.
4. If the frontend is hosted on another origin, add that exact origin to `CORS_ORIGINS` in `backend/.env`.

The Project URL (`SUPABASE_URL`) is not used for a direct Postgres connection. It is included in the environment template for reference. The database password is only required inside `DATABASE_URL`.

## Install and run

From the repository root in PowerShell:

```powershell
python -m venv backend\.venv
backend\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
Set-Location backend
alembic upgrade head
uvicorn app.main:app --reload
```

The API listens on `http://127.0.0.1:8000`. Interactive endpoint documentation is at `/docs`; `GET /health` checks that the service is running. Vite proxies local `/api` requests to this API. When deploying the frontend separately, set `VITE_API_BASE_URL` to the backend origin before building.

## Endpoints

- `POST /api/v1/inquiries`: contact and engagement form submissions, distinguished by `source`.
- `POST /api/v1/demo-requests`: free demo class registrations.

Database tables are created by the Alembic migration. Non-student demo submissions always store `university` and `degree_program` as `NULL`.
