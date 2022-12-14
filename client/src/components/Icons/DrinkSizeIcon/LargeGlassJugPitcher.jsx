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
            d="M2.88979 24.308C3.04432 24.5349 3.30246 24.6692 3.57682 24.666H12.4206C12.695 24.6692 12.9531 24.5349 13.1077 24.308C13.7625 23.3024 15.9064 19.7557 15.8777 16.2304V15.808C15.8563 15.4323 15.8206 15.0601 15.7632 14.6879C16.7283 14.2495 17.5593 13.5628 18.172 12.6979C19.3209 10.9729 19.3458 8.81843 18.2329 6.77831H18.2326C17.6966 5.86434 16.8848 5.14388 15.9137 4.72048C15.0394 4.33253 14.0885 4.1478 13.1328 4.18C13.2402 3.68245 13.3905 3.16371 13.5123 2.77348H13.5121C13.5735 2.56952 13.5363 2.34833 13.4115 2.17582C13.2864 2.00307 13.0882 1.89847 12.875 1.89322H12.6066C9.60035 1.85028 5.65962 1.65331 3.9673 0.930613H3.94583C2.94028 0.608567 2.15636 0.572618 1.64457 0.866205V0.865956C1.40891 0.976801 1.22817 1.17801 1.14354 1.42442L1.10409 1.55673L1.20795 1.6461C1.20795 1.6461 2.08472 2.42273 2.76127 4.43064C2.79622 5.06749 2.78548 5.70634 2.72906 6.34166L2.41775 7.29379C1.96314 8.66088 1.34401 10.5362 0.857465 12.3042H0.857215C0.545905 13.4658 0.306742 14.6454 0.141491 15.8366V16.259C0.0913121 19.7556 2.23504 23.3025 2.89011 24.3078L2.88979 24.308ZM15.7273 5.114C16.6133 5.50045 17.3548 6.15675 17.846 6.98936C18.8731 8.87546 18.8589 10.8653 17.8031 12.4471C17.2519 13.2173 16.5124 13.8332 15.6556 14.2366C15.6092 14.0004 15.5555 13.7677 15.4911 13.5209C15.4267 13.274 15.3658 13.077 15.3051 12.8588H15.3049C15.8758 12.5308 16.3651 12.0782 16.7366 11.5347C17.0955 10.8958 17.2648 10.1678 17.2244 9.43614C17.1837 8.70444 16.935 7.99965 16.5074 7.40452C16.1693 6.93643 15.7052 6.57395 15.169 6.35947C14.5285 6.07962 13.8302 5.95704 13.1327 6.00147C13.0468 5.7331 12.9896 5.53987 12.9717 5.44326H12.9714C12.9417 5.23805 12.9417 5.02934 12.9714 4.82414C12.9714 4.7812 12.9894 4.73477 13.0001 4.69183V4.63091C13.9348 4.572 14.8697 4.73776 15.7273 5.11398L15.7273 5.114ZM15.1404 12.2719C14.6573 10.5146 14.0344 8.6535 13.5801 7.29364L13.2938 6.43463C13.8917 6.42339 14.4846 6.54572 15.0295 6.79262C15.4871 6.96213 15.8861 7.26046 16.1782 7.65144C16.5569 8.1782 16.7781 8.80207 16.8153 9.44966C16.8527 10.0973 16.7049 10.7424 16.3894 11.3093C16.0738 11.7644 15.6652 12.1473 15.1906 12.433C15.1761 12.39 15.1584 12.3329 15.1404 12.2754L15.1404 12.2719ZM0.567086 15.8508C0.733852 14.6917 0.973015 13.5443 1.28281 12.4149C1.76588 10.6756 2.38499 8.80727 2.83958 7.44018C2.96116 7.08218 3.06501 6.75667 3.15813 6.48103V6.43809C3.22129 5.76256 3.23328 5.08276 3.19383 4.40519V4.34427V4.34452C2.88103 3.2718 2.34428 2.27769 1.61929 1.42762C1.6822 1.34724 1.76134 1.28133 1.85171 1.2344C2.13456 1.08411 2.7035 0.976769 3.80223 1.33101C5.23368 1.92867 8.17927 2.26147 12.6026 2.32238H12.857C12.9339 2.32238 13.0058 2.35958 13.0502 2.42249C13.0969 2.4839 13.1104 2.56429 13.0859 2.63718C12.8817 3.27478 12.7204 3.92509 12.6028 4.58419V4.74521C12.5639 4.99785 12.5639 5.25499 12.6028 5.50765C12.6493 5.75455 12.8677 6.41312 13.2005 7.41522C13.6551 8.7788 14.2742 10.6361 14.7573 12.3899C14.8788 12.7944 15.0007 13.2168 15.1153 13.6497C15.314 14.3587 15.4338 15.0871 15.473 15.8221V16.2085C15.5017 19.6122 13.4152 23.0692 12.7708 24.0464H12.7711C12.7012 24.1545 12.5811 24.2194 12.4525 24.2184H3.57678C3.44747 24.2187 3.32663 24.154 3.25473 24.0464C2.61417 23.091 0.545542 19.6336 0.545542 16.2411C0.545292 16.1058 0.552282 15.971 0.567011 15.8367L0.567086 15.8508Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
