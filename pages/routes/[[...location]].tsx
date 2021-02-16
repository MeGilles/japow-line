import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as db from '../../database'

import Link from "next/link";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


import { Layout } from '../../components';
import { FakeItinerary } from '../../FakeContent/FakeItinerary';
import style from "./[id].module.scss";
import { LocationSearchingOutlined } from '@material-ui/icons';

function makeLinkfrom(tab: string[]): string {
    let res = "";
    for (let i = 0; i < tab.length; i++) {
        res += "/" + tab[i];
    }
    return res;
}

function RoutePage(routeData) {
    let path = "";
    return (
        <Layout>
            <Head>
                <title>{FakeItinerary.title.name}</title>
            </Head>
            <div className={style.container}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
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
            <pre>{JSON.stringify(routeData)}</pre>
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
        routesLinks.push(<li><a href={currentPath}>{locationsArray[i].name}</a></li>);
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