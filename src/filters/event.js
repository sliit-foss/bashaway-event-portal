export const eventFilters = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "availability",
    label: "Availability",
    options: [
      {
        key: "true",
        label: "Open for registration"
      },
      {
        key: "false",
        label: "Closed"
      }
    ]
  },
  {
    key: "settings.automatic_approval",
    label: "Entry process",
    options: [
      {
        key: "true",
        label: "Manual approval"
      },
      {
        key: "false",
        label: "Direct"
      }
    ]
  }
];

export const eventSorts = [
  {
    key: "settings.payments.ticket_cost",
    label: "Sort by ticket price",
    direction: 0
  },
  {
    key: "event_date",
    label: "Sort by event date",
    direction: -1
  }
];
