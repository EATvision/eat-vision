import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="21"
          height="25"
          viewBox="0 0 21 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.81846 0.666016H0.608869C0.367502 0.666016 0.171875 0.861384 0.171875 1.10275V22.562C0.171875 23.7222 1.11572 24.666 2.27559 24.666H18.1917C19.3519 24.666 20.2958 23.7222 20.2958 22.562L20.2961 1.10275C20.2961 0.893878 20.1496 0.719241 19.9537 0.676005H8.81846V0.666016ZM18.1921 23.7923C18.8706 23.7923 19.4225 23.2404 19.4225 22.562V18.0297C18.4381 19.5681 16.7184 20.5927 14.7603 20.5927H5.70809C3.75003 20.5927 2.03031 19.5681 1.04597 18.0297V22.562C1.04597 23.2404 1.59791 23.7923 2.27598 23.7923H18.1921ZM19.4217 1.53964H1.04566L1.04519 15.0568C1.04519 17.6274 3.13674 19.7189 5.70731 19.7189H14.7596C17.3301 19.7189 19.4217 17.6277 19.4217 15.0568V1.53964Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}