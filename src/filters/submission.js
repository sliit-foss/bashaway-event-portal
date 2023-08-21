export const submissionFilters = [
  {
    key: "graded",
    label: "Status",
    options: [
      {
        key: "true",
        label: "Graded"
      },
      {
        key: "false",
        label: "Not Graded"
      }
    ]
  }
];

export const submissionSorts = [
  {
    key: "created_at",
    label: "Sort by upload time",
    direction: 0
  },
  {
    key: "score",
    label: "Sort by score",
    direction: 0
  }
];
