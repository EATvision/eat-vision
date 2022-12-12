import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="10"
          height="25"
          viewBox="0 0 10 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.92307 16.7574L9.66263 0.98012C9.66639 0.898091 9.63647 0.818361 9.57997 0.758929C9.52346 0.699706 9.44499 0.666016 9.36296 0.666016H0.71014C0.628112 0.666016 0.549635 0.699707 0.493134 0.758929C0.436632 0.818361 0.406707 0.898091 0.410473 0.98012L1.15002 16.7574C1.24273 18.7358 2.79337 20.3033 4.73656 20.4515V21.2251C3.99053 21.2919 3.38555 21.6258 3.13778 22.1247C2.94024 22.5232 2.6073 22.587 2.08248 22.6454C1.91486 22.6638 1.74138 22.6828 1.58004 22.7251C1.0393 22.8664 0.661407 23.361 0.661407 23.9284V24.3659C0.661407 24.5317 0.795752 24.666 0.961491 24.666H9.11181C9.27755 24.666 9.4119 24.5319 9.4119 24.3659V23.9282C9.4119 23.361 9.03418 22.8662 8.49326 22.7249C8.33715 22.6841 8.17225 22.6634 8.01258 22.6431C7.5635 22.5862 7.17553 22.537 6.9261 22.1071C6.6482 21.6284 6.04721 21.3052 5.33675 21.2295V20.4515C7.27994 20.3033 8.83061 18.7357 8.92329 16.7574L8.92307 16.7574ZM9.04863 1.26619L8.93228 3.74911H1.14035L1.024 1.26619H9.04863ZM1.74902 16.7295L1.16853 4.34921H8.90367L8.32317 16.7295C8.24093 18.4884 6.79704 19.8662 5.0361 19.8662C3.27516 19.8662 1.83126 18.4884 1.74881 16.7295H1.74902ZM6.40699 22.4091C6.80521 23.0955 7.43261 23.1753 7.93693 23.2391C8.08404 23.2575 8.22298 23.275 8.34143 23.3062C8.61808 23.3782 8.81143 23.6344 8.81143 23.9288V24.0665H1.26111V23.9288C1.26111 23.6343 1.45447 23.3782 1.73111 23.3062C1.85039 23.2753 1.99499 23.2591 2.14817 23.242C2.64161 23.1876 3.31731 23.1129 3.67474 22.3918C3.84048 22.0584 4.3312 21.8305 4.92552 21.811C5.59371 21.7907 6.18674 22.0297 6.40687 22.4091L6.40699 22.4091Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}