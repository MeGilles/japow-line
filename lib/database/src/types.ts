import { Prisma } from '@prisma/client'

/**
 * Defines the type of data fetched to be displayed on route page
 */
export type RouteWithAllData = Prisma.RouteGetPayload<{
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
    excude: {
        name_jp : true,
    }
}>

/**
 * Define the type for the route and location.
 * It is mostly used in route/[[...location]]
 */
export type BasicPageData = {
    name : string,
    name_jp : string,
    path : string[],
}
