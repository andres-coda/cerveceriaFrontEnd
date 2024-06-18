import React, { useEffect } from 'react';
import { useSpring, config, animated } from '@react-spring/web';
import './loading.css'
const AnimatedSVG = () => {
  // Animación para las burbujas
  const bubbles = [
    { cx: 29.3, cy: 181.3, r: 3.5 },
    { cx: 15.3, cy: 181.3, r: 5.3 },
    { cx: 19.3, cy: 191.3, r: 3 },
    { cx: 9.3, cy: 191.3, r: 1.4 },
    { cx: 14.3, cy: 195.3, r: 1.4 },
    { cx: 25.3, cy: 197.3, r: 1.4 },
    { cx: 29.3, cy: 191.3, r: 1.4 },
    { cx: 39.3, cy: 197.3, r: 1.4 },
    { cx: 38.3, cy: 192.3, r: 1.4 },
    { cx: 38.3, cy: 186.3, r: 3 }
  ];

  const bubbleAnimations = bubbles.map((bubble, index) => 
    useSpring({
      from: { cy: bubble.cy },
      to: { cy: -1 },
      config: config.molasses,
      reset: true,
      loop: { reverse: true },
      delay: index * 600,
    })
  );

  // Animación para el líquido
  const liquidAnimation = useSpring({
    from: { transform: 'translateY(170px)' },
    to: { transform: 'translateY(0px)' },
    config: config.slow,
    reset: true,
    loop: { reverse: true },
  });


  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width="51px"
      height="198.6px"
      viewBox="0 0 51 198.6"
      style={{ enableBackground: 'new 0 0 51 198.6', fill: 'none' }}
      xmlSpace="preserve"
    >
      <defs>
        <mask id="liquidMask">
          <path
            id="maskLiq"
            fill="#ffffff"
            className="st0"
            d="M31.5,5L32,8.7c0,0.1,1.5,11.5,2.7,22.6c0.2,1.8,0.3,3.7,0.3,5.6c0.2,5.5,0.4,10.6,3.3,14.3
              c6.7,8.5,6.9,16,6.9,16.1c0.9,40.6,1.2,86.3,0.1,91.2c-0.2,0.9-0.4,1.8-0.6,2.7c-0.7,3.2-1,4.5-2.5,5.5c-1.8,1.3-6.1,2.8-16.8,2.8
              c-10.6,0-15-1.5-16.8-2.8c-1.4-1-1.8-2.3-2.5-5.5c-0.2-0.9-0.4-1.8-0.6-2.7c-1.1-4.8-0.8-50.6,0.1-91.1c0-0.3,0.3-7.7,6.9-16.2
              c2.9-3.6,3.1-8.8,3.3-14.3c0.1-1.9,0.1-3.8,0.3-5.6C17.5,20.1,19,8.7,19,8.6L19.5,5H31.5z"
          />
          <g id="bubblesGroup" fill="#000000">
            {bubbles.map((bubble, index) => (
              <animated.circle
                key={index}
                className="st0"
                cx={bubble.cx}
                cy={bubbleAnimations[index].cy}
                r={bubble.r}
              />
            ))}
          </g>
        </mask>
      </defs>
      <g id="XMLID_41_" mask="url(#liquidMask)">
        <animated.path
          id="liquid"
          fill="#c19f71"
          d="M57.2,201.8H0V5c0,0,11.2-6.2,28.6-2.5C49.1,6.9,57.2,0,57.2,0V201.8z"
          style={liquidAnimation}
        />
      </g>
    </svg>
  );
};

export default AnimatedSVG;