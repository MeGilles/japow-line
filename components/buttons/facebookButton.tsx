import style from './facebookButton.module.scss';

type Props = {
    className?: any,
    onClick?: any,
}

export default function FacebookButton({ className, onClick }: Props) {

    return (
        <button className={[style.button, className].join(" ")} onClick={onClick}>
            <div className={style.content}>
                <div className={style.icon}>
                    <img src={'images/icons/facebook.png'} alt="facebook icon" />
                </div>
                <div className={style.label}>
                    Facebook
                </div>
            </div>
        </button>
    );
}