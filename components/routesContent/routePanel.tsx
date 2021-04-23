import style from './routePanel.module.scss';

import {
    RouteInformationPanel,
    RoutePhotosPanel,
    RouteDescriptionPanel,
    RouteAreaPanel,
    RouteCommentsPanel,
    InputsTypes,
} from '../';

type Props = {
    routeName: string,
    mountainName: string[],
    recommendedMonth: string[],
    routeType: string[],
    altitudeZone: string[],
    elevationDifference: number,
    maxAltitude: number,
    minAltitude: number,
    totalDistance: number,
    elevationDistance: number,
    decentDistance: number,
    startPoint: string,
    goalPoint: string,
    map: string,
    photos: InputsTypes.attachmentType[],
    elevationChart: InputsTypes.attachmentType,
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
    photos,
    elevationChart,
    description
}: Props) {

    return (
        <section className={style.route_panel}>
            <div className={style.title}>
                {routeName}
            </div>
            <div className={style.content}>
                <RoutePhotosPanel photos={photos} />
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