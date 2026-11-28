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
- MongoDB; locally, the app defaults to `mongodb://localhost:27017/database`
- Google OAuth credentials to enable Google sign-in

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` in the project root and fill in the values:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=15m
MONGODB_URI=mongodb://localhost:27017/salonbook
MONGODB_DB=salonbook
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

Set the public URLs and secrets in the Next.js deployment environment. `NEXT_PUBLIC_API_URL` points to the Express API; `NEXT_PUBLIC_BETTER_AUTH_URL` and `BETTER_AUTH_URL` point to the Next.js app hosting `/api/auth`. Use a securely generated `BETTER_AUTH_SECRET` and a reachable MongoDB URI/database. Keep `.env.local` and secrets out of source control. Configure Google OAuth credentials in the Next.js app and add its Better Auth callback URL to the authorized redirect URIs. The Stripe publishable key is public; do not put the Stripe secret key in the client environment.

`JWT_EXPIRES_IN` controls Better Auth JWT lifetime and defaults to `15m`. The Express API verifies those JWTs through Better Auth's public JWKS, so it does not use a separate `JWT_SECRET`.

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
