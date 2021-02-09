import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as db from '../../database'

export default function Route({ routes }) {

    routes.forEach(element => {
        element.id = "/routes/"+element.id
    });

    let list = [];
    routes.forEach(element => {
        list.push( <li><a href={ element.id }>{element.routeName}</a></li>);
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>All routes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const routes = await db.route.getRoutesBasicInfo();

    return {
        props: {
            routes
        },
        //revalidate: 60, //regenerate the page every 60 seconds
    };
}