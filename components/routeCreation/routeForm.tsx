import { useState, useEffect, useCallback } from 'react';

import FlagIcon from '@material-ui/icons/Flag';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';

import style from './routeForm.module.scss';

import { InputTextField, InputSelectField, InputFileAndPreview, InputsTypes, ClassicButton } from '../';


type Props = {
    langPointer: number[],
    feedBack: Function,
}

export default function RouteForm({ langPointer, feedBack }: Props) {

    const [title, setTitle] = useState<string[]>([]),
        [mountains, setMountains] = useState([]),
        [months, setMonths] = useState([]),
        [routeTypes, setRouteTypes] = useState([]),
        [altitudeZones, setAltitudeZones] = useState([]),
        [elevationDifference, setElevationDifference] = useState(""),
        [maxAltitude, setMaxAltitude] = useState(""),
        [minAltitude, setMinAltitude] = useState(""),
        [totalDistance, setTotalDistance] = useState(""),
        [elevationDistance, setElevationDistance] = useState(""),
        [decentDistance, setDecentDistance] = useState(""),
        [startPoint, setStartPoint] = useState<string[]>([]),
        [goalPoint, setGoalPoint] = useState<string[]>([]),
        [description, setDescription] = useState<string[]>([]),
        [map, setMap] = useState(""),
        [photos, setPhotos] = useState<InputsTypes.attachmentType[]>([]),
        [elevationChart, setElevationChart] = useState<InputsTypes.attachmentType>({ src: "" }),
        [errors, setErrors] = useState({});


    const inputTitle = useCallback((event, title: string[]) => {
        const newTitle = [...title]
        newTitle[langPointer[0]] = event.target.value
        setTitle(newTitle)
    }, [setTitle])

    const inputMountains = useCallback((event) => {
        setMountains(event.target.value);
    }, [setMountains])

    const inputMonths = useCallback((event) => {
        setMonths(event.target.value);
    }, [setMonths])

    const inputRouteTypes = useCallback((event) => {
        setRouteTypes(event.target.value);
    }, [setRouteTypes])

    const inputAltitudeZones = useCallback((event) => {
        setAltitudeZones(event.target.value);
    }, [setAltitudeZones])

    const inputElevationDifference = useCallback((event) => {
        const input = event.target.value
        if (isANumber(input, 'elevationDifference')) {
            setElevationDifference(input);
        }
    }, [setElevationDifference])

    const inputMaxAltitude = useCallback((event) => {
        const input = event.target.value
        if (isANumber(input, 'maxAltitude')) {
            setMaxAltitude(input);
        }
    }, [setMaxAltitude])

    const inputMinAltitude = useCallback((event) => {
        const input = event.target.value
        if (isANumber(input, 'minAltitude')) {
            setMinAltitude(input);
        }
    }, [setMinAltitude])

    const inputTotalDistance = useCallback((event) => {
        const input = event.target.value
        if (isANumber(input, 'totalDistance')) {
            setTotalDistance(input);
        }
    }, [setTotalDistance])

    const inputElevationDistance = useCallback((event) => {
        const input = event.target.value
        if (isANumber(input, 'elevationDistance')) {
            setElevationDistance(input);
        }
    }, [setElevationDistance])

    const inputDecentDistance = useCallback((event) => {
        const input = event.target.value
        if (isANumber(input, 'decentDistance')) {
            setDecentDistance(input);
        }
    }, [setDecentDistance])

    const inputStartPoint = useCallback((event, startPoint: string[]) => {
        const newStartPoint = [...startPoint]
        newStartPoint[langPointer[0]] = event.target.value
        setStartPoint(newStartPoint);
    }, [setStartPoint])

    const inputGoalPoint = useCallback((event, goalPoint: string[]) => {
        const newGoalPoint = [...goalPoint]
        newGoalPoint[langPointer[0]] = event.target.value
        setGoalPoint(newGoalPoint);
    }, [setGoalPoint])

    const inputDescription = useCallback((event, description: string[]) => {
        const newDescription = [...description]
        newDescription[langPointer[0]] = event.target.value
        setDescription(newDescription);
    }, [setDescription])

    const inputMap = useCallback((event) => {
        setMap(event.target.value);
    }, [setMap])


    const updatePhotos = useCallback((photos: InputsTypes.attachmentType[]) => {
        setPhotos(photos)
    }, [setPhotos])

    const updateElevationChart = useCallback((chart: InputsTypes.attachmentType[]) => {
        setElevationChart(chart[0])
    }, [setElevationChart])

    const submitForm = () => {
        const data = {
            titles: title,
            mountains: mountains,
            months: months,
            routeTypes: routeTypes,
            altitudeZones: altitudeZones,
            elevationDifference: elevationDifference,
            maxAltitude: maxAltitude,
            minAltitude: minAltitude,
            totalDistance: totalDistance,
            elevationDistance: elevationDistance,
            decentDistance: decentDistance,
            startPoint: startPoint,
            goalPoint: goalPoint,
            description: description,
            map: map,
            photos: photos,
            elevationChart: elevationChart,
        }
        feedBack(data)
    }


    function isANumber(string: any, field: string) {
        const errors = {}
        if (!isNaN(string)) {
            setErrors(errors)
            return true;
        } else {
            errors[field] = "Only numbers are accepted."
            setErrors(errors)
            return false;
        }
    }

    function mapLangToText(lang: number, label: string) {
        if (lang === 0) {
            return englishText[label]
        } else if (lang === 1) {
            return japaneseText[label]
        } else {
            return englishText
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                {mapLangToText(langPointer[0], 'name')}
            </div>
            <div className={[style.form_group, style.titleInput].join(" ")}>
                <InputTextField name={mapLangToText(langPointer[0], 'title')} variant="standard"
                    value={title[langPointer[0]]} onChange={(event: React.FormEvent<HTMLInputElement>) => inputTitle(event, title)} error={errors['title'] != null} helperText={errors['title']} />
            </div>

            <div className={style.place_and_time}>
                <h3>{mapLangToText(langPointer[0], 'placeAndTime')}</h3>
                <div className={style.form_group}>
                    <InputSelectField name={mapLangToText(langPointer[0], 'mountains')} list={mountainsList} selection={mountains}
                        multiple={true} value={mountains} onChange={inputMountains} />
                </div>

                <div className={style.form_group}>
                    <InputSelectField name={mapLangToText(langPointer[0], 'recommendedMonths')} list={monthsList} selection={months}
                        multiple={true} value={months} onChange={inputMonths} />
                </div>

                <div className={style.form_group}>
                    <InputSelectField name={mapLangToText(langPointer[0], 'routeType')} list={routeTypesList} selection={routeTypes}
                        multiple={true} value={routeTypes} onChange={inputRouteTypes} />
                </div>

                <div className={style.form_group}>
                    <InputSelectField name={mapLangToText(langPointer[0], 'altitudeType')} list={altitudeZonesList} selection={altitudeZones}
                        multiple={true} value={altitudeZones} onChange={inputAltitudeZones} />
                </div>
            </div>

            <div className={style.data}>
                <h3>{mapLangToText(langPointer[0], 'numericalData')}</h3>
                <div className={style.form_group}>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'elevationDifference')} variant="standard" endAdornment="m"
                            value={elevationDifference} onChange={inputElevationDifference} error={errors['elevationDifference'] != null} helperText={errors['elevationDifference']} />
                    </div>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'maxAltitude')} variant="standard" endAdornment="m"
                            value={maxAltitude} onChange={inputMaxAltitude} error={errors['maxAltitude'] != null} helperText={errors['maxAltitude']} />
                    </div>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'minAltitude')} variant="standard" endAdornment="m"
                            value={minAltitude} onChange={inputMinAltitude} error={errors['minAltitude'] != null} helperText={errors['minAltitude']} />
                    </div>
                </div>

                <div className={style.form_group}>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'totalDistance')} variant="standard" endAdornment="m"
                            value={totalDistance} onChange={inputTotalDistance} error={errors['totalDistance'] != null} helperText={errors['totalDistance']} />
                    </div>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'elevationDistance')} variant="standard" endAdornment="m"
                            value={elevationDistance} onChange={inputElevationDistance} error={errors['elevationDistance'] != null} helperText={errors['elevationDistance']} />
                    </div>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'decentDistance')} variant="standard" endAdornment="m"
                            value={decentDistance} onChange={inputDecentDistance} error={errors['decentDistance'] != null} helperText={errors['decentDistance']} />
                    </div>
                </div>
            </div>


            <div className={style.points}>
                <h3>{mapLangToText(langPointer[0], 'startAndGoal')}</h3>
                <div className={style.form_group}>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'startPoint')} variant="standard" endAdornment={<FlagIcon />}
                            value={startPoint[langPointer[0]]} onChange={(event: React.FormEvent<HTMLInputElement>) => inputStartPoint(event, startPoint)} 
                            error={errors['startPoint'] != null} helperText={errors['startPoint']} />
                    </div>
                    <div className={style.form_sub_element}>
                        <InputTextField name={mapLangToText(langPointer[0], 'goalPoint')} variant="standard" endAdornment={<FlagIcon />}
                            value={goalPoint[langPointer[0]]} onChange={(event: React.FormEvent<HTMLInputElement>) => inputGoalPoint(event, goalPoint)} 
                            error={errors['goalPoint'] != null} helperText={errors['goalPoint']} />
                    </div>
                </div>
            </div>

            <div className={[style.form_group, style.description].join(" ")}>
                <InputTextField name={mapLangToText(langPointer[0], 'description')} variant="filled" multiline
                    value={description[langPointer[0]]} onChange={(event: React.FormEvent<HTMLInputElement>) => inputDescription(event, description)} 
                    error={errors['description'] != null} helperText={errors['description']} />
            </div>

            <div className={style.attachments}>
                <h3>{mapLangToText(langPointer[0], 'attachments')}</h3>
                <br />
                <div className={style.form_group}>
                    <InputTextField name={mapLangToText(langPointer[0], 'map')} variant="outlined" endAdornment={<RoomRoundedIcon />}
                        value={map} onChange={inputMap} error={errors['map'] != null} helperText={errors['map']} />
                </div>
                <div className={style.form_group}>
                    <InputFileAndPreview attachmentsMax={15} name={mapLangToText(langPointer[0], 'photos')} feedBack={updatePhotos} />
                </div>
                <div className={style.form_group}>
                    <InputFileAndPreview attachmentsMax={1} name={mapLangToText(langPointer[0], 'elevationChart')} feedBack={updateElevationChart} />
                </div>
            </div>

            <div className={style.bottom_buttons}>
                <ClassicButton className={style.preview} onClick={submitForm}>
                    {mapLangToText(langPointer[0], 'preview')}
                </ClassicButton>
            </div>
        </div>
    );
}

