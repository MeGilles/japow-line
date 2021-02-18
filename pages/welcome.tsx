import { getSession } from "next-auth/client";
import React from "react";

import { Layout } from "../components"

export default function Welcome({session}) {
    if(!session){
        return (
            <Layout>
                <div className="default_centered_div">
                    NOT CONNECTED
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="default_centered_div">
                Welcome:
                <p>
                - Do you want to add a password to log into your account? (more info)<br/>
                - Do you want to complete your profile? <br/><br/>

                Skip these steps
                    
                </p>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: { session }
    }
  }