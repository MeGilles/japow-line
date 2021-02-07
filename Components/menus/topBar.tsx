import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import styles from "./topBar.module.scss";
import FakeMenu from "../../FakeContent/FakeMenu";
import Menu from "./menu";
import MyButton from "../myButton";
import ElasticGlue from "../utils/elasticGlue";
import React from "react";

const logoSrc = "/images/logo.png";
const profileSrc = "images/profile.jpeg";

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      height: "100%",
      width: "auto",
      marginRight: "2Opx",
    },
  })
);


var buttonsNbr:number = FakeMenu.menus.length;
var buttonsPartSizePercent:number = 100;
var buttonSizePercent:number = buttonsNbr < 5 ? 15 : buttonsPartSizePercent / buttonsNbr;
var buttonSize:string = buttonSizePercent+'%';
const leftGlueSize = '30%';
const rightGlueSize = '15%';

export default function TopBar() {

  const classes = useStyles();

  return (
    <div className={styles.menu_container}>
      <img src={logoSrc} alt="logo" />

      <ElasticGlue width={leftGlueSize} />

      {FakeMenu.menus.map((value: any) => {
        return value.subsections.length === 0 ? (
          <MyButton name={value.id} size={buttonSize} key={value.id} />
        ) : (
          <Menu
            name={value.id}
            content={value.subsections}
            size={buttonSize}
            key={value.id}
          >
            {value.id}
          </Menu>
        );
      })}

      <ElasticGlue width={rightGlueSize} />

      <Avatar className={classes.avatar} alt="NAME" src={profileSrc} />
    </div>
  );
}
