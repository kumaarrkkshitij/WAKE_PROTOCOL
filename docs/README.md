# WAKE Protocol

WAKE Protocol is a responsive, challenge-based alarm web application designed for students and people who have difficulty waking up. Instead of allowing an alarm to be dismissed immediately, the user must complete a selected challenge before the alarm can be dismissed, providing a more interactive wake-up experience.

> **Current development status:** **Completed full-stack application.** The project includes a React/Vite frontend, Express REST API, PostgreSQL database, automatic alarm scheduling and triggering, Math and Typing challenge systems, browser-local alarm music storage, and production deployment.

**Live site:** https://kumaarrkkshitij.github.io/WAKE_PROTOCOL/
**API:** https://wake-protocol-api.onrender.com
**GitHub repository:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL
**Demo video:** https://drive.google.com/file/d/1u1zSQEoz100tsThk0LCkOj0PRXYvQbjs/view?usp=sharing
**Presentation & Resources:** https://drive.google.com/drive/folders/1Z3FKXqXcQdL4C_9v0Fm5ip3hmv3RkaOU?usp=sharing

---

## 1. Overview

WAKE Protocol is an alarm application designed to help users who have difficulty waking up, particularly students and people with morning commitments.

Instead of allowing an alarm to be dismissed immediately, WAKE Protocol requires the user to complete a disarm challenge. The available challenge types are **Math** and **Typing**.

The completed application includes:

* Persistent alarm storage through PostgreSQL.
* An Express REST API for alarm management.
* Multiple alarms with customizable schedules.
* Repeat-day configuration.
* Math and Typing challenges.
* Automatic alarm scheduling and triggering.
* Local alarm music stored in browser IndexedDB.
* Challenge rotation to reduce immediate repetition.
* Wake-up consistency tracking.
* Workday, weekend, inactive, and all-alarm filters.
* Responsive mobile-oriented interface.
* Production deployment through GitHub Pages and Render.

---

## 2. Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express
* PostgreSQL
* `pg`
* CORS
* Helmet

### Browser Storage

* IndexedDB for local alarm music
* Session Storage for alarm-trigger protection and challenge tracking
* Local browser state for client-side application behavior

### Deployment

* **GitHub Pages** — React frontend
* **Render** — Express API
* **Render PostgreSQL** — Production database
* **GitHub Actions** — Frontend deployment workflow

---

## 3. Features

### Home Dashboard

The Home screen provides a quick overview of the user's wake-up schedule.

It displays:

* WAKE Protocol branding.
* Current local time.
* Next scheduled alarm.
* Alarm schedule information.
* Wake-up consistency.
* Target sleep information.
* Navigation to the main application sections.

The next alarm is calculated dynamically using the enabled alarms, scheduled times, and repeat days.

### Manage Alarms

The Manage Alarms screen provides complete alarm management.

Users can:

* View multiple alarms.
* Create new alarms.
* Edit existing alarms.
* Delete alarms.
* Enable or disable alarms.
* Filter alarms.
* View the dynamically calculated next alarm.

Available filters include:

* **All**
* **Workdays**
* **Weekend**
* **Inactive**

Alarm records are retrieved and modified through the Express API and PostgreSQL database.

### Create and Edit Alarm

The alarm configuration interface allows users to set:

* Alarm time.
* AM/PM period.
* Alarm name.
* Repeat days.
* Challenge type.
* Local alarm music.

The same form component is used for both creating and editing alarms.

### Math Mission

The Math Mission presents the user with a mathematical challenge.

The user must:

1. View the generated equation.
2. Enter an answer using the numeric keypad.
3. Submit the answer.
4. Correctly complete the required challenges before the alarm is dismissed.

The application includes a pool of **400 Math challenges**.

### Typing Mission

The Typing Mission presents the user with a phrase that must be reproduced correctly.

The user must:

1. Read the displayed phrase.
2. Enter the phrase.
3. Submit the response.
4. Complete the required challenge before the alarm is dismissed.

The application includes a pool of **400 Typing challenges**.

### Challenge Rotation

Math and Typing challenges are rotated using challenge pools and session-based tracking.

