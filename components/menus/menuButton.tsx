import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { makeStyles } from '@material-ui/core/styles';

import frontData from "../../public/configs/frontData";
import styles from "./menuButton.module.scss";

const useStyles = makeStyles({
  expandIcon: {
    position: "absolute",
    top: "78%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

type Props = {
  name: string;
  isToggled?: boolean;
  isHovered?: boolean;
  isExpandMenuButton?: boolean;
  isExpandMenuOpened?: boolean;
  orientation?: string;
  click?: any;
  size?: any;
  textAlign?: any;
}

export default function MenuButton(props: Props) {

  const classes = useStyles();

  let setSize = {
    width: props.size,
  };

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

  let buttonClasses = [styles.myButton, ];

  if (props.orientation === "vertical") {
    buttonClasses.push(styles.vertical_slider);
  } else if (props.orientation === "horizontal") {
    buttonClasses.push(styles.horizontal_slider);
  }

  return (
    <button
      className={buttonClasses.join(" ")}
      onClick={props.click}
      style={{ ...setSize, ...setTextAlign, ...setBackground, ...setColor }}
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

MenuButton.defaultProps = {
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