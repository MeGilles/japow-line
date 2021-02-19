import style from './newsPanel.module.scss';

export default function NewsPanel() {

    return (
        <div className={style.news_panel}>
            <div className={style.title}>
                The situation in recent
            </div>
            <div className={style.content}>
                Content...
            </div>
        </div>
    );
}