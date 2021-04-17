import * as db from './database'

export interface MenuContent {
  name: string;
  redirection: string;
  subsections: {
    name: string;
    redirection: string;
  }[] | null,
}

var menuCache : MenuContent[];

/**
 * Get the elements to build the topbar
 */
export async function getTopBarMenu(): Promise<MenuContent[]> {
  if(menuCache !== undefined){
    console.log("LOG: menu.tx : \tused cache")
    return menuCache;
  }
  console.log("LOG: menu.tx : \tdid not use cache")


  let routes: MenuContent = {
    name: "ROUTES",
    redirection: "/routes",
    subsections: [],
  };
  let areas = await db.route.getAllAreas();

  for (let i = 0; i < areas.length; i++ ) {
    routes.subsections.push({name : areas[i], redirection : "/routes/"+areas[i] });
  }

  menuCache = [routes].concat(BaseMenu);
  return menuCache;
}

/**
 * The static elements of the menu
 */
const BaseMenu: MenuContent[] = [
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
    subsections: null,
  },
  {
    name: "ABOUT US",
    redirection: "/aboutus",
    subsections: null,
  },
];