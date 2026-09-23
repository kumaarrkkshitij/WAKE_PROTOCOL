# WAKE Protocol

> WAKE Protocol is a responsive alarm web application designed for students and people who have difficulty waking up, requiring users to complete a challenge before dismissing an alarm.
> [START-HERE.md](START-HERE.md).

One sentence saying what this does and who it is for.

**Live site:** Not deployed yet
**API:** Not available yet
**Demo video:** Not available yet

>Current development status: This Week 1 increment focuses on the React/Vite frontend and the core WAKE Protocol interface. Backend, database, and full alarm functionality are planned for subsequent development.

<!-- > **This deployment is running in demo mode.** The interface is real; the backend
> is simulated in your browser so the site works without a server. See
> [Demo mode](#demo-mode) below. Delete this quote once your API is live. -->

![A screenshot of the main screen](docs/assets/screenshot.png)

## What it does

# WAKE Protocol

WAKE Protocol is a responsive alarm web application designed for students and people who have difficulty waking up, requiring users to complete a challenge before dismissing an alarm.

**Live site:** Not deployed yet  
**API:** Not available yet  
**Demo video:** Not available yet

> **Current development status:** This Week 1 increment focuses on the React/Vite frontend and the core WAKE Protocol interface. Backend, database, and full alarm functionality are planned for subsequent development.

## What it does

  WAKE Protocol provides a structured alarm experience with:

  - Home dashboard showing upcoming alarm information and wake-up statistics
  - Multiple alarm management
  - Enable and disable alarms
  - Alarm filtering by category and status
  - Create and edit alarm configurations
  - Custom alarm names
  - Repeat-day selection
  - Local audio file selection for alarm music
  - Math disarm missions
  - Typing disarm missions
  - Active Alarm screen for completing the required challenge
  - Responsive interface for desktop and mobile-sized screens

  ## Disarm Missions

  Each alarm can require one of two challenge types:

  ### Math Mission

  The user must solve the displayed mathematical equation before the alarm can be dismissed.

  ### Typing Mission

  The user must correctly type the displayed phrase before the alarm can be dismissed.

  Full challenge validation and alarm triggering will be implemented in a later increment.

## Built with

- React 18
- Vite 6
- JavaScript
- CSS
- HTML

The current increment is focused on the frontend interface. The project repository also contains the template structure for the Express and PostgreSQL backend that will be developed in later increments.

## Demo mode

This repository can run two ways, chosen by one environment variable at **build**
time.

**Demo mode is the default.** Only the exact string `false` turns it off, so a
forgotten or mistyped variable leaves you on the simulated backend with a visible
notice rather than on a silently broken build.

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. This is what the template ships with, so the GitHub Pages link works on day one. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL. |

**Demo mode is a starting point and a fallback, not a finished project.** Your
finals submission is all three pieces deployed and talking to each other. Demo
mode is there so you can build the interface in week one before the API exists,
and so you have something to show if a free tier is asleep during your demo.

GitHub Pages serves files and cannot run Node, so the API and the database can
never live there. They go somewhere else:

| Piece | Options |
| --- | --- |
| **API** | Render, Railway, Fly.io, Koyeb, a VPS, or [self-hosted behind a tunnel](../content/extending-your-app/11-self-hosting.md) |
| **Database** | Neon, Supabase, Railway, Aiven, or your own PostgreSQL |

`content/extending-your-app/` in your course workspace walks through all of it.
Page 10 is the decision page if you do not know which to pick.

## Running it yourself

**The client only, in demo mode.** No database needed.

    cd client
    npm install
    cp .env.example .env        # VITE_USE_MOCK_API stays true
    npm run dev                 # http://localhost:5173

**The whole stack.** Needs a PostgreSQL, either local or hosted.

    # 1. the database
    docker run --name my-pg -e POSTGRES_PASSWORD=devpassword \
      -e POSTGRES_DB=haunted -p 5432:5432 -d postgres:17

    # 2. the API
    cd server
    npm install
    cp .env.example .env        # check DATABASE_URL
    npm run db:reset            # creates the tables and adds sample rows
    npm run dev                 # http://localhost:3000

    # 3. the client, in another terminal
    cd client
    npm install
    cp .env.example .env
    # set VITE_USE_MOCK_API=false
    npm run dev

Check the API on its own before you blame the client:

    curl http://localhost:3000/healthz     # is the process alive
    curl http://localhost:3000/readyz      # is the database reachable
    curl http://localhost:3000/api/sightings

## Environment variables

None of these are committed. `.env.example` in each folder lists them with
placeholder values.

| Name | Where | What it is |
| --- | --- | --- |
| `DATABASE_URL` | server | PostgreSQL connection string. Contains a password |
| `CORS_ORIGINS` | server | comma-separated origins allowed to call the API |
| `NODE_ENV` | server | `production` on your host |
| `PORT` | server | **set by the host**, do not set it yourself |
| `VITE_USE_MOCK_API` | client, at build time | only `false` turns demo mode off; unset means on |
| `VITE_API_BASE_URL` | client, at build time | your API's public URL, no trailing slash |

Every `VITE_` value is compiled into the built JavaScript and is **public**.
Never put a key, a password or a connection string in one.

## Deploying

**Client, to GitHub Pages.** Already wired up in
`.github/workflows/deploy-pages.yml`. Two one-time steps:

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.** Without
   this the workflow goes green and publishes nothing.
2. Nothing else, until your API is live. Demo mode is the default, so the first
   deploy works on its own. When the API is up, add `VITE_USE_MOCK_API` = `false`
   and `VITE_API_BASE_URL` under **Settings > Secrets and variables > Actions >
   Variables**, then re-run the workflow.

The repository must be **public** for Pages to serve it on a free account.

**API and database.** Not automated here, because most hosts deploy straight from
your repository with no workflow at all. Point your host at the `server/` folder,
set the environment variables in its dashboard, and run `server/db/schema.sql`
once against the hosted database.

## Project structure
WAKE_PROTOCOL/
│
├── .github/
│   └── workflows/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── BottomNav.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ManageAlarms.jsx
│   │   │   ├── AlarmForm.jsx
│   │   │   └── ActiveAlarm.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   └── package.json
│
├── server/
│
├── docs/
│
├── .env.example
├── .gitignore
├── AI-USAGE.md
├── LICENSE
├── README.md
├── START-HERE.md
└── compose.yml

## Architecture

The current increment consists primarily of a React/Vite client. React components are used to render the Home, Manage Alarms, Alarm Configuration, and Active Alarm screens, while CSS provides the responsive visual design.

The project is structured to support a future Express API and PostgreSQL database. Backend integration will be added in later development increments so alarm data can be persisted and the complete application can operate as a full-stack system.

## What I would do next

- Connect alarm creation, editing, deletion, and status changes to persistent application data.
- Implement the Express API and PostgreSQL database for the full-stack application.
- Implement real alarm scheduling, audio playback, and Math/Typing challenge validation.

## Author

Kkshitij Kumaarr
(link)
CS-401 — 6APSI
Final Project: WAKE Protocol

## Licence

MIT, see [LICENSE](LICENSE). Put your own name in it.
