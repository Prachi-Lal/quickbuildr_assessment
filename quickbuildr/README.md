# Contact Landing — Vite + React + Tailwind + Firebase

Professional contact landing page built with Vite, React, Tailwind CSS, and Firebase Firestore.

**Project Structure**
- `package.json`: scripts and deps
- `vite.config.ts`: Vite config
- `tailwind.config.cjs`, `postcss.config.cjs`: Tailwind setup
- `src/main.tsx`: app entry
- `src/App.tsx`: main layout
- `src/components/Hero.tsx`: hero section
- `src/components/ContactForm.tsx`: contact form and Firestore submission
- `src/firebase/firebase.ts`: Firebase initialization

**Environment variables**
Create a `.env.local` at project root with the following (Vite requires `VITE_` prefix):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Replace `...` with values from your Firebase project settings.

**Setup**

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

Open http://localhost:5173

**Firebase (Firestore) setup**

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore (in Native mode)
3. Add a Web App and copy the config values into `.env.local`
4. Ensure Firestore rules allow writes for testing, then tighten rules for production. Example (allowing writes only if authenticated or server-validated):

```
// For quick testing only — restrict for production!
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{doc} {
      allow create: if true;
    }
  }
}
```

**Deployment**

- Vercel: Connect the repository, set environment variables in Vercel dashboard (same `VITE_*` keys), and deploy.
- Firebase Hosting: run `npm run build` then `firebase deploy --only hosting` after initializing hosting with `firebase init` and configuring `dist` as public directory.

**Notes & Best Practices**
- The Firestore writes are performed client-side for simplicity; for production, consider server-side validation or Cloud Functions to avoid abuse.
- Add CAPTCHA or rate-limiting if expecting public traffic.
