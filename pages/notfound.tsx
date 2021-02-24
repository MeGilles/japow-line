import { GetStaticProps } from "next";
import React from "react";
import { Layout } from "../components"
import { getTopBarMenu } from "../lib/menu";

export default function NotFound({menuItems}) {
    return (
        <Layout menuItems={menuItems}>
            <div className="default_centered_div">
                Error 404 - Page not found !
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