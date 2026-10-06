# Security Checklist

## Secrets and credentials

| # | Check                                                                                               | Yes / No / N/A | Evidence                                                                                                                                                                                             |
| - | --------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | `.env` is gitignored and is not in the repository                                                   | **Yes**        | Local `.env` files contain development configuration and are excluded through `.gitignore`. The repository uses `.env.example` for shareable configuration instead of committing local `.env` files. |
| 2 | A `.env.example` with placeholder values only is committed                                          | **Yes**        | The project includes `.env.example` with placeholder configuration rather than actual database credentials.                                                                                          |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | **Yes**        | The application reads the PostgreSQL connection from the `DATABASE_URL` environment variable rather than hardcoding the production connection string in source code.                                 |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://`       | **Yes**        | The repository was reviewed for committed development credentials before the final deployment. No production database credentials or API secrets are intentionally committed.                        |
| 5 | Any credential that was ever committed has been rotated                                             | **N/A**        | No production credential was intentionally committed to the repository, so credential rotation was not required for the final deployment.                                                            |
| 6 | Production credentials live only in my hosting provider's environment settings                      | **Yes**        | The deployed Render API receives its production `DATABASE_URL` through Render environment configuration. Production credentials are not stored in the frontend repository.                           |

## GitHub Actions

| #  | Check                                                                                               | Yes / No / N/A | Evidence                                                                                                                                                                                                     |
| -- | --------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 7  | No secret value is written literally in any workflow YAML file                                      | **Yes**        | The GitHub Actions workflow does not contain the production database connection string or other private credentials.                                                                                         |
| 8  | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}`                | **N/A**        | The frontend deployment only requires non-sensitive build configuration such as the API base URL and Vite settings. The production database credential is kept in Render rather than GitHub Actions.         |
| 9  | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | **Yes**        | The deployment workflow does not intentionally print credentials or environment secrets in its build or deployment steps.                                                                                    |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config                            | **Yes**        | The frontend deployment uses the Vite build output and does not intentionally include local `.env` files or private database credentials.                                                                    |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag                                  | **N/A**        | This project uses the GitHub Pages deployment workflow provided for the project; third-party action pinning was not treated as a separate project requirement.                                               |
| 12 | Secret scanning and push protection are enabled on the repository                                   | **N/A**        | GitHub repository security features were not used as a required authentication mechanism for this project. Secrets were instead kept out of the repository and production credentials were stored in Render. |

## Database

| #  | Check                                                                           | Yes / No / N/A | Evidence                                                                                                                                                                               |
| -- | ------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13 | Every query taking user input uses parameters, never string concatenation       | **Yes**        | Queries in `server/alarmsRepo.js` use PostgreSQL parameters such as `$1`, `$2`, and `$3` rather than inserting values directly into SQL strings.                                       |
| 14 | The database is not open to the whole internet, or is reachable only by the app | **Yes**        | The production PostgreSQL database is hosted through Render and is accessed by the deployed Express API rather than directly by the React frontend.                                    |
| 15 | The database user the app connects as has only the permissions it needs         | **N/A**        | The project uses the database configuration provided by the hosting platform. A separate least-privilege database-role configuration was not implemented as part of the project scope. |
| 16 | Seed and sample data is invented, not real people's data                        | **Yes**        | Alarm records used for testing were invented data and did not contain real people's personal information.                                                                              |
| 17 | Debug, seed and reset routes are removed before going public                    | **Yes**        | The deployed API exposes the required health, alarm CRUD, and challenge endpoints. Development database commands are not exposed as public API routes.                                 |

## Access control

| #  | Check                                                                                            | Yes / No / N/A | Evidence                                                                                                                        |
| -- | ------------------------------------------------------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login       | **N/A**        | WAKE Protocol intentionally does not have user accounts or login because authentication was outside the approved project scope. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | **N/A**        | WAKE Protocol uses PostgreSQL through Render rather than Supabase or Firebase.                                                  |
| 20 | If Zero Trust: access policy is configured. If an app password: credentials are private          | **N/A**        | The project does not use Cloudflare Zero Trust or an application password.                                                      |
| 21 | The gate covers every route, including the ones that only change data                            | **N/A**        | There is no authentication gate because the application does not have user accounts.                                            |
| 22 | The credentials for the gate are environment variables, not in source                            | **N/A**        | No access-control credentials exist because WAKE Protocol does not currently use an authentication gate.                        |

## Input and output

| #  | Check                                                                             | Yes / No / N/A | Evidence                                                                                                                                                  |
| -- | --------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 23 | Input from the user is validated on the server, not only in the browser           | **Yes**        | `server/server.js` validates alarm time, AM/PM period, alarm name, repeat days, and Math/Typing challenge type before create and update operations.       |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | **Yes**        | Alarm values are rendered through normal React JSX rather than `dangerouslySetInnerHTML` or raw HTML rendering.                                           |
| 25 | Error responses do not expose stack traces, file paths or connection details      | **Yes**        | Detailed errors are logged on the server while clients receive a generic server error response.                                                           |
| 26 | CORS is not a wildcard on routes that change data                                 | **Yes**        | The Express API reads `CORS_ORIGINS` and restricts allowed origins instead of using `*`. The deployed frontend origin is configured as an allowed origin. |

## Repository and privacy

| #  | Check                                                                                                   | Yes / No / N/A | Evidence                                                                                                                                                                                       |
| -- | ------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | **Yes**        | The project repository was reviewed for unnecessary personal information. Project-author information is limited to the information needed for the course project and repository documentation. |
| 28 | No classmate's personal data in the repository                                                          | **Yes**        | WAKE Protocol does not require classmates' personal information, and the testing data used during development was invented.                                                                    |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored                            | **Yes**        | Project dependencies are installed through npm, while `node_modules` is excluded from version control.                                                                                         |
| 30 | Images, fonts and other assets are mine, licensed, or credited                                          | **Yes**        | The project uses project-created interface assets and standard web/application resources; no uncredited third-party personal assets are required for the deployed application.                 |
| 31 | Repository visibility is deliberate, and I checked it after my last push                                | **Yes**        | The repository is intentionally public for the final project requirement, and the latest deployment-related changes were pushed to the intended `main` branch.                                 |

## Application-specific security considerations

| #  | Check                                                | Status  | Evidence                                                                                                                                |
| -- | ---------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 32 | Security headers are enabled                         | **Yes** | The Express API uses Helmet middleware to provide common HTTP security headers.                                                         |
| 33 | Request body size is limited                         | **Yes** | Express JSON request bodies are limited to `100kb`.                                                                                     |
| 34 | Alarm name length is limited                         | **Yes** | Server-side validation limits the alarm name length to prevent unnecessarily large user-supplied values.                                |
| 35 | No real personal data is required by the application | **Yes** | WAKE Protocol does not require accounts, names, addresses, phone numbers, or other personal information to use the alarm functionality. |
| 36 | Local alarm music remains browser-local              | **Yes** | Selected alarm music is stored in browser IndexedDB rather than uploaded to the server.                                                 |
| 37 | No authentication is claimed as a feature            | **Yes** | The project documentation makes clear that the application does not currently provide user accounts or authentication.                  |

## Anything I found and fixed

The security review helped me separate local development configuration from files that can safely be committed to GitHub. I verified that local `.env` files are ignored, production database credentials are stored in Render environment settings, and the frontend does not contain the production database connection.

I also verified that the API uses parameterized PostgreSQL queries, server-side input validation, restricted CORS origins, generic error responses, Helmet security headers, and a request body-size limit.

Because WAKE Protocol is a course project without user accounts, authentication and user-specific access control were intentionally kept outside the project scope. This means the deployed application should not be presented as a multi-user authenticated system.

The final deployment uses GitHub Pages for the React frontend, Render for the Express API, and Render PostgreSQL for the production database. The security decisions were made around that architecture while keeping the project within its approved scope.
