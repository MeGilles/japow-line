import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { prisma } from '../../../database'

/**
 * This api handles login and logout with all identity providers
 * Documentation : https://next-auth.js.org/configuration/options
 */

export default (req, res) => NextAuth(req, res, options);

const options = {
    adapter: Adapters.Prisma.Adapter({prisma}),
    providers: [
      Providers.GitHub({
        clientId: process.env.NEXTAUTH_GITHUB_ID,
        clientSecret: process.env.NEXTAUTH_GITHUB_SECRET
      }),
      Providers.Email({
        server: process.env.NEXTAUTH_EMAIL_SERVER, 
        from: process.env.NEXTAUTH_EMAIL_FROM
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      maxAge: 30 * 24 * 60 * 60, // Seconds - How long until an idle session expires and is no longer valid.
      updateAge: 0,   // Seconds - Throttle how frequently to write to database to extend a session. (put it at 24h in production for instance) 24 * 60 * 60
      jwt: true,      //enable the use of jwt 
    },
    //Specify URLs to be used if you want to create custom sign in, sign out and error pages.
    // pages: {
    //   signIn: '/auth/signin',
    //   signOut: '/auth/signout',
    //   error: '/auth/error', // Error code passed in query string as ?error=
    //   verifyRequest: '/auth/verify-request', // (used for check email message)
    //   newUser: null // If set, new users will be directed here on first sign in
    // },
  }