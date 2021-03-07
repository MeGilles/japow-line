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
        await prisma.altitudeZone.create({ data: { name: "Alpine" } });
        await prisma.altitudeZone.create({ data: { name: "Forest-limit" } });
        await prisma.altitudeZone.create({ data: { name: "Forest" } });
        await prisma.altitudeZone.create({ data: { name: "Below Forest-limit" } });
        await prisma.altitudeZone.create({ data: { name: "Area not covered by snow" } });

        await prisma.pointType.create({ data: { name: "Big Parking", name_jp: "大きなパーキング" } });
        await prisma.pointType.create({ data: { name: "Parking limited" } });
        await prisma.pointType.create({ data: { name: "Top of ski-area" } });

        await prisma.area.create({ data: { name: "Alps", name_jp: "アルプス" } });
        /**/await prisma.mountain.create({ data: { name: "Mont Blanc", area: { connect: { name: "Alps" } } } });
        /**/await prisma.mountain.create({ data: { name: "Mont autre", area: { connect: { name: "Alps" } } } });

        await prisma.area.create({ data: { name: "Hakuba", name_jp: "白馬" } });
        /**/await prisma.mountain.create({ data: { name: "Happo", name_jp: "八方", area: { connect: { name: "Hakuba" } } } });
        /**/await prisma.mountain.create({ data: { name: "other mountain", name_jp: "他の山", area: { connect: { name: "Hakuba" } } } });

        await prisma.route.create({
            data: {
                name: "Oshisashisawa",
                name_jp: "おしだしさわ",

                description: "Officiis ut ut nostrum perspiciatis dolorem eos. Tempore aut commodi voluptatem qui deserunt aut. Temporibus a quidem sequi et. Quibusdam tempore officiis sint esse aut cumque. Similique magni esse eos amet. Iusto numquam totam similique perferendis aut inventore saepe. Omnis inventore voluptas odit similique reprehenderit optio. Voluptatem distinctio qui sit eum voluptas quae. Est et natus modi officiis error nemo vitae. Qui ut ut est. Corporis temporibus provident voluptas modi excepturi odio facere. Facilis quam corporis aut. Corporis facere voluptas sequi. Doloribus et nulla cum excepturi eaque et perspiciatis. Enim eaque omnis quis minima. Possimus nisi consequatur occaecati aut corporis autem beatae iste. Cupiditate atque cumque possimus est possimus dolorem. Odio est quia aliquam ipsam rerum. Repellat et est praesentium ut et veniam. Non et amet quis maiores eaque error et. Officia expedita sit inventore. Expedita voluptatibus doloribus placeat eos maxime voluptatem fugiat.",
                description_jp: "彼は約束を破った。 きょう何を昼食に食べましたか。 あなたは大変速く走る。 今日はとても暑い。 あなたは大変速く走る。 私たちがそこへ行くかどうかを決めるのは君の責任だ。 あばたもえくぼ」って言うからね。 日没は言葉では表現できないほど美しかった。 いやあ、見事に晴れ渡った秋の日になったね。これが台風一過というやつかね。 いや、大丈夫だ。",

                elevationDifference: 500,
                maxAltitude: 2000,
                minAltitude: 1500,
                totalDistance: 6000,
                elevationDistance: 700,
                decentDistance: 800,

                recomendedMonth: [3, 12],
                picturesPath: [],
                routePoints: ["abcdef", "ghij", "klmnop"],

                mountain: { connect: { name: "Happo" } },
                routeType: { connect: { name: "Traverse" } },
                altitudeZone: { connect: [{ name: "Alpine" }, { name: "Forest-limit" }, { name: "Forest" }] },
                startPointType: { connect: { name: "Parking limited" } },
                endPointType: { connect: { name: "Top of ski-area" } },

                mapUrl: "https://www.google.com/maps/d/embed?mid=1o6YnKQp6fH9ST_4J2fNH3SkOD9C8fQnt&hl=ja",
                barChart: { create: {} },
            }
        });


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

                mountain: { connect: { name: "Mont Blanc" } },
                routeType: { connect: { name: "Go&Return" } },
                altitudeZone: { connect: [{ name: "Forest-limit" }] },
                startPointType: { connect: { name: "Parking limited" } },
                endPointType: { connect: { name: "Top of ski-area" } },

                mapUrl: null,
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

                mountain: { connect: { name: "Mont Blanc" } },
                altitudeZone: { connect: [{name: "Forest-limit" }] },
                startPointType: { connect: { name: "Parking limited" } },

                barChart: { create: {} },
            }
        });


        let password = hashNewPassword("thisisapassword");
        await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john.doe@example.com",
                hashedPassword: password.password, //TODO: remove in production //defined just above 
                hashedPasswordSalt: password.salt,
                image: "/public/userdata/profilepicture/a413b92646b6d3b48fb7f3683761131ac24c1e6e.jpeg"
            }
        });

        password = hashNewPassword("password");
        await prisma.user.create({
            data: {
                name: "Jane Doe",
                email: "jane.doe@test.com",
                hashedPassword: password.password, //TODO: remove in production //defined just above
                hashedPasswordSalt: password.salt,
                image: "/public/userdata/profilepicture/1991b19a98b5e97bf15bd9ced2072d8823c49c27.jpeg"
            }
        });

        console.log("database populated");
    } catch {
        console.log("something whent wrond while adding data to database, maybe it was already present?");
    }
}

/**
 * Print the all the table content on the console
 */
export function printDbContents(): void {
    prisma.routeType.findMany({}).then((data) => {
        console.log("routeType information:\n");
        console.dir(data, { depth: null });
    })

    prisma.altitudeZone.findMany({}).then((data) => {
        console.log("altitudeZone information:\n");
        console.dir(data, { depth: null });
    })

    prisma.pointType.findMany({}).then((data) => {
        console.log("pointType information:\n");
        console.dir(data, { depth: null });
    })

    prisma.barChart.findMany({}).then((data) => {
        console.log("barChart information:\n");
        console.dir(data, { depth: null });
    })

    prisma.post.findMany({}).then((data) => {
        console.log("post information:\n");
        console.dir(data, { depth: null });
    })

    prisma.route.findMany({}).then((data) => {
        console.log("Route information:\n");
        console.dir(data, { depth: null });
    })

    prisma.mountain.findMany({}).then((data) => {
        console.log("mountain information:\n");
        console.dir(data, { depth: null });
    })

    prisma.area.findMany({}).then((data) => {
        console.log("area information:\n");
        console.dir(data, { depth: null });
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
    await prisma.area.deleteMany({});
    await prisma.barChart.deleteMany({});
    await prisma.mountain.deleteMany({});
    await prisma.post.deleteMany({});
    console.log("all data deleted");
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
    let area = prisma.area.findMany({});
    let barCharts = prisma.barChart.findMany({});
    let posts = prisma.post.findMany({});
    let mountain = prisma.mountain.findMany({});

    return ({
        routes: await routes,
        routeTypes: await routeTypes,
        altitudeZones: await altitudeZones,
        pointTypes: await pointTypes,
        area: await area,
        barCharts: await barCharts,
        posts: await posts,
        mountain: await mountain,
    })
}