# FlowPilot AI

FlowPilot AI is a free-tier MERN hackathon project: an AI-powered productivity workspace for students, freelancers, and small teams.

## Problem Statement

Students, freelancers, and small teams often split work across chatbots, notes apps, task boards, and email tools. FlowPilot AI brings those daily productivity workflows into one AI-assisted workspace so users can plan faster, summarize information, and turn messy ideas into action.

## Features

- JWT authentication with bcrypt password hashing
- Dashboard with productivity score, task completion rate, recent notes, and quick AI actions
- AI assistant powered by Hugging Face with deterministic fallback responses
- Smart task board with priorities, estimates, categories, and status tracking
- Smart notes summarizer with key points, action items, and flashcards
- Professional email generator
- Workflow planner for study, internship, freelance, and team scenarios
- MongoDB Atlas support with in-memory local fallback for demos

## Architecture

```txt
React + Vite client
        |
        | VITE_API_URL
        v
Express REST API on Render
        |
        | JWT protected routes
        v
MongoDB Atlas

Express AI service
        |
        | HF_API_TOKEN
        v
Hugging Face Inference
```

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/notes`
- `POST /api/notes`
- `POST /api/ai/chat`
- `POST /api/ai/summarize`
- `POST /api/ai/email`
- `POST /api/ai/workflow`

## Free-Tier Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js
- Database: MongoDB Atlas M0 free cluster
- AI: Hugging Face Inference API / Inference Providers
- Auth: JWT with bcrypt password hashing
- Deployment: Vercel frontend + Render backend

## Local Setup

```bash
npm run install:all
```

Create `server/.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-secret
MONGODB_URI=
HF_API_TOKEN=
HF_MODEL=HuggingFaceH4/zephyr-7b-beta
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run both apps:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Demo Notes

- If `MONGODB_URI` is empty, the backend uses in-memory demo storage.
- If `HF_API_TOKEN` is empty or Hugging Face is unavailable, AI endpoints return useful fallback content.
- For deployment, set environment variables on Render and Vercel.

## Hackathon Evaluation Fit

- Model innovation: combines AI chat, task automation, note intelligence, email generation, and workflow planning.
- Real-world applicability: targets daily productivity problems for students, freelancers, and small teams.
- Technical architecture: split MERN stack, JWT auth, centralized AI service, clean REST routes, safe env-based secrets.
- Documentation clarity: deployment guide, environment checklist, API overview, and free-tier setup notes.

## Production Deployment

Use this exact stack for hackathon submission:

```txt
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
AI: Hugging Face
Auth: JWT
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete Render, Vercel, MongoDB Atlas, Hugging Face, and JWT setup.
See [ENV_CHECKLIST.md](./ENV_CHECKLIST.md) for the exact environment variables to copy into Render and Vercel.

Never commit real API keys, database passwords, or JWT secrets.
