import { Layout } from '../components'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function SignIn() {

  return (
    <Layout>
      <div className="default_centered_div">
        Signin
      </div>
    </Layout>
  );
}
