import { Layout } from '../components'
import Link from 'next/link'
import { useRouter } from 'next/router';

import { Parallax, Background } from 'react-parallax';

export default function Home() {

  const router = useRouter();

  return (
    <Layout>
      <div className="main_page_wrapper">
        <Parallax
          bgImage={'/images/ski_main_page_mountains_1.jpg'}
          bgImageAlt="ski_bg"
          strength={300}
        >
          <div className="text_over_bg">
            <div className="wrapper">
              <h1>Welcome to JapowLine !</h1>
              <button className="btn_to_search" onClick={() => router.push('/itineraries/')}>Find routes !</button>
              <div className="text_container">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id risus at euismod. Vestibulum at vestibulum ex. Integer pellentesque iaculis malesuada. Maecenas vulputate sed quam in lobortis. Curabitur blandit, purus vel posuere luctus, urna ante eleifend nisi, sit amet egestas sapien nunc lobortis augue. Pellentesque in turpis ac massa condimentum gravida pretium ac erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis maximus dapibus neque id facilisis. Proin id commodo purus.
            </div>
            </div>
          </div>
        </Parallax>

        <div className="second_container">
          <Parallax
            renderLayer={percentage => (
              <div
                style={{
                  position: 'absolute',
                  backgroundImage: 'url("/images/ski_main_page_slide.jpg")',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  opacity: percentage,
                  right: (0 - percentage * 20) + "%",
                  top: '0',
                  width: '140%',
                  height: '100%',
                  boxShadow: '10px 10px 20px black',
                  visibility: percentage > 2 ? 'hidden' : 'visible'
                }}
              />
            )}
          >
            <div style={{ height: "100vh" }}>

              <Parallax
                renderLayer={percentage => (
                  <div
                    style={{
                      position: 'absolute',
                      opacity: percentage,
                      left: (100 - percentage * 55) + "%",
                      top: '10%',
                      width: '40%',
                      height: '80%',
                      visibility: percentage > 2 ? 'hidden' : 'visible'
                    }}
                  >
                    <div className="wrapper_fullwidth">
                      <h1>More text !!!!!!!!</h1>
                      <div className="text_container">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id risus at euismod. Vestibulum at vestibulum ex. Integer pellentesque iaculis malesuada. Maecenas vulputate sed quam in lobortis. Curabitur blandit, purus vel posuere luctus, urna ante eleifend nisi, sit amet egestas sapien nunc lobortis augue. Pellentesque in turpis ac massa condimentum gravida pretium ac erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis maximus dapibus neque id facilisis. Proin id commodo purus.
                      </div>
                    </div>
                  </div>
                )}
              >
               <div style={{ height: "100vh" }} />
              </Parallax>
            </div>

          </Parallax>
        </div>

        <Parallax
          bgImage={'/images/ski_main_page_mountains_2.jpg'}
          bgImageAlt="ski_bg"
          bgImageStyle={{ width: "100%" }}
          strength={300}
        >
          <div className="text_over_bg">
            <div className="wrapper">
              <h1>この壁紙はカッコいだろ！！</h1>
              <div className="text_container">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id risus at euismod. Vestibulum at vestibulum ex. Integer pellentesque iaculis malesuada. Maecenas vulputate sed quam in lobortis. Curabitur blandit, purus vel posuere luctus, urna ante eleifend nisi, sit amet egestas sapien nunc lobortis augue. Pellentesque in turpis ac massa condimentum gravida pretium ac erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis maximus dapibus neque id facilisis. Proin id commodo purus.
            </div>
            </div>
          </div>
        </Parallax>

        <div className="second_container">
          <div className="wrapper">
            <h1>IN PROGRESS</h1>
            <div className="text_container">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id risus at euismod. Vestibulum at vestibulum ex. Integer pellentesque iaculis malesuada. Maecenas vulputate sed quam in lobortis. Curabitur blandit, purus vel posuere luctus, urna ante eleifend nisi, sit amet egestas sapien nunc lobortis augue. Pellentesque in turpis ac massa condimentum gravida pretium ac erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis maximus dapibus neque id facilisis. Proin id commodo purus.
            </div>
          </div>
        </div>

      </div>
    </Layout >
  );
}
