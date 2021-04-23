import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import styles from "./dropList.module.scss";
import DropListButton from "./dropListButton";

type Props = {
  name: string;
  redirection: string;
  subsections: {
    name: string;
    redirection: string;
  }[];
  feedBack: any,
  shouldOpen: boolean;
}

export default function DropList(props: Props) {

  const [open, setOpen] = useState(false);

  //Avoid inverting problems due to two many state changes
  useEffect(() => {
    setOpen(props.shouldOpen);
  }, [props.shouldOpen])

  const toggleMenu = () => {
    props.feedBack(!open);
  };

  const router = useRouter();

  return (
    <div
      className={styles.menu_container}
      onMouseEnter={toggleMenu}
      onMouseLeave={toggleMenu}
    >
      <DropListButton name={props.name} isHovered={open} isExpandMenuButton={true} isExpandMenuOpened={open} click={() => router.push(props.redirection)} />
      <div
        className={styles.menu_content_container}
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      >
        {
          props.subsections.map((subsection, index) => (
            <div
              className={styles.transition_block}
              style={{maxHeight: open ? '1000px' : '0px'}}
              key={subsection.name+index}
            >
              <DropListButton name={props.subsections[index].name} click={() => router.push(props.subsections[index].redirection)} orientation={'horizontal'} textAlign={'left'} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

DropList.defaultProps = {
  name: "unnamed",
  redirection: "/",
  subsections: [],
  size: "auto",
  feedBack: () => {},
  shouldOpen: false,
}