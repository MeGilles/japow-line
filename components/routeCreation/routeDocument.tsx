import { useState } from 'react';

import style from './routeDocument.module.scss';

import { RouteForm, InputsTypes } from '../';

const languages = ["english", "japanese"];

type Props = { 
    feedBack: Function,
}

export default function RouteDocument({ feedBack } : Props) {

    const [currentLang, setCurrentLang] = useState(languages[0]),
        [langPointer, setLangPointer] = useState([0]);


    const updateLang = (lang: string) => {
        setCurrentLang(lang)

        const cl = langPointer
        const fc = (element: string) => element === lang;
        const index = languages.findIndex(fc)
        cl.pop()
        cl.push(index)
        setLangPointer(cl)
    }

    function mapLangLabel(lang: string) {
        if (lang == "english") {
            return "English";
        } else if (lang == "japanese") {
            return "日本語";
        } else {
            return lang;
        }
    }

    const liftData = (data: InputsTypes.formDataType) => {
        feedBack(data)
    }

    return (
        <section className={style.document}>
            <div className={style.container}>
                <div className={style.thumbBox}>
                    <div className={style.thumbnails}>
                        {
                            languages.map((lang) => {
                                return (
                                    lang == currentLang ? (
                                        <div className={[style.thumbnail, style.currentThumb].join(" ")} onClick={() => updateLang(lang)} key={lang}>
                                            {mapLangLabel(lang)}
                                        </div>
                                    ) : (
                                        <div className={style.thumbnail} onClick={() => updateLang(lang)} key={lang}>
                                            {mapLangLabel(lang)}
                                        </div>
                                    )
                                )
                            })
                        }
                    </div>
                </div>
                <div className={style.content}>
                    {
                        <div className={style.form}>
                            <RouteForm langPointer={langPointer} feedBack={liftData} />
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}