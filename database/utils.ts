import { prisma } from '../database';

/**
 * Put automatically some data in the database. If sample data is already present, noting is done.
 */
export async function PopulateDb() {
    let queries = [];

    queries.push(prisma.routeType.create({ data: { name: "Go&Return", name_jp: "ゴ　アンド　リターン" } }));
    queries.push(prisma.routeType.create({ data: { name: "Round-trip" } }));
    queries.push(prisma.routeType.create({ data: { name: "Traverse" } }));
    queries.push(prisma.routeType.create({ data: { name: "Several days" } }));

    queries.push(prisma.altitudeZone.create({ data: { name: "Go&Alpine" } }));
    queries.push(prisma.altitudeZone.create({ data: { name: "Forest-limit" } }));
    queries.push(prisma.altitudeZone.create({ data: { name: "Below Forest-limit" } }));
    queries.push(prisma.altitudeZone.create({ data: { name: "Area not covered by snow" } }));

    queries.push(prisma.pointType.create({ data: { name: "Big Parking", name_jp: "大きなパーキング" } }));
    queries.push(prisma.pointType.create({ data: { name: "Parking limited" } }));
    queries.push(prisma.pointType.create({ data: { name: "Top of ski-area" } }));


    queries.push(prisma.location.create({ data: { name: "Alps", name_jp: "アルプス" } }));
    /**/queries.push(prisma.location.create({ data: { name: "Mont Blanc massif", parent: { connect: { name: "Alps" } } } }));
    /**//**/queries.push(prisma.location.create({ data: { name: "Dent du Géant", parent: { connect: { name: "Mont Blanc massif" } } } }));
    /**//**/queries.push(prisma.location.create({ data: { name: "Mont Blanc", parent: { connect: { name: "Mont Blanc massif" } } } }));
    /**/queries.push(prisma.location.create({ data: { name: "Vercors", parent: { connect: { name: "Alps" } } } }));
    /**/queries.push(prisma.location.create({ data: { name: "Ecrins", parent: { connect: { name: "Alps" } } } }));

    queries.push(prisma.location.create({ data: { name: "Massif Central", name_jp: "中央高地" } }));
    /**/queries.push(prisma.location.create({ data: { name: "Chaîne des Puys", parent: { connect: { name: "Massif Central" } } } }));
    /**//**/queries.push(prisma.location.create({ data: { name: "Puy de Dôme", name_jp: "ピュイ・ド・ドーム", parent: { connect: { name: "Chaîne des Puys" } } } }));

    await Promise.all(queries).catch(() => console.log("Something went wrong while adding basic data to database, was data already present?"));
    queries = [];


    queries.push(prisma.route.create({
        data: {
            name: "Tour au mont Blanc",
            name_jp: "モンブランtour",

            description: "Officiis ut ut nostrum perspiciatis dolorem eos. Tempore aut commodi voluptatem qui deserunt aut. Temporibus a quidem sequi et. Quibusdam tempore officiis sint esse aut cumque. Similique magni esse eos amet. Iusto numquam totam similique perferendis aut inventore saepe. Omnis inventore voluptas odit similique reprehenderit optio. Voluptatem distinctio qui sit eum voluptas quae. Est et natus modi officiis error nemo vitae. Qui ut ut est. Corporis temporibus provident voluptas modi excepturi odio facere. Facilis quam corporis aut. Corporis facere voluptas sequi. Doloribus et nulla cum excepturi eaque et perspiciatis. Enim eaque omnis quis minima. Possimus nisi consequatur occaecati aut corporis autem beatae iste. Cupiditate atque cumque possimus est possimus dolorem. Odio est quia aliquam ipsam rerum. Repellat et est praesentium ut et veniam. Non et amet quis maiores eaque error et. Officia expedita sit inventore. Expedita voluptatibus doloribus placeat eos maxime voluptatem fugiat.",
            description_jp: "彼は約束を破った。 きょう何を昼食に食べましたか。 あなたは大変速く走る。 今日はとても暑い。 あなたは大変速く走る。 私たちがそこへ行くかどうかを決めるのは君の責任だ。 あばたもえくぼ」って言うからね。 日没は言葉では表現できないほど美しかった。 いやあ、見事に晴れ渡った秋の日になったね。これが台風一過というやつかね。 いや、大丈夫だ。",

            elevationDifference: 4,
            maxAltitude: 4,
            minAltitude: 4,
            totalDistance: 4,
            elevationDistance: 4,
            decentDistance: 4,

            recomendedMonth: [1, 2, 10, 11, 12],
            picturesPath: [],
            routePoints: ["Clermont-Ferrand", "plateau de abc", "col de truc", "Clermont-Ferrand"],

            location: { connect: { name: "Mont Blanc" } },
            routeType: { connect: { name: "Go&Return" } },
            altitudeZone: { connect: { name: "Forest-limit" } },
            startPointType: { connect: { name: "Parking limited" } },
            endPointType: { connect: { name: "Top of ski-area" } },

            map: { create: {} },
            barChart: { create: {} },
        }
    }));

    queries.push(prisma.route.create({
        data: {
            name: "Tour dans le Vercors",
            name_jp: "ヴェルコール tour",

            description: "Officiis ut ut nostrum perspiciatis dolorem eos. Tempore aut commodi voluptatem qui deserunt aut. Temporibus a quidem sequi et. Quibusdam tempore officiis sint esse aut cumque. Similique magni esse eos amet. Iusto numquam totam similique perferendis aut inventore saepe. Omnis inventore voluptas odit similique reprehenderit optio. Voluptatem distinctio qui sit eum voluptas quae. Est et natus modi officiis error nemo vitae. Qui ut ut est. Corporis temporibus provident voluptas modi excepturi odio facere. Facilis quam corporis aut. Corporis facere voluptas sequi. Doloribus et nulla cum excepturi eaque et perspiciatis. Enim eaque omnis quis minima. Possimus nisi consequatur occaecati aut corporis autem beatae iste. Cupiditate atque cumque possimus est possimus dolorem. Odio est quia aliquam ipsam rerum. Repellat et est praesentium ut et veniam. Non et amet quis maiores eaque error et. Officia expedita sit inventore. Expedita voluptatibus doloribus placeat eos maxime voluptatem fugiat.",
            description_jp: "彼は約束を破った。 きょう何を昼食に食べましたか。 あなたは大変速く走る。 今日はとても暑い。 あなたは大変速く走る。 私たちがそこへ行くかどうかを決めるのは君の責任だ。 あばたもえくぼ」って言うからね。 日没は言葉では表現できないほど美しかった。 いやあ、見事に晴れ渡った秋の日になったね。これが台風一過というやつかね。 いや、大丈夫だ。",

            elevationDifference: 500,
            maxAltitude: 2000,
            minAltitude: 1500,
            totalDistance: 6000,
            elevationDistance: 700,
            decentDistance: 800,

            recomendedMonth: [1, 2, 10, 11, 12],
            picturesPath: [],
            routePoints: ["Vilards de lans", "Col de jesais pas quoi", "quelque chose d'autre"],

            location: { connect: { name: "Dent du Géant" } },
            routeType: { connect: { name: "Traverse" } },
            altitudeZone: { connect: { name: "Forest-limit" } },
            startPointType: { connect: { name: "Parking limited" } },
            endPointType: { connect: { name: "Top of ski-area" } },

            map: { create: {} },
            barChart: { create: {} },
        }
    }));

    queries.push(prisma.route.create({
        data: {
            name: "Tour au puits de dome",
            name_jp: "ピュイ・ド・ドーム tour",

            description: "Officiis ut ut nostrum perspiciatis dolorem eos. Tempore aut commodi voluptatem qui deserunt aut. Temporibus a quidem sequi et. Quibusdam tempore officiis sint esse aut cumque. Similique magni esse eos amet. Iusto numquam totam similique perferendis aut inventore saepe. Omnis inventore voluptas odit similique reprehenderit optio. Voluptatem distinctio qui sit eum voluptas quae. Est et natus modi officiis error nemo vitae. Qui ut ut est. Corporis temporibus provident voluptas modi excepturi odio facere. Facilis quam corporis aut. Corporis facere voluptas sequi. Doloribus et nulla cum excepturi eaque et perspiciatis. Enim eaque omnis quis minima. Possimus nisi consequatur occaecati aut corporis autem beatae iste. Cupiditate atque cumque possimus est possimus dolorem. Odio est quia aliquam ipsam rerum. Repellat et est praesentium ut et veniam. Non et amet quis maiores eaque error et. Officia expedita sit inventore. Expedita voluptatibus doloribus placeat eos maxime voluptatem fugiat.",
            description_jp: "彼は約束を破った。 きょう何を昼食に食べましたか。 あなたは大変速く走る。 今日はとても暑い。 あなたは大変速く走る。 私たちがそこへ行くかどうかを決めるのは君の責任だ。 あばたもえくぼ」って言うからね。 日没は言葉では表現できないほど美しかった。 いやあ、見事に晴れ渡った秋の日になったね。これが台風一過というやつかね。 いや、大丈夫だ。",

            elevationDifference: 4,
            maxAltitude: 2000,
            minAltitude: 1500,
            totalDistance: 6000,
            elevationDistance: 700,
            decentDistance: 800,

            recomendedMonth: [1, 2, 10, 11, 12],
            picturesPath: [],
            routePoints: ["Vilards de lans", "Col de jesais pas quoi", "quelque chose d'autre"],

            location: { connect: { name: "Puy de Dôme" } },
            routeType: { connect: { name: "Round-trip" } },
            altitudeZone: { connect: { name: "Forest-limit" } },
            startPointType: { connect: { name: "Top of ski-area" } },
            endPointType: { connect: { name: "Top of ski-area" } },

            map: { create: {} },
            barChart: { create: {} },
        }
    }));

    queries.push(prisma.route.create({
        data: {
            name: "Tour de test avec plein de trucs qui manquent",
            name_jp: "このページはたくさんの情報が入っていない",

            description: "Officiis ut ut nostrum perspiciatis dolorem eos. Tempore aut commodi voluptatem qui deserunt aut. Temporibus a quidem sequi et. Quibusdam tempore officiis sint esse aut cumque. Similique magni esse eos amet. Iusto numquam totam similique perferendis aut inventore saepe. Omnis inventore voluptas odit similique reprehenderit optio. Voluptatem distinctio qui sit eum voluptas quae. Est et natus modi officiis error nemo vitae. Qui ut ut est. Corporis temporibus provident voluptas modi excepturi odio facere. Facilis quam corporis aut. Corporis facere voluptas sequi. Doloribus et nulla cum excepturi eaque et perspiciatis. Enim eaque omnis quis minima. Possimus nisi consequatur occaecati aut corporis autem beatae iste. Cupiditate atque cumque possimus est possimus dolorem. Odio est quia aliquam ipsam rerum. Repellat et est praesentium ut et veniam. Non et amet quis maiores eaque error et. Officia expedita sit inventore. Expedita voluptatibus doloribus placeat eos maxime voluptatem fugiat.",
            description_jp: "彼は約束を破った。 きょう何を昼食に食べましたか。 あなたは大変速く走る。 今日はとても暑い。 あなたは大変速く走る。 私たちがそこへ行くかどうかを決めるのは君の責任だ。 あばたもえくぼ」って言うからね。 日没は言葉では表現できないほど美しかった。 いやあ、見事に晴れ渡った秋の日になったね。これが台風一過というやつかね。 いや、大丈夫だ。",

            elevationDistance: 4,
            decentDistance: 4,

            picturesPath: [],
            routePoints: ["un", "deux", "trois"],

            location: { connect: { name: "Mont Blanc" } },
            altitudeZone: { connect: { name: "Forest-limit" } },
            startPointType: { connect: { name: "Parking limited" } },

            barChart: { create: {} },
        }
    }));

    await Promise.all(queries).catch(() => console.log("Something went wrong while adding route data to database, was routes already present?"));
}

