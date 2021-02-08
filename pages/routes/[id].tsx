import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as db from '../../database'

export default function Route({ routeData }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{routeData.mountain.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <pre>{JSON.stringify(routeData, null, 2)}</pre>

        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        //const locale = context.locale; //not used for the moment
        const id = parseInt(context.params.id.toString());
        const routeData = await db.getRoute(id);
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
    const info = await db.getRoutesBasicInfo();

    let parameters = [];
    info.forEach(element => {
        parameters.push({ params: { id: element.id.toString()} });
    });

    return { 
        paths: parameters,
        fallback: true,
    };
}