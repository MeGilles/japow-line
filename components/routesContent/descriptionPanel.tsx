import style from './descriptionPanel.module.scss';

type Props = {
    description: string
}

export default function DescriptionPanel({ description }: Props) {

    return (
        <div className={style.description_panel}>
            <div className={style.title}>
                About this route
            </div>
            <div className={style.content}>
                {description}
            </div>
        </div>
    );
}