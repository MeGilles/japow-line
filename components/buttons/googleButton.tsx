import style from './googleButton.module.scss'


type Props = {
    className?: any,
    onClick?: any,
}

export default function GoogleButton({ className, onClick }: Props) {

    return (
        <button className={[style.button, className].join(" ")} onClick={onClick}>
            <div className={style.content}>
                <div className={style.icon}>
                    <img src={'images/icons/google.png'} alt="google icon" />
                </div>
                <div className={style.label}>
                    Google
                </div>
            </div>
        </button>
    );
}