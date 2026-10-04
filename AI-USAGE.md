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
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### 2026-09-30 - Alarm Backend Integration

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to connect the Create Alarm and Edit Alarm forms to the existing Express alarm API and PostgreSQL database.
* **What it gave back:** AI provided guidance for sending alarm data from `AlarmForm.jsx` to the backend using POST for new alarms and PUT for existing alarms. It also explained how the frontend field names needed to match the database/API field names.
* **What I kept, what I changed, and why:** I used the suggested API integration approach and adapted it to the existing WAKE Protocol form. I kept the field mapping between the frontend and backend, including `repeatDays` to `repeat_days` and `challenge` to `challenge_type`. I also kept the existing enabled state when editing an alarm and fixed the repeat-day state so previously selected days were loaded correctly when editing. The approach was kept because it allowed Create and Edit Alarm to use the existing backend instead of keeping the data only in frontend state.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### 2026-09-30 - Alarm Data Retrieval

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to change the Manage Alarms page so it would retrieve real alarm data from the Express API instead of using sample frontend data.
* **What it gave back:** AI provided guidance for fetching `/api/alarms`, storing the returned data in React state, and mapping the database field names to the properties used by the existing interface.
* **What I kept, what I changed, and why:** I connected the Manage Alarms screen to the real API and adapted the returned alarm data to the existing alarm-card structure. I tested the page with an empty database to confirm that it correctly displayed no alarms when the backend returned an empty list. I kept the existing card layout and visual design where it continued to work with the database data.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### 2026-09-30 - Persistent Alarm Toggle

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to make the alarm enable/disable toggle save its changes to the backend instead of only changing the React state.
* **What it gave back:** AI explained how the selected alarm could be found by ID, how its `enabled` value could be reversed, and how the complete alarm data could be sent back through the existing PUT API.
* **What I kept, what I changed, and why:** I used the existing alarm update endpoint and adapted the toggle so the changed enabled state is sent to PostgreSQL. After the API responds, the returned alarm data is used to update the frontend state. I kept this approach because the toggle now remains consistent with the database instead of reverting after a refresh.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### 2026-09-30 - Alarm Filtering and Sorting

* **Tool:** ChatGPT
* **What I asked for:** I asked AI for help making the Manage Alarms filters work with the new `repeat_days` database field and for help sorting alarm times correctly.
* **What it gave back:** AI provided logic for checking whether an alarm contains weekday or weekend repeat days and for converting AM/PM alarm times into comparable 24-hour minute values.
* **What I kept, what I changed, and why:** I adapted the filtering logic so Workdays checks Monday through Friday and Weekend checks Saturday and Sunday. I also used chronological sorting after filtering so the alarm cards appear from the earliest time to the latest time. I kept the filtering and sorting as frontend operations because they are based on the alarm data already retrieved by the page and do not require additional database queries.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### 2026-09-30 - Dynamic Next Alarm

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to replace the hardcoded next-alarm information on the Home page with the actual upcoming alarm from the database.
* **What it gave back:** AI provided guidance for retrieving the alarms, checking their enabled state, comparing the alarm time with the current local time, and considering the selected repeat days.
* **What I kept, what I changed, and why:** I adapted the logic so the Home page finds the earliest enabled upcoming alarm based on the browser's local day and time. Disabled alarms are ignored, and the page displays a no-active-alarms state when there is no upcoming enabled alarm. I kept this approach because the Home page now reflects the actual saved alarm data instead of displaying placeholder information.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### 2026-09-30 - Live Local Clock

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to replace the hardcoded time displayed on the Home and Manage Alarms screens with a live local clock.
* **What it gave back:** AI provided a React state and interval-based approach that updates the displayed time every second using the browser's local time.
* **What I kept, what I changed, and why:** I used the live clock approach on both Home and Manage Alarms. I adjusted the formatting after testing because the first version displayed the AM/PM indicator incorrectly. I changed the display so the time and AM/PM are separated and the AM/PM indicator appears once in uppercase. I kept the one-second update interval because it provides a continuously updated local clock without requiring a backend request.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### 2026-10-01 - Backend Challenge System

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to add Math and Typing challenges to the WAKE Protocol backend and make them available through API endpoints.
* **What it gave back:** AI provided guidance for creating a backend challenge file containing Math and Typing challenge data and adding API endpoints that randomly select a challenge when requested.
* **What I kept, what I changed, and why:** I used the suggested structure for the backend challenge system and added the Math and Typing challenge data. I kept the challenges as application data instead of storing them in PostgreSQL because they are predefined challenge content rather than user-created alarm data. I also tested the endpoints to confirm that they returned valid Math and Typing challenges.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc

