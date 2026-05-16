# FlowPilot AI Deployment

Use this exact stack:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- AI: Hugging Face
- Auth: JWT

## 1. MongoDB Atlas

1. Create a free M0 cluster.
2. Add a database user.
3. Add allowed IP access:
   - For quick deployment, use `0.0.0.0/0`.
   - For stricter security, add Render outbound IPs if available on your plan.
4. Copy the Node.js connection string.
5. Use database name `flowpilot-ai`.

Render environment variable:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/flowpilot-ai?retryWrites=true&w=majority
```

Important: if a database password was shared in a screenshot or chat, rotate it before final submission.

## 2. Hugging Face

1. Go to Hugging Face account settings.
2. Create an access token.
3. Add it to Render.

Render environment variables:

```env
HF_API_TOKEN=<your-hugging-face-token>
HF_MODEL=HuggingFaceH4/zephyr-7b-beta
```

If Hugging Face quota is unavailable, the app still returns fallback AI output for the demo.

## 3. Render Backend

Deploy the `server` folder as a Render Web Service.

Use:

```txt
Root Directory: server
Build Command: npm install
Start Command: npm start
Health Check Path: /health
```

Render environment variables:

```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-vercel-app.vercel.app
JWT_SECRET=<long-random-secret>
MONGODB_URI=<your-mongodb-atlas-uri>
HF_API_TOKEN=<your-hugging-face-token>
HF_MODEL=HuggingFaceH4/zephyr-7b-beta
```

After deployment, verify:

```txt
https://your-render-service.onrender.com/health
```

Expected production response:

```json
{
  "ok": true,
  "storage": "mongodb",
  "ai": "huggingface"
}
```

## 4. Vercel Frontend

Deploy the `client` folder on Vercel.

Use:

```txt
Root Directory: client
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Vercel environment variable:

```env
VITE_API_URL=https://your-render-service.onrender.com/api
```

Redeploy after changing environment variables.

## 5. Submission Checklist

- Public GitHub repository
- Public Vercel frontend link
- Public Render health link
- README with features, setup, architecture, and screenshots
- Demo video link
- No private links
- No exposed API keys, JWT secrets, or database passwords
- Test register, login, tasks, notes, email generator, workflow planner before submitting
