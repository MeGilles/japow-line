import React from "react";
import { Layout } from "../../components"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as db from '../../database'


export default function Itineraries({ routes }) {
    routes.forEach(element => {
        element.id = "/routes/" + element.id
    });

    let list = [];
    routes.forEach(element => {
        list.push(<li><a href={element.id}>{element.routeName}</a></li>);
    })

    return (
        <Layout>
            <div className="default_centered_div">
                This is a page dedicated to Routes !
                <ul>
                    {list}
                </ul>
            </div>
        </Layout>
    );
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