### 2026-10-01 - Frontend Challenge API Integration

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to connect the React Active Alarm screen to the new backend Math and Typing challenge endpoints.
* **What it gave back:** AI provided guidance for adding API functions for requesting Math and Typing challenges and exposing those functions through the frontend API layer.
* **What I kept, what I changed, and why:** I added the Math and Typing challenge request functions to the frontend API layer and configured the application to use the real backend API. I also kept mock versions of the functions so the existing mock API structure remained available. I tested the connection by requesting both types of challenges from the running backend.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc

### 2026-10-01 - Active Alarm Challenge Integration

* **Tool:** ChatGPT
* **What I asked for:** I asked AI how to make the Active Alarm screen retrieve the correct type of challenge and validate the user's answer before allowing the alarm to be completed.
* **What it gave back:** AI provided guidance for retrieving a Math or Typing challenge based on the selected alarm's challenge type and checking the user's answer against the returned challenge.
* **What I kept, what I changed, and why:** I connected the Active Alarm screen to the challenge API and made it request either a Math or Typing challenge depending on the alarm configuration. Math answers are checked numerically, while Typing answers are compared with the returned phrase. Incorrect answers keep the challenge active, while correct answers change the alarm to its completed state. I kept this approach because the challenge selected when creating the alarm should determine the challenge required when the alarm becomes active.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc

### 2026-10-01 - Active Alarm UI Refinement

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help refine the Active Alarm interface after connecting the real alarm and challenge data.
* **What it gave back:** AI provided guidance for simplifying the challenge progress indicator, removing unnecessary interface elements, and keeping the alarm and music status information visible.
* **What I kept, what I changed, and why:** I removed the previous STAGE 02 / 03 indicator and replaced it with a single full-width progress bar. I also removed the unnecessary bottom disclaimer while keeping the alarm and music status display. I kept the existing WAKE Protocol visual style so the Active Alarm screen remained consistent with the other pages.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc

### 2026-10-03 - Alarm Triggering and User Feature Fixes

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help integrate the live alarm-triggering behavior into the Home page and fix several user-facing issues that appeared during testing. This included making the selected alarm open the Active Alarm screen at the correct scheduled time, preventing the same alarm from immediately triggering again after it was dismissed, fixing the consistency display order, improving the Workdays and Weekend filters, and making sure saved alarm information was correctly restored when editing an alarm.
* **What it gave back:** AI provided React logic using the current local time, repeat-day information, and alarm data retrieved from the backend to determine when an alarm should become active. It also provided a session-based occurrence check to prevent the same alarm occurrence from triggering repeatedly. For the other fixes, AI provided updates to the filtering, consistency display, and AlarmForm state-handling logic.
* **What I kept, what I changed, and why:** I tested the changes against the actual application behavior and kept the parts that matched the intended WAKE Protocol workflow. I kept the alarm occurrence tracking because dismissing an alarm should not immediately trigger the same alarm again during the same scheduled occurrence. I also kept the filtering behavior where alarms containing weekday repeat days appear under Workdays and alarms containing Saturday or Sunday appear under Weekend. I tested the saved alarm values when reopening Edit Alarm and adjusted the form handling so the backend field names were correctly recognized.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/c11c2b09ce94ba3169847922e79d32279c5e8077

