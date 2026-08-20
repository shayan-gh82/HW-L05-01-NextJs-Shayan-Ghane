const SESSION_KEY = "daily-five-demo-session-v1";
const SESSION_EVENT = "daily-five-session-change";

type DemoSession = {
  version: 1;
  email: string;
};

export function readDemoSession(): DemoSession | null {
  try {
    const value = window.localStorage.getItem(SESSION_KEY);
    if (!value) return null;

    const session = JSON.parse(value) as DemoSession;
    return session.version === 1 && session.email ? session : null;
  } catch {
    return null;
  }
}

export function saveDemoSession(email: string) {
  const session: DemoSession = { version: 1, email };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearDemoSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function getDemoSessionEmail() {
  return readDemoSession()?.email ?? null;
}

export function subscribeDemoSession(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(SESSION_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(SESSION_EVENT, onStoreChange);
  };
}
