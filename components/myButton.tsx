import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "./myButton.module.scss";

type Props = {
  name: string;
  isToggled?: boolean;
  isHovered?: boolean;
  isMenuButton?: boolean;
  isMenuOpened?: boolean;
  click?: any;
  size?: any;
  textAlign?: any;
}

export default function MyButton(props: Props) {

  let name = props.name !== undefined ? props.name : "unnamed";
  let isToggled = props.isToggled !== undefined ? props.isToggled : false;
  let isHovered = props.isHovered !== undefined ? props.isHovered : false;
  let isMenuButton = props.isMenuButton !== undefined ? props.isMenuButton : false;
  let isMenuOpened = props.isMenuOpened !== undefined ? props.isMenuOpened : false;
  let click = props.click !== undefined ? props.click : null;
  let size = props.size !== undefined ? props.size : "100%";
  let textAlign = props.textAlign !== undefined ? props.textAlign : "center";

  let setSize = {
    width: size,
  };

  let setTextAlign = {
    textAlign: textAlign,
  };

  let setBackgroundColor = {
    backgroundColor: isMenuButton
      ? isMenuOpened
        ? "rgb(233, 232, 232)"
        : "white"
      : "none",
  };

  return (
    <button
      className={styles.myButton}
      onClick={click}
      style={{ ...setSize, ...setTextAlign, ...setBackgroundColor }}
    >
      {name}
      {isMenuButton && (
        <div>
          <ExpandMoreIcon fontSize="small" />
        </div>
      )}
    </button>
  );
}
