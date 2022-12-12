import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="10"
          height="13"
          viewBox="0 0 10 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.001 0.832802C9.00638 0.790744 8.99325 0.748168 8.96514 0.716237C8.93714 0.684203 8.89653 0.666016 8.85406 0.666016H0.335624C0.293151 0.666016 0.25254 0.684203 0.224535 0.716237C0.19653 0.748271 0.183303 0.790744 0.188676 0.832802C0.196943 0.897802 1.48454 11.215 1.54292 11.7136C1.58705 12.0914 1.67313 12.4483 2.00133 12.5019C2.57548 12.5957 3.84417 12.666 4.59482 12.666C5.34537 12.666 6.61417 12.5957 7.18852 12.5021C7.51662 12.4485 7.6027 12.0915 7.64693 11.7138C7.70532 11.2151 8.99271 0.898087 9.00099 0.833009L9.001 0.832802ZM1.21881 6.6338C1.26283 6.75874 1.30861 6.88398 1.35852 7.01025C2.12841 8.95716 3.24744 9.98615 4.595 9.98615C5.94255 9.98615 7.06108 8.95711 7.83041 7.00999C7.88074 6.88257 7.92703 6.75577 7.97147 6.6297C7.83196 7.74659 7.69234 8.8706 7.57269 9.8503C7.52619 10.226 7.43577 10.8227 7.15542 10.8768C6.86442 10.9329 5.69504 11.0176 4.59521 11.0176C3.49538 11.0176 2.32589 10.9329 2.035 10.8769C1.75444 10.8228 1.66431 10.226 1.61751 9.85019C1.49743 8.87198 1.35824 7.74932 1.21884 6.63382L1.21881 6.6338ZM0.919631 4.22144H8.2685C8.12186 5.15469 7.27025 9.68991 4.59499 9.68991C1.91989 9.68991 1.06698 5.1553 0.919631 4.22144V4.22144ZM8.68595 0.962219C8.63356 1.37465 8.4892 2.51107 8.31104 3.92515H0.878838C0.700578 2.51107 0.556328 1.37465 0.503921 0.962219H8.68595ZM7.35258 11.6793C7.29967 12.1323 7.20636 12.1989 7.14074 12.2095C6.58003 12.3012 5.33417 12.3696 4.59489 12.3696C3.85561 12.3696 2.60975 12.3012 2.04904 12.2094C1.98342 12.1988 1.89011 12.1322 1.8372 11.6792C1.8156 11.4947 1.79142 11.291 1.76538 11.0727C1.82717 11.1184 1.89703 11.1521 1.97857 11.168C2.28785 11.2275 3.46096 11.3141 4.595 11.3141C5.72903 11.3141 6.90204 11.2276 7.21142 11.1679C7.29306 11.1522 7.36282 11.1183 7.42461 11.0728C7.39836 11.2908 7.37439 11.4948 7.35258 11.6793H7.35258Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}