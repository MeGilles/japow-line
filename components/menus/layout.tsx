import { useState, useEffect } from "react";
import Head from "next/head";

import style from "./layout.module.scss";
import TopBar from "./topBar";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children }: { children: React.ReactNode }) {

  const [stickToTop, setStickToTop] = useState(true),
    [hovered, setHovered] = useState(false);

  const hover = () => {
    setHovered(true);
  }

  const unHover = () => {
    setHovered(false);
  }

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setStickToTop(true);
    } else {
      setStickToTop(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll])

  let layoutClasses = [style.layout];

  if (stickToTop) {
    layoutClasses.push(style.stick_to_top)
  } else {
    layoutClasses.push(style.unstick_from_top)
  }

  return (
    <>
      <header className={layoutClasses.join(" ")} onMouseEnter={hover} onMouseLeave={unHover} >
        <TopBar />
      </header>
      {children}
    </>
  );
}
