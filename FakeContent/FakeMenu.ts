export const FakeMenu = [
  {
    name: "ROUTES",
    redirection: "/routes",
    subsections: [
      {
        name: "Route 1",
        redirection: "/routes/1",
      },
      {
        name: "Route 2",
        redirection: "/routes/2",
      },
      {
        name: "Route 3",
        redirection: "/routes/3",
      },
      {
        name: "Route 4",
        redirection: "/routes/4",
      },
      {
        name: "Route 5",
        redirection: "/routes/5",
      },
      {
        name: "Route 6",
        redirection: "/routes/6",
      },
      {
        name: "Route 7",
        redirection: "/routes/7",
      },
      {
        name: "Route test",
        redirection: "/routes/test",
      },
    ],
  },
  {
    name: "INFORMATION",
    redirection: "/information",
    subsections: [
      {
        name: "Rules",
        redirection: "/rules",
      },
      {
        name: "Weather",
        redirection: "/weather",
      },
      {
        name: "Avalanches",
        redirection: "/avalanches",
      },
    ],
  },
  {
    name: "PARTNERS",
    redirection: "/partners",
  },
  {
    name: "ABOUT US",
    redirection: "/aboutus",
  },
];

export interface fakeMenu {
  name: string;
  redirection: string;
  subsections: fakeMenu[] | null;
}

