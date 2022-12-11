import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.439014 13.3398H8.428V2.22047H0.439014V13.3398ZM0.439014 13.3398C0.439014 13.3398 0.862997 14.416 1.5803 14.416H7.28698C8.00428 14.416 8.42826 13.3399 8.42826 13.3399L0.439014 13.3398ZM0.439014 13.3398C0.439014 13.3398 0.439014 11.0573 4.43338 11.0573C8.42774 11.0573 8.428 7.47041 8.428 7.47041M0.28125 1.30746H8.46615M6.10185 1.30747L7.10175 0.416016M0.699815 1.30746H8.03664V2.22057H0.699815V1.30746Z"
            stroke="black"
            strokeWidth="0.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
