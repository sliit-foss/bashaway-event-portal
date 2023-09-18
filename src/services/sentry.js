import * as Sentry from "@sentry/react";

export const initializeTracing = () => {
  if (import.meta.env.VITE_APP_ENV !== "local") {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.Replay({
          maskAllText: false,
          maskAllInputs: false,
          networkRequestHeaders: ["x-user-email"],
          networkResponseHeaders: ["x-correlation-id"]
        })
      ],
      environment: import.meta.env.VITE_APP_ENV,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 1.0
    });
  }
};

export default initializeTracing;
