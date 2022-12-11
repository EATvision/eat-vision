import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="10"
          height="15"
          viewBox="0 0 10 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.96875 1.30708H9.15363M6.78966 1.30713L7.78958 0.416016M1.12638 2.22018H9.1156V13.3399H1.12638V2.22018ZM1.12638 13.3398C1.12638 13.3398 1.55038 14.416 2.2677 14.416H7.97455C8.69187 14.416 9.11586 13.3398 9.11586 13.3398H1.12638ZM1.38719 1.30708H8.72423V2.22021H1.38719V1.30708ZM1.12638 4.24189H9.1156V11.155H1.12638V4.24189Z"
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
