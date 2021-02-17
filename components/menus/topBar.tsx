import React from "react";
import { useRouter } from 'next/router'
import Avatar from "@material-ui/core/Avatar";
import { useSession } from 'next-auth/client';

import frontData from "../../public/configs/frontData";

import style from "./topBar.module.scss";
import * as FakeMenu from "../../FakeContent/FakeMenu";
import Menu from "./menu";
import MenuButton from "./menuButton";
import LoginButton from "./loginButton";
import ElasticGlue from "../utils/elasticGlue";

var buttonsNbr: number = FakeMenu.FakeMenu.length;
var buttonsPartSizePercent: number = frontData.menuButtonsTotalMaxWidth.value;

var buttonSizePercent: number = buttonsNbr < 5 ? 15 : buttonsPartSizePercent / buttonsNbr;
var buttonSize: string = buttonSizePercent + frontData.menuButtonsTotalMaxWidth.unit;

const leftGlueSize = '20%';
const rightGlueSize = '15%';

export default function TopBar() {

  const [session, loading] = useSession();

  const router = useRouter();

  return (
    <div className={style.menu_container}>
      <img className={style.logo} src={frontData.images.logo} alt="logo" onClick={() => router.push("/")} />

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
          <MenuButton name={menuSection.name} size={buttonSize} click={() => router.push(menuSection.redirection)} key={index} />
        );
      })}

      <ElasticGlue width={rightGlueSize} />

      <div className={style.login_space}>
        {
          session ?
            <Avatar alt="NAME" src={session.profile} />
            :
            <LoginButton />
        }
      </div>
    </div>
  );
}