### 2026-10-03 - Backend Challenge API and Frontend Configuration Fixes

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help finish the backend API integration for the Math and Typing challenge system and fix the connection between the React frontend and Express backend. I also asked for help adding endpoints that could provide the complete challenge pools instead of only returning one random challenge.
* **What it gave back:** AI provided the frontend API functions for retrieving all Math and Typing challenges, backend endpoints for returning the complete challenge lists, and the required frontend API configuration so the React application uses the real Express server instead of the mock API. AI also helped update the Active Alarm logic so it could retrieve the challenge pool from the backend, randomize the available challenges, and track previously used challenges during the session.
* **What I kept, what I changed, and why:** I kept the backend API approach because the challenge data should be retrieved from the Express server rather than being hardcoded directly inside the Active Alarm component. I configured the frontend environment to use the real backend API and tested the endpoints through the running application. I also kept the session-based challenge tracking so the same alarm does not repeatedly receive the same challenge until the available challenge pool has been used.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/c11c2b09ce94ba3169847922e79d32279c5e8077

### 2026-10-04 - Deployment and API Configuration

* **Tool:** ChatGPT
* **What I asked for:** I used ChatGPT to help properly configure and troubleshoot the WAKE Protocol deployment, including connecting the React frontend to the Express backend, setting up environment-based API URLs, configuring local `.env` files, connecting the deployed frontend to the Render API, and configuring the GitHub Actions deployment variables.
* **What it gave back:** ChatGPT helped identify hardcoded `localhost:3000` API calls, organize the frontend API layer around environment variables, troubleshoot missing local dependencies and environment configuration, and verify the GitHub Pages → Render API → PostgreSQL deployment flow.
* **What I kept, what I changed, and why:** I reviewed and applied the suggested configuration changes, tested the application locally, fixed the local environment setup, configured the required GitHub repository variables, and verified the deployed application myself. I kept the existing application features and only changed the configuration and API connection code needed for local and production environments to work correctly.
- **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/288384aed91c957e1d014fd0f8faf6ececc88a3d

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
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### Case 3 - Alarm Name Missing From Alarm Cards

* **What it gave me:** During the UI implementation, AI created the alarm name field and included the alarm name in the Create/Edit Alarm form.
* **What was wrong with it:** The alarm name was only being reflected in the Create/Edit Alarm screen. The alarm cards displayed on both the Home page and Manage Alarms page did not properly show the alarm name, even though the alarm name variable already existed when creating an alarm.
* **What I did instead:** I noticed that the alarm name was missing from the actual alarm cards and manually fixed the UI. I modified `ManageAlarms.jsx` and the related CSS so the alarm name was included in the alarm card display. I also checked the alarm card structure so the name appeared in the correct place instead of only existing as a field inside the Create/Edit form. This made the alarm name visible where users actually view their alarms.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b

### Case 4 - Repeat Days Reset When Editing an Alarm

* **What it gave me:** AI connected the saved alarm data to the Edit Alarm form and loaded the alarm information into the existing form.
* **What was wrong with it:** When an existing alarm was opened for editing, the saved repeat days could be replaced by the default Monday–Friday selection instead of showing the days that were actually saved for that alarm.
* **What I did instead:** I checked how the repeat-day value was being loaded into React state and found that the frontend and backend used different field names. I adjusted the initial state so it could use the existing frontend `repeatDays` value or the backend `repeat_days` value before falling back to the default days. I then tested the Edit Alarm screen again to confirm that the saved repeat days were preserved.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### Case 5 - Duplicate AM/PM Display

