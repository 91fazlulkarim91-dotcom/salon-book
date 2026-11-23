# SalonBook

SalonBook is a salon discovery and booking app built with Next.js. The homepage helps visitors explore services and salons, and users can create an account or sign in with email/password or Google.

## Features

- Salon discovery rows and a reviews carousel
- Scroll animations with AOS, respecting reduced-motion preferences
- Better Auth email/password registration and Google sign-in
- Optional profile image by URL or upload (up to 2 MB)
- Role-aware dashboard routing:
  - Regular users return to the homepage
  - Admins go to `/admin`
  - Salon owners and professionals go to `/salon-dashboard`
- Public registration assigns the default user role. Assign admin access only through a trusted, server-side administrative process.

## Requirements

- Node.js and npm
- MongoDB running locally at `mongodb://localhost:27017/database` (configured in `lib/auth.ts`)
- Google OAuth credentials to enable Google sign-in

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env.local` file in the project root:

```dotenv
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

Keep secrets out of source control. Configure the Google OAuth consent screen and add the Better Auth Google callback URL for your deployment to the authorized redirect URIs. Google sign-in requires valid client credentials.

The MongoDB connection string is currently set in `lib/auth.ts`; update it there if your MongoDB server uses a different address.

## Scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Start the production server
```

## Authentication and roles

Authentication endpoints are handled by Better Auth at `/api/auth/[...all]`. The Better Auth admin plugin assigns new public registrations the `user` role. Admin and salon roles must be assigned through a trusted administrative process; they are not selectable during registration.

After sign-in, `/dashboard` routes the session according to its role. The `/admin` page is restricted to users with the `admin` role, and `/salon-dashboard` is restricted to `salon`, `owner`, or `professional` roles.

## Technology

- Next.js 16 and React 19
- Better Auth with MongoDB
- AOS (Animate On Scroll)
- Tailwind CSS 4
