"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  clearDemoSession,
  getDemoSessionEmail,
  subscribeDemoSession,
} from "@/lib/demo-auth";

export function AuthAction() {
  const email = useSyncExternalStore(
    subscribeDemoSession,
    getDemoSessionEmail,
    () => null,
  );

  if (!email) {
    return <Link className="nav-auth" href="/login">Sign in</Link>;
  }

  return (
    <button
      className="nav-auth nav-auth--signed-in"
      type="button"
      title={email}
      onClick={clearDemoSession}
    >
      <span className="nav-auth__dot" aria-hidden="true" />
      Sign out
    </button>
  );
}
