import style from './informationPanel.module.scss';

type Props = {
    mountainName: string,
    recommendedMonth: string[],
    routeType: string,
    altitudeZone: string[],
    elevationDifference: number,
    maxAltitude: number,
    minAltitude: number,
    totalDistance: number,
    elevationDistance: number,
    decentDistance: number,
    startPoint: string,
    endPoint: string,
    mapUrl: string,
    elevationChart: any,
}

export default function InformationPanel({
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
    elevationChart }: Props) {


    const items = [
        {
            text: "Mountains:",
            content: mountainName
        },
        {
            text: "Recommended month:",
            content: recommendedMonth
        },
        {
            text: "Route type:",
            content: routeType
        },
        {
            text: "Altitude zone:",
            content: altitudeZone
        },
        {
            text: "Difference in elevation:",
            content: elevationDifference,
            suffix: "m"
        },
        {
            text: "Maximum altitude:",
            content: maxAltitude,
            suffix: "m"
        },
        {
            text: "Minimum altitude:",
            content: minAltitude,
            suffix: "m"
        },
        {
            text: "Total distance:",
            content: totalDistance,
            suffix: "m"
        },
        {
            text: "Distance of elevation:",
            content: elevationDistance,
            suffix: "m"
        },
        {
            text: "Distance of decent:",
            content: decentDistance,
            suffix: "m"
        },
        {
            text: "Start point:",
            content: startPoint
        },
        {
            text: "End point:",
            content: endPoint
        },
    ]

    return (
        <div className={style.information_panel}>
            <div className={style.title}>
                General information
            </div>
            <div className={style.content}>
                <div className={style.textual_information}>
                    {
                        items.map(({ text, content, suffix }, index: number) => {
                            return (
                                <div className={style.info_item} key={index}>
                                    {text}
                                    <div className={style.value}>
                                        {content}
                                    </div>
                                    {suffix}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.graphical_information}>
                    <div className={style.map}>
                        {/*mapUrl*/}
                        <iframe src="https://www.google.com/maps/d/embed?mid=1o6YnKQp6fH9ST_4J2fNH3SkOD9C8fQnt&hl=ja" width="100%" height="100%" />

                    </div>
                    <div className={style.elevation_chart}>
                        {elevationChart}
                    </div>
                </div>
            </div>
        </div>
    );
}