* **What it gave me:** AI helped add a live local clock to the Home and Manage Alarms screens using the browser's current time.
* **What was wrong with it:** The first clock formatting displayed the AM/PM indicator incorrectly, resulting in a duplicate period being shown in the interface.
* **What I did instead:** I tested the clock in the browser and noticed that the time formatting was already returning the AM/PM value while the interface was also displaying one separately. I changed the formatting so the main time and the AM/PM indicator were handled separately, and then made the AM/PM display uppercase. I tested the result again to make sure the indicator appeared only once.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### Case 6 - Next Alarm Calculation Needed Adjustment

* **What it gave me:** AI helped implement the logic for finding the next upcoming alarm from the alarms retrieved from PostgreSQL.
* **What was wrong with it:** The initial logic needed additional adjustment to correctly account for the current local time, AM/PM conversion, repeat days, and whether an alarm had already passed for the current day. Simply retrieving the enabled alarms was not enough to determine which alarm should actually appear as the next alarm.
* **What I did instead:** I worked through the time calculation and adjusted the logic to convert the alarm's AM/PM value into 24-hour minutes, compare it with the current local time, and check the upcoming repeat days. The resulting candidates are sorted by the amount of time until they occur, with disabled alarms ignored. I also added the no-active-alarms state when there is no valid upcoming alarm.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### Case 7 - Frontend Data Was Still Using Sample Alarm Information

* **What it gave me:** AI initially built parts of the alarm interface around sample/frontend alarm data before the PostgreSQL integration was completed.
* **What was wrong with it:** Once the backend was implemented, continuing to rely on sample alarm data would have meant that the interface was not displaying the actual alarms stored in the database.
* **What I did instead:** I changed the Manage Alarms and Home screens to retrieve alarm data from the Express API using `GET /api/alarms`. The frontend then maps the backend fields into the format used by the React components. This allowed the displayed alarms and next-alarm information to come from the actual PostgreSQL data instead of temporary sample data.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### Case 8 - Backend and Frontend Field Names Did Not Match

* **What it gave me:** AI helped connect the React alarm form and the PostgreSQL API.
* **What was wrong with it:** The frontend and backend used different naming conventions for some fields. For example, the React form used `repeatDays` and `challenge`, while the API and database used `repeat_days` and `challenge_type`. Treating the fields as if they had identical names caused problems when transferring alarm data between the frontend and backend.
* **What I did instead:** I explicitly mapped the frontend fields to the backend fields when sending and receiving alarm data. This allowed the React components to keep their existing naming while matching the field names expected by the Express API and PostgreSQL database.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34

### Case 9 - Active Alarm Did Not Initially Use the Selected Alarm

* **What it gave me:** AI initially implemented the Active Alarm screen partly as a standalone Math/Typing preview and used a fixed alarm time instead of fully connecting the screen to the alarm selected from the Home page.
* **What was wrong with it:** The Active Alarm screen was not correctly representing the actual alarm being started. The Home screen could show an upcoming alarm at one time while the Active Alarm screen displayed a different hardcoded time, such as `6:30 PM`. Also, the challenge type could be treated as a manually selected preview instead of being determined by the challenge type saved with the selected alarm.
* **What I did instead:** I traced the alarm flow from `Home.jsx` through `App.jsx` into `ActiveAlarm.jsx`. I changed the flow so the selected alarm is stored before navigating to the Active Alarm screen, and its `challenge_type` is used to determine whether the user receives a Math or Typing challenge. I also passed the selected alarm into `ActiveAlarm` so the screen displays its actual `time` and `period` instead of a hardcoded value. I tested the Home → Active Alarm flow and confirmed that the displayed alarm time and challenge type matched the selected alarm.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc

### Case 10 - Challenge Completion Needed a Separate UI State

