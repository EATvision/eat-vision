import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="19"
          height="25"
          viewBox="0 0 19 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6234 2.77722C13.7023 2.77722 13.025 3.07649 12.618 3.32659C12.6534 1.94368 12.6776 1.00601 12.6788 0.970247C12.6809 0.889851 12.6503 0.812962 12.5949 0.755507C12.5391 0.698465 12.4626 0.666016 12.3828 0.666016H0.827331C0.747347 0.666016 0.670877 0.698257 0.615279 0.755507C0.559475 0.812756 0.529094 0.895427 0.531369 0.974999C0.534883 1.11224 0.87859 14.2956 0.893056 15.4808H0.891816C0.891816 15.4808 0.893056 15.4826 0.893056 15.4861C0.893263 15.5051 0.893263 15.5188 0.893263 15.5293C0.893263 15.649 0.922817 15.748 0.976553 15.8356C1.13983 16.2012 1.52115 16.51 1.94835 16.8546C2.60247 17.3824 3.34342 17.9801 3.34342 18.8637V19.9252C3.34342 20.6128 2.55141 21.2438 1.85242 21.8002C1.22184 22.3022 0.677665 22.7357 0.677665 23.2447C0.677665 23.5965 0.677665 24.666 6.60462 24.666C12.53 24.666 12.53 23.5964 12.53 23.2447C12.53 22.7356 11.9852 22.3023 11.354 21.8002C10.6552 21.2438 9.86218 20.613 9.86218 19.9252V19.6592C9.86218 19.6495 9.86445 19.6391 9.86445 19.629H9.86218V18.8637C9.86218 18.0934 10.4254 17.5401 11.0034 17.0616C11.0053 17.0604 11.007 17.0593 11.0088 17.0581L11.0082 17.0575C11.0917 16.9885 11.1754 16.9209 11.2583 16.8543C11.2692 16.8454 11.2796 16.8368 11.2905 16.8279V16.8281C11.2967 16.8225 11.3056 16.8157 11.3128 16.8097C11.3246 16.8002 11.336 16.7911 11.3478 16.7816C11.4871 16.6764 11.7566 16.5226 12.0631 16.3482C13.8488 15.3321 18.0313 12.9526 18.0313 7.81381C18.0311 4.84816 16.6301 2.77706 14.6236 2.77706L14.6234 2.77722ZM12.5262 6.91287C12.5686 5.30033 13.899 4.86965 14.6792 4.86965C15.5723 4.86965 16.1048 6.04647 16.1048 8.01778C16.1048 10.4847 14.5074 12.2857 13.4343 12.8942C12.9635 13.1608 12.6163 13.1988 12.4809 13.1176C12.4092 13.0746 12.3745 12.9725 12.3778 12.8136C12.4187 11.1498 12.4741 8.95861 12.5262 6.91306L12.5262 6.91287ZM10.985 22.2641C11.4095 22.6018 11.9374 23.022 11.9374 23.2452C11.9374 23.4604 10.9575 24.074 6.60462 24.074C2.25052 24.074 1.27025 23.4604 1.27025 23.2452C1.27025 23.0218 1.79791 22.6021 2.22157 22.2641C2.80914 21.7962 3.45279 21.2822 3.75702 20.6591C3.92567 20.8298 4.14371 20.9548 4.41114 20.9961C4.83132 21.061 5.71817 21.0563 6.60484 21.0563C7.49171 21.0563 8.37853 21.061 8.79895 20.9961C9.06453 20.955 9.28196 20.8314 9.45022 20.6622C9.75507 21.2836 10.3978 21.7968 10.9848 22.2641L10.985 22.2641ZM3.93532 18.7402C3.92706 18.3843 3.84087 18.0799 3.70694 17.8114C3.96736 17.9001 4.2131 17.9654 4.41091 17.996C4.87904 18.0679 5.85127 18.0937 6.60503 18.0937C7.35878 18.0937 8.331 18.0679 8.79936 17.996C9.00934 17.9633 9.27224 17.8928 9.55083 17.7957C9.38735 18.0925 9.27967 18.4258 9.27016 18.8082L9.26934 19.6539C9.25818 19.9499 9.04303 20.3769 8.70839 20.4288C7.92199 20.5497 5.28766 20.5313 4.50121 20.4104C4.15791 20.3571 3.93841 19.9253 3.93841 19.6291H3.93593V18.7402L3.93532 18.7402ZM10.8856 16.3932C10.8068 16.4566 10.7264 16.5222 10.645 16.5887C10.1064 16.9843 9.21187 17.3324 8.70901 17.41C8.34526 17.466 7.53902 17.501 6.605 17.501C5.67104 17.501 4.86474 17.4663 4.5012 17.41C4.06242 17.3422 3.32581 17.0684 2.78681 16.7371C2.63036 16.6058 2.47184 16.481 2.32075 16.3593C2.29182 16.3359 2.2633 16.3134 2.23457 16.2902C2.91785 16.3539 3.87726 16.3545 5.15905 16.3545L6.60497 16.3537L8.15216 16.3549C9.56004 16.3549 10.4149 16.3434 11.0186 16.2859C10.9748 16.3212 10.9304 16.3572 10.8855 16.3932L10.8856 16.3932ZM11.7301 15.4809H11.7226C11.722 15.4809 11.7152 15.5192 11.7081 15.5446C11.4403 15.7728 9.62318 15.7678 8.15223 15.7678L6.60504 15.7639L5.15912 15.7633C3.63051 15.7633 1.73776 15.7618 1.50009 15.5376C1.49307 15.5132 1.48666 15.4884 1.48562 15.4646C1.47198 14.4405 1.18429 3.30751 1.13138 1.25884H12.0784C12.0573 2.08244 11.732 15.1847 11.73 15.481L11.7301 15.4809ZM12.3168 15.5185C12.3174 15.3757 12.3327 14.6957 12.3569 13.7002C12.4505 13.7295 12.5495 13.7488 12.6595 13.7488C12.9664 13.7488 13.3306 13.6345 13.727 13.4096C15.1581 12.5986 16.698 10.5651 16.698 8.01809C16.698 5.64085 15.9627 4.27741 14.6796 4.27741C13.9151 4.27741 13.1107 4.56842 12.5712 5.17852C12.581 4.79389 12.5905 4.42413 12.5998 4.07339C12.6742 4.00498 13.3946 3.37027 14.6244 3.37027C16.282 3.37027 17.4392 5.19773 17.4392 7.8147C17.4381 12.1729 14.2741 14.3692 12.3169 15.5189L12.3168 15.5185Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
