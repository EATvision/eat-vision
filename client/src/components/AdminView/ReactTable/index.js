import React, { useMemo, useState } from 'react'

import {
  Paper,
  Table,
  TableRow,
  TableCell,
  useTheme,
  TableBody,
  TableHead,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material'
import { Box } from '@mui/system'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'

import './table.css'

import { editColumn, expanderColumn } from './customColumns'

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
const TableHeaderCell = ({ header }) => {
  const cellValue = header.isPlaceholder
    ? null
    : flexRender(header.column.columnDef.header, header.getContext())

  return (
    <TableCell>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SortHeader header={header}>{cellValue}</SortHeader>
      </Box>
    </TableCell>
  )
}

const TableRowCell = ({ row, header, onEditRow }) => {
  const rowInfo = row.original

  return (
    <TableCell>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {header.column.columnDef.renderCellValue
          ? header.column.columnDef.renderCellValue({ row, onEditRow })
          : rowInfo[header.id]}
      </Box>
    </TableCell>
  )
}

const ExpandableTableRow = ({
  row,
  headerAmount,
  isExpandable,
  expandableRowComponent,
}) => {
  if (!isExpandable) return null

  if (row.getIsExpanded())
    return (
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={headerAmount}
        >
          {expandableRowComponent({ row })}
        </TableCell>
      </TableRow>
    )
  return null
}

const TableRows = ({
  tableRows,
  tableHeaders,
  onEditRow,
  isExpandable,
  expandableRowComponent,
}) => {
  return (
    <>
      {tableRows.map((row) => (
        <React.Fragment key={row.original._id || row.original.id}>
          <TableRow hover>
            {tableHeaders.map((header) => (
              <TableRowCell
                key={header.id}
                row={row}
                header={header}
                onEditRow={onEditRow}
              />
            ))}
          </TableRow>
          <ExpandableTableRow
            row={row}
            headerAmount={tableHeaders.length}
            isExpandable={isExpandable}
            expandableRowComponent={expandableRowComponent}
          />
        </React.Fragment>
      ))}
    </>
  )
}
const ReactTable = ({
  data,
  columns,
  dataCount,
  onEditRow,
  isExpandable,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  expandableRowComponent,
}) => {
  const [sorting, setSorting] = useState([])

  const computedHeaders = useMemo(
    () => [
      ...(isExpandable ? [expanderColumn] : []),
      ...(onEditRow ? [editColumn] : []),
      ...columns,
    ],
    [columns, isExpandable, onEditRow]
  )
  const ReactTable = useReactTable({
    state: {
      sorting,
    },
    data,
    columns: computedHeaders,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => isExpandable,
    debugTable: true, //TODO: REMOVE
  })

  const tableHeaders = ReactTable.getHeaderGroups()[0].headers
  const tableRows = ReactTable.getRowModel().rows

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHeaderCell key={header.id} header={header} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRows
              tableRows={tableRows}
              tableHeaders={tableHeaders}
              onEditRow={onEditRow}
              isExpandable={isExpandable}
              expandableRowComponent={expandableRowComponent}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={0}
        component={Paper}
        count={dataCount}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  )
}

export default ReactTable
