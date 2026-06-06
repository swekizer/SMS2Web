# SMS2Web

Simple SMS dashboard project with:

- `frontend/`: static HTML, CSS, and JavaScript
- `backend/`: Spring Boot API with PostgreSQL

## Local setup

### Backend

Create environment variables before running the backend:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

Example values are in [backend/.env.example](backend/.env.example).

### Frontend

The frontend currently calls:

- `http://localhost:8080/sms`

Before deployment, update the API URL in [frontend/script.js](frontend/script.js) to your live backend URL.

## Deployment direction

- Frontend: Vercel
- Backend: Render using [backend/Dockerfile](backend/Dockerfile)
- Database: Neon PostgreSQL
