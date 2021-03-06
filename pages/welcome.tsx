import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import React from "react";

import { Layout } from "../components"
import { getTopBarMenu } from "../lib/menu";

export default function Welcome({ menuItems }) {
    const [session, loading] = useSession();

    //console.dir(session, {depth:null});

    if (!session) {
        return (
            <Layout menuItems={menuItems}>
                <div className="default_centered_div">
                    NOT CONNECTED
                </div>
            </Layout>
        );
    }

    return (
        <Layout menuItems={menuItems}>
            <div className="default_centered_div">
                Welcome:
                <p>
                    - Do you want to add a password to log into your account? (more info)<br />
                - Do you want to complete your profile? <br /><br />

                Skip these steps

                </p>
            </div>
            <img src={session.user.image}></img>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            menuItems: await getTopBarMenu()
        },
    }
}

