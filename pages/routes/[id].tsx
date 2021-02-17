import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as db from '../../database'

import Link from "next/link";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


import { Layout, TopBanner } from '../../components';
import { FakeItinerary } from '../../FakeContent/FakeItinerary';
import style from "./[id].module.scss";

export default function Route({ routeData }) {

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

Route.defaultProps = {
    routeData: {
        id: 5,
        mountainId: 2,
        routeTypeId: 4,
        altitudeZoneId: 4,
        startPointTypeId: 2,
        mapId: null,
        barChartId: null,
        routeName: 'Tour au mont Ventoux',
        routeName_jp: null,
        routeDescription: 'This is a description for a round trip at mt ventoux',
        routeDescription_jp: null,
        elevationDifference: 4,
        maxAltitude: 4,
        minAltitude: 4,
        totalDistance: 4,
        elevationDistance: 4,
        decentDistance: 8
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        //const locale = context.locale; //not used for the moment
        const id = parseInt(context.params.id.toString());
        const routeData = await db.route.getRoute(id);
        return {
            props: {
                routeData
            },
            //revalidate: 60, //regenerate the page every 60 seconds
        };
    } catch {
        return { notFound: true };
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    const info = await db.route.getRoutesBasicInfo();

    let parameters = [];
    info.forEach(element => {
        parameters.push({ params: { id: element.id.toString() } });
    });

    return {
        paths: parameters,
        fallback: true,
    };
}