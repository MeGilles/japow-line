import { useState } from "react";
import { useTrail, animated } from "react-spring";
import { useRouter } from 'next/router'

import styles from "./menu.module.scss";
import MyButton from "../myButton";
import * as FakeMenu from '../../FakeContent/FakeMenu';

type Props = {
  name: string;
  redirection: string;
  subsections: FakeMenu.fakeSimpleMenu[];
  size?: any;
}

export default function Menu(props: Props) {

  let name = props.name !== undefined ? props.name : "unnamed";
  let redirection = props.redirection !== undefined ? props.redirection : "/";
  let subsections = props.subsections !== undefined ? props.subsections : [];
  let size = props.size !== undefined ? props.size : "auto";

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const router = useRouter();

  const trail = useTrail(subsections.length, {
    reset: open ? false : true,
    config: { duration: 250 },
    visibility: open ? "visible" : "hidden",
    opacity: open ? 1 : 0,
    maxHeight: open ? "100vh" : "0vh",
  });

  return (
    <div
      className={styles.menu_container}
      onMouseEnter={toggleMenu}
      onMouseLeave={toggleMenu}
      style={{width: size}}
    >
      <MyButton name={name} isHovered={open} isMenuButton={true} isMenuOpened={open} click={() => router.push(redirection)} />
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
            <MyButton name={subsections[index].name} click={() => router.push(subsections[index].redirection)} textAlign={'left'} />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
