# The Daily Five

A dynamic editorial blog built with Next.js, TypeScript, and the App Router. It
opens with the first five posts from JSONPlaceholder, then lets readers load the
collection in batches of five.

## Features

- Home page at `/` with the first five API posts
- Creative "Open 5 more stories" progressive loading control
- Dynamic post pages at `/posts/[id]`
- Demo login page at `/login` with client-side validation
- Versioned local demo session (the password is never stored)
- Server-side data fetching
- Route Handler for loading additional posts
- Loading, error, and not-found states
- Responsive and accessible interface
- Dynamic page metadata

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Production build

```bash
npm run build
```

## API

- Posts: `https://jsonplaceholder.typicode.com/posts`
- Single post: `https://jsonplaceholder.typicode.com/posts/[id]`
