import { useState, useEffect } from "react";
import Head from "next/head";

import style from "./layout.module.scss";
import TopBar from "./topBar";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children }: { children: React.ReactNode }) {

  const [prevScroll, setPrevScroll] = useState(0),
    [scrollingDown, setScrollingDown] = useState(false),
    [hovered, setHovered] = useState(false);

  const hover = () => {
    setHovered(true);
  }

  const unHover = () => {
    setHovered(false);
  }

  const handleScroll = () => {
    if (prevScroll < window.scrollY) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
    setPrevScroll(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll])

  let layoutClasses = [style.layout];

  if (scrollingDown && !hovered) {
    layoutClasses.push(style.layout_up);
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
