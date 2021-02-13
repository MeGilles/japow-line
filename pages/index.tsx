import { Layout } from '../components'
import { useRouter } from 'next/router';

import React, { MutableRefObject, useRef } from 'react';

import { simpleScrollingParallaxScreen, doubleSlidingParallaxScreen } from '../components/parallax/parallax';

export default function Home() {
  const element1 = useRef(null);
  const element2 = useRef(null);
  const element3 = useRef(null);

  return (
    <Layout>
      <div className="main_page_wrapper">

        <div ref={element1}>
          {
            simpleScrollingParallaxScreen('/images/top_page_bg.jpg', 100, createFirstContent(), scrollTo, element2)
          }
        </div>

        <div ref={element2}>
          {
            doubleSlidingParallaxScreen('/images/ski_main_page_slide.jpg', createSecondContent(), scrollTo, element3)
          }
        </div>

        <div ref={element3}>
          {
            simpleScrollingParallaxScreen('/images/ski_main_page_mountains_2.jpg', 300, createThirdContent(), scrollTo, element1)
          }
        </div>

      </div>
    </Layout >
  );
}

const scrollTo = (element: MutableRefObject<any>) => {
  element.current.scrollIntoView()  
}

const createFirstContent = () => {

  return (
    <div className="top_page_first_screen">
      <div className="top_text">
        <div className="title">
          Japow Line
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
    <>
      <div>
      Konchichiwa!! “Arigatou” for visiting our site.
      “Japow line” shows the informations of Backcountry-skiing, Ski-touring, Freeriding and off-piste.
      We would like to help you find the correct information about Backcountry skiing in Japan, like routes, regional rules, weather and avalanche information.
      Have a Nice Japow!!
      <br/>
      The information presented on Japow line is subject to uncertainties.
      Therefore Japow line must not be the only criterion to access a slope.
      Japow line does not guarantee the correctness of the information.
      Any liability for accidents and damages in connection with the use of Japow is excluded.
      The planning and execution of your winter sports activities is at your own risk and under your sole responsibility.
      </div>
    </>
  );
}

const createThirdContent = () => {

  return (
    <>
      
    </>
  );
}