* **What it gave me:** AI initially focused on retrieving and validating the Math or Typing challenge but did not provide a clear completed state for the Active Alarm interface.
* **What was wrong with it:** Successfully answering the challenge should visibly change the Active Alarm screen. Simply validating the answer was not enough because the interface still needed to communicate that the challenge had been completed and the alarm was no longer in its active challenge state.
* **What I did instead:** I added a separate `completed` React state to `ActiveAlarm.jsx`. When the user enters the correct Math answer or the correct Typing phrase, the state changes to completed and the interface displays the completed/disarmed condition. Incorrect answers keep the challenge active. This made the result of completing the challenge clear to the user.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc

### Case 11 - Frontend API Initially Used the Mock API

* **What it gave me:** AI helped add the new challenge API functions and connect the Active Alarm screen to the challenge system.
* **What was wrong with it:** The frontend initially continued using the mock API implementation instead of the real Express API. This happened because the client did not have the required `.env` configuration, so the API selection logic continued to use the mock implementation. As a result, the new functions for retrieving the complete challenge pools were not available through the selected API implementation and the application produced an error when the Active Alarm screen tried to use them.
* **What I did instead:** I checked the frontend API configuration and identified that the client `.env` file was missing. I created the environment configuration with `VITE_USE_MOCK_API=false` and the Express backend URL, then restarted the Vite development server so the environment variables would be loaded. I tested the application again and confirmed that the Active Alarm screen was now communicating with the real backend.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/c11c2b09ce94ba3169847922e79d32279c5e8077

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
* **What it does and why it is built this way:** I partially worked on the backend repository by adapting the starter sightingsRepo.js into alarmsRepo.js for WAKE Protocol. I modified the SQL queries to work with alarm data and worked with the SELECT, INSERT, UPDATE, and DELETE operations, including PostgreSQL parameters such as $1, $2, and $3. I also worked with RETURNING * so created or updated alarm records could be returned by the API. I tested the CRUD operations through curl and verified that the database correctly created, retrieved, updated, and deleted alarm records.

#### Alarm Name and Create/Edit Form

* **File:** `client/src/pages/AlarmForm.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why it is built this way:** I worked on the alarm name part of the Create/Edit Alarm form. I added the alarm name to the form state and connected the input field so the entered name became part of the alarm data. Since the same AlarmForm component is used for both creating and editing alarms, keeping the alarm name in the shared form allows the same field to work for both operations.

#### Edit Alarm State

* **File:** `client/src/App.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why it is built this way:** I worked on the `editingAlarm` state used when an existing alarm is selected for editing. The selected alarm is stored before navigating to the Edit Alarm screen, and then it is passed to `AlarmForm` through the `alarm` prop. I worked on this because the same `AlarmForm` component is used for both creating and editing an alarm, so the edit version needs to receive the selected alarm's existing data.

#### Partial Express API Changes

* **File:** `server/server.js`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why it is built this way:** I partially worked on adapting the existing Express server for WAKE Protocol rather than writing the entire server from scratch. I changed the repository import from the starter sightingsRepo.js to alarmsRepo.js and worked with the alarm API routes so they could use the new alarm repository. I also tested the alarm API endpoints with curl to verify that the backend could create, retrieve, update, and delete alarm records. The existing server structure and some of the surrounding code remained from the starter project and AI-assisted implementation.

#### Alarm Filtering

