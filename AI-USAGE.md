# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### 2026-09-20 - UI Design Refinement

* **Tool:** Excalidraw, Figma, Google Stitch, and ChatGPT
* **What I asked for:** I first created my initial UI ideas and layouts using Excalidraw and Figma. I then used Google Stitch for further UI refinement and used ChatGPT to help coordinate the visual design, including the color palette, font style, spacing, layout, and interface elements.
* **What it gave back:** The tools helped refine the original UI concept into a more consistent futuristic interface. ChatGPT helped suggest a coordinated color palette, typography, spacing, and interface elements that could be applied consistently across the different screens.
* **What I kept, what I changed, and why:** I used my own initial UI concept as the starting point and reviewed the suggestions from the tools. I kept design elements that matched the look and usability I wanted, while changing or removing elements that did not fit my intended application or project scope.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

### 2026-09-23 - React Page Implementation

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help me turn the completed UI designs into React pages and components for WAKE Protocol. I asked for code that was straightforward and easy for me to understand and work with in React.
* **What it gave back:** AI provided React component structures and code for the different application screens, including Home, Manage Alarms, Create/Edit Alarm, and Active Alarm interfaces.
* **What I kept, what I changed, and why:** I kept the basic React structures because they were simple enough for me to understand and modify. I reviewed the generated code while implementing and testing each screen, and changed parts when they did not match the intended design or behavior. I handled the connection between the pages myself through `App.jsx` and the navigation components.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

### 2026-09-26 - PostgreSQL Setup and Backend Configuration

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to set up PostgreSQL locally and configure the existing backend so it could be used for WAKE Protocol.
* **What it gave back:** AI provided the setup steps for PostgreSQL, creating the database, configuring the `.env` file, and connecting the Express API server to PostgreSQL.
* **What I kept, what I changed, and why:** I followed the setup guidance but made the project-specific configuration changes myself. I created the `wake_protocol` database instead of using the starter database, changed the database connection in `.env` to point to my local WAKE Protocol database, started PostgreSQL, and configured the backend to use that connection. I also tested the API server and database connection using `/healthz` and `/readyz`. I kept the overall setup approach because it provided the connection needed between the Express server and PostgreSQL.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### 2026-09-26 - Database Schema Changes

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help me change the starter project's database structure, which was originally created for `sightings`, so it could store WAKE Protocol alarms.
* **What it gave back:** AI explained how the existing schema could be adapted into an `alarms` table and suggested the fields, constraints, defaults, and index that could be used.
* **What I kept, what I changed, and why:** I changed the original `sightings` table into an `alarms` table and changed the database fields to match the actual WAKE Protocol alarm data. I added `time`, `period`, `name`, `repeat_days`, `challenge_type`, `music`, `enabled`, and `created_at`. I also added constraints so `period` only accepts AM or PM and `challenge_type` only accepts Math or Typing. I added an index for the enabled alarm state and updated the comments so they describe the new alarm functionality instead of the old starter application. I then ran and verified the schema in PostgreSQL. I kept the general structure of using a committed SQL schema because it makes the database structure clear and reproducible.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### 2026-09-26 - Alarm Repository and SQL Queries

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help me adapt the starter repository into an alarm repository and explain the SQL queries needed for the WAKE Protocol database.
* **What it gave back:** AI provided guidance for creating repository functions for getting all alarms, getting an alarm by ID, creating an alarm, updating an alarm, and deleting an alarm. It also explained parameterized SQL queries and how PostgreSQL query results are returned.
* **What I kept, what I changed, and why:** I changed the repository from the starter application's `sightings` structure to an `alarms` structure. I changed the SQL queries so they use the `alarms` table and the WAKE Protocol fields. I worked with the queries for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`, including the values passed through parameters such as `$1`, `$2`, and the use of `RETURNING *` for created and updated alarms. I also made sure the queries handled the alarm name, repeat days, challenge type, music, and enabled state. I then tested these operations through the API. I kept the repository pattern because it separates the SQL/database work from the Express API routes.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### 2026-09-27 - Express API Server Changes

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help me convert the starter Express server into an API server for WAKE Protocol and explain how the API should communicate with the alarm repository and database.
* **What it gave back:** AI provided guidance for the alarm GET, POST, PUT, and DELETE routes, server-side validation, CORS configuration, 404 handling, and server error handling.
* **What I kept, what I changed, and why:** I changed the existing Express server to import and use `alarmsRepo.js` instead of the starter `sightingsRepo.js`. I added the alarm API routes for retrieving all alarms, retrieving an alarm by ID, creating, updating, and deleting alarms. I also changed the validation to check the WAKE Protocol alarm fields and allowed challenge types. I configured CORS for the React client and kept the health and database readiness endpoints for testing the server. I also adjusted the error and 404 handling so API errors return appropriate responses. I tested the routes using `curl` and kept the Express structure because it gives the frontend a clear API through which it can communicate with the database.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### 2026-09-27 - Manage Alarms Frontend Integration and UI Changes

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to connect the existing Manage Alarms React screen to the new alarm API and how to handle the differences between the frontend data and the backend data.
* **What it gave back:** AI provided guidance for fetching alarm data from `/api/alarms` and helped identify differences between the existing frontend fields and the fields returned by the backend.
* **What I kept, what I changed, and why:** I changed `ManageAlarms.jsx` so it fetches the alarm list from the real backend instead of relying on the previous sample alarm data. I tested this by using an empty database and confirming that the Manage Alarms screen showed no alarms. I also changed some of the existing frontend UI and CSS elements where they were missing or did not match what I wanted. In particular, I added the alarm name-related UI because the alarm name information was not properly included in the existing alarm display. I also made changes to the frontend handling needed while testing the real API data. I kept the existing visual design and structure where it continued to work with the new backend.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### 2026-09-27 - React Edit Alarm State

