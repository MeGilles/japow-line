import { useState, useEffect } from "react";
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';

import theme from "../../styles/materialTheme";
import style from "./layout.module.scss";
import TopBar from "./topBar";

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, menuItems }: { children: React.ReactNode, menuItems: any }) {

  const [prevScroll, setPrevScroll] = useState(0),
    [scrollingDown, setScrollingDown] = useState(false),
    [stickToTop, setStickToTop] = useState(true),
    [hovered, setHovered] = useState(false);

  const hover = () => {
    setHovered(true);
  }

  const unHover = () => {
    setHovered(false);
  }

  const handleScroll = () => {
    //Only when the page requires scrolling
    if (window.scrollY === 0) {
      setStickToTop(true);
    } else {
      setStickToTop(false);
      if (prevScroll < window.scrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      setPrevScroll(window.scrollY);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll])

  useEffect(() => {
    handleScroll();
  }, [])

  let layoutClasses = [style.layout];

  if (stickToTop) {
    layoutClasses.push(style.stick_to_top)
  } else {
    layoutClasses.push(style.unstick_from_top)
  }

  if (scrollingDown && !hovered) {
    layoutClasses.push(style.layout_up);
  }

  return (
    <ThemeProvider theme={theme}> 
    <Head>
    </Head>
      <header className={layoutClasses.join(" ")} onMouseEnter={hover} onMouseLeave={unHover} >
        <TopBar menuItems={menuItems} />
      </header>
      {children}
    </ThemeProvider>
  );
}
