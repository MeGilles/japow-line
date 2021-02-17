import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as db from '../../database'

import Link from "next/link";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { LocationSearchingOutlined } from '@material-ui/icons';


import { Layout, TopBanner } from '../../components';
import { FakeItinerary } from '../../FakeContent/FakeItinerary';
import style from "./[id].module.scss";

function makeLinkfrom(tab: string[]): string {
    let res = "";
    for (let i = 0; i < tab.length; i++) {
        res += "/" + tab[i];
    }
    return res;
}

function RoutePage(routeData: db.types.RouteWithAllData, areaData) {
    let path = "";

    return (
        <Layout>
            <Head>
                <title>{FakeItinerary.title.name}</title>
            </Head>
            <TopBanner />
            <div className={style.route_container}>
                <pre>{JSON.stringify(routeData)}</pre>
                <div className={style.navigation}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        {FakeItinerary.title.categories.map((category, index) => {

                            path += category + "/";

                            return (
                                <div key={index}>
                                    <Link href={path}>
                                        {category}
                                    </Link>
                                </div>
                            );
                        })}
                    </Breadcrumbs>
                </div>
                <div className={style.route_core}>
                    <div className={style.main_information}>
                        <div className={style.title}>
                            {routeData.routeName}
                        </div>
                        <div className={style.content}>
                            <div className={style.textual_information}>
                                <div className={style.info_item}>
                                    Mountain:
                                    <div className={style.value}>
                                        {routeData.mountain.name}
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Month recommended:
                                    <div className={style.value}>

                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Route type:
                                    <div className={style.value}>
                                        {routeData.routeType.name}
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Altitude zone:
                                    <div className={style.value}>

                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Difference in elevation:
                                    <div className={style.value}>

                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Maximum altitude:
                                    <div className={style.value}>
                                        {routeData.maxAltitude}m
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Minimum altitude:
                                    <div className={style.value}>
                                        {routeData.minAltitude}m
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Total distance:
                                    <div className={style.value}>
                                        {routeData.totalDistance}m
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Distance of elevation:
                                    <div className={style.value}>
                                        {routeData.elevationDistance}m
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Distance of decent:
                                    <div className={style.value}>
                                        {routeData.decentDistance}m
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Start point:
                                    <div className={style.value}>
                                        {routeData.startPointType.name}
                                    </div>
                                </div>
                                <div className={style.info_item}>
                                    Goal point:
                                    <div className={style.value}>

                                    </div>
                                </div>
                            </div>
                            <div className={style.graphical_information}>

                            </div>
                        </div>
                    </div>
                    <div className={style.other_information}>
                        <div className={style.route_information}>
                            <div className={style.title}>
                                Route Information
                            </div>
                            <div className={style.info_item}>
                                {routeData.routeDescription}
                            </div>
                        </div>
                        <div className={style.area_information}>
                            <div className={style.title}>
                                Area Information
                            </div>
                            <div className={style.info_item}>
                                Nothing Yet
                            </div>
                        </div>
                    </div>
                    <div className={style.recent_information}>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

function LocationPage(subLocations: db.types.BasicPageData[], subRoutes: db.types.BasicPageData[]) {
    let routesLinks = [];
    const routesArray: db.types.BasicPageData[] = subLocations;

    let locationLinks = [];
    const locationsArray: db.types.BasicPageData[] = subRoutes;

    for (let i = 0; i < routesArray.length; i++) {
        let currentPath = "/routes" + makeLinkfrom(routesArray[i].path);
        routesLinks.push(<li><a href={currentPath}>{routesArray[i].name}</a></li>);
    }

    for (let i = 0; i < locationsArray.length; i++) {
        let currentPath = "/routes" + makeLinkfrom(locationsArray[i].path);
        locationLinks.push(<li><a href={currentPath}>{locationsArray[i].name}</a></li>);
    }

    return (
        <Layout>
            <div className="default_centered_div">
                Routes in this location !
                <ul>
                    {routesLinks}
                </ul>
            </div>
            <div className="default_centered_div">
                Sublocations !
                <ul>
                    {locationLinks}
                </ul>
            </div>
        </Layout>
    );
}

export default function Location({ subLocations, subRoutes, routeData }) {
    //subLocations : db.types.BasicPageData[]
    //subRoutes : db.types.BasicPageData[]
    //routeData : not yet properly defined

    if (routeData != null) {
        return RoutePage(routeData)
    } else {
        return LocationPage(subLocations, subRoutes);
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    //const locale = context.locale; //not used for the moment
    let currentPath: string[]
    switch (typeof context.params.location) {
        case 'string':
            return { notFound: true };
        case 'object':
            currentPath = context.params.location;
            break;
        case 'undefined':
            currentPath = []
    }

    if (currentPath.length == 0 || (await db.route.isLocation(currentPath[currentPath.length - 1]))) {
        let subLocations: db.types.BasicPageData[]
        let subRoutes: db.types.BasicPageData[]

        if (currentPath == []) {
            subLocations = await db.route.getSubLocations(null);
            subRoutes = await db.route.getLocationRoutes(null);
        } else {
            subLocations = await db.route.getSubLocations(currentPath[currentPath.length - 1]);
            subRoutes = await db.route.getLocationRoutes(currentPath[currentPath.length - 1]);
        }

        subLocations.forEach((element) => {
            element.path = currentPath.concat(element.name);
        })

        subRoutes.forEach((element) => {
            element.path = currentPath.concat(element.name);
        })

        return {
            props: {
                subLocations,
                subRoutes,
            },
            //revalidate: 60, //regenerate the page every 60 seconds
        };
    } else {
        const routeData = await db.route.getRoute(currentPath[currentPath.length - 1]);

        return {
            props: {
                routeData
            },
            //revalidate: 60, //regenerate the page every 60 seconds
        };
    }

}


export const getStaticPaths: GetStaticPaths = async () => {
    const routes = await db.route.getAllRoutesPaths();
    const locations = await db.route.getAllLocationsPaths();

    let parameters = [];

    for (let i = 0; i < routes.length; i++) {
        parameters.push({ params: { location: routes[i] } });
    }

    for (let i = 0; i < locations.length; i++) {
        parameters.push({ params: { location: locations[i] } });
    }

    parameters.push({ params: { location: [] } });

    return {
        paths: parameters,
        fallback: true,
    };
}