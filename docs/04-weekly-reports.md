# Weekly reports

Five minutes a week. Add a new section at the top; never edit an old one.

The value is entirely in writing them while it is happening. What took four hours and why is invisible a month later, and it is exactly what your journal needs.

---

## Week of 2026-09-28

**Done.**

* Completed the frontend-to-backend integration for creating and editing alarms using `POST /api/alarms` and `PUT /api/alarms/:id`.
* Connected alarm deletion and the enable/disable toggle to the backend with persistent database storage.
* Cleaned up the API-to-frontend field mapping, including `repeat_days` and `challenge_type`.
* Connected the Home screen to real alarm data.
* Added dynamic next-alarm calculation and live local time on Home and Manage Alarms.
* Added Workdays, Weekend, Inactive, and All alarm filters.
* Added chronological alarm sorting.
* Completed automatic alarm scheduling and triggering based on alarm time and repeat days.
* Added protection against the same alarm occurrence triggering multiple times using session storage.
* Added local alarm music using IndexedDB so the selected audio file remains browser-local.
* Completed Math and Typing challenge integration through the backend.
* Added 400 Math challenges and 400 Typing challenges.
* Added challenge pool rotation and session-based tracking to avoid immediately repeating challenges.
* Completed Math and Typing answer validation.
* Completed the Active Alarm dismissal flow so the alarm is dismissed only after the required challenge is answered correctly.
* Added the 3/3 Active Alarm challenge progress display.
* Added handling for successful completion and missed alarms.
* Completed the final alarm workflow between Home, Manage Alarms, Alarm Configuration, and Active Alarm.
* Removed the temporary Math/Typing preview switch from the final workflow.
* Completed deployment of the frontend, API, and PostgreSQL database.
* Configured GitHub Pages for the frontend, Render for the Express API and PostgreSQL database, and GitHub Actions for deployment.
* Tested and verified the deployed application end-to-end.
* Updated the README, proposal, mockup documentation, and AI usage documentation to reflect the completed implementation.

**Stuck.**

* No major application functionality is currently blocked.
* The Render PostgreSQL free-tier database is scheduled to expire on November 3, 2026. If the application needs to remain online after that date, the database will need to be upgraded or migrated.

**Hours.**

* Approximately **35–40 hours**.

**Next.**

* Complete the remaining final documentation and submission materials.
* Complete final end-to-end testing and prepare the final project presentation/demo.

---

## Week of 2026-09-24

**Done.**

* Started connecting the WAKE Protocol frontend to a real backend and database instead of relying only on frontend state and sample data.
* Set up PostgreSQL locally for the WAKE Protocol project.
* Created a new `wake_protocol` PostgreSQL database for storing alarm data.
* Reworked the starter database schema from the original template's `sightings` table into an **alarms** table designed for WAKE Protocol.
* Added database fields for:

  * Alarm time
  * AM/PM period
  * Alarm name
  * Repeat days
  * Challenge type
  * Music
  * Enabled/disabled status
  * Creation timestamp
* Added database constraints for valid AM/PM values and the two supported challenge types: **Math** and **Typing**.
* Added an index for filtering alarms by their enabled/disabled state.
* Created `server/alarmsRepo.js` to handle alarm database operations.
* Implemented backend repository functions for:

  * Getting all alarms
  * Getting one alarm by ID
  * Creating an alarm
  * Updating an alarm
  * Deleting an alarm
* Reworked `server/server.js` to replace the template's original sightings API with an **alarm API**.
* Added API routes for:

  * `GET /api/alarms`
  * `GET /api/alarms/:id`
  * `POST /api/alarms`
  * `PUT /api/alarms/:id`
  * `DELETE /api/alarms/:id`
* Added server-side validation for alarm data before it is written to the database.
* Added error handling and 404 handling for the API.
* Configured CORS for the local React frontend.
* Added and configured the local server environment variables through `.env`.
* Installed the required server dependencies and successfully started the Express API.
* Tested the API and database connection using `/healthz` and `/readyz`.
* Tested the complete alarm CRUD API using `curl`, including creating, retrieving, updating, and deleting alarms.
* Connected the **Manage Alarms** frontend screen to `GET /api/alarms` so it now loads alarms from PostgreSQL instead of using the previous hardcoded sample alarms.
* Verified that Manage Alarms displays no alarms when the database is empty.
* Created a Git commit documenting the Week 2 backend and database increment.

**Stuck.**

* The main difficulty was getting the different backend parts to communicate correctly.
* The project started from a full-stack template with an existing database and API structure, so replacing the original `sightings` functionality with the WAKE Protocol alarm system required changes across the database schema, repository, and Express server.
* There were issues while connecting the Express server to the local PostgreSQL database. The database configuration, environment variables, and server connection had to be checked before the API could successfully communicate with PostgreSQL.
* Starting the server more than once caused a port conflict because another development server was already running.
* Testing helped identify and correct issues with the alarm routes and database operations.
* The first frontend connection revealed that the API field names did not completely match the names previously used by the React interface. For example, the API uses `repeat_days` and `challenge_type`, while some frontend code still expected fields such as `days`, `category`, and `challenge`.
* Manage Alarms could retrieve alarms from the backend, but its toggle and delete actions were still handled only in frontend state at the end of this week.
* Create and Edit Alarm were not yet connected to the backend, so those operations were not yet persistent.

