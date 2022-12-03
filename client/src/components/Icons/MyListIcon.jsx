import React from 'react'
import { SvgIcon } from '@mui/material'
import { ReactComponent as iconSource } from '../../icons/my-list.svg'

export function MyListIcon(props) {
  return <SvgIcon {...props} component={iconSource} inheritViewBox />
}
