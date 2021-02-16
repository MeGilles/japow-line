import { Prisma } from '@prisma/client'

// Define a type that includes the relation to `Post`
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

export type RouteWithAllDataIncludingLocalization = Prisma.RouteGetPayload<{
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
}>

export type BasicPageData = {
    name : string,
    name_jp : string,
    path : string[],
}

// Define a type that only contains a subset of the scalar fields
type UserPersonalData = Prisma.UserGetPayload<{
    select: { email: true; name: true }
}>