import { element } from 'prop-types';
import { prisma, types } from '..';
import { BasicPageData } from './types';

/**
 * Returns all the information about a route
 * @param name the route name in english 
 */
export async function getRoute(name: string) {
    const res = await prisma.route.findUnique({
        where: {
            name: name
        },
        include: {
            routeType: true,
            altitudeZone: true,
            startPointType: true,
            endPointType: true,
            mountain: {
                include: {
                    area: true,
                }
            },
            barChart: true,
        }
    });
    return res;
}

/**
 * Returns all routes paths in a mountain
 * return null when mountain does not exits
 */
export async function getRoutesPaths(mountain : string): Promise<string[][]> {
    let routes = await prisma.route.findMany({
        select: {
            name: true,
            mountain: {
                select: {
                    area: true,
                    name: true,
                }
            },
        },
        where : {
            mountain : {
                name : mountain
            }
        }
    });

    let res: string[][] = [];
    for (const element of routes) {
        res.push([element.mountain.area.name, element.mountain.name, element.name]);
    }

    return res;
}

/**
 * Returns all routes paths
 */
export async function getAllRoutesPaths(): Promise<string[][]> {
    let routes = await prisma.route.findMany({
        select: {
            name: true,
            mountain: {
                select: {
                    area: true,
                    name: true,
                }
            },
        }
    });

    let res: string[][] = [];
    for (const element of routes) {
        res.push([element.mountain.area.name, element.mountain.name, element.name]);
    }

    return res;
}

/**
 * Returns all possible Area
 */
export async function getAllAreas(): Promise<string[]> {
    let result: string[] = [];
    let locations = await prisma.area.findMany({
        select: {
            name: true,
        }
    });

    for (const element of locations) {
        result.push(element.name);
    }
    return result;
}

/**
 * Returns all possible Mountain paths
 */
export async function getAllMountainsPaths(): Promise<string[][]> {
    let result: string[][] = [];
    let locations = await prisma.mountain.findMany({
        select: {
            name: true,
            area: {
                select: {
                    name: true
                }
            }
        }
    });

    for (const element of locations) {
        result.push([element.area.name, element.name]);
    }
    return result;
}

/**
 * Return mountain paths in an area
 */
export async function getMountainsPaths(area : string){
    let result: string[][] = [];
    let locations = await prisma.mountain.findMany({
        select: {
            name: true,
            area: {
                select: {
                    name: true
                }
            }
        },
        where: {
            area : {
                name : area
            }
        }
    });

    for (const element of locations) {
        result.push([element.area.name, element.name]);
    }
    return result;
}

// /**
//  * Returns all the sublocations for the given location name, if the name is null the root locations will be returned
//  */
// export async function getSubLocations(name: string): Promise<types.BasicPageData[]> {
//     let locId;
//     if (name == null) {
//         locId = null;
//     } else {
//         locId = (await prisma.location.findUnique({
//             where: {
//                 name: name,
//             },
//             select: {
//                 id: true,
//             }
//         })).id;
//     }

//     const subLocations = (await prisma.location.findMany({
//         where: {
//             parentId: locId,
//         },
//         select: {
//             name: true,
//             name_jp: true,
//         }
//     }));

//     let pathToHere = getFullPathFromName(name);

//     let locations: BasicPageData[] = [];
//     for (let i = 0; i < subLocations.length; i++) {
//         const element = subLocations[i];
//         locations.push({ name: element.name, name_jp: element.name_jp, path: (await pathToHere).concat(element.name) });
//     }
//     return locations;
// }

// /**
//  * Returns all the routes in the given location name
//  */
// export async function getLocationRoutes(name: string): Promise<types.BasicPageData[]> {
//     let locId;
//     if (name == null) {
//         locId = null;
//     } else {
//         locId = (await prisma.location.findUnique({
//             where: {
//                 name: name,
//             },
//             select: {
//                 id: true,
//             }
//         })).id;
//     }

//     const subRoutes = (await prisma.route.findMany({
//         where: {
//             locationId: locId,
//         },
//         select: {
//             name: true,
//             name_jp: true,
//         }
//     }));

//     let pathToHere = getFullPathFromName(name);

//     let routes: BasicPageData[] = [];
//     for (let i = 0; i < subRoutes.length; i++) {
//         const element = subRoutes[i];
//         routes.push({ name: element.name, name_jp: element.name_jp, path: (await pathToHere).concat(element.name) });
//     }
//     return routes;
// }

// /**
//  * Return the complete path for the given location
//  * @param id a location id (not a route)
//  */
// async function getCompletePathFromLocationId(location_id: number): Promise<string[]> {

//     let path: string[] = [];

//     while (location_id != null) {
//         let data = await prisma.location.findUnique({
//             where: {
//                 id: location_id,
//             },
//             select: {
//                 parentId: true,
//                 name: true
//             }
//         });
//         location_id = data.parentId;
//         path.push(data.name);
//     }

//     if (path.length == 0) {
//         return Promise.reject("no location found with this id");
//     }
//     return path.reverse();
// }

// /**
//  * returns the full path of a location or route with the given name
//  * if the name is null then [] is returned
//  * @param route 
//  */
// export async function getFullPathFromName(name: string): Promise<string[]> {
//     if (name == null) {
//         return [];
//     }
//     let fatherLocationId: number;
//     try {
//         fatherLocationId = (await prisma.route.findUnique({
//             where: {
//                 name: name
//             },
//             select: {
//                 locationId: true,
//             }
//         })).locationId;
//     } catch {
//         try {
//             fatherLocationId = (await prisma.location.findUnique({
//                 where: {
//                     name: name
//                 },
//                 select: {
//                     parentId: true,
//                 }
//             })).parentId;
//         } catch {
//             return Promise.reject("not found");
//         }
//     }

//     if (fatherLocationId != null) {
//         const res = (await getCompletePathFromLocationId(fatherLocationId))
//         res.push(name);
//         return res;
//     }
//     return [name];
// }

// /**
//  * Returns true if the name provided is a location.
//  * @param name 
//  */
// export function isLocation(name: string): Promise<Boolean> {
//     return prisma.location.findFirst({
//         where: {
//             name: name
//         },

//         rejectOnNotFound: true,
//     })
//         .then(() => { return true })
//         .catch(() => { return false });
// }