/**
 * Print the all the table content on the console
 */
export function printDbContents() {
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

    prisma.route.findMany({}).then((route) => {
        console.log("Route information:\n");
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
    queries.push(prisma.routeType.deleteMany({}));
    queries.push(prisma.altitudeZone.deleteMany({}));
    queries.push(prisma.pointType.deleteMany({}));
    queries.push(prisma.map_.deleteMany({}));
    queries.push(prisma.barChart.deleteMany({}));
    queries.push(prisma.post.deleteMany({}));
    queries.push(prisma.location.deleteMany({}));
    await Promise.all(queries);
}

/**
 * return all the database in a giant object
 */
export async function dumpDbContents() {

    let routes = prisma.route.findMany({});
    let routeTypes = prisma.routeType.findMany({});
    let altitudeZones = prisma.altitudeZone.findMany({});
    let pointTypes = prisma.pointType.findMany({});
    let map_s = prisma.map_.findMany({});
    let barCharts = prisma.barChart.findMany({});
    let posts = prisma.post.findMany({});

    return ({
        routes: routes.then(data => { return data }),
        routeTypes: routeTypes.then(data => { return data }),
        altitudeZones: altitudeZones.then(data => { return data }),
        pointTypes: pointTypes.then(data => { return data }),
        map_s: map_s.then(data => { return data }),
        barCharts: barCharts.then(data => { return data }),
        posts: posts.then(data => { return data }),
    })
}