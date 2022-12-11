import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="18"
          height="25"
          viewBox="0 0 18 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6014 4.81785C13.4672 4.78063 13.3477 4.75435 13.2282 4.72832C12.9633 4.66872 12.7731 4.62396 12.7283 4.54927L12.7286 4.54901C12.6836 4.28824 12.6976 4.02045 12.7694 3.76565C12.8181 3.48537 12.7418 3.1978 12.5605 2.97843C12.3952 2.7705 12.1472 2.64506 11.8815 2.63517H8.24767C7.22541 2.63517 6.48655 2.63517 4.72184 1.59052H4.7221C4.13446 1.15903 3.45519 0.869124 2.7372 0.743673C2.00927 0.568008 1.24131 0.693185 0.606786 1.09058C0.475359 1.17958 0.401453 1.33157 0.412639 1.4898C0.421487 1.64621 0.510495 1.78726 0.647899 1.863C0.912833 2.00483 1.32326 2.32936 1.87157 3.47468C2.30071 4.37749 2.66998 6.49664 2.70722 6.71683V7.69432C2.70722 7.79504 2.59532 9.33599 1.71853 13.7534C0.88288 17.9655 0.599197 18.6931 0.565619 18.7639L0.192423 20.0027L0.192684 20.0024C0.0589175 20.2702 0.0183166 20.5747 0.0768717 20.868C0.578364 22.061 1.29561 23.1512 2.19243 24.0841C2.61143 24.4383 3.13634 24.6429 3.68465 24.666H6.03132H11.4299H11.4301C11.8863 24.6361 12.3209 24.4594 12.6686 24.1624C13.0083 23.7892 14.7207 21.8903 14.8178 20.8719V20.8531C14.7816 20.4721 14.7014 20.0963 14.5789 19.7338C14.3363 18.883 12.7134 11.4365 12.6127 9.24995C12.5791 8.55614 12.5567 7.91802 12.5419 7.45166C12.5419 7.16435 12.5232 6.95927 12.5159 6.85101H12.5156C12.5135 6.83487 12.5135 6.81848 12.5156 6.80234H12.6947H12.9521H12.9523C13.6022 6.8773 14.2106 7.15992 14.6871 7.60835C15.1941 8.06404 15.4887 8.71023 15.5004 9.39185C15.6386 10.7863 15.6823 12.1885 15.631 13.5891L15.4892 16.4992C15.5191 16.7605 15.6794 17.2082 16.0974 17.2453H16.1422C16.6161 17.2453 16.8659 16.544 16.9107 16.3985V16.3649C16.9107 16.3649 17.1084 15.0405 17.224 13.3801C17.3978 11.6399 17.3489 9.88474 17.0785 8.15673C16.8883 7.15326 15.8736 5.10119 13.6014 4.81778L13.6014 4.81785ZM14.1386 19.876H14.1389C14.2417 20.1969 14.3153 20.5266 14.3588 20.8608C14.2768 21.6069 12.9969 23.1442 12.3291 23.8679H12.3294C12.0642 24.0829 11.7404 24.213 11.4003 24.2411C11.1093 24.2411 4.37887 24.2635 3.67733 24.2411C3.24324 24.2182 2.82762 24.0574 2.4911 23.7823C1.64919 22.8975 0.973095 21.869 0.495007 20.7452C0.478872 20.5623 0.515045 20.3786 0.599365 20.2154L0.972562 18.9917C1.04335 18.8275 1.34576 17.9619 2.15905 13.8805C3.08425 9.27646 3.15893 7.78417 3.16253 7.71701V6.81786H12.0607C12.0571 6.84389 12.0571 6.87017 12.0607 6.8962C12.0607 6.99691 12.0607 7.21344 12.0831 7.4893C12.0831 7.95566 12.1203 8.60863 12.1539 9.29126C12.2624 11.5634 13.9038 18.9956 14.1391 19.8763L14.1386 19.876ZM16.4816 16.3278C16.3921 16.5964 16.2242 16.8389 16.1532 16.8389C16.0449 16.8389 15.9778 16.6115 15.9629 16.5144L16.1048 13.6415H16.105C16.1584 12.2201 16.1146 10.7965 15.9744 9.38106C15.9562 8.58264 15.6124 7.8266 15.0229 7.28789C14.46 6.75178 13.7308 6.42385 12.9561 6.35883H12.9373C12.8642 6.36273 12.7906 6.36273 12.7174 6.35883H3.10637C2.93721 5.30745 2.66083 4.27606 2.28191 3.2809C1.68491 2.02732 1.21128 1.65044 0.867966 1.46023H0.867706C1.40641 1.1396 2.04893 1.04201 2.65874 1.18801C3.30961 1.3007 3.92564 1.5638 4.45703 1.95651H4.47941C6.34486 3.07584 7.19171 3.07585 8.24755 3.07585H11.8814C12.0149 3.08157 12.139 3.14559 12.221 3.25125C12.3152 3.36862 12.3558 3.52009 12.3329 3.66894C12.2358 4.21729 12.2098 4.53818 12.3517 4.78828C12.4935 5.03838 12.7621 5.09043 13.1353 5.16148C13.2435 5.1875 13.3666 5.21379 13.5085 5.25101H13.5384H13.5379C14.4883 5.36525 15.3448 5.8795 15.8921 6.66495C16.2478 7.15135 16.5016 7.70461 16.6385 8.29149C17.2204 11.0824 16.5338 15.9925 16.4818 16.3276L16.4816 16.3278Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
