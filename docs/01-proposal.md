# Proposal

The submitted version is the Final Project Proposal for M6A1/M8A1. This copy is kept in the repository so the original project plan remains aligned with the implemented application.

## 1. App Proposal

### App Name

**WAKE Protocol**

### What the app is for

WAKE Protocol is a responsive challenge-based alarm web application that allows users to set alarms with their own local music and requires them to complete a selected cognitive challenge before the alarm can be dismissed.

### Who it is for

WAKE Protocol is designed for people who have difficulty waking up, especially students and people who sleep late but need to be awake for important activities the following morning.

The application makes waking up more engaging by allowing users to use their preferred local music while requiring an active response to confirm that they are awake.

When users open the application, they can check their upcoming alarm, create a new alarm, or manage their existing alarms. When an alarm reaches its scheduled time, the application automatically activates it and requires the user to correctly complete the selected Math or Typing challenge before it can be dismissed.

---

## 2. Sections / Routes

| # | Section / Route              | What it is for                                                                                                                                       |
| - | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Home**                     | Displays the current local time, next upcoming alarm, alarm status, and wake-up consistency information.                                             |
| 2 | **Manage Alarms**            | Displays saved alarms and allows users to enable/disable, edit, or delete them, as well as filter and sort the list.                                 |
| 3 | **Create Alarm**             | Allows users to create an alarm by selecting a time, name, repeat days, local music, and challenge type.                                             |
| 4 | **Edit Alarm**               | Allows users to modify an existing alarm's settings.                                                                                                 |
| 5 | **Active Alarm / Challenge** | Appears when an alarm triggers, plays the selected local music, and requires the user to correctly complete the selected challenge before dismissal. |

---

## 3. State: What Data Does the App Hold?

WAKE Protocol uses a PostgreSQL database for persistent alarm data through the Express backend API.

The **Home** and **Manage Alarms** screens retrieve the user's saved alarm data from the backend. Home uses this information to calculate and display the next upcoming enabled alarm, while Manage Alarms displays and manages the complete list of alarms.

The application does not require user accounts or login. The current implementation therefore treats the deployed alarm database as shared application data rather than account-specific cloud data.

### Alarm Data Shape

```text
alarms [
  {
    id,
    name,
    time,
    period,
    repeat_days,
    music,
    challenge_type,
    enabled
  }
]
```

| Data                 | Type                          | Owned / Used By                  | Changes When...                                |
| -------------------- | ----------------------------- | -------------------------------- | ---------------------------------------------- |
| Alarm list           | Array of alarm objects        | App / alarm management           | User creates, edits, or deletes an alarm       |
| Alarm ID             | Integer                       | Alarm management                 | An alarm is created and receives a database ID |
| Alarm name           | String                        | Create/Edit Alarm                | User enters or changes the alarm name          |
| Alarm time           | String                        | Create/Edit Alarm                | User selects or changes the alarm time         |
| Period               | `AM` / `PM`                   | Create/Edit Alarm                | User selects the alarm period                  |
| Repeat days          | Array of day codes            | Create/Edit Alarm                | User selects or changes repeat days            |
| Music                | String / local file reference | Create/Edit Alarm / Active Alarm | User selects or changes a local audio file     |
| Challenge type       | `Math` / `Typing`             | Create/Edit Alarm                | User chooses the challenge type                |
| Enabled              | Boolean                       | Alarm item / alarm management    | User turns an alarm on or off                  |
| Active alarm         | Alarm object / state          | Home / Active Alarm              | A scheduled alarm reaches its trigger time     |
| Challenge answer     | User input                    | Active Alarm                     | User enters and submits an answer              |
| Challenge completion | Boolean / completion state    | Active Alarm                     | User provides the correct answer               |
| Wake consistency     | Local browser data            | Home                             | An alarm is completed or missed                |

### Local Music Storage

The selected music file is **not uploaded to the backend database**. The application stores the actual audio file locally in the browser using **IndexedDB** and stores the associated music filename in the alarm record.

This allows each browser/device to retain its selected alarm audio without requiring cloud audio storage.

---

## 4. What Each Screen Contains

### Screen: Home

* Friendly "Good day!" greeting
* Current local time
* Next upcoming enabled alarm
* Alarm name and scheduled time
* Quick access to create/manage alarms
* Wake-up consistency information
* Automatic alarm triggering when a scheduled alarm is reached

### Screen: Manage Alarms

* Page heading
* List of saved alarms
* Alarm name, time, repeat days, and enabled/disabled state
* Chronological alarm sorting
* Workdays, Weekend, Inactive, and All filtering
* Enable/disable controls
* Edit controls
* Delete controls
* Button to create a new alarm

### Screen: Create Alarm

* Alarm name
* Alarm time and AM/PM period
* Repeat-day selection
* Local music file selection
* Challenge type selection
* Save alarm button

### Screen: Edit Alarm

* Existing alarm information
* Editable alarm name and time
* Editable repeat days
* Music selection
* Challenge selection
* Save changes button

### Screen: Active Alarm / Challenge

* Alarm notification and current time
* Selected local music playing
* Math or Typing challenge
* User answer input
* Challenge validation and feedback
* Three-challenge completion requirement
* Dismissal after successful completion
* Missed-alarm handling if the music finishes before the challenge is completed

---

## 5. Challenge System

WAKE Protocol currently supports two built-in challenge types:

### Math

The backend contains **400 Math challenges** consisting of simple arithmetic questions and their expected answers.

### Typing

The backend contains **400 Typing challenges** consisting of short motivational or inspiring phrases that the user must type correctly.

The application retrieves the challenge pools from the backend and uses shuffled challenges during an active alarm. Challenge usage is tracked through browser session storage to help avoid unnecessary repetition during the session.

