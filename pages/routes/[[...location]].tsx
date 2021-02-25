import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as db from '../../lib/database'

import {
    Layout,
    TopBanner,
    RoutePanel,
    RouteNavigationPanel,
    RoutesLinks,
} from '../../components';
import style from "./[id].module.scss";
import { getTopBarMenu } from '../../lib/menu';

function makeLinkfrom(tab: string[]): string {
    let res = "";
    for (let i = 0; i < (tab ? tab.length : 0); i++) {
        res += "/" + tab[i];
    }
    return res;
}

function RoutePage({
    id,
    name,
    mountainName,
    description,
    elevationDifference,
    maxAltitude,
    minAltitude,
    totalDistance,
    elevationDistance,
    decentDistance,
    recomendedMonth,
    picturesPath,
    routePoints,
    locationId,
    routeTypeId,
    altitudeZoneId,
    startPointTypeId,
    endPointTypeId,
    mapId,
    barChartId,
    routeType,
    altitudeZone,
    startPointType,
    endPointType,
    location,
    map
}, currentPath: string[], areaData, menuItems) {

    return (
        <Layout menuItems={menuItems}>
            <Head>
                <title>{name}</title>
            </Head>
            <TopBanner />
            <div className={style.route_container}>
                <RouteNavigationPanel path={currentPath} />
                <RoutePanel routeName={name}
                    mountainName={mountainName}
                    recommendedMonth={recomendedMonth && recomendedMonth.map((month) => numberToMonth(month)).join(', ')}
                    routeType={routeType && routeType.name}
                    altitudeZone={altitudeZone && altitudeZone.name}
                    elevationDifference={elevationDifference}
                    maxAltitude={maxAltitude}
                    minAltitude={minAltitude}
                    totalDistance={totalDistance}
                    elevationDistance={elevationDistance}
                    decentDistance={decentDistance}
                    startPoint={startPointType && startPointType.name}
                    goalPoint={endPointType && endPointType.name}
                    map={mapId}
                    elevationChart={barChartId}
                    description={description}
                />
            </div>
        </Layout>
    )
}

RoutePage.defaultProps = {
    id: 0,
    name: "No data provided",
    mountainName: "No data provided",
    description: "No description found.",
    elevationDifference: "No data provided",
    maxAltitude: "No data provided",
    minAltitude: "No data provided",
    totalDistance: "No data provided",
    elevationDistance: "No data provided",
    decentDistance: "No data provided",
    recomendedMonth: "No data provided",
    picturesPath: "No data provided",
    routePoints: "No data provided",
    locationId: 0,
    routeTypeId: 0,
    altitudeZoneId: 0,
    startPointTypeId: 0,
    endPointTypeId: 0,
    mapId: 0,
    barChartId: 0,
    routeType: null,
    altitudeZone: null,
    startPointType: null,
    endPointType: null,
    location: null,
    map: null
}

function LocationPage(currentPath, subLocations: db.types.BasicPageData[], subRoutes: db.types.BasicPageData[], menuItems) {

    let routesLinks = [];
    const routesArray: db.types.BasicPageData[] = subLocations;

    let locationLinks = [];
    const locationsArray: db.types.BasicPageData[] = subRoutes;


    /*

    for (let i = 0; i < (routesArray ? routesArray.length : 0); i++) {
        let currentPath = "/routes" + makeLinkfrom(routesArray[i].path);
        routesLinks.push(<li><a href={currentPath}>{routesArray[i].name}</a></li>);
    }

    for (let i = 0; i < (locationsArray ? locationsArray.length : 0); i++) {
        let currentPath = "/routes" + makeLinkfrom(locationsArray[i].path);
        locationLinks.push(<li><a href={currentPath}>{locationsArray[i].name}</a></li>);
    }

    */

    return (
        <Layout menuItems={menuItems}>
            <Head>
                <title>Find Route</title>
            </Head>
            <RoutesLinks currentPath={currentPath} routes={locationsArray} locations={routesArray} />
        </Layout>
    );
}

export default function Location({ subLocations, subRoutes, routeData, menuItems, currentPath }) {
    //subLocations : db.types.BasicPageData[]
    //subRoutes : db.types.BasicPageData[]
    //routeData : not yet properly defined

    if (routeData != null) {
        return RoutePage(routeData, currentPath, null, menuItems)
    } else {
        return LocationPage(currentPath, subLocations, subRoutes, menuItems);
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    //const locale = context.locale; //not used for the moment
    let currentPath: string[];
    switch (typeof context.params.location) {
        case 'string':
            return { notFound: true };
        case 'object':
            currentPath = context.params.location;
            break;
        case 'undefined':
            currentPath = []
    }

    if (currentPath && currentPath.length == 0 || (await db.route.isLocation(currentPath && currentPath[currentPath.length - 1]))) {
        let subLocations: db.types.BasicPageData[]
        let subRoutes: db.types.BasicPageData[]

        if (currentPath == []) {
            subLocations = await db.route.getSubLocations(null);
            subRoutes = await db.route.getLocationRoutes(null);
        } else {
            subLocations = await db.route.getSubLocations(currentPath[currentPath.length - 1]);
            subRoutes = await db.route.getLocationRoutes(currentPath[currentPath.length - 1]);
        }

        return {
            props: {
                subLocations,
                subRoutes,
                currentPath,
                menuItems: await getTopBarMenu(),
            },
            //revalidate: 60, //regenerate the page every 60 seconds
        };
    } else {
        const routeData = await db.route.getRoute(currentPath && currentPath[currentPath.length - 1]);

        return {
            props: {
                routeData,
                currentPath,
                menuItems: await getTopBarMenu(),
            },
            //revalidate: 60, //regenerate the page every 60 seconds
        };
    }

}


export const getStaticPaths: GetStaticPaths = async () => {
    const routes = await db.route.getAllRoutesPaths();
    const locations = await db.route.getAllLocationsPaths();

    let parameters = [];

    for (let i = 0; i < (routes ? routes.length : 0); i++) {
        parameters.push({ params: { location: routes[i] } });
    }

    for (let i = 0; i < (locations ? locations.length : 0); i++) {
        parameters.push({ params: { location: locations[i] } });
    }

    parameters.push({ params: { location: [] } });

    return {
        paths: parameters,
        fallback: true,
    };
}


function numberToMonth(month: number) {
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
}