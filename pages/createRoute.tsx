import { useState, useCallback } from 'react';
import Head from 'next/head';


import {
    Layout,
    TopBanner,
    RouteNavigationPanel,
    RouteDocument,
    RoutePanel,
    InputsTypes
} from '../components';

export default function CreateRoute({ currentPath }) {

    const [previewState, setPreviewState] = useState(false),
        [formData, setFormData] = useState<InputsTypes.formDataType>(null);

    const preview = useCallback((data: InputsTypes.formDataType) => {
        setFormData(data)
        setPreviewState(true)
    }, [setPreviewState, setFormData])

    return (
        <Layout menuItems={[]}>
            <Head>
                <title>New Route</title>
            </Head>
            <TopBanner />
            <div>
                <RouteNavigationPanel path={currentPath} />
                {
                    previewState ?
                        <RoutePanel 
                            routeName={formData['titles'][0]}
                            mountainName={formData['mountains']}
                            recommendedMonth={formData['months']}
                            routeType={formData['routeTypes']}
                            altitudeZone={formData['altitudeZones']}
                            elevationDifference={formData['elevationDifference']}
                            maxAltitude={formData['maxAltitude']}
                            minAltitude={formData['minAltitude']}
                            totalDistance={formData['totalDistance']}
                            elevationDistance={formData['elevationDistance']}
                            decentDistance={formData['decentDistance']}
                            startPoint={formData['startPoint'][0]}
                            goalPoint={formData['goalPoint'][0]}
                            map={formData['map']}
                            photos={formData['photos']}
                            elevationChart={formData['elevationChart']}
                            description={formData['description'][0]}
                        />
                        :
                        <RouteDocument feedBack={preview} />
                }
            </div>
        </Layout>
    );
}