The user must successfully complete the required challenges before the alarm can be dismissed.

---

## 6. Content Needed

The application requires:

* WAKE Protocol visual branding and interface design
* Local audio files for testing alarm music
* Built-in Math challenge questions
* Built-in Typing challenge phrases
* Interface icons for alarm, music, editing, deletion, and status
* Sample alarm configurations for testing different times and repeat-day combinations

Most of these resources are now integrated into the implemented application.

---

## 7. Hosting and Deployment

The finalized application is deployed as a three-part system.

| Component             | Hosting               | Purpose                                                                           |
| --------------------- | --------------------- | --------------------------------------------------------------------------------- |
| React frontend        | **GitHub Pages**      | Hosts the responsive WAKE Protocol web interface                                  |
| Express API           | **Render**            | Handles alarm CRUD operations, validation, health checks, and challenge endpoints |
| PostgreSQL database   | **Render PostgreSQL** | Stores persistent alarm data                                                      |
| Local alarm audio     | **Browser IndexedDB** | Stores user-selected audio files locally on the user's device                     |
| Deployment automation | **GitHub Actions**    | Builds and deploys the React frontend to GitHub Pages                             |

### Production URLs

* **Frontend:** https://kumaarrkkshitij.github.io/WAKE_PROTOCOL/
* **API:** https://wake-protocol-api.onrender.com
* **Repository:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL

The Render PostgreSQL database is currently using the free tier. The current free database is scheduled to expire on **November 3, 2026** unless the service is upgraded or replaced. This is an infrastructure limitation rather than an application feature requirement.

---

## 8. API

The production backend exposes the following endpoints:

### Health

```text
GET /healthz
GET /readyz
```

### Alarms

```text
GET    /api/alarms
GET    /api/alarms/:id
POST   /api/alarms
PUT    /api/alarms/:id
DELETE /api/alarms/:id
```

### Challenges

```text
GET /api/challenges/math
GET /api/challenges/typing
GET /api/challenges/math/all
GET /api/challenges/typing/all
```

The frontend uses an environment-based API configuration so the same React application can run locally or against the deployed Render API.

---

## 9. Demo / Mock Mode

The project retains a client-only demo mode for development and testing.

When:

```env
VITE_USE_MOCK_API=true
```

the frontend uses the local mock API and browser storage instead of the Express/PostgreSQL backend.

Production is configured with:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://wake-protocol-api.onrender.com
```

Therefore, the deployed GitHub Pages application uses the real Express API and PostgreSQL database rather than mock data.

---

## 10. Risks: Original vs Final Status

### Risk 1 — Reliable Alarm Triggering

**Original risk:** The alarm needed to trigger reliably at the scheduled time and only once for the intended occurrence.

**Final status:** Largely resolved. The Home screen calculates the next scheduled alarm using the current local time and repeat-day configuration. Session storage is also used to prevent the same alarm occurrence from triggering multiple times.

### Risk 2 — Connecting the Alarm to the Challenge

**Original risk:** It was uncertain how the scheduled alarm state would transition into the challenge screen.

**Final status:** Resolved. When a scheduled alarm triggers, the application transitions to the Active Alarm screen and passes the selected alarm and challenge type into the challenge workflow.

### Risk 3 — Preventing Early Dismissal

**Original risk:** The alarm needed to remain active until the user provided a valid correct answer.

**Final status:** Resolved. Incorrect submissions keep the challenge active, while successful completion allows the alarm to finish its workflow and dismiss.

### Risk 4 — Challenge Integration

**Original risk:** Properly integrating the built-in Math and Typing challenge questions was identified as a technical risk.

**Final status:** Resolved. The backend now contains 400 Math and 400 Typing challenges, with dedicated API endpoints for retrieving individual challenges or the complete pools.

### Risk 5 — Local Music Persistence

**Original risk:** User-selected audio needed to remain available without requiring a cloud file-storage system.

**Final status:** Resolved using browser IndexedDB. The actual audio file remains local to the user's browser while the alarm record stores its associated music filename.

### Remaining Infrastructure Risk

The main remaining deployment consideration is the Render PostgreSQL free-tier limitation. The current database is scheduled to expire on November 3, 2026 unless upgraded or migrated. The application architecture can support moving the database to another PostgreSQL provider if required.

---

## 11. Current Implementation Status

WAKE Protocol has progressed from the original proposal into a fully implemented and deployed application.

The current implementation includes:

* Responsive mobile-style alarm interface
* Home dashboard with live local time
* Automatic alarm triggering
* Multiple alarms
* Create, edit, delete, and enable/disable functionality
* Repeat-day scheduling
* Alarm filtering and chronological sorting
* Local alarm music using IndexedDB
* Math and Typing challenge missions
* 400 Math and 400 Typing challenge entries
* Challenge validation
* Active alarm workflow
* Wake consistency tracking
* PostgreSQL persistence
* Express REST API
* Environment-based frontend/API configuration
* GitHub Pages deployment
* Render API deployment
* Render PostgreSQL database
* GitHub Actions deployment workflow
* Client-only mock/demo mode for development

The original proposal's core objective has therefore been maintained while the implementation has been expanded to include the backend, database, deployment architecture, and completed challenge workflow.

---

## 12. Future / Stretch Goals

The following features were not required for the finalized implementation but could be considered future improvements:

* User accounts and authentication
* Account-specific cloud alarm synchronization
* Cloud-based audio storage
* Additional challenge types
* Native/mobile app functionality
* Push notifications
* More detailed wake-up analytics
* Additional alarm customization options

These remain future or stretch goals rather than missing requirements of the current final project.

---

## Author

**Kumaarr, Kkshitij**

**Subject:** 6APSI
**Section:** CS – 401
**Project:** WAKE Protocol
**Project Type:** Final Project
