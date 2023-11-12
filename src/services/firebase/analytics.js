import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import { authUser } from "@/utils";
import app from "./app";

const analytics = getAnalytics(app);

export const track = (name, params) => {
  const user = authUser();
  setUserId(analytics, user?._id || "Anonymous");
  logEvent(analytics, name, {
    ...params,
    name: user?.name || "N/A",
    email: user?.email ?? "N/A",
    user_agent: navigator.userAgent,
    platform: navigator.platform
  });
};

export const tracker = {
  event: track,
  error: (error, info) => track("crash", { error: error?.message, info: info && JSON.stringify(info) })
};
