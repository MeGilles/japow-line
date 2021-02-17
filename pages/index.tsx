import { Layout } from '../components'
import React, { MutableRefObject, useRef } from 'react';
import Head from 'next/head';

import * as parallax from '../components/parallax/parallax';


export default function Home() {
  const element1 = useRef(null);
  const element2 = useRef(null);
  const element3 = useRef(null);

  return (
    <Layout>
      <Head>
        <title>JapowLine</title>
      </Head>
      <div className="main_page_wrapper">

        <div ref={element1}>
          {
            parallax.simpleScrollingParallaxScreen('/images/top_page_bg.jpg', 100, createFirstContent(), scrollTo, element2)
          }
        </div>
        

        <div ref={element2}>
          {
            parallax.simpleSlidingParallaxScreen('/images/one_man_walking_large_landscape_cropped.jpg', createSecondContent(), scrollTo, element3)
          }
        </div>

        <div ref={element3}>
          {
            parallax.simpleScrollingParallaxScreen('/images/one_man_standing.jpg', 300, createThirdContent(), scrollTo, element1)
          }
        </div>

      </div>
    </Layout >
  );
}

const scrollTo = (element: MutableRefObject<any>) => {
  //element.current.scrollIntoView()
  //Wait for menu to leave the page
  //setTimeout(() => { element.current.scrollIntoView() }, 300);
}

const createFirstContent = () => {

  return (
    <div className="top_page_first_screen">
      <div className="top_text">
        <div className="title">
          JapowLine
        </div>
        <div className="subtitle">
          Backcountry skiing in Japan
        </div>
      </div>
      <div className="logo_container">
        <img src="/images/logo.png" alt="logo" />
      </div>
    </div>
  );
}

const createSecondContent = () => {

  return (
    <div className="top_page_second_screen">
      <div className="welcoming_message">
        Konchichiwa!! “Arigatou” for visiting our site.<br />
        “Japow line” shows the informations of Backcountry-skiing, Ski-touring, Freeriding and off-piste.<br />
        We would like to help you find the correct information about Backcountry skiing in Japan, like routes, regional rules, weather and avalanche information.<br />
        Have a Nice Japow!!<br />
      </div>
      <div className="warning_message">
        The information presented on Japow line is subject to uncertainties.<br />
        Therefore Japow line must not be the only criterion to access a slope.<br />
        Japow line does not guarantee the correctness of the information.<br />
        Any liability for accidents and damages in connection with the use of Japow is excluded.<br />
        The planning and execution of your winter sports activities is at your own risk and under your sole responsibility.<br />
      </div>
    </div>
  );
}

const createThirdContent = () => {

  return (
    <>
      <div>

      </div>
    </>
  );
}

