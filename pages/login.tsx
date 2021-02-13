import { GetStaticProps } from 'next'
import { signIn, providers, useSession } from 'next-auth/client'

export default function login({ providers }) {
  
  return (
    <>
      {Object.values(providers).map(provider  => (
        <div key={provider.name }>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      providers: await providers()
    }
  }
}