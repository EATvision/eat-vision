import React from 'react'
import { SvgIcon } from '@mui/material'
import { ReactComponent as iconSource } from '../../icons/settings.svg'

export function SettingsIcon(props) {
  return <SvgIcon {...props} component={iconSource} inheritViewBox />
}
