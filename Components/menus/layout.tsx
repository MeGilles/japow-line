import Head from "next/head";
import styles from "./layout.module.scss";
import TopBar from "./topBar";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header className={styles.container}>
        <TopBar />
      </header>
      {children}
    </>
  );
}
