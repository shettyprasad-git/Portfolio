# FlowPilot AI Environment Variables

Use this checklist when deploying.

## Render Backend

Add these in Render dashboard under your backend service:

```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-vercel-app.vercel.app
JWT_SECRET=generate-a-long-random-secret
MONGODB_URI=mongodb+srv://<db-user>:<db-password>@<cluster-url>/flowpilot-ai?retryWrites=true&w=majority
HF_API_TOKEN=hf_your_hugging_face_token
HF_MODEL=HuggingFaceH4/zephyr-7b-beta
```

## Vercel Frontend

Add this in Vercel dashboard under your frontend project:

```env
VITE_API_URL=https://your-render-service.onrender.com/api
```

## Where To Get Each Value

- `CLIENT_URL`: your final Vercel frontend URL.
- `JWT_SECRET`: any long random secret, at least 32 characters.
- `MONGODB_URI`: MongoDB Atlas connection string from Connect > Drivers.
- `HF_API_TOKEN`: Hugging Face access token from Settings > Access Tokens.
- `VITE_API_URL`: your Render backend URL with `/api` at the end.

## Safety

- Do not commit real `.env` values to GitHub.
- If a password was visible in a screenshot, rotate it in MongoDB Atlas before submitting.
- Keep Hugging Face tokens and MongoDB credentials only in Render environment variables.
