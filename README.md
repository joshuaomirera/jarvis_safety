# Jarvis Safety Consultancy

Jarvis Safety is a website for a workplace health and safety consultancy. It helps organizations learn about safety services, compare offerings, and request bookings or consultations. The site also provides an administrative area for managing service data and monitoring incoming activity.

## What the website does

### For visitors

- **Learn about the consultancy:** browse the home, about, and team pages, including information about the company’s mission and staff.
- **Explore safety services:** view services and filter the catalog by service category, industry, and price range. Available categories include training, audits, policies, compliance, hazardous materials, standardization, and medical services; industries include construction, manufacturing, healthcare, agriculture, mining, oil and gas, and transportation.
- **Request a service booking:** open a service detail page and submit the booking form for that service.
- **Ask questions:** use the on-site chatbot for information about services, pricing, training, and consultations.
- **Get in touch:** use the contact page to compose a message. Note that the current contact form has no submission backend wired up yet.

### For administrators

- Sign in through the admin area.
- View dashboard counts for bookings, consultations, services, chat messages, and pending consultations.
- Manage the services catalog, including creating, editing, and deleting service records.

## Tech stack

- Next.js 15 with the App Router and React 19
- TypeScript and Tailwind CSS
- Firebase Authentication, Cloud Firestore, and Realtime Database
- TanStack Query for fetching and caching service data

## Run locally

### Requirements

- Node.js (use a version supported by Next.js 15)
- npm
- A Firebase project configured for the app

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root and set the Firebase configuration used by `lib/firebase.ts`:

   ```dotenv
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=
   ```

   Configure Firebase Authentication providers, Firestore, and Realtime Database as needed in the Firebase project. Do not commit credentials or service-account private keys.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Build and run the production app with:

```bash
npm run build
npm start
```

The deployed site is available at [jarvis-safety.vercel.app](https://jarvis-safety.vercel.app).

## Project structure

- `app/` — public pages, service details, admin pages, and API routes
- `components/` — shared interface components, booking forms, chatbot, and admin UI
- `contexts/` — shared authentication context
- `lib/` — Firebase initialization and service data access
- `types/` — TypeScript data types
- `scripts/` — utility scripts, including Firestore seed tooling

## Screenshots

![Jarvis Safety website screenshot](https://github.com/user-attachments/assets/2b4537dd-1bd8-4ba1-acda-4c47fe78fb9d)

![Jarvis Safety website screenshot](https://github.com/user-attachments/assets/fe144fd8-d6ac-40de-b699-f40382646869)

## Development notes

This project is under active development. Some areas, such as contact-form submission, still need backend implementation. The admin and booking features rely on correctly configured Firebase services and security rules.
