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
            d="M9.17409 0.773989C9.11717 0.705357 9.03243 0.666016 8.94349 0.666016L0.44852 0.666853C0.359376 0.666853 0.275047 0.706402 0.21813 0.774617C0.161213 0.842623 0.13736 0.933021 0.153264 1.0207C0.177538 1.15337 2.59151 14.3669 3.8311 19.6927C3.90454 20.0095 4.11819 20.2474 4.39587 20.3458V24.0659H2.11544C1.94993 24.0659 1.81537 24.2 1.81537 24.3659C1.81537 24.5319 1.94971 24.666 2.11544 24.666H7.27649C7.44201 24.666 7.57657 24.5319 7.57657 24.3659C7.57657 24.2 7.44223 24.0659 7.27649 24.0659L4.99606 24.0657V20.3376C5.26453 20.235 5.47065 20.0015 5.54348 19.6922C6.67657 14.8865 9.21317 1.1579 9.23867 1.01969C9.25458 0.932222 9.23114 0.841825 9.17422 0.773605L9.17409 0.773989ZM8.58274 1.26553C8.51641 1.62231 8.40278 2.23459 8.25484 3.02307C7.75263 2.82721 7.23306 2.62444 6.28034 2.62444C5.32928 2.62444 4.81014 2.827 4.30772 3.02245C3.83606 3.20638 3.39056 3.37964 2.55226 3.37964C1.89899 3.37964 1.49384 3.27439 1.15759 3.157C0.998979 2.30322 0.877189 1.6418 0.808139 1.26618L8.58274 1.26553ZM4.95928 19.5551C4.9461 19.6116 4.88709 19.7953 4.68683 19.7957H4.68621C4.49181 19.7957 4.43175 19.6289 4.41522 19.5571C3.53803 15.7887 2.06928 8.04999 1.28165 3.82393C1.60411 3.91161 2.00649 3.98046 2.55247 3.98046C3.50375 3.98046 4.02331 3.7779 4.52574 3.58204C4.99698 3.39852 5.44246 3.22505 6.28076 3.22505C7.12072 3.22505 7.56599 3.39873 8.03681 3.58267L8.14248 3.62347C7.33895 7.89833 5.77939 16.0761 4.95931 19.5549L4.95928 19.5551Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
