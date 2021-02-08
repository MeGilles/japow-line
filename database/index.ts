import { AltitudeZone, Mountain, PrismaClient } from '@prisma/client'
import { RouteType } from 'next/dist/lib/load-custom-routes';
import { delBasePath } from 'next/dist/next-server/lib/router/router';
import { route } from 'next/dist/next-server/server/router';

const prisma = new PrismaClient();

export async function getRoute(routeId : number) {
    return await prisma.route.findUnique({
        where : {
            id : routeId
        },
        include : {
            mountain : true,
            routeType : true,
            altitudeZone : true,
            startPointType : true,
            map : true,
            barChart : true,
        }
    });
}

export async function PopulateDb() {
    await prisma.mountain.create({data: { name : "富士" }});
    await prisma.mountain.create({data: { name : "Mont Ventoux" }});
    await prisma.mountain.create({data: { name : "Mont Blanc" }});

    await prisma.altitudeZone.create({data: { name : "Go&Alpine" }});
    await prisma.altitudeZone.create({data: { name : "Forest-limit" }});
    await prisma.altitudeZone.create({data: { name : "Below Forest-limit" }});
    await prisma.altitudeZone.create({data: { name : "Area not covered by snow" }});

    await prisma.pointType.create({data: { name : "Big Parking" }});
    await prisma.pointType.create({data: { name : "Parking limited" }});
    await prisma.pointType.create({data: { name : "Top of ski-area" }});

    await prisma.routeType.create({data: { name : "Go&Return"}});
    await prisma.routeType.create({data: { name : "Round-trip"}});
    await prisma.routeType.create({data: { name : "Traverse"}});
    await prisma.routeType.create({data: { name : "Several days"}});

    //adding with connect to existing
    console.dir(await prisma.route.create({
        data : {
            routeName : "Tour au mont 富士",
            mountain : {connect : { name : "富士"}},
            routeType : {connect : {name : "Go&Return"}},
            altitudeZone : {connect: {name : "Forest-limit"}},
            startPointType : {connect : {name : "Parking limited"}},
            map : {create : {}},
            barChart : {create : {}},
            routePoints : "test > test",
            routeDescription : "yesyss",
            elevationDifference : 4,
            maxAltitude : 4,
            minAltitude : 4,
            totalDistance : 4,
            elevationDistance : 4,
            decentDistance : 4
        }
    }));

    //adding with connect to existing but some filds NULL
    await prisma.route.create({
        data: {
            routeName : "Tour au mont Ventoux",
            mountain: { connect: { name: "Mont Ventoux" } },
            routeType: { connect: { name: "Round-trip" } },
            altitudeZone: { connect: { name: "Area not covered by snow" } },
            startPointType: { connect: { name: "Top of ski-area" } },
            //map: { create: {} },
            //barChart: { create: {} },
            routePoints: "Gigondas > Col des abeilles > Destination",
            routeDescription: "This is a description for a round trip at mt ventoux",
            elevationDifference: 4,
            maxAltitude: 4,
            minAltitude: 4,
            totalDistance: 4,
            elevationDistance: 4,
            decentDistance: 8,
        }
    });

    //Creating all
    await prisma.route.create({
        data: {
            routeName : "Tour au mont test",
            mountain: { create: { name: "Mont Test" } },
            routeType: { create: { name: "Round-test" } },
            altitudeZone: { create: { name: "Below Forest-test" } },
            startPointType: { create: { name: "Parking test" } },
            map: { create: {} },
            barChart: { create: {} },
            routePoints: "test > test > test",
            routeDescription: "This is a description for a test",
            elevationDifference: 4,
            maxAltitude: 4,
            minAltitude: 4,
            totalDistance: 4,
            elevationDistance: 4,
            decentDistance: 8,
        }
    });

    //connect or create with existing and not existing
    let one = await prisma.route.create({
        data: {
            routeName : "Tour au mont 富士 mais pas le meme que le premier",
            mountain: { connectOrCreate: { where: { name: "富士" }, create: { name: "富士" } } },
            routeType: { connectOrCreate: { where: { name: "DoesnotExist" }, create: { name: "DoesnotExist" } } },
            altitudeZone: { connectOrCreate: { where: { name: "Go&Alpine" }, create: { name: "Go&Alpine" } } },
            startPointType: { connectOrCreate: { where: { name: "Big Parking" }, create: { name: "Big Parking" } } },
            map: { create: {} },
            barChart: { create: {} },
            routePoints: "Grenoble > Test > Grenoble",
            routeDescription: "This is a description",
            elevationDifference: 4,
            maxAltitude: 4,
            minAltitude: 4,
            totalDistance: 4,
            elevationDistance: 4,
            decentDistance: 8,
        }
    });

    let three = await prisma.route.create({
        data: {
            routeName : "Tour au mont Blanc",
            mountain: { connect: { name: "Mont Blanc" } },
            routeType: { connect: { name: "Round-trip" } },
            altitudeZone: { connect: { name: "Below Forest-limit" } },
            startPointType: { connect: { name: "Parking limited" } },
            map: { create: {} },
            barChart: { create: {} },
            routePoints: "Grenoble > Sommet > Pas d'idée",
            routeDescription: "This is a description for a round trip at mt ventoux",
            elevationDifference: 4,
            maxAltitude: 4,
            minAltitude: 4,
            totalDistance: 4,
            elevationDistance: 4,
            decentDistance: 8,
        }
    });
}

export async function printDbContents() {
    console.log("printing");

    console.dir(await prisma.route.findMany({}), { depth: null });
    console.dir(await prisma.mountain.findMany({}), { depth: null });
    console.dir(await prisma.routeType.findMany({}), { depth: null });
    console.dir(await prisma.altitudeZone.findMany({}), { depth: null });
    console.dir(await prisma.pointType.findMany({}), { depth: null });
    console.dir(await prisma.map_.findMany({}), { depth: null });
    console.dir(await prisma.barChart.findMany({}), { depth: null });
    console.dir(await prisma.post.findMany({}), { depth: null });
}

export async function dropAll() {
    console.log("deleting");
    await prisma.route.deleteMany({});
    await prisma.mountain.deleteMany({});
    await prisma.routeType.deleteMany({});
    await prisma.altitudeZone.deleteMany({});
    await prisma.pointType.deleteMany({});
    await prisma.map_.deleteMany({});
    await prisma.barChart.deleteMany({});
    await prisma.post.deleteMany({});
}

export async function getRoutesBasicInfo() {
    return await prisma.route.findMany({
        select : {
            id : true,
            routeName : true
        }
    })
}
