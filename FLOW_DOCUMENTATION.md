# Portfolio System Flow Documentation

Last updated: April 3, 2026
Project: Muhammad Faheem Khan Portfolio (MERN)

## 1) Big Picture

This project has two major runtime parts:

1. Frontend (React + Vite)
- Location: client
- Role: Shows portfolio UI, fetches project data, submits contact form

2. Backend (Express + MongoDB)
- Location: server
- Role: Serves project APIs, contact APIs, stores data in MongoDB, sends emails

Data direction:
Browser UI -> Frontend service layer -> Backend API -> MongoDB -> Backend API -> Frontend -> UI

## 2) Current Production Endpoints

Frontend live:
- https://my-portfolio-envo.onrender.com

Backend API live:
- https://portfolio-ypt2.onrender.com/api

Health check:
- https://portfolio-ypt2.onrender.com/api/health

Projects API:
- https://portfolio-ypt2.onrender.com/api/projects

## 3) Frontend Boot Flow

Entry flow:
1. client/src/main.jsx loads.
2. React mounts App into #root.
3. App renders layout shell and all sections.

Component order in App:
1. Navbar
2. Hero
3. About
4. Skills
5. Projects
6. Experience
7. Contact
8. Footer

Visual behavior:
- Framer Motion handles animations.
- IntersectionObserver hook marks sections visible once they enter viewport.
- This triggers section animations one time for smoother user experience.

## 4) API Base URL Resolution Flow (Important)

File:
- client/src/services/api.js

Flow:
1. Read VITE_API_URL from build environment.
2. Trim it.
3. If empty OR placeholder value contains your-backend-service.onrender.com:
- In production, force fallback to https://portfolio-ypt2.onrender.com/api
- In development, fallback to http://localhost:5000/api
4. Create one axios client with the resolved base URL.
5. Services use that same axios client.

Why this exists:
- Prevents broken production builds if a placeholder env value is accidentally set.

## 5) Projects Data Flow (End-to-End)

### 5.1 UI Side

When Projects section mounts:
1. Projects.jsx useEffect runs.
2. Calls ProjectService.getAll().
3. Shows skeleton cards while loading.
4. On success:
- response.data is validated as array
- projects state is updated
5. On failure:
- logs error
- sets projects to empty array
6. loading set to false

### 5.2 Service Layer

ProjectService.getAll:
- GET /projects
- Actual full URL in production:
  https://portfolio-ypt2.onrender.com/api/projects

### 5.3 Backend Route Layer

In server/src/index.js:
- app.use('/api/projects', projectRoutes)

In server/src/routes/projects.js:
- GET / reads all projects sorted by featured desc then createdAt desc

### 5.4 Database Layer

Mongoose model:
- server/src/models/Project.js

Schema fields:
- title (required)
- description (required)
- image
- technologies (array)
- github
- demo
- featured
- timestamps

## 6) Contact Form Flow (End-to-End)

### 6.1 UI Side

When user submits form:
1. Contact.jsx handleSubmit blocks default form submit.
2. loading = true
3. Calls ContactService.sendMessage(formData)
4. On success:
- success status shown
- form reset
5. On failure:
- error status shown
6. loading = false

### 6.2 Service Layer

ContactService.sendMessage:
- POST /contact
- Production full URL:
  https://portfolio-ypt2.onrender.com/api/contact

### 6.3 Backend Route Layer

In server/src/routes/contact.js:
1. Validate required fields.
2. Validate email pattern.
3. Save contact document in MongoDB.
4. Trigger two email operations asynchronously:
- confirmation email to visitor
- notification email to owner
5. Return success response.

Important behavior:
- Message save is primary.
- Email failure does not fail the request after save.

### 6.4 Database Layer

Mongoose model:
- server/src/models/Contact.js

Schema fields:
- name
- email
- subject
- message
- read (default false)
- timestamps

### 6.5 Email Layer

File:
- server/src/utils/emailService.js

Flow:
1. Lazy create nodemailer transporter (gmail).
2. verifyEmailService checks transporter on server start.
3. sendContactConfirmation sends user-facing acknowledgment.
4. sendContactNotification sends owner-facing lead details.

## 7) Backend Startup Flow

