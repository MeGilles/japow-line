import style from './classicButton.module.scss';

type Props = {
    children?: React.ReactNode,
    className: any,
    type?: "button" | "submit" | "reset",
    onClick?: any,
}

export default function ClassicButton({children, className, type, onClick} : Props) {

    return (
        <button className={[style.classic_button, className].join(" ")} type={type} onClick={onClick}>
            {children}
        </button>
    );
}

ClassicButton.defaultProps = {
    children: null,
    className: "",
    type: 'button',
    onClick: () => {},
}