* **Tool:** ChatGPT
* **What I asked for:** I asked AI for help understanding how the selected alarm should be passed from Manage Alarms to the Edit Alarm screen.
* **What it gave back:** AI explained how React state and functions could be used to store the selected alarm and change the current page to the edit screen.
* **What I kept, what I changed, and why:** I worked with the edit-alarm connection in `App.jsx`. I used the `editingAlarm` state to store the alarm selected from Manage Alarms, and the edit action sets that alarm before navigating to the Edit Alarm screen. The selected alarm is then passed to `AlarmForm` through the `alarm` prop. I kept this approach because it is a simple way to carry the selected alarm between screens without introducing another routing system.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Unnecessary Features and Scope

* **What it gave me:** AI suggested and incorporated several interface features that were not part of the application's intended scope.
* **What was wrong with it:** Some of the suggested features added unnecessary functionality or made the application more complicated than needed for the approved WAKE Protocol concept.
* **What I did instead:** I reviewed the suggestions individually and removed features that were not useful for the project. I kept the weekday/weekend alarm filtering because it could make alarms easier to find, and I kept the roller-style time selector because I liked the interaction and it fit the alarm configuration screen. Some other ideas were removed, while a few were left for consideration as development continues.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

### Case 2 - Create/Edit Alarm Navigation

* **What it gave me:** AI helped implement the `AlarmForm` component as a shared screen for both creating a new alarm and editing an existing alarm.
* **What was wrong with it:** The initial implementation did not handle the two entry points correctly. The Create Alarm action could reach the `AlarmForm` correctly, but the Edit Alarm action was also being routed incorrectly instead of opening the form with the selected alarm's information.
* **What I did instead:** I traced how the selected alarm was being passed from `ManageAlarms.jsx` into `App.jsx` and then into `AlarmForm.jsx`. I identified the problem in the page/state handling and modified the `editingAlarm` state and the edit navigation logic in `App.jsx` so that the selected alarm is stored before navigating to the edit screen. I then passed the selected alarm to `AlarmForm` through the `alarm` prop. This allowed the same `AlarmForm` component to correctly handle both Create and Edit modes.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

### Case 3 - Alarm Name Missing From Alarm Cards

* **What it gave me:** During the UI implementation, AI created the alarm name field and included the alarm name in the Create/Edit Alarm form.
* **What was wrong with it:** The alarm name was only being reflected in the Create/Edit Alarm screen. The alarm cards displayed on both the Home page and Manage Alarms page did not properly show the alarm name, even though the alarm name variable already existed when creating an alarm.
* **What I did instead:** I noticed that the alarm name was missing from the actual alarm cards and manually fixed the UI. I modified `ManageAlarms.jsx` and the related CSS so the alarm name was included in the alarm card display. I also checked the alarm card structure so the name appeared in the correct place instead of only existing as a field inside the Create/Edit form. This made the alarm name visible where users actually view their alarms.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me

#### Navigation Buttons

* **File:** `client/src/components/BottomNav.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I worked on the navigation buttons used for the Home and Manage screens. Each button calls the navigation function with the page it should open, and the current page is used to show which navigation item is active. I understand this because it uses React props, button events, and conditional class names.

#### Alarm Toggle

* **File:** `client/src/pages/ManageAlarms.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I worked on the alarm enable/disable toggle. The function finds the alarm with the selected ID and creates an updated alarm object with its `enabled` value switched. React state is then updated with the modified alarm list. This was kept simple so the alarm status could be changed directly from the Manage Alarms screen.

#### Page Connection

