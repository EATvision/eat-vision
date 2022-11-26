import { Box, styled } from '@mui/material'
import React from 'react'

const StyledBox = styled(Box)({
  position: 'absolute',
  backgroundColor: 'orange',
  textAlign: 'left',
  transform: 'rotate(-60deg) skewX(-30deg) scale(1,.866)',
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    backgroundColor: 'inherit',
  },

  '&, &:before, &:after': {
    width: '10em',
    height: '10em',
    borderTopRightRadius: '50%',
  },
  '&:before': {
    transform:
      'rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%)',
  },
  '&:after': {
    transform: 'rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%)',
  },
})

export function Triangle() {
  return <StyledBox></StyledBox>
}