const mountainsList = [
    'Alps',
    'Central massif',
    'Vosges',
]

const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const routeTypesList = [
    'Round trip',
    'Something else',
    'Whatever'
]

const altitudeZonesList = [
    'Forest',
    'Rock',
    'Beach',
    'Snow',
]

const englishText: InputsTypes.formLabelsType = {
    'name': 'New route form, English version',
    'title': 'Title of the route',
    'placeAndTime': 'Place and Time',
    'mountains': 'Traveled mountains',
    'recommendedMonths': 'Recommended months',
    'routeType': 'Type of the route',
    'altitudeType': 'Type of the altitude',
    'numericalData': 'Numerical data',
    'elevationDifference': 'Difference in elevation',
    'maxAltitude': 'Maximal altitude',
    'minAltitude': 'Minimal altitude',
    'totalDistance': 'Total distance',
    'elevationDistance': 'Distance of elevation',
    'decentDistance': 'Distance of decent',
    'startAndGoal': 'Start and Goal places',
    'startPoint': 'Starting point',
    'goalPoint': 'Goal point',
    'description': 'Description',
    'attachments': 'Attachments',
    'map': 'Link for the interactive map',
    'photos': 'Upload illustrative pictures (15)',
    'elevationChart': 'Upload an elevation chart (1)',
    'preview': 'Preview',
}

const japaneseText: InputsTypes.formLabelsType = {
    'name': '新ルート形式、日本語版',
    'title': 'ルートの名前',
    'placeAndTime': '場所と見所',
    'mountains': '登山された山脈',
    'recommendedMonths': 'オススメの月',
    'routeType': 'ルート型',
    'altitudeType': '高度型',
    'numericalData': '計測データ',
    'elevationDifference': '高度差',
    'maxAltitude': '最高高度',
    'minAltitude': '最低高度',
    'totalDistance': '総距離',
    'elevationDistance': '上坂距離',
    'decentDistance': '下坂距離',
    'startAndGoal': '登山口と目的地',
    'startPoint': '登山口',
    'goalPoint': '目的地',
    'description': '説明書',
    'attachments': '添付ファイル',
    'map': '地図へのリンク',
    'photos': '画像をアップロード',
    'elevationChart': '高度図をアップロード',
    'preview': 'プレビュー',
}