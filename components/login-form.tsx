"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveDemoSession } from "@/lib/demo-auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!EMAIL_PATTERN.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    saveDemoSession(email);
    router.push("/");
    router.refresh();
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="reader@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-describedby={error ? "login-error" : undefined}
      />

      <div className="login-form__label-row">
        <label htmlFor="password">Password</label>
        <button
          className="login-form__toggle"
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          aria-pressed={showPassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="At least 6 characters"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-describedby={error ? "login-error" : undefined}
      />

      {error ? <p className="login-form__error" id="login-error" role="alert">{error}</p> : null}

      <button className="login-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Entering…" : "Enter the reading room"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
