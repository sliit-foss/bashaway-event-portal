import { initializeApp } from "firebase/app";

export const app = initializeApp(JSON.parse(window.atob(import.meta.env.VITE_FIREBASE_CONFIG)));

export default app;
