import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Demo member sign-in for The Daily Five.",
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-story" aria-label="The Daily Five introduction">
        <Link className="brand login-story__brand" href="/">
          <span className="brand__mark">5</span>
          <span>The Daily Five</span>
        </Link>

        <div className="login-story__copy">
          <p className="eyebrow">A quieter place to read</p>
          <h1>Your next thoughtful pause starts here.</h1>
          <p>
            Sign in to enter the reading room and continue exploring the
            collection one chapter at a time.
          </p>
        </div>

        <p className="login-story__footnote">Five stories first. Curiosity after.</p>
      </section>

      <section className="login-panel" aria-labelledby="login-title">
        <Link className="login-panel__back" href="/">
          <span aria-hidden="true">←</span> Back to stories
        </Link>
        <div className="login-panel__content">
          <p className="login-panel__kicker">Member access</p>
          <h2 id="login-title">Welcome back</h2>
          <p className="login-panel__intro">
            Enter any valid email and a password of at least six characters.
          </p>
          <LoginForm />
          <p className="login-panel__demo">
            Demo mode — your password is never stored or sent anywhere.
          </p>
        </div>
      </section>
    </main>
  );
}
