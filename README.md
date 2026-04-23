# Student Team Manager Frontend

This workspace contains a responsive React frontend for the backend contract described in `/Users/rohitranjan/Downloads/PROJECT_PLAN_README.md`.

## Frontend stack

- React + Vite
- React Router for page routing
- Axios for backend API calls
- Mobile-first CSS with responsive breakpoints at `768px` and `1024px`

## Pages

- `/` homepage with backend-aware summary and entry actions
- `/add` multipart member form with image preview
- `/view` member directory from `GET /api/members`
- `/members/:id` full profile detail page

## Environment

Create `/Users/rohitranjan/Desktop/FSD/frontend/.env` if you want to override the backend URL:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

## Run

```bash
cd frontend
npm install
npm run dev
```

## Figma concept

Design concept file created in Figma:

`https://www.figma.com/design/kJI8gpQbhoxNGzNQTWc9Tq`
