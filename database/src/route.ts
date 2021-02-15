import { prisma } from '../';

/**
 * Returns all the information about a route
 * @param name the route name in english 
 */
export function getRoute(name : string) {
    const res =  prisma.route.findUnique({
        where: {
            name : name
        },
        include: {
            routeType: true,
            altitudeZone: true,
            startPointType: true,
            endPointType: true,
            location : true,
            map: true,
            barChart: true,
        }
    });
    return res;
}

/**
 * Returns all routes including only path and name
 */
export async function getAllRoutesPaths() : Promise<string[][]>{
    let routes = await prisma.route.findMany({
        select: {
            name: true,
            locationId: true
        }
    });
    
    let res : string[][] = [];
    for (const element of routes) {
        let path = await getCompletePathFromLocationId(element.locationId);
        path.push(element.name);
        res.push(path);
    }
   
    return res;
}

/**
 * Return the complete path for the given location
 * @param id a location id (not a route)
 */
async function getCompletePathFromLocationId(location_id : number) : Promise<string[]>{
    
    let path : string[] = [];

    while(location_id != null){
        let data = await prisma.location.findUnique({
            where:{
                id : location_id,
            },
            select : {
                parentId : true,
                name : true
            }
        });
        location_id = data.parentId;
        path.push(data.name);
    }

    if(path.length == 0){
        return Promise.reject("no location found with this id");
    }
    return path.reverse();
}

/**
 * returns the full path of a location or route with the given name
 * @param routeName 
 */
export async function getFullPathFromName(name : string) : Promise<string[]> {
    let fatherLocationId : number;
    try{
        fatherLocationId = (await prisma.route.findUnique({
            where : {
                name : name
            },
            select : {
                locationId : true,
            }
        })).locationId;
    } catch {
        try{
        fatherLocationId = (await prisma.location.findUnique({
            where : {
                name : name
            },
            select : {
                parentId : true,
            }
        })).parentId;
    } catch {
        return Promise.reject("not found");
    }
    }

    if (fatherLocationId != null){
        const res = (await getCompletePathFromLocationId(fatherLocationId))
        res.push(name);
        return res;
    }
    return [name];
}