import { Parallax } from 'react-parallax';

export const simpleScrollingParallaxScreen = (img: string, strength: number, createContent: React.ReactNode, scrollFunc: (element: MutableRefObject<any>) => void, element: MutableRefObject<any>) => {

    return (
      <div className="simple_scrolling_parallax_screen">
        <Parallax
          bgImage={img}
          bgImageAlt="img"
          strength={strength}
        >
          <div className="expander">
            <div className="screen_scroll_clicker" onClick={() => scrollFunc(element)} />
            <div className="wrapper" onClick={() => scrollFunc(element)}>
              {createContent}
            </div>
          </div>
        </Parallax>
      </div>
    );
  }

export const doubleSlidingParallaxScreen = (img: string, content: React.ReactNode, scrollFunc: (element: MutableRefObject<any>) => void, element: MutableRefObject<any>) => {

    const animationLimitLow = 0;
    const animationLimitHigh = 2;
  
    const slidingSpeedBg = 10;
    const slidingSpeedFg = 10;
  
    const animate = (limitLow: number, limitHigh: number, percentage: number, style: React.CSSProperties) => {
      if (percentage >= limitLow && percentage <= limitHigh) {
        return style
      }
    }
  
    return (
      <div className="double_sliding_parallax_screen">
        <Parallax
          renderLayer={percentage => (
            <div
              style={animate(animationLimitLow, animationLimitHigh, percentage, {
                position: 'absolute',
                backgroundImage: `url(${img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                opacity: percentage,
                right: (0 - percentage * slidingSpeedBg) + "%",
                top: '0',
                width: (100 + 2 * slidingSpeedBg) + '%',
                height: '100%',
              })}
            />
          )
          }
        >
          <Parallax
            renderLayer={percentage => (
              <>
                <div className="screen_scroll_clicker" onClick={() => scrollFunc(element)} />
                <div className="wrapper"
                  style={animate(animationLimitLow, animationLimitHigh, percentage, {
                    opacity: percentage,
                    right: (percentage * slidingSpeedFg) + "%",
                    top: (100 - percentage * 60) + '%',
                  })}
                >
                  {content}
                </div>
              </>
            )}
          >
            <div style={{ height: "100vh", zIndex: 0 }} />
          </Parallax>
        </Parallax>
      </div>
    );
  }