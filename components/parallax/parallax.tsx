import React, { MutableRefObject } from 'react';
import { Parallax } from 'react-parallax';

import style from './parallax.module.scss';

export const simpleScrollingParallaxScreen = (img: string, strength: number, createContent: React.ReactNode, scrollFunc: (element: MutableRefObject<any>) => void, element: MutableRefObject<any>) => {

  return (
    <div className={style.simple_scrolling_parallax_screen} onClick={() => scrollFunc(element)}>
      <Parallax
        bgImage={img}
        bgImageAlt="img"
        strength={strength}
      >
        <div className={style.expander}>
          <div className={style.screen_scroll_clicker} onClick={() => scrollFunc(element)} />
          <div className={style.wrapper}>
            {createContent}
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export const simpleSlidingParallaxScreen = (img: string, content: React.ReactNode, scrollFunc: (element: MutableRefObject<any>) => void, element: MutableRefObject<any>) => {

  const animationLimitLow = 0;
  const animationLimitHigh = 2;

  const slidingSpeedBg = 3;

  const animate = (limitLow: number, limitHigh: number, percentage: number, style: React.CSSProperties) => {
    if (percentage >= limitLow && percentage <= limitHigh) {
      return style
    }
  }

  return (
    <div className={style.simple_sliding_parallax_screen} onClick={() => scrollFunc(element)}>
      <Parallax
        renderLayer={percentage => (
          <div
            style={animate(animationLimitLow, animationLimitHigh, percentage, {
              position: 'absolute',
              backgroundImage: `url(${img})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100%',
              opacity: percentage > 1 ? 2 - percentage : percentage,
              right: (0 - percentage * slidingSpeedBg) + "%",
              top: '0',
              width: (100 + 2 * slidingSpeedBg) + '%',
              height: '100%',
            })}
          />
        )
        }
      >
        <div className={style.expander}>
          <div className={style.screen_scroll_clicker} onClick={() => scrollFunc(element)} />
          <div className={style.wrapper}>
            {content}
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
    <div className={style.double_sliding_parallax_screen}>
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
              <div className={style.screen_scroll_clicker} onClick={() => scrollFunc(element)} />
              <div className={style.wrapper}
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

