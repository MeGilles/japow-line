import { prisma } from '../database';

/**
 * Put automatically some data in the database. If sample data is already present, noting is done.
 */
export async function PopulateDb() {
    let queries = [];
    queries.push(prisma.mountain.create({ data: { name: "富士" } }));
    queries.push(prisma.mountain.create({ data: { name: "Mont Ventoux" } }));
    queries.push(prisma.mountain.create({ data: { name: "Mont Blanc" } }));

    queries.push(prisma.altitudeZone.create({ data: { name: "Go&Alpine" } }));
    queries.push(prisma.altitudeZone.create({ data: { name: "Forest-limit" } }));
    queries.push(prisma.altitudeZone.create({ data: { name: "Below Forest-limit" } }));
    queries.push(prisma.altitudeZone.create({ data: { name: "Area not covered by snow" } }));

    queries.push(prisma.pointType.create({ data: { name: "Big Parking" } }));
    queries.push(prisma.pointType.create({ data: { name: "Parking limited" } }));
    queries.push(prisma.pointType.create({ data: { name: "Top of ski-area" } }));

    queries.push(prisma.routeType.create({ data: { name: "Go&Return" } }));
    queries.push(prisma.routeType.create({ data: { name: "Round-trip" } }));
    queries.push(prisma.routeType.create({ data: { name: "Traverse" } }));
    queries.push(prisma.routeType.create({ data: { name: "Several days" } }));

    await Promise.all(queries).catch(() => console.log("Something went wrong while adding basic data to database, was data already present?"));
    queries = [];

    queries.push(prisma.route.create({
        data: {
            routeName: "Tour au mont 富士",
            mountain: { connect: { name: "富士" } },
            routeType: { connect: { name: "Go&Return" } },
            altitudeZone: { connect: { name: "Forest-limit" } },
            startPointType: { connect: { name: "Parking limited" } },
            map: { create: {} },
            barChart: { create: {} },
            routePoints: "test > test",
            routeDescription: "yesyss",
            elevationDifference: 4,
            maxAltitude: 4,
            minAltitude: 4,
            totalDistance: 4,
            elevationDistance: 4,
            decentDistance: 4
        }
    }));

    //adding with connect to existing but some filds NULL
    queries.push(prisma.route.create({
        data: {
            routeName: "Tour au mont Ventoux",
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
    }));

    //Creating all
    queries.push(prisma.route.create({
        data: {
            routeName: "Tour au mont test",
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
    }));

    //connect or create with existing and not existing
    queries.push(prisma.route.create({
        data: {
            routeName: "Tour au mont 富士 mais pas le meme que le premier",
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
    }));

    queries.push(prisma.route.create({
        data: {
            routeName: "Tour au mont Blanc",
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
    }));

    await Promise.all(queries).catch(() => console.log("Something went wrong while adding route data to database, was routes already present?"));
}

/**
 * Print the all the table content on the console
 */
export function printDbContents() {
    prisma.route.findMany({}).then((route) => {
        console.log("Route information:\n");
        console.dir(route, { depth: null });
    })

    prisma.mountain.findMany({}).then((route) => {
        console.log("mountain information:\n");
        console.dir(route, { depth: null });
    })

    prisma.routeType.findMany({}).then((route) => {
        console.log("routeType information:\n");
        console.dir(route, { depth: null });
    })

    prisma.altitudeZone.findMany({}).then((route) => {
        console.log("altitudeZone information:\n");
        console.dir(route, { depth: null });
    })

    prisma.pointType.findMany({}).then((route) => {
        console.log("pointType information:\n");
        console.dir(route, { depth: null });
    })

    prisma.map_.findMany({}).then((route) => {
        console.log("map_ information:\n");
        console.dir(route, { depth: null });
    })

    prisma.barChart.findMany({}).then((route) => {
        console.log("barChart information:\n");
        console.dir(route, { depth: null });
    })

    prisma.post.findMany({}).then((route) => {
        console.log("post information:\n");
        console.dir(route, { depth: null });
    })
}

/**
 * Empty the database
 */
export async function dropAll() {
    console.log("deleting");
    
    await prisma.route.deleteMany({});
    let queries = [];
    queries.push( prisma.mountain.deleteMany({}));
    queries.push( prisma.routeType.deleteMany({}));
    queries.push( prisma.altitudeZone.deleteMany({}));
    queries.push( prisma.pointType.deleteMany({}));
    queries.push( prisma.map_.deleteMany({}));
    queries.push( prisma.barChart.deleteMany({}));
    queries.push( prisma.post.deleteMany({}));
    await Promise.all(queries);
}