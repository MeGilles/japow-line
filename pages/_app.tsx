import '../styles/globals.scss';
import 'nprogress/nprogress.css'; 

import { useEffect } from 'react';

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'


import Router from 'next/router';
import NProgress from 'nprogress'; 


Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])


  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App