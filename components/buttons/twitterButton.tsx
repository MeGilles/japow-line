import style from './twitterButton.module.scss';

type Props = {
    className?: any,
    onClick?: any,
}

export default function TwitterButton({ className, onClick }: Props) {

    return (
        <button className={[style.button, className].join(" ")} onClick={onClick}>
            <div className={style.content}>
                <div className={style.icon}>
                    <img src={'images/icons/twitter.png'} alt="twitter icon" />
                </div>
                <div className={style.label}>
                    Twitter
                </div>
            </div>
        </button>
    );
}