This helps prevent the same challenge from being immediately repeated during an alarm session.

### Active Alarm

When an alarm activates, the Active Alarm screen takes over the application flow.

The user cannot simply dismiss the alarm.

The application:

* Loads the assigned challenge type.
* Presents the required challenge.
* Tracks challenge progress.
* Validates the user's answer.
* Keeps the alarm active after incorrect answers.
* Stops the alarm after successful completion.
* Displays the final completion state.

The completed state displays:

**ALARM DISENGAGED**

**WAKE PROTOCOL COMPLETE**

A full **3/3** challenge progress display is used for the active alarm flow.

### Automatic Alarm Scheduling

Enabled alarms are checked against the current local date and time.

The application determines when a scheduled alarm should activate based on:

* Alarm time.
* AM/PM period.
* Repeat days.
* Enabled/disabled state.

Session storage is used to prevent the same alarm occurrence from being triggered multiple times.

### Local Alarm Music

Users can select a local audio file when configuring an alarm.

The selected music is stored in browser IndexedDB rather than uploaded to the backend.

This allows alarm audio to remain local to the browser while the alarm configuration itself is stored in the database.

### Wake-Up Consistency

The Home dashboard tracks wake-up completion information and provides a consistency view based on completed alarm sessions.

---

## 4. Application Architecture

The application uses a separated frontend/backend architecture:

```text
React / Vite
     │
     │ REST API
     ▼
Express / Node.js
     │
     │ PostgreSQL
     ▼
PostgreSQL Database

Browser
   │
   └── IndexedDB
       └── Local alarm music
```

The frontend is deployed through GitHub Pages.

The Express API is deployed through Render.

The PostgreSQL database is hosted through Render and accessed by the Express API.

The React frontend does not directly connect to PostgreSQL.

---

## 5. API

The deployed Express API provides the following endpoints.

### Health Check

```text
GET /healthz
```

Checks whether the API process is running.

### Database Readiness

```text
GET /readyz
```

Checks whether the API can communicate with PostgreSQL.

### Get All Alarms

```text
GET /api/alarms
```

Returns all stored alarms.

### Get One Alarm

```text
GET /api/alarms/:id
```

Returns an individual alarm by ID.

### Create an Alarm

```text
POST /api/alarms
```

Creates a new alarm after server-side validation.

### Update an Alarm

```text
PUT /api/alarms/:id
```

Updates an existing alarm after server-side validation.

### Delete an Alarm

```text
DELETE /api/alarms/:id
```

Deletes an existing alarm.

### Math Challenges

```text
GET /api/challenges/math
```

Returns the available Math challenges.

### Typing Challenges

```text
GET /api/challenges/typing
```

Returns the available Typing challenges.

---

## 6. API Validation and Security

The Express API performs server-side validation before storing alarm data.

Validation includes:

* Required alarm time.
* Valid `HH:MM` time format.
* Valid `AM` or `PM` period.
* Required alarm name.
* Alarm name length limits.
* Valid repeat-day values.
* Valid `Math` or `Typing` challenge type.

Additional security measures include:

* Parameterized PostgreSQL queries.
* Restricted CORS origins.
* Helmet security headers.
* Limited JSON request body size.
* Generic client-facing error responses.
* Environment-based database configuration.
* No production database credentials committed to the repository.

The project does not use user accounts or authentication because multi-user authentication was outside the approved project scope.

---

## 7. Database

WAKE Protocol uses PostgreSQL for persistent alarm storage.

### Database Table

The primary database table is:

```text
alarms
```

Its fields include:

```text
id
time
period
name
repeat_days
challenge_type
music
enabled
created_at
```

The database includes constraints ensuring that:

* `period` is either `AM` or `PM`.
* `challenge_type` is either `Math` or `Typing`.

An index is also used for the enabled/disabled alarm state.

### Database Schema

The database structure is defined in:

```text
server/db/schema.sql
```

### Local Database Setup

For local development, PostgreSQL can be configured through the `DATABASE_URL` environment variable.

The `.env` file is intentionally excluded from version control.

A shareable configuration template is provided through:

