import style from './routePanel.module.scss';
import { RouteData } from '../../lib/types';

import {
    RouteInformationPanel,
    RoutePhotosPanel,
    RouteDescriptionPanel,
    RouteAreaPanel,
    RouteNewsPanel,
    RouteCommentsPanel
} from '../';

type Props = RouteData;

export default function RoutePanel({
    routeName,
    mountainName,
    recommendedMonth,
    routeType,
    altitudeZone,
    elevationDifference,
    maxAltitude,
    minAltitude,
    totalDistance,
    elevationDistance,
    decentDistance,
    startPoint,
    endPoint,
    mapUrl,
    elevationChart,
    description
}: Props) {

    return (
        <section className={style.route_panel}>
            <div className={style.title}>
                {routeName}
            </div>
            <div className={style.content}>
                <RoutePhotosPanel />
                <RouteInformationPanel
                    mountainName={mountainName}
                    recommendedMonth={recommendedMonth}
                    routeType={routeType}
                    altitudeZone={altitudeZone}
                    elevationDifference={elevationDifference}
                    maxAltitude={maxAltitude}
                    minAltitude={minAltitude}
                    totalDistance={totalDistance}
                    elevationDistance={elevationDistance}
                    decentDistance={decentDistance}
                    startPoint={startPoint}
                    endPoint={endPoint}
                    mapUrl={mapUrl}
                    elevationChart={elevationChart}
                />
                <div className={style.secondary_information}>
                    <RouteDescriptionPanel description={description} />
                    <RouteAreaPanel />
                </div>
                <RouteNewsPanel />
                <RouteCommentsPanel />
            </div >
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </section>
    );
}

