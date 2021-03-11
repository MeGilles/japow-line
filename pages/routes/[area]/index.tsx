import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"

import { Layout, RouteNavigationPanel } from "../../../components"
import { getTopBarMenu, MenuContent } from "../../../lib/menu"
import * as db from "../../../lib/database"
import React from "react"

/**
 * This page shows an Area and all the mountains in it.
 */
export default function Area({ menuItems, currentPath, mountains, informations }: { menuItems: MenuContent[], currentPath: string[], mountains, informations }) { //mountains and informations not defined for the moment, what will be shown on this page?
  return (
    <Layout menuItems={menuItems}>
      <Head>
        All routes in { }
      </Head>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <RouteNavigationPanel path={currentPath} />

    All mountains in this area : {mountains}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (typeof context.params.area != 'string') {
    return ({
      props: {
        menuItems: await getTopBarMenu(),
        mountains: ["AN ERROR OCCURED"],
        currentPath: ["AN ERROR OCCURED"],
      }
    });
  }

  return ({
    props: {
      menuItems: await getTopBarMenu(),
      mountains: await db.route.getMountainsPaths(context.params.area),
      currentPath: [context.params.area],
    }
  })
}

export const getStaticPaths: GetStaticPaths = async () => {
  let areas = await db.route.getAllAreas();

  let paths = [];
  for (let area in areas) {
    paths.push({ params: { area } });
  }

  return ({
    paths,
    fallback: true
  });
}