```text
.env.example
```

---

## 8. Setup and Installation

### Requirements

* **Node.js** v20 or later
* **PostgreSQL** 16 or later (for full stack — not needed in demo mode)

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

### Running Locally

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

---

## 9. Production Build

To create a production frontend build:

```bash
cd client
npm run build
```

The generated files are placed in:

```text
client/dist/
```

The production frontend uses environment-based configuration for the deployed API URL.

---

## 10. Testing and Verification

The application was tested throughout development and verified after the major features were integrated.

### Backend Testing

The Express API was tested using `curl`.

Testing included:

* API health check.
* Database readiness check.
* Retrieve all alarms.
* Create an alarm.
* Retrieve an alarm by ID.
* Retrieve a nonexistent alarm.
* Update an alarm.
* Delete an alarm.
* Attempt to delete a nonexistent alarm.
* Server-side validation.

### Frontend Testing

The application was tested across the main user flow:

* Home.
* Manage Alarms.
* Create Alarm.
* Edit Alarm.
* Enable/disable alarm.
* Delete alarm.
* Alarm filtering.
* Next-alarm calculation.
* Automatic alarm triggering.
* Math challenge flow.
* Typing challenge flow.
* Correct and incorrect answers.
* Alarm completion state.
* Missed alarm handling.
* Local alarm music.
* Responsive mobile-oriented layout.

### Deployment Testing

The deployed frontend and backend were also tested to verify communication between:

```text
GitHub Pages
      ↓
Express API
      ↓
Render PostgreSQL
```

The production application was verified end-to-end using the deployed environment.

---

## 11. Project Structure

The important project folders and files are organized as follows:

```text
WAKE_PROTOCOL/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── httpApi.js
│   │   │   ├── index.js
│   │   │   ├── mockApi.js
│   │   │   └── seed.json
│   │   │
│   │   ├── components/
│   │   │   ├── DemoNotice.jsx
│   │   │   └── BottomNav.jsx
│   │   │
│   │   ├── data/
│   │   │   └── challenges.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ManageAlarms.jsx
│   │   │   ├── AlarmForm.jsx
│   │   │   └── ActiveAlarm.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── alarmMusic.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── db/
│   │   ├── schema.sql
│   │   ├── run.js
│   │   └── pool.js
│   │
│   ├── alarmsRepo.js
│   ├── challenges.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
│
├── docs/
├── .env.example
├── .gitignore
├── AI-USAGE.md
├── LICENSE
├── README.md
└── compose.yml
```

### Client

The `client/` directory contains the React/Vite frontend.

### API Layer

The frontend API layer provides the interface between React and the Express backend.

The application supports the deployed HTTP API and a local mock API fallback for development/demo purposes.

### Components

Reusable React components are stored in:

```text
client/src/components/
```

### Pages

The primary application screens are stored in:

```text
client/src/pages/
```

These include:

* `Home.jsx`
* `ManageAlarms.jsx`
* `AlarmForm.jsx`
* `ActiveAlarm.jsx`

### Utilities

Browser-local alarm music functionality is handled through:

```text
client/src/utils/alarmMusic.js
```

### Server

The `server/` directory contains the Express backend and PostgreSQL integration.

Important files include:

```text
server/server.js
```

Contains the Express application, API routes, validation, CORS configuration, security middleware, challenge endpoints, and error handling.

```text
server/alarmsRepo.js
```

Contains PostgreSQL alarm database operations.

```text
server/challenges.js
```

Contains the Math and Typing challenge data used by the backend.

```text
server/db/schema.sql
```

Defines the PostgreSQL database structure.

---

## 12. Screenshots

Screenshots of the application are stored in the project assets/documentation.

### Home Dashboard & Manage Alarms

<table width="100%">
  <tr>
    <td align="center" width="50%">
      <b>Home Dashboard</b><br/><br/>
      <img src="assets/home.png" alt="WAKE Protocol Home Screen" width="320"/>
    </td>
    <td align="center" width="50%">
      <b>Manage Alarms</b><br/><br/>
      <img src="assets/manage-alarms.png" alt="WAKE Protocol Manage Alarms Screen" width="320"/>
    </td>
  </tr>
