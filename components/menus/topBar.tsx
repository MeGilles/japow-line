import React from "react";
import { useRouter } from 'next/router'
import Avatar from "@material-ui/core/Avatar";

import styles from "./topBar.module.scss";
import * as FakeMenu from "../../FakeContent/FakeMenu";
import Menu from "./menu";
import MyButton from "../myButton";
import ElasticGlue from "../utils/elasticGlue";

const logoSrc = "/images/logo.png";
const profileSrc = "/images/profile.jpeg";

var buttonsNbr: number = FakeMenu.FakeMenu.length;
var buttonsPartSizePercent: number = 100;
var buttonSizePercent: number = buttonsNbr < 5 ? 15 : buttonsPartSizePercent / buttonsNbr;
var buttonSize: string = buttonSizePercent + '%';
const leftGlueSize = '20%';
const rightGlueSize = '15%';

export default function TopBar() {

  const router = useRouter();

  return (
    <div className={styles.menu_container}>
      <img src={logoSrc} alt="logo" onClick={() => router.push("/")} />

      <ElasticGlue width={leftGlueSize} />

      {FakeMenu.FakeMenu.map((menuSection: FakeMenu.fakeMenu, index: number) => {
        return menuSection.subsections ? (
          <Menu
            name={menuSection.name}
            redirection={menuSection.redirection}
            subsections={menuSection.subsections}
            size={buttonSize}
            key={index}
          />
        ) : (
          <MyButton name={menuSection.name} size={buttonSize} click={() => router.push(menuSection.redirection)} key={index} />
        );
      })}

      <ElasticGlue width={rightGlueSize} />

      <Avatar alt="NAME" src={profileSrc} />
    </div>
  );
}
