import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status-card">
        <span className="status-card__code">404</span>
        <h1>Story not found</h1>
        <p>The post you are looking for does not exist or may have moved.</p>
        <Link className="status-card__action" href="/">
          Return to home
        </Link>
      </div>
    </main>
  );
}
