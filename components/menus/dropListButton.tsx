import frontData from "../../public/configs/frontData";
import styles from "./dropListButton.module.scss";

type Props = {
  name: string;
  isToggled?: boolean;
  isHovered?: boolean;
  isExpandMenuButton?: boolean;
  isExpandMenuOpened?: boolean;
  orientation?: string;
  click?: any;
  textAlign?: any;
}

export default function DropListButton(props: Props) {

  let setTextAlign = {
    textAlign: props.textAlign,
  };

  let setBackground = {
    backgroundPosition: props.isExpandMenuButton
      ? props.isExpandMenuOpened
        ? props.orientation === "vertical"
          ? "top"
          : "left"
        : props.orientation === "vertical"
          ? "bottom"
          : "right"
      : "none",
  };

  let setColor = {
    color: props.isExpandMenuButton
      ? props.isExpandMenuOpened
        ? "white"
        : "#26a6e5"
      : ""
  }

  let setIconColor = {
    filter: props.isExpandMenuButton
      ? props.isExpandMenuOpened
        ? "invert(1)"
        : "invert(0)"
      : ""
  }

  let buttonClasses = [styles.myButton,];

  if (props.orientation === "vertical") {
    buttonClasses.push(styles.vertical_slider);
  } else if (props.orientation === "horizontal") {
    buttonClasses.push(styles.horizontal_slider);
  }

  return (
    <button
      className={buttonClasses.join(" ")}
      onClick={props.click}
      style={{ ...setTextAlign, ...setBackground, ...setColor }}
    >
      {props.name}
      {props.isExpandMenuButton && (
        <div className={styles.expand_more_container} >
          <img src={frontData.images.icons.expandMore} alt="expand_more_icon" className={styles.expand_more_icon} style={{ ...setIconColor }} />
        </div>
      )}
    </button>
  );
}

DropListButton.defaultProps = {
  name: "unnamed",
  isToggled: false,
  isHovered: false,
  isMenuButton: false,
  isMenuOpened: false,
  orientation: "vertical",
  click: null,
  size: "100%",
  textAlign: "center"
}