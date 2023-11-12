export const challengeColor = (challenge) => {
  if (challenge?.difficulty === "HARD" || challenge?.difficulty === "EXTREME") {
    return "card-red";
  } else if (challenge?.difficulty === "MEDIUM") {
    return "card-blue";
  } else {
    return "card-green";
  }
};
