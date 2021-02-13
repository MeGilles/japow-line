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

export default function Route({ routeData }) {

    let path = "";

    return (
        <Layout>
            <Head>
                <title>{FakeItinerary.title.name}</title>
            </Head>
            <div className={style.container}>
                <pre>{JSON.stringify(routeData)}</pre>
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
        </Layout>
    )
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
        parameters.push({ params: { id: element.id.toString()} });
    });

    return { 
        paths: parameters,
        fallback: true,
    };
}