* **File:** `client/src/pages/ManageAlarms.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34
* **What it does and why it is built this way:** I worked on the alarm filtering logic for All, Workdays, Weekend, and Inactive alarms. The Workdays filter checks Monday through Friday, while the Weekend filter checks Saturday and Sunday. The Inactive filter checks whether the alarm is disabled. I kept the filtering logic simple so the displayed alarms can be changed without modifying the stored alarm data.

#### Interface Styling Update

* **File:** `client/src/styles.css`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34
* **What it does and why it is built this way:** I personally modified the CSS for the latest interface changes, including the live clock styling and its layout on the Home and Manage Alarms screens. I adjusted the styling so the current time and AM/PM indicator fit the existing WAKE Protocol visual design while remaining responsive on smaller screens.
  
#### Completed Alarm State

* **File:** client/src/pages/ActiveAlarm.jsx
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc
* **What it does and why it is built this way:**  I worked on the text shown when the alarm is completed. I changed the completed-state message to clearly show “ALARM DISENGAGED” and “WAKE PROTOCOL COMPLETE” so the user can immediately understand that the alarm has been successfully dismissed.

#### Math Answer Input Restriction

* **File:** client/src/pages/ActiveAlarm.jsx
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc
* **What it does and why it is built this way:** I worked with the Math challenge answer input and added a small character limit to prevent unnecessarily long answers from being entered. The restriction uses the input value and keeps only the first four characters, which is sufficient for the expected Math challenge answers.

#### Active Alarm Interface Styling

* **File:** client/src/styles.css
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc
* **What it does and why it is built this way:** I worked on the CSS styling for the Active Alarm interface, including the challenge area, answer input, alarm information, status elements, spacing, and responsive layout. I kept the changes consistent with the existing WAKE Protocol design so the Active Alarm screen matches the other pages and remains usable on smaller screens.


### The AI-written part I understand best

#### CSS and Responsive UI

* **File:** `client/src/styles.css`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why we kept it:** A larger portion of the visual styling was AI-assisted, particularly the card layouts, borders, spacing, glow effects, typography, and responsive behavior. I understand how these styles are used to create the visual structure of the application, even though some of the more detailed CSS would have taken me longer to write from scratch. The card styling uses properties such as borders, border radius, padding, backgrounds, and shadows to create the visual components, while the responsive rules change the layout depending on the screen width. We kept this approach because it allows the same application to work in a desktop browser while also presenting the interface in a mobile-sized viewport.

#### React Alarm Form State

* **File:** `client/src/pages/AlarmForm.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why we kept it:** I understand how the form uses React state to keep track of values such as time, period, repeat days, challenge type, and music while the user edits the form. The form controls update the corresponding state, and the saved values are then collected when the form is submitted. We kept the shared form approach because the same component can handle both Create and Edit modes instead of having two separate forms.

#### PostgreSQL Setup and Database Connection

* **Files:** `server/db/pool.js`, `server/db/run.js`, `server/.env`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why we kept it:** The AI-assisted part I understand best from the backend is how the application connects to PostgreSQL. I followed the setup guidance to install and start PostgreSQL, create the `wake_protocol` database, and configure the database connection. I used commands such as `createdb wake_protocol`, `brew services start postgresql@17`, and `pg_isready` to set up and verify PostgreSQL. The `pool.js` file creates the PostgreSQL connection pool, while `run.js` allows SQL files such as `schema.sql` to be executed through Node. I used `npm run db:schema` to create the alarm table and then verified it with `\dt` and `\d alarms`. We kept this approach because it gives the application persistent database storage and makes the setup reproducible.

#### Frontend–API–Database Flow

* **Files:** `client/src/pages/ManageAlarms.jsx`, `server/server.js`, `server/alarmsRepo.js`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/dd12f2b013da0b48f3c4489b0b65e5f63d00ab1b
* **What it does and why we kept it:** I understand the overall flow between the React frontend, Express API, repository layer, and PostgreSQL. `ManageAlarms.jsx` sends a request to `/api/alarms`. The Express route in `server.js` receives the request and calls the corresponding function in `alarmsRepo.js`. The repository runs the SQL query against PostgreSQL and returns the result to Express, which sends it back to React as JSON. React then stores the data in state and displays the alarms. I understand this flow because I tested the backend separately with `curl` and then connected the Manage Alarms page to the same API. We kept this structure because it separates the frontend, API logic, SQL queries, and database responsibilities.

#### Persistent Alarm Toggle

