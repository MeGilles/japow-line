import { GetStaticProps } from "next";
import React from "react";
import { Layout } from "../components"
import { getTopBarMenu } from "../lib/menu";

export default function Information({menuItems}) {
    return (
        <Layout menuItems={menuItems}>
            <div className="default_centered_div">
                This is a page dedicated to Informations !
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    return ({
        props: {
            menuItems: await getTopBarMenu()
        }
    })
}