</table>

### Create & Edit Alarm, Active Math & Typing Missions

<table width="100%">
  <tr>
    <td align="center" width="33%">
      <b>Create & Edit Alarm</b><br/><br/>
      <img src="assets/create%3Aedit-alarm.png" alt="WAKE Protocol Create & Edit Alarm Screen" width="280"/>
    </td>
    <td align="center" width="33%">
      <b>Active Alarm — Math</b><br/><br/>
      <img src="assets/active-math.png" alt="WAKE Protocol Math Mission" width="280"/>
    </td>
    <td align="center" width="34%">
      <b>Active Alarm — Typing</b><br/><br/>
      <img src="assets/active-typing.png" alt="WAKE Protocol Typing Mission" width="280"/>
    </td>
  </tr>
</table>

### Presentation Banner

<p align="center">
  <img src="assets/Square%20image_WAKE%20PROTOCOL.png" alt="WAKE Protocol Presentation Banner" width="580"/>
</p>

---

## 13. Deployment

### Frontend

The React/Vite frontend is deployed through:

**GitHub Pages**

Live application:

https://kumaarrkkshitij.github.io/WAKE_PROTOCOL/

### Backend

The Express API is deployed through:

**Render**

API:

https://wake-protocol-api.onrender.com

### Database

The production PostgreSQL database is hosted through:

**Render PostgreSQL**

The database connection is supplied to the Express server through the `DATABASE_URL` environment variable.

The database is not directly exposed to the React frontend.

### GitHub Actions

The frontend deployment is automated through:

```text
.github/workflows/deploy-pages.yml
```

The workflow builds the React/Vite frontend and deploys it to GitHub Pages.

---

## 14. Security and Privacy

WAKE Protocol does not require user accounts, passwords, or personal information.

The application uses:

* Environment variables for database credentials.
* `.gitignore` protection for local `.env` files.
* `.env.example` for shareable configuration.
* Parameterized SQL queries.
* Server-side validation.
* Restricted CORS.
* Helmet security headers.
* Generic server error responses.
* Limited JSON request bodies.
* Browser-local IndexedDB storage for alarm music.

The application does not intentionally collect or store real personal information.

Because authentication and user accounts are outside the project scope, the deployed application should be considered a single-user/client-side experience rather than a multi-user account system.

---

## 15. Development History

### Week 3 — September 28–October 4, 2026

During the final major development stage, the frontend, backend, challenge system, scheduling system, local music storage, and deployment were integrated into the completed application.

The main work completed included:

* Connecting Create Alarm to `POST /api/alarms`.
* Connecting Edit Alarm to `PUT /api/alarms/:id`.
* Connecting Delete Alarm to the backend.
* Connecting alarm enable/disable state to persistent storage.
* Cleaning up frontend/backend field mapping.
* Connecting Home to real alarm data.
* Implementing dynamic next-alarm calculation.
* Adding live local time to Home and Manage Alarms.
* Adding Workdays, Weekend, Inactive, and All filters.
* Adding chronological alarm sorting.
* Implementing automatic alarm scheduling and triggering.
* Preventing duplicate alarm triggering for the same occurrence.
* Implementing browser-local alarm music through IndexedDB.
* Integrating Math and Typing challenges with the backend.
* Adding 400 Math challenges and 400 Typing challenges.
* Implementing challenge pool rotation and session tracking.
* Implementing Math and Typing answer validation.
* Implementing final Active Alarm dismissal behavior.
* Adding the 3/3 Active Alarm challenge progress display.
* Adding successful completion and missed alarm handling.
* Completing the Home → Manage → Alarm Configuration → Active Alarm workflow.
* Removing the temporary Math/Typing preview switch from the final workflow.
* Deploying the frontend, Express API, and PostgreSQL database.
* Configuring GitHub Pages, Render, and GitHub Actions.
* Testing the deployed application end-to-end.
* Updating the README, proposal, mockup documentation, security checklist, weekly reports, and AI usage documentation.

### Week 2 — September 24–27, 2026

