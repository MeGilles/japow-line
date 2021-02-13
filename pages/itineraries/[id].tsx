import Head from 'next/head';
import Link from "next/link";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


import { Layout } from '../../components';
import { getAllItinerariesIds, getItineraryData } from '../../lib/itineraries';
import { FakeItinerary } from '../../FakeContent/FakeItinerary';
import style from "./[id].module.scss";

export default function Itinerary({ itineraryData }) {

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
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllItinerariesIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const itineraryData = await getItineraryData(params.id)
    return {
        props: {
            itineraryData
        }
    }
}
