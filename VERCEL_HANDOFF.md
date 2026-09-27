# The Daily Five: Vercel handoff

Date: 2026-09-27

## Changes
Bounded upstream retries and timeout, five-minute Next.js cache, JSON 503 error response, corrected share-image origin, robots and sitemap.

## Local validation
node --test tests/*.test.mjs: 4 passed; npm run lint: passed; npm run build: passed.

## Deployment
Release through the existing GitHub main branch / Vercel integration. Confirm the exact commit reaches READY and recheck the public alias before treating deployment as complete.

## Scope
Real JSONPlaceholder API remains an external dependency. Login is intentionally a browser-local demo.

## Recovery
Use the previous Vercel deployment or revert the scoped commit. No database migrations or live data changes are included.
