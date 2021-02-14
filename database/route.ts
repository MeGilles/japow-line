import { prisma } from '../database';

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
            mountain: true,
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
 * Returns all routes including only id and name
 *  
 */
export function getRoutesBasicInfo() {
    return prisma.route.findMany({
        select: {
            id: true,
            name: true,
            location: true
        }
    })
}

/**
 * returns the full path of a location or route
 * @param routeName 
 */
export async function getFullPath(name : string) : Promise<string[] | null> {
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
        fatherLocationId = (await prisma.location.findUnique({
            where : {
                name : name
            },
            select : {
                parentId : true,
            }
        })).parentId;
    }
    

    let path : string[];
    path.push(name);

    while(fatherLocationId != null){
        let data = await prisma.location.findUnique({
            where:{
                id : fatherLocationId,
            },
            select : {
                parentId : true,
                name : true
            }
        });
        fatherLocationId = data.parentId;
        path.push(data.name);
    }

    return path;
}