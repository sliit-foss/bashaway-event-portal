export const githubOrgLink = "https://github.com/gdgsrilanka";
export const repositoryLink = "https://github.com/gdgsrilanka/techevents-portal";
export const scorekeeperRepositoryLink = "https://github.com/gdgsrilanka/scorekeeper";
export const gdgPageLink = "https://gdg.community.dev/gdg-sri-lanka";
export const cocLink = "https://devfest.gdgsrilanka.org/coc";

export let leaderboardURL = "https://leaderboard.techevents.gdgsrilanka.org";

if (import.meta.env.VITE_APP_ENV !== "production") {
  leaderboardURL = leaderboardURL.replace("leaderboard.", `leaderboard.${import.meta.env.VITE_APP_ENV}.`);
}
