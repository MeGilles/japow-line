import { prisma } from '../database';

/**
 * Returns all the information about a route
 * @param routeId 
 */
export function getRoute(routeId: number) {
    return prisma.route.findUnique({
        where: {
            id: routeId
        },
        include: {
            mountain: true,
            routeType: true,
            altitudeZone: true,
            startPointType: true,
            map: true,
            barChart: true,
        }
    });
}

/**
 * Returns all routes including only id and name
 *  
 */
export function getRoutesBasicInfo() {
    return prisma.route.findMany({
        select: {
            id: true,
            routeName: true
        }
    })
}