import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="7"
          height="15"
          viewBox="0 0 7 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.53424 0.841194C6.53472 0.794898 6.50036 0.75041 6.46781 0.717617C6.43538 0.684583 6.37462 0.666016 6.32832 0.666016H1.16106C1.11477 0.666016 1.07052 0.685065 1.03821 0.718099C1.00566 0.750771 0.987694 0.795861 0.988296 0.842157C0.988899 0.892672 1.09656 9.30786 1.11489 10.8637V10.8776C1.13562 12.5638 1.15045 13.8321 1.15045 13.9871C1.15045 14.4603 1.60641 14.5563 1.75604 14.5863C2.09505 14.6543 2.59538 14.666 3.32035 14.666H4.10714C4.85642 14.666 5.37366 14.6569 5.71869 14.5898C5.87205 14.56 6.33921 14.4652 6.33921 13.9868C6.33921 13.8317 6.35404 12.5606 6.37466 10.8788C6.37466 10.8774 6.37502 10.8639 6.37502 10.8639C6.39334 9.30807 6.53351 0.891194 6.53424 0.841194ZM1.45278 10.2692C1.61144 10.7198 1.83775 11.0573 2.16 11.2904C1.65303 11.2225 1.46411 11.0968 1.46038 10.8835C1.45797 10.684 1.45544 10.4789 1.45278 10.2692ZM5.99319 13.9887C5.99319 14.0749 5.99319 14.1843 5.65236 14.2505C5.33792 14.3115 4.83638 14.3203 4.10734 14.3203H3.32032C1.9964 14.3203 1.49597 14.2885 1.49597 13.9949C1.49597 13.857 1.4844 12.8526 1.4674 11.4557C1.89228 11.6846 2.68304 11.7029 3.74458 11.7029C4.80615 11.7029 5.59692 11.6847 6.02176 11.4559C6.00452 12.8491 5.99319 13.8509 5.99319 13.9887ZM6.02864 10.8837C6.02466 11.097 5.8349 11.2229 5.32673 11.2906C5.65031 11.0566 5.8771 10.718 6.03623 10.265C6.03358 10.4766 6.03105 10.6832 6.02864 10.8837ZM6.09037 5.94703C6.03503 9.97263 5.9264 11.3495 3.74445 11.3495C1.55878 11.3495 1.45363 9.96794 1.39829 5.92605C1.3696 3.63958 1.34344 1.60724 1.33584 1.01187H6.1531C6.14538 1.60937 6.1193 3.65214 6.09037 5.94703Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}