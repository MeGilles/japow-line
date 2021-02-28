import { prisma } from '..';
import { hashNewPassword } from '../../passwordhasher';

/**
 * Put automatically some data in the database. If sample data is already present, noting is done, but an error message will be printed
 */
export async function populateDb() {
    try {
        await prisma.routeType.create({ data: { name: "Go&Return", name_jp: "ゴ　アンド　リターン" } });
        await prisma.routeType.create({ data: { name: "Round-trip" } });
        await prisma.routeType.create({ data: { name: "Traverse" } });
        await prisma.routeType.create({ data: { name: "Several days" } });

        await prisma.altitudeZone.create({ data: { name: "Go&Alpine" } });
        await prisma.altitudeZone.create({ data: { name: "Forest-limit" } });
        await prisma.altitudeZone.create({ data: { name: "Below Forest-limit" } });
        await prisma.altitudeZone.create({ data: { name: "Area not covered by snow" } });

        await prisma.pointType.create({ data: { name: "Big Parking", name_jp: "大きなパーキング" } });
        await prisma.pointType.create({ data: { name: "Parking limited" } });
        await prisma.pointType.create({ data: { name: "Top of ski-area" } });


        await prisma.location.create({ data: { name: "Alps", name_jp: "アルプス" } });
        /**/await prisma.location.create({ data: { name: "Mont Blanc massif", parent: { connect: { name: "Alps" } } } });
        /**//**/await prisma.location.create({ data: { name: "Dent du Géant", parent: { connect: { name: "Mont Blanc massif" } } } });
        /**//**/await prisma.location.create({ data: { name: "Mont Blanc", parent: { connect: { name: "Mont Blanc massif" } } } });
        /**/await prisma.location.create({ data: { name: "Vercors", parent: { connect: { name: "Alps" } } } });
        /**/await prisma.location.create({ data: { name: "Ecrins", parent: { connect: { name: "Alps" } } } });

        await prisma.location.create({ data: { name: "Massif Central", name_jp: "中央高地" } });
        /**/await prisma.location.create({ data: { name: "Chaîne des Puys", parent: { connect: { name: "Massif Central" } } } });
        /**//**/await prisma.location.create({ data: { name: "Puy de Dôme", name_jp: "ピュイ・ド・ドーム", parent: { connect: { name: "Chaîne des Puys" } } } });


        await prisma.route.create({
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
        });

        await prisma.route.create({
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
        });

        await prisma.route.create({
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
        });

        await prisma.route.create({
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
        });


        await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john.doe@example.com",
                //hint : password is "test"
                hashedPassword: "0a59762d3d204305d3390344d277699ac95a21973fdb7eb21a75e473fdb2c46b57b1d2ff074dd9b0717b3dd84515db4da6862834cb455f39d6e4478da34bbae0",
                hashedPasswordSalt: "8951d1e529bd1029420f0d90",
                image: "/userdata/profilepicture/a413b92646b6d3b48fb7f3683761131ac24c1e6e.jpeg"
            }
        });

        await prisma.user.create({
            data: {
                name: "Jane Doe",
                email: "jane.doe@test.com",
                //hint : password is "password"
                hashedPassword: "9e11feae352c89ae52f1ed44acdf9363994b463c3226b01e352712f4665f7eb8e74db85b9fd4dd9f4fa76017dc9ced0f9fa00b347343aa42fb95b23627305ae5",
                hashedPasswordSalt: "fa23056daf22a27e1e5358ba",
                image: "/userdata/profilepicture/1991b19a98b5e97bf15bd9ced2072d8823c49c27.jpeg"
            }
        });

        console.log("LOG : database utils.tx : \tdatabase populated");
    } catch {
        console.log("LOG : database utils.tx : \tsomething whent wrond while adding data to database, maybe it was already present?");
    }
}

/**
 * Print the all the table content on the console
 */
export function printDbContents(): void {
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

    prisma.location.findMany({}).then((route) => {
        console.log("Route information:\n");
        console.dir(route, { depth: null });
    })

}

/**
 * Empty the database
 */
export async function dropAll() {
    await prisma.user.deleteMany({});
    await prisma.route.deleteMany({});
    await prisma.routeType.deleteMany({});
    await prisma.altitudeZone.deleteMany({});
    await prisma.pointType.deleteMany({});
    await prisma.map_.deleteMany({});
    await prisma.barChart.deleteMany({});
    await prisma.location.deleteMany({});
    await prisma.post.deleteMany({});
    console.log("LOG : database utils.tx : \tall data deleted");
}

/**
 * return the database in a giant object
 * /!\ the user data is not included in the dump
 */
export async function dumpDbContents() {

    let routes = prisma.route.findMany({});
    let routeTypes = prisma.routeType.findMany({});
    let altitudeZones = prisma.altitudeZone.findMany({});
    let pointTypes = prisma.pointType.findMany({});
    let map_s = prisma.map_.findMany({});
    let barCharts = prisma.barChart.findMany({});
    let posts = prisma.post.findMany({});
    let locations = prisma.location.findMany({});

    return ({
        routes: await routes,
        routeTypes: await routeTypes,
        altitudeZones: await altitudeZones,
        pointTypes: await pointTypes,
        map_s: await map_s,
        barCharts: await barCharts,
        posts: await posts,
        locations: await locations,
    })
}