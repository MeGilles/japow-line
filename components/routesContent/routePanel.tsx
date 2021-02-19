import style from './routePanel.module.scss';

import {
    RouteInformationPanel,
    RoutePhotosPanel,
    RouteDescriptionPanel,
    RouteAreaPanel,
    RouteNewsPanel
} from '../';

type Props = {
    routeName: string,
    mountainName: string,
    recommendedMonth: string,
    routeType: string,
    altitudeZone: string,
    elevationDifference: number,
    maxAltitude: number,
    minAltitude: number,
    totalDistance: number,
    elevationDistance: number,
    decentDistance: number,
    startPoint: string,
    goalPoint: string,
    map: any,
    elevationChart: any,
    description: string
}

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
    goalPoint,
    map,
    elevationChart,
    description
}: Props) {

    return (
        <div className={style.route_panel}>
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
                    goalPoint={goalPoint}
                    map={map}
                    elevationChart={elevationChart}
                />
                <div className={style.secondary_information}>
                    <RouteDescriptionPanel description={description} />
                    <RouteAreaPanel />
                </div>
                <RouteNewsPanel />
            </div >
        </div >
    );
}

