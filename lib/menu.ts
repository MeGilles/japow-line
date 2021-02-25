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
  let rootRoutes = await db.route.getSubLocations(null);

  for (let i = 0; i < rootRoutes.length; i++ ) {
    const route = rootRoutes[i];
    routes.subsections.push({name : route.name, redirection : pathAsString(route.path) });
  }

  menuCache = [routes].concat(BaseMenu);
  return menuCache;
}

/**
 * Returns the path in the string list form into a routable string on the website (begining with /routes/)
 * @param path 
 */
function pathAsString(path:string[]) : string {
  let result : string = "/routes/";
  for(let i = 0; i<path.length; i++){
    result += path[i] + "/";
  }
  return result;
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