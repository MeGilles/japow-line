import { useState, useCallback } from 'react';
import Image from 'next/image';

import style from './informationPanel.module.scss';
import { InputTextField, FileInput, CommentsTypes } from '../';

type Props = {
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
    map: any,
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
    goalPoint,
    map,
    elevationChart }: Props) {

    const items = [
        {
            text: "Mountains:",
            content: mountainName && mountainName.join(", ")
        },
        {
            text: "Recommended month:",
            content: recommendedMonth && recommendedMonth.join(", ")
        },
        {
            text: "Route type:",
            content: routeType && routeType.join(", ")
        },
        {
            text: "Altitude zone:",
            content: altitudeZone && altitudeZone.join(", ")
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
            text: "Goal point:",
            content: goalPoint
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
                                    {
                                        <div className={style.value} contentEditable={false}>
                                            {content}
                                        </div>
                                    }
                                    {suffix && ' ' + suffix}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.graphical_information}>
                    <div className={style.map}>
                        {
                            map && map != "" ?

                                <iframe src={map} width="100%" height="100%" />
                                :
                                'No map'
                        }
                    </div>
                    <div className={style.elevation_chart}>
                        {
                            elevationChart && elevationChart.src ?
                                <Image src={elevationChart.src} layout="fill" />
                                :
                                'No elevation chart'
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}