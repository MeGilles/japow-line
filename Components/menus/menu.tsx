import { useState, useRef } from "react";
import { useTrail, animated } from "react-spring";

import styles from "./menu.module.scss";
import MyButton from "../myButton";
import OutsideClickWrapper from "../utils/outsideClickWrapper";

export default function Menu(props: any) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const trail = useTrail(props.content.length, {
    config: { duration: 300 },
    immediate: open ? false : true,
    visibility: open ? "visible" : "hidden",
    opacity: open ? 1 : 0,
    maxHeight: open ? "200vh" : "0vh",
  });

  return (
    <div
      className={styles.menu_container}
      onMouseEnter={toggleMenu}
      onMouseLeave={toggleMenu}
      style={{width: props.size}}
    >
      <MyButton name={props.name} menuButton={true}/>
      <div
        className={styles.menu_content_container}
        style={{ opacity: open ? 1 : 0 }}
      >
        {trail.map(({ visibility, opacity, maxHeight }, index) => (
          <animated.div
            style={{ visibility, opacity, maxHeight }}
            className={styles.button_container}
            key={index}
          >
            <MyButton name={props.content[index]} textAlign={'left'} />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
