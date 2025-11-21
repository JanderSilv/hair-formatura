This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Database & Guestbook API

This project includes a small guestbook API using Next.js Route Handlers and Drizzle ORM with SQLite.

Environment variables (add to your .env):

- DATABASE_URL (e.g. file:./guestbook.db or the sqlite cloud URL)
- ADMIN_EMAIL (where new submission notifications will be sent)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (for nodemailer)

Run migrations (drizzle-kit required):

1. Install dependencies: pnpm install
2. Create/inspect DB: pnpm run db:inspect
3. Run drizzle migrations: pnpm run migrate:push

API endpoints

- POST /api/guestbook — create a new request (json body: { name, message, email? })
- GET /api/guestbook?approved=true|false — list requests (filter by approved optional)
- PATCH /api/guestbook/:id — approve request (sets approved = true)

Notes

- Admin authentication is not implemented; protect the admin routes in your app.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
