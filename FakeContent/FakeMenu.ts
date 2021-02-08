export const FakeMenu = [
  {
    name: "ITINERARIES",
    redirection: "/itineraries",
    subsections: [
      {
        name: "Itinerary 1",
        redirection: "/itineraries/1",
      },
      {
        name: "Itinerary 2",
        redirection: "/itineraries/2",
      },
      {
        name: "Itinerary 3",
        redirection: "/itineraries/3",
      },
      {
        name: "Itinerary 4",
        redirection: "/itineraries/4",
      },
      {
        name: "Itinerary 5",
        redirection: "/itineraries/5",
      },
      {
        name: "Itinerary 6",
        redirection: "/itineraries/6",
      },
      {
        name: "Itinerary 7",
        redirection: "/itineraries/7",
      },
      {
        name: "Itinerary test",
        redirection: "/itineraries/test",
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

