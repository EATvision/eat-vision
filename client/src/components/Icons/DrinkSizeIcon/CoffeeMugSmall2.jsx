import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="25"
          height="15"
          viewBox="0 0 25 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.556 0.44437H4.08345C3.89174 0.44437 3.73852 0.597582 3.70002 0.789295C3.70002 0.82753 3.58505 1.55586 3.58505 2.66762C2.97168 2.51441 1.74519 2.36093 0.901893 2.97431C0.327026 3.39597 0.0585938 4.0476 0.0585938 4.96763C0.0585938 7.9575 2.55002 9.29919 5.19498 10.7174L5.65488 10.9473C6.49818 12.3273 7.60973 13.5923 9.2196 14.5888C9.29634 14.627 9.33457 14.6655 9.41131 14.6655H18.2276C18.3044 14.6655 18.3808 14.6273 18.4193 14.5888C25.3574 10.1808 23.9392 0.86602 23.9392 0.751024C23.9009 0.559311 23.7477 0.444336 23.556 0.444336L23.556 0.44437ZM0.82525 4.92919C0.82525 4.27758 1.01696 3.8177 1.36188 3.58744C1.97525 3.12754 3.08674 3.31899 3.58512 3.43423C3.66186 5.15909 3.96855 7.49733 5.00333 9.72064C2.70356 8.45569 0.825236 7.30594 0.825236 4.92917L0.82525 4.92919ZM18.1129 13.8988H9.52656C3.89179 10.2574 4.27518 2.85927 4.42844 1.21101H23.2493C23.4025 2.82094 23.786 10.1806 18.1129 13.8988H18.1129Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
