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
            location: true,
            map: true,
            barChart: true,
        }
    });
    return res;
}

/**
 * Returns all routes including only path and name
 */
export async function getAllRoutesPaths(): Promise<string[][]> {
    let routes = await prisma.route.findMany({
        select: {
            name: true,
            locationId: true
        }
    });

    let res: string[][] = [];
    for (const element of routes) {
        let path = await getCompletePathFromLocationId(element.locationId);
        path.push(element.name);
        res.push(path);
    }

    return res;
}

/**
 * Returns all possible location paths
 */
export async function getAllLocationsPaths(): Promise<string[][]> {
    let result: string[][] = [];
    let locations = await prisma.location.findMany({
        select: {
            parentId: true,
            name: true,
        }
    });

    for (let i = 0; i < locations.length; i++) {
        const curr = locations[i];
        if (curr.parentId == null) {
            result.push([curr.name])
        } else {
            let temp = await getCompletePathFromLocationId(curr.parentId);
            temp.push(curr.name)
            result.push(temp);
        }
    }
    return result;
}

/**
 * Returns all the sublocations for the given location name, if the name is "" the root locations will be returned
 * /!\ this function does not populate the BasicPageData.path
 */
export async function getSubLocations(name: string): Promise<types.BasicPageData[]> {
    let locId;
    if (typeof name == 'undefined') {
        locId = null;
    } else {
        locId = (await prisma.location.findUnique({
            where: {
                name: name,
            },
            select: {
                id: true,
            }
        })).id;
    }

    const subLocations = (await prisma.location.findMany({
        where: {
            parentId: locId,
        },
        select: {
            name: true,
            name_jp: true,
        }
    }));

    let locations: BasicPageData[] = [];
    for (let i = 0; i < subLocations.length; i++) {
        const element = subLocations[i];
        locations.push({ name: element.name, name_jp: element.name_jp, path: [] });
    }
    return locations;
}

/**
 * Returns all the routes in the given location name
 *  * /!\ this function does not populate the BasicPageData.path
 */
export async function getLocationRoutes(name: string): Promise<types.BasicPageData[]> {
    let locId;
    if (typeof name == 'undefined') {
        locId = null;
    } else {
        locId = (await prisma.location.findUnique({
            where: {
                name: name,
            },
            select: {
                id: true,
            }
        })).id;
    }

    const subRoutes = (await prisma.route.findMany({
        where: {
            locationId: locId,
        },
        select: {
            name: true,
            name_jp: true,
        }
    }));

    let routes: BasicPageData[] = [];
    for (let i = 0; i < subRoutes.length; i++) {
        const element = subRoutes[i];
        routes.push({ name: element.name, name_jp: element.name_jp, path: [] });
    }
    return routes;
}

/**
 * Return the complete path for the given location
 * @param id a location id (not a route)
 */
async function getCompletePathFromLocationId(location_id: number): Promise<string[]> {

    let path: string[] = [];

    while (location_id != null) {
        let data = await prisma.location.findUnique({
            where: {
                id: location_id,
            },
            select: {
                parentId: true,
                name: true
            }
        });
        location_id = data.parentId;
        path.push(data.name);
    }

    if (path.length == 0) {
        return Promise.reject("no location found with this id");
    }
    return path.reverse();
}

/**
 * returns the full path of a location or route with the given name
 * @param routeName 
 */
export async function getFullPathFromName(name: string): Promise<string[]> {
    let fatherLocationId: number;
    try {
        fatherLocationId = (await prisma.route.findUnique({
            where: {
                name: name
            },
            select: {
                locationId: true,
            }
        })).locationId;
    } catch {
        try {
            fatherLocationId = (await prisma.location.findUnique({
                where: {
                    name: name
                },
                select: {
                    parentId: true,
                }
            })).parentId;
        } catch {
            return Promise.reject("not found");
        }
    }

    if (fatherLocationId != null) {
        const res = (await getCompletePathFromLocationId(fatherLocationId))
        res.push(name);
        return res;
    }
    return [name];
}

/**
 * Returns true if the name provided is a location.
 * @param name 
 */
export function isLocation(name: string): Promise<Boolean> {
    return prisma.location.findFirst({
        where: {
            name: name
        },

        rejectOnNotFound: true,
    })
        .then(() => { return true })
        .catch(() => { return false });
}