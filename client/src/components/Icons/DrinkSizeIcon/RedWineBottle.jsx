import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="8"
          height="25"
          viewBox="0 0 8 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66021 24.666H6.64967C6.94919 24.666 7.23661 24.5471 7.44844 24.3351C7.66027 24.1232 7.77939 23.8358 7.77939 23.5363V15.2227C7.78098 14.7758 7.69785 14.3325 7.53454 13.9167C7.10998 12.8195 6.15654 10.2464 5.76797 9.19188C5.65294 8.87756 5.58894 8.54687 5.57846 8.21224L5.3696 2.09276L5.47734 1.87069V1.87091C5.65568 1.5017 5.5377 1.0578 5.19992 0.825909C5.0546 0.725461 4.88332 0.669887 4.70681 0.666016H3.47253C3.26959 0.66761 3.07576 0.749834 2.93363 0.894468C2.68605 1.14251 2.6241 1.52105 2.78035 1.83493L2.88489 2.05381H2.90448L2.6922 8.25784H2.69198C2.68924 8.5881 2.63185 8.91585 2.52228 9.22768C2.14032 10.2629 1.21629 12.7868 0.788539 13.871V13.8707C0.62819 14.2875 0.546197 14.7303 0.546879 15.177V23.5361C0.546879 23.8328 0.663497 24.1178 0.871904 24.3292C1.08031 24.5406 1.36343 24.6615 1.66023 24.6658L1.66021 24.666ZM6.64944 24.2676H1.66021C1.25706 24.2658 0.930658 23.9394 0.928851 23.5363V21.7011H7.38127V23.5363C7.37945 23.9394 7.05306 24.2658 6.64991 24.2676H6.64944ZM0.928851 21.3028V16.3069H7.38127V21.3028H0.928851ZM3.21449 1.18868C3.28396 1.11921 3.37757 1.07957 3.47574 1.07775H4.71001C4.80727 1.08163 4.90133 1.11351 4.98105 1.16909C5.12022 1.26658 5.18923 1.43649 5.15734 1.60344H3.10996C3.06759 1.45699 3.10609 1.29914 3.21132 1.18868H3.21449ZM1.1443 14.0148C1.56226 12.9373 2.47968 10.4557 2.87805 9.36831H2.87827C3.00696 9.02529 3.07871 8.66359 3.09032 8.29736L3.30579 2.01811H4.96782L5.1801 8.26121H5.18032C5.19262 8.63292 5.26528 9.00033 5.39579 9.34854C5.80076 10.4523 6.73782 12.986 7.16557 14.08C7.30883 14.4497 7.38195 14.8428 7.38104 15.2391V15.9249H0.92862V15.1705C0.928164 14.7751 1.00105 14.3831 1.14409 14.0146L1.1443 14.0148Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
