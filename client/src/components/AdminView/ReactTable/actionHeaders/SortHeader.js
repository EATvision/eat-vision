import React from 'react'
import { useTheme } from '@emotion/react'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { IconButton } from '@mui/material'

const SortHeader = ({ header, children }) => {
  const theme = useTheme()

  const { disableColumnSort } = header.column.columnDef

  if (disableColumnSort) return children

  const ascendingOrderIcon = <ArrowDownwardIcon fontSize="inherit" />
  const descendingOrderIcon = <ArrowUpwardIcon fontSize="inherit" />

  const chosenSortIcon = disableColumnSort
    ? ''
    : {
      asc: ascendingOrderIcon,
      desc: descendingOrderIcon,
    }[header.column.getIsSorted() + '']

  return (
    <div id="hover-parent">
      {children}
      <IconButton
        className="hidden-child"
        size="small"
        sx={{
          margin: `0px ${theme.spacing(1)}`,
          ...(chosenSortIcon && { visibility: 'visible !important' }),
        }}
        onClick={header.column.getToggleSortingHandler()}
      >
        {chosenSortIcon ?? ascendingOrderIcon}
      </IconButton>
    </div>
  )
}

export default SortHeader
