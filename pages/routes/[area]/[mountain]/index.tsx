import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"

import { Layout, RouteNavigationPanel } from "../../../../components"
import { getTopBarMenu, MenuContent } from "../../../../lib/menu"
import * as db from "../../../../lib/database"
import React from "react"

/**
 * This page shows an Area and all the mountains in it.
 */
export default function Mountain({ menuItems, currentPath, routes }: { menuItems: MenuContent[], currentPath: string[], routes }) { //routes is not defined for the moment, what will be shown on this page?
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

    All mountains in this area : {routes}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (typeof context.params.mountain != 'string') {
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
      routes: await db.route.getRoutesPaths(context.params.mountain),
      currentPath: [context.params.area, context.params.mountain],
    }
  })
}

export const getStaticPaths: GetStaticPaths = async () => {
  let mountains = await db.route.getAllMountainsPaths();

  let paths = [];
  for (let i=0; i<mountains.length; i++) {
    paths.push({ params: {area: mountains[i][0], mountain : mountains[i][1] }});
  }

  console.dir(paths);

  return ({
    paths,
    fallback: true
  });
}