During Week 2, development moved from the frontend prototype into backend and database integration.

The main work completed included:

* Setting up PostgreSQL locally.
* Creating the `wake_protocol` database.
* Reworking the starter database schema into an `alarms` table.
* Adding alarm fields, constraints, and an enabled-state index.
* Creating `server/alarmsRepo.js`.
* Implementing alarm CRUD operations.
* Reworking `server/server.js` into the WAKE Protocol alarm API.
* Adding server-side alarm validation.
* Adding API error and 404 handling.
* Configuring CORS and backend environment variables.
* Testing the database connection through `/readyz`.
* Testing the alarm CRUD API using `curl`.
* Connecting Manage Alarms to `GET /api/alarms`.
* Verifying the empty database state.
* Creating a Git commit for the backend and database increment.

The main difficulty was adapting the existing full-stack course template to the WAKE Protocol requirements and connecting PostgreSQL, the Express API, and the React frontend.

### Week 1 — September 20–23, 2026

During Week 1, development focused on establishing the initial WAKE Protocol frontend and user experience.

The main work completed included:

* Reworking the starter React/Vite application.
* Creating the UI/UX design first as a visual reference.
* Building the Home screen.
* Building the Manage Alarms screen.
* Adding reusable bottom navigation.
* Building the Create Alarm and Edit Alarm interfaces.
* Adding alarm configuration controls.
* Building the Active Alarm Math Mission interface.
* Building the Active Alarm Typing Mission interface.
* Adding responsive styling and the futuristic dark/cyan visual design.
* Adding a temporary Math/Typing preview switch for development.
* Updating the README documentation.
* Creating a Git commit for the frontend increment.

The initial implementation used sample data and frontend state while the backend and database were still being planned and developed.

---

## 16. AI Usage

AI tools were used as development support throughout the project.

AI assistance was used for:

* React frontend development.
* UI and responsive styling assistance.
* Troubleshooting frontend implementation issues.
* Connecting and organizing React pages.
* PostgreSQL schema development.
* Backend repository development.
* Express API implementation.
* Server-side validation.
* API testing and debugging.
* Frontend/backend integration.
* Deployment configuration.
* Environment-based API configuration.
* Documentation and project organization.
* Security review and checklist preparation.

AI-generated suggestions were reviewed and adapted during development rather than being treated as an automatic replacement for testing or decision-making.

The detailed record of AI-assisted development is maintained in:

[AI-USAGE.md](AI-USAGE.md)

---

## 17. Future Development

Although the current web application is complete, several areas could be expanded in a future version.

### Native Mobile Application

A native Android/iOS version could provide:

* Native alarm functionality.
* Background alarm execution.
* More reliable notifications.
* Better device audio integration.
* Mobile-specific controls.

### Additional Challenge Types

Future versions could include:

* Memory challenges.
* Pattern recognition.
* Reaction challenges.
* Sequence challenges.
* Visual puzzles.
* Custom user-created challenges.

### AI-Powered Scheduling

A future version could use wake-up history and sleep patterns to recommend healthier alarm schedules.

Potential functionality could include:

* Sleep consistency analysis.
* Estimated sleep debt.
* Personalized alarm recommendations.
* Habit-based scheduling suggestions.

These features are future concepts and are **not part of the current deployed implementation**.

---

## 18. Project Links

**Live Application:**
https://kumaarrkkshitij.github.io/WAKE_PROTOCOL/

**GitHub Repository:**
https://github.com/kumaarrkkshitij/WAKE_PROTOCOL

**Express API:**
https://wake-protocol-api.onrender.com

**Demo Video:**
https://drive.google.com/file/d/1u1zSQEoz100tsThk0LCkOj0PRXYvQbjs/view?usp=sharing

**Presentation & Resources (PPT):**
https://drive.google.com/drive/folders/1Z3FKXqXcQdL4C_9v0Fm5ip3hmv3RkaOU?usp=sharing

**AI Usage Documentation:**
[AI-USAGE.md](AI-USAGE.md)

---

## Author

**Kkshitij Kumaarr**

CS-401 — 6APSI Final Project
**WAKE Protocol**

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
