import React from 'react'
import { SvgIcon } from '@mui/material'

export default function DrinkSizeIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={() => (
        <svg
          width="22"
          height="25"
          viewBox="0 0 22 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5963 3.78211C19.474 3.63973 19.3145 3.53403 19.1357 3.47697C18.9569 3.4199 18.7657 3.41365 18.5836 3.45903L17.7345 3.66934H13.5662L10.6057 2.73437L10.9054 0.666016H8.56799L8.86798 2.71892L4.46604 3.95775H4.46631C3.47832 3.889 2.48735 4.03927 1.56426 4.39767C1.2746 4.49984 1.03467 4.70907 0.894187 4.98215L0.777344 5.3017H1.11619V5.30143C1.41399 5.368 1.70012 5.47833 1.96533 5.62886L4.26358 9.38791L4.48558 12.4381L5.12821 13.0807V14.8064L5.57221 15.0714L5.06979 15.5116L3.64836 24.2764L5.24146 24.666H14.2713L15.9269 24.2764L14.4699 15.5234L13.9401 15.0794L14.3297 14.834V13.0926L14.9724 12.4499L15.1982 9.33348L15.6813 6.60673L18.1121 5.91736C18.4227 5.84807 18.7464 5.94806 18.964 6.18012C19.1816 6.41189 19.2604 6.7415 19.1716 7.04692L17.6136 12.0252C17.5236 12.2844 17.297 12.4722 17.0253 12.5121L16.8772 12.4537H16.8226H16.8228C16.5511 12.4738 16.3022 12.6118 16.1411 12.8314C15.9799 13.0509 15.9229 13.33 15.9854 13.5952C16.0859 14.0628 16.5223 14.3799 16.9981 14.3313L17.8706 14.2457C18.1453 14.2174 18.4067 14.1136 18.6263 13.9457C18.8456 13.778 19.014 13.5528 19.1132 13.2952L21.4506 7.12075C21.546 6.86641 21.5707 6.59115 21.5229 6.32378C21.4748 6.0564 21.3558 5.80695 21.1781 5.60152L19.5963 3.78211ZM6.52288 16.4389L9.47953 16.587L9.4798 24.1949H5.54142L6.52288 16.4389ZM9.95478 16.587L12.7441 16.4622L13.8269 24.1947H9.95505L9.95478 16.587ZM12.8919 15.9794L9.71701 16.1234L6.3786 15.956L5.70119 15.5973L6.14139 15.2077L13.3869 15.208L13.8076 15.5742L12.8919 15.9794ZM5.88006 14.7368L5.56838 14.5499L5.56866 13.2331H13.8813V14.5499L13.5696 14.7368H5.88006ZM6.32433 12.7421L5.59991 4.44472H9.49537V12.7421H6.32433ZM9.98613 12.7421V4.44472H13.8427L12.9468 12.7421H9.98613ZM10.3758 1.13776L10.1421 2.71917L9.77582 2.87107L9.35111 2.71537L9.12122 1.15732L10.3758 1.13776ZM9.1291 3.13606L9.78341 3.38142L10.3717 3.13986L12.9504 3.95394L6.20369 3.95421L9.1291 3.13606ZM4.922 12.2403L4.71576 9.2369L2.28493 5.28301L2.23031 5.25176C2.0113 5.13981 1.78631 5.03955 1.55643 4.95178C1.89147 4.73358 2.68598 4.42599 4.47803 4.45316H5.12066L5.84535 12.7428H5.4557L4.922 12.2403ZM5.44779 16.011L6.05157 16.3265L5.06219 24.1174L4.17799 23.9071L5.44779 16.011ZM15.393 23.9146L14.3023 24.1641L13.2078 16.3732L14.0648 15.9835L15.393 23.9146ZM14.7423 9.28302L14.5319 12.228L14.01 12.7421H13.4257L14.3216 4.42946H15.5254L15.2526 6.37719L14.7423 9.28302ZM21.0061 6.94561L18.6845 13.1317C18.6176 13.3062 18.5035 13.4589 18.3549 13.5722C18.2065 13.6858 18.0293 13.7559 17.8432 13.7744L16.9666 13.86V13.8602C16.7429 13.8828 16.5362 13.7388 16.4796 13.5211C16.443 13.3863 16.4718 13.2421 16.5576 13.1317C16.6253 13.0388 16.7253 12.9747 16.838 12.9524L16.9861 13.0108H17.0408C17.2769 12.9934 17.503 12.9067 17.6904 12.7622C17.8782 12.6174 18.0192 12.4209 18.0964 12.1967L19.6544 7.20268C19.7914 6.73422 19.6697 6.22853 19.3346 5.87342C18.9999 5.51855 18.5018 5.36774 18.0262 5.47725L15.7745 6.11988L16.0473 4.17215H17.7768L18.6844 3.95015C18.8816 3.89906 19.0909 3.96564 19.2221 4.1216L20.8035 5.94079C20.9234 6.07692 21.0051 6.24213 21.0407 6.41984C21.0763 6.59782 21.0644 6.78177 21.0062 6.95351L21.0061 6.94561Z"
            fill="black"
          />
        </svg>
      )}
      inheritViewBox
    />
  )
}
