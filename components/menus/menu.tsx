import { useState } from "react";
import { useTrail, animated } from "react-spring";
import { useRouter } from 'next/router'

import styles from "./menu.module.scss";
import MenuButton from "./menuButton";
import * as FakeMenu from '../../FakeContent/FakeMenu';

type Props = {
  name: string;
  redirection: string;
  subsections: FakeMenu.fakeMenu[];
  size?: any;
}
export default function Menu(props: Props) {

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const router = useRouter();

  const trail = useTrail(props.subsections.length, {
    reset: open ? false : true,
    config: { duration: 200 },
    visibility: open ? "visible" : "hidden",
    opacity: open ? 1 : 0,
    maxHeight: open ? "100vh" : "0vh",
  });

  return (
    <div
      className={styles.menu_container}
      onMouseEnter={toggleMenu}
      onMouseLeave={toggleMenu}
      style={{width: props.size}}
    >
      <MenuButton name={props.name} isHovered={open} isExpandMenuButton={true} isExpandMenuOpened={open} click={() => router.push(props.redirection)} />
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
            <MenuButton name={props.subsections[index].name} click={() => router.push(props.subsections[index].redirection)} orientation={'horizontal'} textAlign={'left'} />
          </animated.div>
        ))}
      </div>
    </div>
  );
}

Menu.defaultProps = {
  name: "unnamed",
  redirection: "/",
  subsections: [],
  size: "auto"
}