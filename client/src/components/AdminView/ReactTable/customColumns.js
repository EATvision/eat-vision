import React from 'react'

import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export const editColumn = {
  id: 'editor',
  disableColumnSort: true,
  isPlaceholder: true,
  renderCellValue: ({ row, onEditRow = () => {} }) => (
    <IconButton size="small" onClick={() => onEditRow({ row })}>
      <EditIcon />
    </IconButton>
  ),
}
export const expanderColumn = {
  id: 'expander',
  disableColumnSort: true,
  header: ({ table }) => (
    <IconButton size="small" onClick={table.getToggleAllRowsExpandedHandler()}>
      {table.getIsAllRowsExpanded() ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      )}
    </IconButton>
  ),
  renderCellValue: ({ row }) => (
    <IconButton
      aria-label="expand row"
      size="small"
      onClick={row.getToggleExpandedHandler()}
    >
      {row.getIsExpanded() ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      )}
    </IconButton>
  ),
}
