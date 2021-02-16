import style from './lineButton.module.scss';

type Props = {
    children?: React.ReactNode,
    className: any,
    type?: "button" | "submit" | "reset",
    onClick?: any,
    width?: string,
}

export default function LineButton({children, className, type, onClick, width} : Props) {

    return (
        <button className={[style.line_button, className].join(" ")} type={type} onClick={onClick} style={{ width: width }}>
            {children}
        </button>
    );
}

LineButton.defaultProps = {
    children: null,
    className: "",
    type: 'button',
    onClick: () => {},
    width: "100%",
}