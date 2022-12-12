import clsx from 'clsx';
import React from 'react';
import './index.scss';

const cls = 'wave';

export default function Wave({ className = '', isBottom = false }) {
  return (
    <>
      {isBottom ? (
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 400"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(cls, className)}
        >
          <path
            d="M 0,400 C 0,400 0,200 0,200 C 158.40000000000003,179.60000000000002 316.80000000000007,159.20000000000002 459,177 C 601.1999999999999,194.79999999999998 727.2,250.8 888,261 C 1048.8,271.2 1244.4,235.6 1440,200 C 1440,200 1440,400 1440,400 Z"
            stroke="none"
            transform="rotate(-180 720 200)"
          ></path>
        </svg>
      ) : (
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 400"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(cls, className)}
        >
          <path
            d="M 0,400 C 0,400 0,200 0,200 C 144,167.60000000000002 288,135.20000000000002 442,152 C 596,168.79999999999998 760,234.8 928,251 C 1096,267.2 1268,233.6 1440,200 C 1440,200 1440,400 1440,400 Z"
            stroke="none"
          ></path>
        </svg>
      )}
    </>
  );
}
