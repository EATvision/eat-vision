import React from 'react'
import { SvgIcon } from '@mui/material'
import { ReactComponent as iconSource } from '../../icons/raise-your-hand-to-ask.svg'

export function RaiseHandIcon(props) {
  return <SvgIcon {...props} component={iconSource} inheritViewBox />
}
