import React from "react";
import { useRouter } from 'next/router'
import Avatar from "@material-ui/core/Avatar";
import { useSession } from 'next-auth/client';

import frontData from "../../public/configs/frontData";

import style from "./topBar.module.scss";
import { MenuContent } from "../../lib/menu";
import Menu from "./menu";
import MenuButton from "./menuButton";
import LoginButton from "./loginButton";
import ElasticGlue from "../utils/elasticGlue";

const leftGlueSize = '20%';
const rightGlueSize = '15%';

type Props = {
  menuItems: {
    name: string;
    redirection: string;
    subsections: {
      name: string;
      redirection: string;
    }[];
    size?: any;
  }[];
}

export default function TopBar(props: Props) {

  var buttonsNbr: number = props.menuItems.length;
  var buttonsPartSizePercent: number = frontData.menuButtonsTotalMaxWidth.value;

  var buttonSizePercent: number = buttonsNbr < 5 ? 15 : buttonsPartSizePercent / buttonsNbr;
  var buttonSize: string = buttonSizePercent + frontData.menuButtonsTotalMaxWidth.unit;

  const [session, loading] = useSession();

  const router = useRouter();

  return (
    <div className={style.menu_container}>
      <img className={style.logo} src={frontData.images.logo} alt="logo" onClick={() => router.push("/")} />

      <ElasticGlue width={leftGlueSize} />

      {props.menuItems.map((menuSection: MenuContent, index: number) => {
        return menuSection.subsections ? (
          <Menu
            name={menuSection.name}
            redirection={menuSection.redirection}
            subsections={menuSection.subsections}
            size={buttonSize}
            key={index}
          />
        ) : (
            <MenuButton name={menuSection.name} size={buttonSize} click={() => router.push(menuSection.redirection)} key={index} />
          );
      })}

      <ElasticGlue width={rightGlueSize} />

      <div className={style.login_space}>
        {
          session ?
            <Avatar alt="NAME" src={session.user.image} />
            :
            <LoginButton />
        }
      </div>
    </div>
  );
}

TopBar.defaultProps = {
  menuItems: [
    {
      name: "The menu content was not passed to the topBar",
      redirection: "/",
      subsections: [],
      size:"auto",
    }
  ],
}

