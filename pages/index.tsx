import { Layout } from '../components'
import Link from 'next/link'

import { Parallax, Background } from 'react-parallax';

export default function Home() {

  return (
    <Layout>
      <div className="main_page_wrapper">
        <Parallax
          bgImage={'/images/ski_main_page_bg.jpg'}
          bgImageAlt="ski_bg"
          strength={200}
        >
          <div className="text_over_bg">
            <div className="wrapper">
              <h1>Welcome to JapowLine !</h1>
              <button className="btn_to_search">Find routes !</button>
              <div className="text_container">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id risus at euismod. Vestibulum at vestibulum ex. Integer pellentesque iaculis malesuada. Maecenas vulputate sed quam in lobortis. Curabitur blandit, purus vel posuere luctus, urna ante eleifend nisi, sit amet egestas sapien nunc lobortis augue. Pellentesque in turpis ac massa condimentum gravida pretium ac erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis maximus dapibus neque id facilisis. Proin id commodo purus.
            </div>
            </div>
          </div>
        </Parallax>
        
        <div className="second_container">
          <div className="wrapper">
            <h1>More text !!!!!!!!</h1>
            <div className="text_container">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id risus at euismod. Vestibulum at vestibulum ex. Integer pellentesque iaculis malesuada. Maecenas vulputate sed quam in lobortis. Curabitur blandit, purus vel posuere luctus, urna ante eleifend nisi, sit amet egestas sapien nunc lobortis augue. Pellentesque in turpis ac massa condimentum gravida pretium ac erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis maximus dapibus neque id facilisis. Proin id commodo purus.
            </div>
          </div>
        </div>

        <Parallax
          bgImage={'/images/ski_main_page_bg2.jpg'}
          bgImageAlt="ski_bg"
          bgImageStyle={{ width: "100%" }}
          strength={200}
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
            <h1>More text !!!!!!!!</h1>
            <div className="text_container">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id risus at euismod. Vestibulum at vestibulum ex. Integer pellentesque iaculis malesuada. Maecenas vulputate sed quam in lobortis. Curabitur blandit, purus vel posuere luctus, urna ante eleifend nisi, sit amet egestas sapien nunc lobortis augue. Pellentesque in turpis ac massa condimentum gravida pretium ac erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis maximus dapibus neque id facilisis. Proin id commodo purus.
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
