export const questionFilters = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "difficulty",
    label: "Difficulty",
    options: [
      {
        key: "EASY",
        label: "Easy"
      },
      {
        key: "MEDIUM",
        label: "Medium"
      },
      {
        key: "HARD",
        label: "Hard"
      },
      {
        key: "EXTREME",
        label: "Extreme"
      }
    ]
  }
];

export const questionSorts = [
  {
    key: "name",
    label: "Sort by name",
    direction: 0
  },
  {
    key: "max_score",
    label: "Sort by points",
    direction: 0
  },
  {
    key: "created_at",
    label: "Sort by upload time",
    direction: -1
  }
];
