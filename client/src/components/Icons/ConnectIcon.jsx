import React from 'react'
import { SvgIcon } from '@mui/material'
import { ReactComponent as iconSource } from '../../icons/groups.svg'

export function ConnectIcon(props) {
  return <SvgIcon {...props} component={iconSource} inheritViewBox />
}
