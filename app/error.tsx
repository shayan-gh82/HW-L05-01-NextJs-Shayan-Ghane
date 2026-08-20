"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="status-page">
      <div className="status-card">
        <span className="status-card__code">!</span>
        <h1>Something went wrong</h1>
        <p>We could not load the stories right now. Please try the request again.</p>
        <button className="status-card__action" type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </main>
  );
}
