import style from './informationPanel.module.scss';

type Props = {
    routeName: string,
    mountainName: string,
    monthRecommended: string,
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
}

export default function InformationPanel({
    routeName,
    mountainName, 
    monthRecommended, 
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
    elevationChart }: Props) {

    return (
        <div className={style.main_information}>
            <div className={style.title}>
                {routeName}
            </div>
            <div className={style.content}>
                <div className={style.textual_information}>
                    <div className={style.info_item}>
                        Mountain:
                        <div className={style.value}>
                            {mountainName}
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Month recommended:
                        <div className={style.value}>
                            {monthRecommended}
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Route type:
                        <div className={style.value}>
                            {routeType}
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Altitude zone:
                        <div className={style.value}>
                            {altitudeZone}
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Difference in elevation:
                        <div className={style.value}>
                            {elevationDifference}
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Maximum altitude:
                        <div className={style.value}>
                            {maxAltitude}m
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Minimum altitude:
                        <div className={style.value}>
                            {minAltitude}m
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Total distance:
                        <div className={style.value}>
                            {totalDistance}m
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Distance of elevation:
                        <div className={style.value}>
                            {elevationDistance}m
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Distance of decent:
                        <div className={style.value}>
                            {decentDistance}m
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Start point:
                        <div className={style.value}>
                            {startPoint}
                        </div>
                    </div>
                    <div className={style.info_item}>
                        Goal point:
                        <div className={style.value}>
                            {goalPoint}
                        </div>
                    </div>
                </div>
                <div className={style.graphical_information}>
                    {map}
                    {elevationChart}
                </div>
            </div>
        </div>
    );
}