import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.8068 6.3149V4.09462L20.7007 1.18852C20.766 1.09058 20.766 0.959839 20.7007 0.829327C20.6353 0.698814 20.5048 0.666016 20.374 0.666016L9.95779 1.97201C9.79448 2.00458 9.66397 2.13532 9.66397 2.29863V3.67005H7.868H7.77006C7.70469 3.70262 1.40275 5.85779 0.847656 13.7924C0.847656 13.9883 0.978168 14.1191 1.14148 14.1516H1.17405C1.33736 14.1516 1.50067 14.0211 1.50067 13.8578C1.99037 6.73949 7.37818 4.55175 7.93328 4.32318H9.66388V6.1845C6.43119 7.84974 4.34141 11.2458 4.34141 14.8702C4.37421 20.2901 8.74966 24.666 14.1373 24.666C19.5251 24.666 23.9331 20.2904 23.9331 14.9028C23.9331 11.3437 21.9413 8.01306 18.8067 6.31512L18.8068 6.3149ZM10.3497 2.59248L19.7537 1.41697L18.2844 3.67008H15.4109C15.215 3.67008 15.0843 3.80059 15.0843 3.9967C15.0843 4.19258 15.2148 4.32332 15.4109 4.32332H18.1537V6.05369H10.3497L10.3497 2.59248ZM10.121 6.70685H18.1863C20.3414 7.7844 21.9741 9.64549 22.7576 11.866L5.54952 11.8658C6.33307 9.6455 7.96571 7.78417 10.1208 6.7068L10.121 6.70685ZM14.1373 24.0129C9.10886 24.0129 5.02713 19.9313 5.02713 14.9027C5.02713 14.0864 5.15765 13.3027 5.35375 12.5191H22.9536C23.1495 13.3028 23.2803 14.0864 23.2803 14.9027C23.28 19.9311 19.1984 24.0129 14.1375 24.0129H14.1373Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}