**Hours.**

* Approximately **24–36 hours**.

**Next.**

* Connect **Create Alarm** to `POST /api/alarms`.
* Connect **Edit Alarm** to `PUT /api/alarms/:id`.
* Connect **Delete Alarm** to `DELETE /api/alarms/:id`.
* Connect the alarm enable/disable toggle to the backend.
* Clean up the API-to-frontend field mapping, including `repeat_days`, `challenge_type`, `days`, `category`, and `challenge`.
* Connect the Home screen to real alarm data.
* Connect persistent alarm storage throughout the complete frontend workflow.
* Implement actual alarm scheduling and automatic triggering.
* Implement local alarm audio playback.
* Implement complete Math Mission validation.
* Implement complete Typing Mission validation.
* Allow the Active Alarm flow to dismiss the alarm only after the required challenge is completed correctly.
* Connect the final workflow between Home, Manage Alarms, Alarm Configuration, and Active Alarm.
* Remove the temporary Math/Typing preview switch once the actual alarm-triggering flow is implemented.
* Enhance the application with additional user-friendly features where appropriate and within the approved project scope.
* Complete deployment of the frontend, API, and database.
* Complete final testing, documentation, security review, and presentation preparation.

---

## Week of 2026-09-20

**Done.**

* Reworked the starter React/Vite application into the initial **WAKE Protocol** frontend.
* Started the development process by creating the **UI/UX design first** to establish a visual reference and guide the implementation of the application's screens, layout, navigation, and overall user experience.
* Built the **Home** screen with WAKE Protocol branding, upcoming alarm information, wake-up statistics, and navigation.
* Built the **Manage Alarms** screen with alarm cards, active/inactive states, filtering, enable/disable controls, edit controls, delete controls, and a New Alarm action.
* Added a reusable **Bottom Navigation** component for navigating between the Home and Manage Alarms screens.
* Built the **Create Alarm** and **Edit Alarm** interfaces with:

  * Alarm time selection
  * AM/PM selection
  * Repeat-day selection
  * Alarm name
  * Math or Typing mission selection
  * Local audio file selection
* Built the **Active Alarm** interface for the Math Mission.
* Added a numeric keypad and answer display for the Math Mission interface.
* Built the **Active Alarm** interface for the Typing Mission.
* Added a typing phrase, text input, and submission interface for the Typing Mission.
* Added responsive CSS styling for the WAKE Protocol interface, including the mobile-sized layout and futuristic dark/cyan visual design.
* Added a temporary Math/Typing preview switch during development so both Active Alarm interfaces could be tested independently.
* Updated the project `README.md` to begin replacing the starter template documentation with WAKE Protocol documentation.
* Created a Git commit containing the frontend increment and documentation changes.

**Stuck.**

* The project started from a full-stack course template, so several parts of the original application were designed around the template's previous functionality and had to be replaced or adapted for WAKE Protocol.
* Some parts of the template were still unused or blank because they had not yet been determined how to adapt to the requirements of WAKE Protocol, while other parts were still in development.
* The frontend had to be built screen by screen, with each screen implemented as a separate React page/component.
* The alarm management, alarm configuration, and Active Alarm interfaces were initially separate pieces, so navigation between them had to be connected through the main React application.
* The current implementation used sample alarm data and frontend state rather than persistent application data.
* Creating or editing an alarm was handled only at the frontend level and was not yet connected to a database.
* The current Create/Edit functionality did not yet work as the final application was intended to because the data was not being persisted or fully connected to the Manage Alarms screen.
* The Active Alarm challenges were currently visual and interactive interfaces. Complete answer validation, alarm triggering, audio playback, and the actual dismissal logic had not yet been implemented.
* The temporary Math/Typing preview switch was used during development to verify both challenge interfaces and was not intended to remain as part of the final application flow.

**Hours.**

* Approximately **6 - 8 hours**.

**Next.**

* Connect alarm creation, editing, deletion, and enable/disable changes to persistent application data.
* Design and implement the PostgreSQL database schema for alarm data.
* Implement the Express API and connect it to the React client.
* Implement persistent alarm storage.
* Implement actual alarm scheduling and automatic triggering.
* Implement local alarm audio playback.
* Implement complete Math Mission validation.
* Implement complete Typing Mission validation.
* Allow the Active Alarm flow to dismiss the alarm only after the required challenge is completed correctly.
* Connect the final alarm workflow between Home, Manage Alarms, Alarm Configuration, and Active Alarm.
* Complete deployment of the frontend, API, and database.
* Complete final documentation, testing, security review, and presentation preparation.
* Enhance the application with additional user-friendly features where appropriate and within the approved project scope.