* **File:** `client/src/App.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I connected the different React pages myself through `App.jsx`. The `page` state stores which screen is currently being displayed, and the navigation function changes that state. `App.jsx` then conditionally renders the corresponding page component, such as Home, Manage Alarms, Create Alarm, or Active Alarm. I used this approach because it was straightforward and I could understand how React state and conditional rendering connect the different screens.

#### Database Schema

* **File:** `server/db/schema.sql`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why it is built this way:** I personally changed the starter database schema from the original `sightings` table into an `alarms` table for WAKE Protocol. I changed the columns to store the alarm time, AM/PM period, alarm name, repeat days, challenge type, music, enabled state, and creation time. I also added the AM/PM and Math/Typing constraints and an index for the enabled state. I ran the schema against PostgreSQL and checked the resulting table with `\dt` and `\d alarms` to verify that the database structure matched the application.

#### Alarm Repository and SQL Queries

* **File:** `server/alarmsRepo.js`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why it is built this way:** I adapted the starter `sightingsRepo.js` into `alarmsRepo.js` and changed the SQL queries for the WAKE Protocol alarm data. I worked with the `SELECT`, `INSERT`, `UPDATE`, and `DELETE` queries and the parameters passed through `$1`, `$2`, and other placeholders. I also worked with `RETURNING *` so the created or updated alarm could be returned by the API. I tested these operations through `curl` and verified that the database correctly created, retrieved, updated, and deleted alarm records.

#### Alarm Name and Create/Edit Form

* **File:** `client/src/pages/AlarmForm.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I worked on the alarm name part of the Create/Edit Alarm form because the alarm needed a name that could be entered and carried with the rest of the alarm information. I worked with the name state and the form field so the entered alarm name became part of the alarm data. The same `AlarmForm` component is used for both creating and editing alarms, so keeping the alarm name in the shared form allows both operations to use the same field.

#### Manage Alarms API Connection and UI Changes

* **File:** `client/src/pages/ManageAlarms.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why it is built this way:** I changed the Manage Alarms page so it fetches alarm data from the real backend instead of using the previous sample alarm data. I tested it with an empty database and confirmed that no alarms were displayed. I also manually fixed the alarm card UI and related CSS because the alarm name was missing from the cards even though the name was already being created in the Create/Edit Alarm form. I added the alarm name to the displayed alarm information so users can identify their alarms.

#### Edit Alarm State

* **File:** `client/src/App.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I worked on the `editingAlarm` state used when an existing alarm is selected for editing. The selected alarm is stored before navigating to the Edit Alarm screen, and then it is passed to `AlarmForm` through the `alarm` prop. I worked on this because the same `AlarmForm` component is used for both creating and editing an alarm, so the edit version needs to receive the selected alarm's existing data.

#### Partial Express API Changes

* **File:** `server/server.js`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why it is built this way:** I adapted parts of the existing Express server for WAKE Protocol rather than writing the entire server from scratch. I changed the repository import from the starter `sightingsRepo.js` to `alarmsRepo.js`, added the alarm API routes, and changed the validation to match the alarm fields and the Math/Typing challenge types. I also tested the API endpoints with `curl`. The existing server structure and some of the surrounding code remained from the starter project and AI-assisted implementation.

### The AI-written part I understand best

#### CSS and Responsive UI

* **File:** `client/src/styles.css`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why we kept it:** A larger portion of the visual styling was AI-assisted, particularly the card layouts, borders, spacing, glow effects, typography, and responsive behavior. I understand how these styles are used to create the visual structure of the application, even though some of the more detailed CSS would have taken me longer to write from scratch. The card styling uses properties such as borders, border radius, padding, backgrounds, and shadows to create the visual components, while the responsive rules change the layout depending on the screen width. We kept this approach because it allows the same application to work in a desktop browser while also presenting the interface in a mobile-sized viewport.

#### React Alarm Form State

* **File:** `client/src/pages/AlarmForm.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why we kept it:** I understand how the form uses React state to keep track of values such as time, period, repeat days, challenge type, and music while the user edits the form. The form controls update the corresponding state, and the saved values are then collected when the form is submitted. We kept the shared form approach because the same component can handle both Create and Edit modes instead of having two separate forms.

#### PostgreSQL Setup and Database Connection

* **Files:** `server/db/pool.js`, `server/db/run.js`, `server/.env`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why we kept it:** The AI-assisted part I understand best from the backend is how the application connects to PostgreSQL. I followed the setup guidance to install and start PostgreSQL, create the `wake_protocol` database, and configure the database connection. I used commands such as `createdb wake_protocol`, `brew services start postgresql@17`, and `pg_isready` to set up and verify PostgreSQL. The `pool.js` file creates the PostgreSQL connection pool, while `run.js` allows SQL files such as `schema.sql` to be executed through Node. I used `npm run db:schema` to create the alarm table and then verified it with `\dt` and `\d alarms`. We kept this approach because it gives the application persistent database storage and makes the setup reproducible.

#### Frontend–API–Database Flow

* **Files:** `client/src/pages/ManageAlarms.jsx`, `server/server.js`, `server/alarmsRepo.js`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why we kept it:** I understand the overall flow between the React frontend, Express API, repository layer, and PostgreSQL. `ManageAlarms.jsx` sends a request to `/api/alarms`. The Express route in `server.js` receives the request and calls the corresponding function in `alarmsRepo.js`. The repository runs the SQL query against PostgreSQL and returns the result to Express, which sends it back to React as JSON. React then stores the data in state and displays the alarms. I understand this flow because I tested the backend separately with `curl` and then connected the Manage Alarms page to the same API. We kept this structure because it separates the frontend, API logic, SQL queries, and database responsibilities.
