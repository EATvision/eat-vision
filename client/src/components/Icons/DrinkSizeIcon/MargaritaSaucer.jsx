import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="20"
          height="25"
          viewBox="0 0 20 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0306 10.3871C16.2154 9.57655 19.4181 5.98439 19.6301 1.61739C19.6377 1.46488 19.6409 1.21335 19.6409 1.05776C19.6411 0.895609 19.5087 0.666016 19.3466 0.666016H1.126C0.963847 0.666016 0.832031 0.895609 0.832031 1.05776C0.832031 1.21294 0.836132 1.41609 0.843717 1.5682C1.05589 5.93499 4.26385 9.55229 8.44891 10.362C8.58626 10.4276 9.36094 10.8524 9.36094 11.5641V21.4568C9.17234 21.6454 9.09711 21.8254 9.06021 22.0866C4.45868 23.3574 4.45359 23.5945 4.45359 23.844C4.45359 24.0689 4.45277 24.666 10.2152 24.666C15.9779 24.666 15.9774 24.0689 15.9774 23.844C15.9774 23.5947 15.9772 23.3588 11.3785 22.1206C11.3486 21.8697 11.2789 21.6581 11.1241 21.5029V11.564C11.1241 10.8584 11.8927 10.4531 12.0304 10.3865L12.0306 10.3871ZM5.76365 8.75164C7.07194 9.34796 8.58501 9.67883 10.2362 9.67883C11.8875 9.67883 13.4005 9.34797 14.7088 8.75164C13.3967 9.52712 11.8676 9.97282 10.2362 9.97282C8.60448 9.97261 7.07546 9.52675 5.76365 8.75164ZM19.047 1.25403C18.8927 5.66223 15.2347 8.89491 10.2359 8.89491C5.23687 8.8947 1.57901 5.66212 1.4242 1.25403H19.047ZM10.2359 10.5601C10.4624 10.5601 10.6891 10.5492 10.9117 10.5334C10.6994 10.7979 10.5364 11.1394 10.5364 11.5643V21.1742C10.5364 21.1742 10.3378 21.1396 10.2213 21.1396C10.1049 21.1396 9.94848 21.1642 9.94848 21.1642V11.5643C9.94848 11.1393 9.77895 10.7978 9.56638 10.5333C9.789 10.5491 10.0094 10.56 10.2359 10.56L10.2359 10.5601ZM10.2146 21.7275C10.5899 21.7275 10.7656 21.8653 10.797 22.1965C10.6865 22.2467 10.463 22.3152 10.2146 22.3152C9.9659 22.3152 9.74266 22.2467 9.63215 22.1965C9.66372 21.8655 9.83919 21.7275 10.2146 21.7275ZM14.9665 23.8094C14.1656 23.9466 12.4902 24.0786 10.2146 24.0786C7.92864 24.0786 6.24812 23.9455 5.45192 23.8076C6.22886 23.52 7.77451 23.0518 9.23777 22.6465C9.50119 22.833 9.96161 22.9031 10.2146 22.9031C10.456 22.9031 10.8863 22.8386 11.154 22.6701C12.6241 23.0665 14.1793 23.5253 14.9665 23.8094H14.9665Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}