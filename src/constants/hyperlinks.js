export const githubOrgLink = "https://github.com/sliit-foss";
export const repositoryLink = "https://github.com/sliit-foss/bashaway-event-portal";
export const scorekeeperRepositoryLink = "https://github.com/sliit-foss/scorekeeper";
export const sliitFossMainWebsite = "https://sliitfoss.org";
export const ruleLink = "https://bashaway.sliitfoss.org#rules";
export const whatsappLink = "https://chat.whatsapp.com/JPJYJr4gRiTEMLpWmH1QXh";

export let leaderboardURL = "https://leaderboard.bashaway.sliitfoss.org";

if (import.meta.env.VITE_APP_ENV !== "production") {
  leaderboardURL = leaderboardURL.replace("leaderboard.", `leaderboard.${import.meta.env.VITE_APP_ENV}.`);
}
