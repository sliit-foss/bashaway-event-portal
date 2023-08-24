import * as Sentry from "@sentry/react";

export const initializeTracing = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new Sentry.Replay()],
    environment: import.meta.env.VITE_APP_ENV,
    replaysSessionSampleRate: import.meta.env.VITE_APP_ENV === "production" ? 0.1 : 1.0,
    replaysOnErrorSampleRate: import.meta.env.VITE_APP_ENV === "production" ? 0.1 : 1.0
  });
};

export default initializeTracing;
