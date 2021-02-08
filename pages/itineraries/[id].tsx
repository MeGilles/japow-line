import Head from 'next/head';
import { Layout } from '../../components';
import { getAllItinerariesIds, getItineraryData } from '../../lib/itineraries';

export default function Itinerary({ itineraryData }) {
    return (
        <Layout>
            <Head>
                <title>{itineraryData.title}</title>
            </Head>
            <div className="default_centered_div">
                This is the itinerary called <strong>{itineraryData.id}</strong> !
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
