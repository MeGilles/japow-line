import style from './classicButton.module.scss';

type Props = {
    children?: React.ReactNode,
    className: any,
    type?: "button" | "submit" | "reset",
    onClick?: any,
    width?: string,
}

export default function ClassicButton({children, className, type, onClick, width} : Props) {

    return (
        <button className={[style.classic_button, className].join(" ")} type={type} onClick={onClick} style={{ width: width }}>
            {children}
        </button>
    );
}

ClassicButton.defaultProps = {
    children: null,
    className: "",
    type: 'button',
    onClick: () => {},
    width: "100%",
}