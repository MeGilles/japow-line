import React, { useState } from "react";
import { useRouter } from 'next/router'
import Avatar from "@material-ui/core/Avatar";
import { useSession } from 'next-auth/client';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import style from "./topBar.module.scss";
import { MenuContent } from "../../lib/menu";
import Menu from "./menu";
import MenuButton from "./menuButton";
import LoginButton from "./loginButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: "100%",
      height: "100%",
      fontSize: "200%",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main
    },
  }),
);

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

  const [toggledMenu, setToggledMenu] = useState(-1);

  const [session, loading] = useSession();

  const router = useRouter();

  const classes = useStyles();

  //Necessary to avoid multiples menu toggled cause by too fast changes
  const manageMenusToggling = (requestingMenu: number, status: boolean) => {
    if (status) {
      setToggledMenu(requestingMenu);
    } else {
      setToggledMenu(-1);
    }
  }

  return (
    <div className={style.menu_container}>
      <img className={style.logo} src={'/images/logo.png'} alt="logo" onClick={() => router.push("/")} />

      {props.menuItems.map((menuSection: MenuContent, index: number) => {
        return menuSection.subsections ? (
          <Menu
            name={menuSection.name}
            redirection={menuSection.redirection}
            subsections={menuSection.subsections}
            feedBack={(status: boolean) => manageMenusToggling(index, status)}
            shouldOpen={index === toggledMenu}
            key={index}
          />
        ) : (
          <div className={style.button_container} key={index}>
            <MenuButton name={menuSection.name} click={() => router.push(menuSection.redirection)} />
          </div>
        );
      })}

      <div className={style.login_space}>
        {
          !loading && (
            session ?
              <div className={style.avatar}>
                <Avatar className={classes.avatar} alt="NAME" src={session.user.image}>
                  {session.user.email.charAt(0).toUpperCase()}
                </Avatar>
              </div>
              :
              <LoginButton />
          )
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
      size: "auto",
    }
  ],
}

