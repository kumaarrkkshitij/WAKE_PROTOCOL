# Security and privacy checklist

Work through this before your first push and again before submission.

## Before first push

* [x] `.gitignore` includes `.env` and local environment files are not committed.
* [x] `git check-ignore -v .env` confirmed that `.env` is ignored.
* [x] `git ls-files | grep -iE '\.env$|\.pem$|id_rsa'` confirmed that no `.env`, `.pem`, or `id_rsa` files are tracked.
* [x] A root `.env.example` is committed and contains placeholder values only. The previously removed `server/.env.example` is not required.
* [x] No current database password or connection string is hardcoded in the application source. `DATABASE_URL` is read from environment variables.
* [x] No `student.json` or other unnecessary personal-data files are used.
* [x] Final Git-history search was completed. Historical `devpassword` references were identified as old dummy/local template values, not production credentials.

## Application

* [x] SQL queries use parameters such as `$1`, `$2`, and `$3` instead of string concatenation.
* [x] Server-side validation is implemented for alarm inputs.
* [x] Alarm names have a server-side maximum length of 120 characters. Other fields are restricted through their expected formats/types where applicable.
* [x] CORS uses configured allowed origins instead of `*`.
* [x] Production uses `NODE_ENV=production`.
* [x] Error responses return generic messages instead of stack traces or database details.
* [x] `helmet` is installed and enabled with `app.use(helmet())`.
* [x] No passwords or user accounts are used, so password hashing is not applicable.
* [x] No paid features or password-protected endpoints require rate limiting.
* [x] No user-ownership queries are required because the approved project has no accounts or multi-user system.
* [x] `npm audit` was checked and the remaining dependency warnings were reviewed and accepted as non-blocking for the course project.

## Privacy

* [x] No real classmates' names, student numbers, emails, phone numbers, or photos are used as application data.
* [x] Test/seed alarm data is invented.
* [x] No real tester data is intentionally stored in the project.
* [x] The application does not require personal information or user accounts.
* [x] User-selected alarm music is stored locally in the browser through IndexedDB rather than uploaded to the backend.
* [x] Challenge content is project-generated/invented and does not contain personal data.
* [x] Final screenshots, demo materials, and repository files were reviewed for accidental personal information.
* [x] The final project was reviewed against the applicable Philippine Data Privacy Act considerations for this course project. WAKE Protocol does not collect personal information, use accounts, or maintain user profiles.

## Journal

The main security risk I identified was accidentally exposing local database credentials or other private configuration when moving the project from local development to public deployment. I kept `.env` files out of Git, moved database configuration to environment variables, used parameterized SQL queries, added server-side validation, restricted CORS, enabled Helmet security headers, and configured production environment variables through Render. I also reviewed the repository history for credential exposure and confirmed that the historical password references were dummy/local template values rather than production credentials. I knowingly accepted the tradeoff of having no authentication or user-ownership system because WAKE Protocol is a single-user course project and authentication was outside the approved scope. The final repository, application configuration, screenshots, and demo materials were reviewed for unnecessary personal information.