File:
- server/src/index.js

Startup sequence:
1. Load env from server/.env
2. Build express app
3. Configure CORS and JSON parsers
4. Attempt connectDB (non-blocking promise chain)
5. Register root endpoint and /api routes
6. Register /api/health
7. Register global error handler
8. Register fallback 404 handler
9. Start listening on PORT

## 8) Middleware and Error Flow

Error utilities:
- server/src/middleware/errorHandler.js

Flow:
1. Routes call next(new AppError(message, status)) on known failures.
2. Global errorHandler returns JSON:
- success false
- message
- stack only in development mode

Fallback 404 flow:
- Any unknown route returns 404 JSON Route not found.

## 9) CORS Flow

Current CORS logic in server/src/index.js:
1. Build allowedOrigins array from local URLs, GitHub pages URL, CLIENT_URL env.
2. If origin matches startsWith allowed origin, allow.
3. If no origin, allow.
4. Current fallback returns allow all for now.

Note:
- This is permissive right now by design in this codebase.

## 10) Build and Deployment Flow

### 10.1 Frontend Build

Toolchain:
- Vite build
- Output folder from client/vite.config.js: build

Render static deployment uses:
- Root directory: client
- Build command: npm run build
- Publish directory: build

### 10.2 Backend Deployment

Backend runs as web service with start command:
- npm run start --prefix server
or inside server service:
- npm run start

Health endpoint confirms runtime.

## 11) Environment Variables Flow

Frontend:
- VITE_API_URL

Backend:
- PORT
- NODE_ENV
- MONGODB_URI
- EMAIL_USER
- EMAIL_PASSWORD
- CLIENT_URL

Resolution priority on frontend:
1. Valid VITE_API_URL
2. If missing/placeholder:
- production fallback to portfolio-ypt2 backend
- development fallback to localhost:5000/api

## 12) Data Seeding Flow

File:
- server/seed.js

Flow:
1. Connect to MongoDB
2. Delete all existing projects
3. Insert default project list
4. Exit process

Use when:
- New database
- Empty project list
- Resetting demo data

## 13) Typical Request Lifecycles

### 13.1 Projects Fetch Lifecycle

1. User opens site
2. Projects component mounts
3. Frontend sends GET /api/projects
4. Backend route queries Project collection
5. Backend returns array JSON
6. Frontend updates cards

### 13.2 Contact Submit Lifecycle

1. User fills form
2. Frontend sends POST /api/contact with body
3. Backend validates data
4. Backend saves Contact document
5. Backend queues emails
6. Backend returns success
7. Frontend shows success and clears form

## 14) Why Projects Were Not Loading (Resolved Case)

Observed issue:
- UI was new and loaded
- Projects section stayed empty

Root cause:
- Built JS was using placeholder backend URL string

Fix applied:
- API URL guard added in client/src/services/api.js and client/src/services/api.ts
- Production fallback now enforces real backend URL if placeholder is detected

Validation done:
- Backend /api/health returns OK
- Backend /api/projects returns data
- New build bundle contains portfolio-ypt2.onrender.com/api

## 15) Quick Troubleshooting Checklist

If projects do not load:
1. Open browser Network tab and inspect request URL for /projects.
2. Verify request goes to portfolio-ypt2 backend.
3. Open backend /api/health directly.
4. Open backend /api/projects directly.
5. Check frontend build env on Render for VITE_API_URL.
6. Clear build cache and redeploy frontend.
7. Hard refresh with query parameter.

If contact fails:
1. Check backend logs for validation error.
2. Verify MongoDB connectivity.
3. Verify EMAIL_USER and EMAIL_PASSWORD values.
4. Confirm /api/contact returns success JSON.

## 16) Local Development Flow

Run both:
- npm run dev (root)

This launches:
- client dev server (Vite)
- server dev server (nodemon)

Default local endpoints:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API base expected in local: http://localhost:5000/api

## 17) Summary

System behavior in one line:
- React UI sections call service methods, axios calls Express APIs, Express uses Mongoose to read/write MongoDB, optional emails are sent for contact, then responses return to UI for rendering and feedback.

Current status:
- Live UI is updated
- Projects flow is working again
- Contact flow remains connected to backend