* **File:** `client/src/pages/ManageAlarms.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34
* **What it does and why we kept it:** The alarm toggle allows an alarm to be enabled or disabled from the Manage Alarms screen. I understand that the function first finds the selected alarm, reverses its current `enabled` value, and sends the complete updated alarm data to the backend using a `PUT` request. After the backend returns the updated alarm, React updates the corresponding alarm in the displayed list. We kept this approach because changing the toggle should update the actual stored alarm rather than only changing what is shown on the screen.

#### Alarm Data Retrieval

* **File:** `client/src/pages/ManageAlarms.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34
* **What it does and why we kept it:** The Manage Alarms page retrieves the current alarms from the Express API when the page loads. I understand that `useEffect` is used to run the fetch request, the returned JSON data is stored in React state, and the alarm information is then used to generate the alarm cards. The backend field names are also converted into the values expected by the interface. We kept this approach because the page should display the actual alarms stored in PostgreSQL instead of relying on temporary frontend sample data.

#### Live Local Clock

* **Files:** `client/src/pages/Home.jsx`, `client/src/pages/ManageAlarms.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/20be116723f4157817d0aced9f6c3b70e0d68a34
* **What it does and why we kept it:** The Home and Manage Alarms pages display the user's current local time and update it every second. I understand that the current time is stored in React state and a `setInterval` inside `useEffect` updates that state once per second. The interval is cleared when the component is removed so it does not continue running unnecessarily. We kept this approach because it provides a simple live clock without requiring a separate backend service or external time source.

#### Backend Challenge Data and Random Selection

* **Files:** `server/challenges.js`, `server/server.js`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc
* **What it does and why we kept it:** I understand that the challenge system keeps the predefined Math and Typing challenges in `server/challenges.js` and uses the Express API to select a random challenge when requested. The Math endpoint selects an object containing a question and answer, while the Typing endpoint selects a phrase and returns it to the frontend. We kept the challenge bank as application data instead of adding another database table because these are predefined challenges rather than user-created alarm records. I also tested the endpoints separately to confirm that they returned valid challenge data.

#### Challenge API Functions in the Frontend

* **Files:** `client/src/api/httpApi.js`, `client/src/api/index.js`, `client/src/api/mockApi.js`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc
* **What it does and why we kept it:** I understand that the frontend has separate API functions for requesting Math and Typing challenges from the backend. `httpApi.js` defines the requests to `/api/challenges/math` and `/api/challenges/typing`, while `index.js` makes these functions available to the rest of the React application. I also understand that `mockApi.js` contains mock versions so the existing mock API structure is still available. We kept this approach because the Active Alarm component can request a challenge through the existing API layer without putting the request details directly inside the page component.

#### Active Alarm Challenge Completion Logic

* **File:** `client/src/pages/ActiveAlarm.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/514749f3563b6c8eafc60168ac54f4c6cfb4cccc
* **What it does and why we kept it:** I understand how the Active Alarm component handles the result of the challenge. It checks the user's Math answer against the answer returned by the backend or compares the Typing response with the returned phrase. If the answer is incorrect, the challenge remains active and the input is cleared. If the answer is correct, the `completed` state changes and the interface displays the completed condition. We kept this behavior because the alarm should remain active until the required challenge has been answered correctly.

#### Frontend API Layer and Backend API Flow

* **Files:** `client/src/api/httpApi.js`, `client/src/api/index.js`, `server/server.js`
* **Commit:**  https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/c11c2b09ce94ba3169847922e79d32279c5e8077
* **What it does and why we kept it:** I understand how the frontend API layer connects the React components to the Express backend. The functions in `httpApi.js` build requests to specific backend endpoints and return the JSON response. `index.js` selects whether the application uses the mock API or the real HTTP API based on the environment configuration. On the backend, Express receives the request through the matching route, performs the required operation, and sends the result back as JSON. I understand this flow because I tested the API endpoints and fixed the frontend configuration so the application uses the real backend instead of the mock implementation. We kept this structure because it separates API requests from the React page components and allows the frontend to communicate with the backend through reusable functions.
