export default function Loading() {
  return (
    <main className="loading-shell" aria-busy="true" aria-label="Loading posts">
      <div className="site-shell">
        <div className="loading-bar" />
        <div className="loading-card" />
        <div className="loading-card" />
      </div>
    </main>
  );
}
