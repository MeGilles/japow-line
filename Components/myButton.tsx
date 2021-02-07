import { useState, useEffect } from "react";

import styles from "./myButton.module.scss";

export default function MyButton(props: any) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(props.toggle);
  }, [props.toggle]);

  var size = {
    width: props.size,
  }

  var textAlign = {
    textAlign: props.textAlign,
  }

  return (
    <button
      className={styles.myButton}
      onClick={props.click}
      onMouseEnter={props.hover}
      onMouseLeave={props.unHover}
      style={{...size, ...textAlign}}
    >
      {props.name}
      {props.children}
    </button>
  );
}
