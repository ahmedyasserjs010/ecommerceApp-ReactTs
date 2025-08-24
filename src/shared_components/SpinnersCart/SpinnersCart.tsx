import React from 'react';

const SpinnersCart = () => {
    return (
        <div style={{ padding: '', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', backgroundColor: '#00099' }}>
            <style>{`
        .preloader {
        text-align: center;
        max-width: 20em;
        width: 100%;
        }
        .preloader__text {
        position: relative;
        height: 1.5em;
        }
        .preloader__msg {
          animation: msg 0.3s 13.7s linear forwards;
          position: absolute;
          width: 100%;
          margin: 0;
          font-family: "DM Sans", sans-serif;
          font-size: 1em;
          line-height: 1.5;
          color: #333;
        }
        .preloader__msg--last {
          animation-direction: reverse;
          animation-delay: 14s;
          visibility: hidden;
        }
        .cart {
          display: block;
          margin: 0 auto 1.5em auto;
          width: 8em;
          height: 8em;
        }
        .cart__lines,
        .cart__top,
        .cart__wheel1,
        .cart__wheel2,
        .cart__wheel-stroke {
          animation: cartLines 2s ease-in-out infinite;
        }
        .cart__lines {
          stroke: #F54900;
        }
        .cart__top {
          animation-name: cartTop;
        }
        .cart__wheel1 {
          animation-name: cartWheel1;
          transform: rotate(-0.25turn);
          transform-origin: 43px 111px;
        }
        .cart__wheel2 {
          animation-name: cartWheel2;
          transform: rotate(0.25turn);
          transform-origin: 102px 111px;
        }
        .cart__wheel-stroke {
          animation-name: cartWheelStroke;
        }
        .cart__track {
          stroke: hsla(223, 10%, 10%, 0.1);
          transition: stroke 0.3s;
        }

        /* Dark theme */
        @media (prefers-color-scheme: dark) {
          .cart__track {
            stroke: hsla(223, 10%, 90%, 0.1);
          }
          .preloader__msg {
            color: #f0f0f0;
          }
        }

        /* Animations */
        @keyframes msg {
          from {
            opacity: 1;
            visibility: visible;
          }
          99.9% {
            opacity: 0;
            visibility: visible;
          }
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
        @keyframes cartLines {
          from,
          to {
            opacity: 0;
          }
          8%,
          92% {
            opacity: 1;
          }
        }
        @keyframes cartTop {
          from {
            stroke-dashoffset: -338;
          }
          50% {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 338;
          }
        }
        @keyframes cartWheel1 {
          from {
            transform: rotate(-0.25turn);
          }
          to {
            transform: rotate(2.75turn);
          }
        }
        @keyframes cartWheel2 {
          from {
            transform: rotate(0.25turn);
          }
          to {
            transform: rotate(3.25turn);
          }
        }
        @keyframes cartWheelStroke {
          from,
          to {
            stroke-dashoffset: 81.68;
          }
          50% {
            stroke-dashoffset: 40.84;
          }
        }
      `}</style>

            <div className="preloader">
                <svg
                    className="cart"
                    role="img"
                    aria-label="Shopping cart line animation"
                    viewBox="0 0 128 128"
                    width="128px"
                    height="128px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                        <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                            <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                            <circle cx="43" cy="111" r="13" />
                            <circle cx="102" cy="111" r="13" />
                        </g>
                        <g className="cart__lines" stroke="currentColor">
                            <polyline
                                className="cart__top"
                                points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                                strokeDasharray="338 338"
                                strokeDashoffset="-338"
                            />
                            <g className="cart__wheel1" transform="rotate(-90,43,111)">
                                <circle
                                    className="cart__wheel-stroke"
                                    cx="43"
                                    cy="111"
                                    r="13"
                                    strokeDasharray="81.68 81.68"
                                    strokeDashoffset="81.68"
                                />
                            </g>
                            <g className="cart__wheel2" transform="rotate(90,102,111)">
                                <circle
                                    className="cart__wheel-stroke"
                                    cx="102"
                                    cy="111"
                                    r="13"
                                    strokeDasharray="81.68 81.68"
                                    strokeDashoffset="81.68"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="preloader__text">
                    {/* <p className="preloader__msg">Bringing you the goods…</p> */}
                    {/* <p className="preloader__msg preloader__msg--last">This is taking long. Something's wrong.</p> */}
                </div>
            </div>
        </div>
    );
};

export default SpinnersCart;