# Practical 7 — Authentication and Middleware Pipeline

**Student:** D25CS118 · **Subject:** Advanced Web Development Frameworks (ITUE301)

Continues from **Practical 6** (full-stack Task Manager). Adds JWT authentication,
bcrypt password hashing, an auth middleware on every task route, and server-side
input validation.

## Run locally

```bash
npm install
cp .env.example .env        # then put a long random value in JWT_SECRET
npm run server              # Express on http://localhost:5000  (MongoDB must be running)
npm run dev                 # React on  http://localhost:5173  (second terminal)
# or both at once:
npm run dev:full
```

`.env` is listed in `.gitignore` — the JWT secret is never committed.

## Request pipeline

```
POST /api/auth/register → validateRegister → bcrypt.hash → save User → 201
POST /api/auth/login    → validateLogin    → bcrypt.compare → jwt.sign (1h) → token

Protected route:
Client (Authorization: Bearer <token>)
   → logger → contentType → express.json
   → protect (auth.js: jwt.verify, sets req.user, 401 on failure)
   → validateTaskId / validateTaskBody
   → controller (taskRoutes.js, queries filtered by req.user.id)
   → errorHandler (JSON { error, status }, no stack traces)
```

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | public | `{ name, email, password }` → 201 |
| POST | /api/auth/login | public | `{ email, password }` → `{ token, user }` |
| GET | /api/auth/me | Bearer | Logged-in user's details |
| GET | /api/tasks | Bearer | Tasks of the logged-in user |
| GET | /api/tasks/:id | Bearer | One task |
| POST | /api/tasks | Bearer | Create task (title required) |
| PUT | /api/tasks/:id | Bearer | Update task |
| DELETE | /api/tasks/:id | Bearer | Delete task |

## Validation rules (server side)

| Field | Rule | Error |
|---|---|---|
| name | required, ≥ 2 chars | 400 `details.name` |
| email | required, valid format, lower-cased & trimmed | 400 `details.email` |
| password | required, ≥ 6 chars | 400 `details.password` |
| task title | required, non-empty string, ≤ 100 chars, trimmed | 400 |
| task priority | one of low / medium / high | 400 |
| task id | valid MongoDB ObjectId | 400 |

All errors use the same JSON shape: `{ "error": "...", "status": 4xx }`.

## Tested responses

| Case | Status | Body |
|---|---|---|
| GET /api/tasks without token | 401 | Missing or malformed Authorization header |
| Tampered token | 401 | Invalid token |
| Expired token | 401 | Token expired. Please log in again. |
| Register with bad input | 400 | per-field `details` for name / email / password |
| Register same email twice | 409 | An account with this email already exists |
| Wrong password | 401 | Invalid email or password |
| Create task without title | 400 | Title is required |
| Stored password in MongoDB | — | `$2b$10$…` (bcrypt hash, not plain text) |

## Testing in Postman

Import `postman_collection.json`. Run **Register → Login** — the Login request's test
script saves the token into the `token` collection variable, and the task requests send
`Authorization: Bearer {{token}}` automatically.

## Frontend

- `src/api.js` — one base URL; attaches the token to every request; on any 401 clears
  the token and fires `auth:unauthorized`.
- `src/context/AuthProvider.jsx` — holds the user, restores the session with `/auth/me`
  on reload, logs out on `auth:unauthorized`.
- `ProtectedRoute` — redirects to `/login` (and back again after login) if not logged in.
- Navbar shows the user's name and a **Logout** button that clears the token.

## Key questions

1. **Why hash passwords?** If the database leaks, plain-text passwords are immediately
   usable (and often reused on other sites). bcrypt is one-way, salted and deliberately
   slow, so recovering passwords from the hashes is impractical.
2. **What does the auth middleware verify?** That the token's signature was made with our
   `JWT_SECRET` and that it has not expired. Missing, malformed, tampered or expired
   tokens are rejected with 401 before the controller runs.
3. **Why validate on the server too?** Frontend checks can be bypassed (Postman, curl,
   modified JS). The server is the only place that can be trusted to protect the database.
