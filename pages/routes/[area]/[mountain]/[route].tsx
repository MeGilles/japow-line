import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { Layout, TopBanner, RouteNavigationPanel, RoutePanel } from '../../../../components';
import style from "../../[id].module.scss";
import { getTopBarMenu } from '../../../../lib/menu';
import * as db from '../../../../lib/database'
import { lang } from '../../../../lib/lang';
import { RouteData } from '../../../../lib/types';

export default function Route({ routeData, areaData, menuItems, currentPath }: { routeData : RouteData, currentPath: string[], areaData, menuItems }) {
    //subLocations : db.types.BasicPageData[]
    //subRoutes : db.types.BasicPageData[]
    //routeData : not yet properly defined

    return (
        <Layout menuItems={menuItems}>
            <Head>
                <title>{routeData.routeName}</title>
            </Head>
            <TopBanner />
            <div className={style.route_container}>
                <RouteNavigationPanel path={currentPath} />
                <RoutePanel routeName={routeData.routeName}
                    mountainName={routeData.mountainName}
                    recommendedMonth={routeData.recomendedMonth}
                    routeType={routeData.routeType}
                    altitudeZone={routeData.altitudeZone}
                    elevationDifference={routeData.elevationDifference}
                    maxAltitude={routeData.maxAltitude}
                    minAltitude={routeData.minAltitude}
                    totalDistance={routeData.totalDistance}
                    elevationDistance={routeData.elevationDistance}
                    decentDistance={routeData.decentDistance}
                    startPoint={routeData.startPoint}
                    goalPoint={routeData.endPoint}
                    map={routeData.mapUrl}
                    elevationChart={routeData.elevationChart}
                    description={routeData.description}
                />
            </div>
        </Layout>
    )

}


export const getStaticProps: GetStaticProps = async (context) => {
    //const locale = context.locale; //not used for the moment

    if (typeof context.params.route != 'string') {
        console.error("ERROR : [route].ts \t invalid context.params.route")
        return;
    }

    let route = await db.route.getRoute(context.params.route);

    let routeData: RouteData = {
        routeName: route.name,
        mountainName: route.mountain.name,
        recommendedMonth: route.recomendedMonth.map((month) => numberToMonth(month, lang.EN)),
        routeType: route.routeType.name,
        altitudeZone: route.altitudeZone.map((x) => x.name),
        elevationDifference: route.elevationDifference,
        maxAltitude: route.maxAltitude,
        minAltitude: route.minAltitude,
        totalDistance: route.totalDistance,
        elevationDistance: route.elevationDifference,
        decentDistance: route.decentDistance,
        startPoint: route.startPointType.name,
        endPoint: route.endPointType.name,
        mapUrl: route.mapUrl,
        elevationChart: null,
        description: route.description,
        pictures : route.picturesPath,
    }

    return {
        props: {
            routeData,
            currentPath: [context.params.area, context.params.mountain, context.params.route],
            menuItems: await getTopBarMenu(),
        },
        //revalidate: 60, //regenerate the page every 60 seconds
    };
}


export const getStaticPaths: GetStaticPaths = async () => {
    const routes = await db.route.getAllRoutesPaths();

    let result = [];
    for (let i=0; i<routes.length; i++) {
        result.push({ params: { area: routes[i][0], mountain: routes[i][1], route: routes[i][2] } })
    }

    console.dir(result);

    return {
        paths: result,
        fallback: true,
    };
}

function numberToMonth(month: number, l: lang) {
    if (l == lang.EN) {
        switch (month) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "Mars";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                return "Unknown";
        }
    } else {
        if (month > 0 && month <= 12) {
            return month + "月";
        }
    }
}

