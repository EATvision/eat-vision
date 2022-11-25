import React from 'react'
import { SvgIcon } from '@mui/material'
import { ReactComponent as iconSource } from '../../icons/groups.svg'

export function GroupsIcon(props) {
  return (
    <SvgIcon
      {...props}
      component={iconSource}
      inheritViewBox
      fontSize="large"
    />
  )
}
