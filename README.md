# WAKE Protocol

> WAKE Protocol is a responsive challenge-based alarm web application designed for students and people who struggle to wake up, requiring users to complete interactive cognitive disarm missions before an alarm can be dismissed.

WAKE Protocol transforms the traditional alarm experience by combining automated scheduling, customizable repeat days, local audio disarm tracks, persistent PostgreSQL storage, and mental engagement challenges to ensure users are awake and alert before dismissing their alarms.

**Live site:** [Deployed on GitHub Pages](https://kumaarrkkshitij.github.io/WAKE_PROTOCOL/)  
**API:** [Hosted on Render](https://wake-protocol-api.onrender.com)  
**Database:** PostgreSQL on Render  
**Demo video:** [Watch Demo Video](https://drive.google.com/file/d/1u1zSQEoz100tsThk0LCkOj0PRXYvQbjs/view?usp=sharing)  
**Presentation & Resources:** [View Presentation (PPT) & Resources](https://drive.google.com/drive/folders/1Z3FKXqXcQdL4C_9v0Fm5ip3hmv3RkaOU?usp=sharing)  

> **Current development status:** Completed full-stack application. The React/Vite frontend communicates with an Express REST API backed by a PostgreSQL database, with full support for local fallback demo mode.

![WAKE Protocol](docs/assets/Square%20image_WAKE%20PROTOCOL.png)

---

## What it does

WAKE Protocol provides a structured, responsive alarm experience with:

- **Dynamic WAKE HUD Dashboard:** Displays current local time, next scheduled alarm calculation (accounting for time, AM/PM, repeat schedule, and active status), an 8-hour target sleep window calculation, and real-time wake-up consistency stats.
- **Automatic Alarm Triggering:** Real-time client-side detection that continuously monitors scheduled alarm times against the current clock and repeat days. Uses session storage (`wakeTriggeredAlarm`) to prevent the same alarm occurrence from triggering multiple times.
- **Full Alarm CRUD Management:** View, create, edit, delete, and enable/disable alarms seamlessly through persistent REST API communication.
- **Chronological Sorting & Categorized Filtering:** The backend retrieves alarms ordered by `created_at DESC`, while `ManageAlarms` sorts displayed alarms chronologically by time and filters by **All**, **Workdays** (Mon–Fri), **Weekend** (Sat–Sun), and **Inactive** (`enabled = false`).
- **Flexible Alarm Configuration (`AlarmForm`):** Set custom alarm names, target times, AM/PM period, repeat days (`M`, `T`, `W`, `TH`, `F`, `SA`, `SU`), challenge type (**Math** or **Typing**), and local alarm music selection.
- **Interactive Disarm Missions:** Prevents passive alarm dismissal by requiring users to solve cognitive challenges during an active alarm:
  - **Math Mission:** Presents randomized math equations (e.g., `12 + 8 = ?`) drawn from a backend pool of 400 math problems.
  - **Typing Mission:** Requires users to accurately type inspirational phrases drawn from a backend pool of 400 phrases.
- **Active Alarm Experience (`ActiveAlarm`):** Plays user-selected audio tracks from IndexedDB, displays disarm mission status, validates disarm responses, rejects incorrect answers, records completion outcomes to `localStorage`, and stops audio playback upon success. If audio finishes before completion, the alarm outcome is recorded as missed.
- **Local Audio Storage via IndexedDB:** Stores audio files directly in browser-local IndexedDB (`wakeProtocolDB`, `alarmMusic` store) associated with alarm IDs, keeping the PostgreSQL database lightweight.
- **Wake-up Consistency Tracker:** Tracks historical alarm outcomes over a 7-day chronological streak display (left to right) and records personal best streak metrics.
- **Responsive "Stark Protocol" Interface:** Dark, high-contrast, futuristic visual aesthetic optimized with a fixed phone preview container (`390 × 844`) on desktop screens and a mobile-native presentation.

---

## Disarm Missions

Each alarm requires the completion of one of two disarm mission types before it can be turned off:

### Math Mission
The user must solve the displayed mathematical equation before the alarm can be dismissed. If an incorrect answer is entered, the input clears, the alarm continues sounding, and dismissal remains blocked.

### Typing Mission
The user must correctly reproduce a displayed inspirational phrase before the alarm can be dismissed. The text input must match the requested string to silence the alarm.

Disarm missions retrieve the complete pool of 400 challenges from the backend (`/api/challenges/math/all` or `/api/challenges/typing/all`), store a shuffled copy in `sessionStorage` (`wakeMathChallengePool` / `wakeTypingChallengePool`), and track used challenges per alarm (`wakeUsedMathChallenges_${alarmId}` / `wakeUsedTypingChallenges_${alarmId}`) to avoid repeating questions during a session. Single random challenges can also be fetched via `/api/challenges/math` and `/api/challenges/typing`.

---

## Built with

- **Frontend:**
  - React 18
  - Vite 6
  - JavaScript (ES6+)
  - Vanilla CSS (Custom "Stark Protocol" design system)
  - HTML5 & Browser IndexedDB (`wakeProtocolDB`)
- **Backend & Database:**
  - Node.js & Express.js REST API
  - PostgreSQL Database (connected via `pg` connection pool)
  - Parameterized SQL queries (`alarmsRepo.js`)
  - Server-side data validation
  - CORS & `dotenv` environment configuration
- **DevOps & Deployment:**
  - **Frontend Hosting:** GitHub Pages
  - **Backend & DB Hosting:** Render (Express Web Service + Render PostgreSQL)
  - **CI/CD:** GitHub Actions (`.github/workflows/deploy-pages.yml`)

---

## REST API Reference

The Express backend exposes the following RESTful API endpoints:

### System & Health Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/healthz` | Process liveness check (returns `{ ok: true }`). |
| `GET` | `/readyz` | Database readiness check (verifies PostgreSQL connection). |

### Alarm Management Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/alarms` | Retrieve all stored alarms ordered by `created_at DESC`. |
| `GET` | `/api/alarms/:id` | Retrieve a single alarm by ID. |
| `POST` | `/api/alarms` | Create a new alarm (includes server-side field validation). |
| `PUT` | `/api/alarms/:id` | Update an existing alarm by ID. |
| `DELETE` | `/api/alarms/:id` | Delete an alarm by ID. |

### Challenge Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/challenges/math` | Returns a random math question and answer pair. |
| `GET` | `/api/challenges/typing` | Returns a random typing challenge phrase. |
| `GET` | `/api/challenges/math/all` | Returns the complete pool of 400 math challenges. |
| `GET` | `/api/challenges/typing/all` | Returns the complete pool of 400 typing challenges. |

---

## Database Schema

Persistent alarm data is stored in PostgreSQL using the primary `alarms` table:

```sql
CREATE TABLE IF NOT EXISTS alarms (
  id             SERIAL PRIMARY KEY,
  time           TEXT        NOT NULL,
  period         TEXT        NOT NULL CHECK (period IN ('AM', 'PM')),
  name           TEXT        NOT NULL,
  repeat_days    TEXT[]      NOT NULL DEFAULT '{}',
  challenge_type TEXT        NOT NULL CHECK (challenge_type IN ('Math', 'Typing')),
  music          TEXT        NOT NULL DEFAULT '',
  enabled        BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS alarms_enabled_idx
  ON alarms (enabled);
```

---

## Demo mode

This repository can run in two ways, chosen by the `VITE_USE_MOCK_API` environment variable at **build** time.

**Demo mode is a fallback and testing feature.** Setting `VITE_USE_MOCK_API=false` connects the frontend directly to the live Express API and PostgreSQL database.

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage` and `mockApi.js`. No server or database required. |
| `false` | The client makes real HTTP requests via `httpApi.js` (`fetch`) to the Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL data. |

GitHub Pages serves static assets, so the API and database run on Render:

| Piece | Provider | Deployment URL / Connection |
| --- | --- | --- |
| **Frontend Client** | GitHub Pages | `https://kumaarrkkshitij.github.io/WAKE_PROTOCOL/` |
| **Express API** | Render | `https://wake-protocol-api.onrender.com` |
| **Database** | Render PostgreSQL | Connected via `DATABASE_URL` environment variable |

---

## Setup and installation

### Requirements
- **Node.js** v20 or later
- **PostgreSQL** 16 or later (for full stack — not needed in demo mode)

### Clone
```bash
git clone https://github.com/kumaarrkkshitij/WAKE_PROTOCOL.git
cd WAKE_PROTOCOL
```

### Option A — Client only (demo mode, no database needed)
```bash
cd client
npm install
cp .env.example .env    # VITE_USE_MOCK_API=true by default
npm run dev             # http://localhost:5173
```
Data is saved to `localStorage` in your browser. Nothing is sent to a server.

### Option B — Full stack (Express + PostgreSQL)

#### 1. Database
Create a local PostgreSQL database:
```bash
psql -U postgres -c "CREATE DATABASE wake_protocol;"
```

#### 2. Server
```bash
cd server
npm install
cp .env.example .env
```
Edit `server/.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/wake_protocol
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
```
Create the tables and load sample data:
```bash
npm run db:reset    # runs schema.sql then seed.sql
```

#### 3. Client
```bash
cd ../client
npm install
cp .env.example .env
```
Edit `client/.env`:
```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3000
```

### Running locally

**API server (in `server/`):**
```bash
npm run dev
# Listening on http://localhost:3000
# GET /healthz  →  { "ok": true }
# GET /readyz   →  { "ok": true, "db": "up" }
```

**Frontend (in `client/`):**
```bash
npm run dev
# Open http://localhost:5173
```

### Verification Commands
Test the API directly to verify server process and database status:

```bash
curl http://localhost:3000/healthz          # Process liveness check
curl http://localhost:3000/readyz           # PostgreSQL connectivity check
curl http://localhost:3000/api/alarms       # Fetch alarms list
curl http://localhost:3000/api/challenges/math     # Test math challenge endpoint
curl http://localhost:3000/api/challenges/typing   # Test typing challenge endpoint
```

---

## Environment variables

Environment files (`.env`) are ignored by Git. A root `.env.example` template is provided in the repository root. For local execution, environment variables can be placed in `server/.env` and `client/.env`.

| Variable Name | Location | Description |
| --- | --- | --- |
| `DATABASE_URL` | `server/.env` | PostgreSQL connection URI (e.g., `postgres://user:pass@host:5432/dbname`). |
| `CORS_ORIGINS` | `server/.env` | Comma-separated allowed origins (e.g., `https://kumaarrkkshitij.github.io,http://localhost:5173`). |
| `NODE_ENV` | `server/.env` | Set to `production` in host environments. |
| `PORT` | `server/.env` | Port assigned by the host (defaults to `3000`). |
| `VITE_USE_MOCK_API` | `client/.env` (build-time) | Set to `false` for production/live API; unset or `true` for demo mode. |
| `VITE_API_BASE_URL` | `client/.env` (build-time) | Base URL of the deployed Express API (e.g., `https://wake-protocol-api.onrender.com`). |

> **Security Note:** All `VITE_` variables are compiled into client JS bundles and are public. Never store secret keys, passwords, or connection strings in client environment variables.

---

## Deploying

### 1. Client to GitHub Pages
Automated via `.github/workflows/deploy-pages.yml` on every push to `main`:

1. **Repository Settings:** Go to **Settings > Pages > Build and deployment > Source: GitHub Actions**.
2. **Environment Variables:** Under **Settings > Secrets and variables > Actions > Variables**, configure:
   - `VITE_USE_MOCK_API` = `false`
   - `VITE_API_BASE_URL` = `https://wake-protocol-api.onrender.com`

### 2. Express API & PostgreSQL to Render
- **Database:** Create a PostgreSQL instance on Render. Obtain the Connection String (`DATABASE_URL`). Run `npm run db:schema` (or execute `server/db/schema.sql`) against the hosted database.
- **Web Service:** Create a Web Service connected to the GitHub repository pointing to the `server/` directory. Set environment variables on Render:
  - `DATABASE_URL` = Render PostgreSQL connection string
  - `CORS_ORIGINS` = `https://kumaarrkkshitij.github.io`
  - `NODE_ENV` = `production`

---

## Project structure

```text
WAKE_PROTOCOL/
│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml       # GitHub Actions CI/CD deployment workflow
│
├── client/                        # React Frontend (Vite)
│   ├── src/
│   │   ├── api/
│   │   │   ├── httpApi.js         # Real fetch implementation to Express API
│   │   │   ├── mockApi.js         # Simulated localStorage API implementation
│   │   │   ├── seed.json          # Default alarm seed data for mock mode
│   │   │   └── index.js           # API selector based on VITE_USE_MOCK_API
│   │   ├── components/
│   │   │   └── BottomNav.jsx      # Navigation bar for Home and Manage screens
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Main HUD dashboard, live clock, next alarm & streak
│   │   │   ├── ManageAlarms.jsx   # Alarm list view, filtering, sorting, toggles
│   │   │   ├── AlarmForm.jsx      # Create/Edit alarm form component
│   │   │   └── ActiveAlarm.jsx    # Active alarm overlay & disarm challenge handler
│   │   ├── utils/
│   │   │   └── alarmMusic.js      # IndexedDB helper (wakeProtocolDB / alarmMusic)
│   │   ├── App.jsx                # Main layout and view state management
│   │   ├── main.jsx               # React DOM entrypoint
│   │   └── styles.css             # Stark Protocol design system stylesheet
│   ├── index.html                 # Main HTML page entrypoint
│   ├── package.json               # Client dependencies (React 18, Vite 6)
│   └── vite.config.js             # Vite build configuration
│
├── server/                        # Express.js Backend API
│   ├── db/
│   │   ├── pool.js                # PostgreSQL connection pool configuration
│   │   ├── run.js                 # Script to execute database queries
│   │   ├── schema.sql             # SQL schema definition for alarms table
│   │   └── seed.sql               # Initial database seed records
│   ├── alarmsRepo.js              # Repository pattern database queries (parameterized SQL)
│   ├── challenges.js              # 400 Math and 400 Typing challenge dataset pools
│   ├── server.js                  # Express API routes, CORS, validation, health checks
│   ├── Dockerfile                 # Container deployment configuration
│   └── package.json               # Backend dependencies (Express, pg, dotenv, cors)
│
├── docs/                          # Documentation assets and screenshots
│   └── assets/
│       ├── Square image_WAKE PROTOCOL.png
│       ├── active-math.png
│       ├── active-typing.png
│       ├── create:edit-alarm.png
│       ├── home.png
│       └── manage-alarms.png
│
├── .env.example                   # Root environment variable template
├── .gitignore                     # Git ignore rules
├── AI-USAGE.md                    # Record of AI assistance and development usage
├── LICENSE                        # MIT License
├── README.md                      # Master project documentation
└── compose.yml                    # Docker Compose local stack setup
```

---

## Architecture

```text
                               WAKE Protocol Architecture
                                           │
                                           ▼
                 ┌──────────────────────────────────────────────────┐
                 │                  GitHub Pages                    │
                 │             React 18 + Vite Frontend             │
                 └─────────────────────────┬────────────────────────┘
                                           │
                        ┌──────────────────┴──────────────────┐
                        │                                     │
                        │ HTTPS REST API                      │ IndexedDB
                        ▼                                     ▼
     ┌────────────────────────────────────┐      ┌──────────────────────────┐
     │               Render               │      │      Client Browser      │
     │      Express.js Backend API        │      │    IndexedDB Audio Store │
     └──────────────────┬─────────────────┘      └──────────────────────────┘
                        │
                        │ Parameterized SQL ($1, $2)
                        ▼
     ┌────────────────────────────────────┐
     │          Render PostgreSQL         │
     │           Alarms Table             │
     └────────────────────────────────────┘
```

### Key Architectural Decisions

1. **No-Login Simplicity:** Eliminates authentication friction to focus entirely on core alarm usability and cognitive wake-up interactions.
2. **Decoupled Local Audio Storage:** Custom audio tracks are stored in browser IndexedDB rather than sent as binary blobs to PostgreSQL, preserving lightweight database performance.
3. **Parameterized SQL Queries:** Prevents SQL injection vulnerabilities by enforcing `$1, $2, ...` query placeholders across `alarmsRepo.js`.
4. **Environment-Based API Switching:** Dual `httpApi.js` / `mockApi.js` abstraction allows instant switching between offline development, demo mode, and live production server environments.

---

## What I would do next

- **User Accounts & Cloud Syncing:** Add authentication to synchronize alarms and custom music across multiple devices.
- **Cloud Audio Hosting:** Support cloud storage for alarm disarm music tracks.
- **Expanded Disarm Mission Types:** Introduce pattern memory, reaction timing, logic puzzles, or physical movement/QR-code scanning challenges.
- **Web Push Notifications & PWA Support:** Implement Progressive Web App service workers and browser notifications for background alarm execution.
- **Advanced Wake-up Analytics:** Provide weekly/monthly reports on average completion time, streak consistency, and disarm challenge success rates.

---

## Author

**Kkshitij Kumaarr**  
[GitHub Repository](https://github.com/kumaarrkkshitij/WAKE_PROTOCOL)  
CS-401 — 6APSI  
Final Project: WAKE Protocol

---

## Licence

MIT License. See [LICENSE](LICENSE) for full license text.
