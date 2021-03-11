import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"

import { Layout, RouteNavigationPanel } from "../../components"
import { getTopBarMenu, MenuContent } from "../../lib/menu"
import * as db from "../../lib/database"
import React from "react"

/**
 * This page is the root routes page. It will show All the areas
 */
export default function Routes({ menuItems , areas } : {menuItems:MenuContent[],areas}) { //ares is not defined for the moment, what will be shown on this page?
  return (
    <Layout menuItems={menuItems}>
      <Head>
        All routes in {}
    </Head>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    All areas available : {areas}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return ({
    props: {
      menuItems: await getTopBarMenu(),
      areas : await db.route.getAllAreas(),
    }
  })
}