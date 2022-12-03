import React from 'react'
import { SvgIcon } from '@mui/material'
import { ReactComponent as iconSource } from '../../icons/raise-hand.svg'

export function RaiseHandIcon(props) {
  return <SvgIcon {...props} component={iconSource} inheritViewBox />
}
