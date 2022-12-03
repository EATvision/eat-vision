import React from 'react'
import { SvgIcon } from '@mui/material'
import { ReactComponent as iconSource } from '../../icons/profile.svg'

export function ProfileIcon(props) {
  return <SvgIcon {...props} component={iconSource} inheritViewBox />
}
