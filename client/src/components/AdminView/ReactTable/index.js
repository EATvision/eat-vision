import React, { useMemo, useState } from 'react'

import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TablePagination,
} from '@mui/material'
import { Box } from '@mui/system'

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'

import './table.css'

import { editColumn, expanderColumn } from './customColumns'
import {
  ReactTableProvider,
  useReactTableContext,
} from './useReactTableContext'
import SortHeader from './actionHeaders/SortHeader'

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

const ExpandableTableRow = ({ row, headerAmount, expandableRowComponent }) => {
  if (!expandableRowComponent) return null

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

const TableRows = ({ onEditRow, expandableRowComponent } = {}) => {
  const { getRowModel, getHeaderGroups } = useReactTableContext()
  const tableHeaders = getHeaderGroups()[0].headers
  const tableRows = getRowModel().rows

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
            expandableRowComponent={expandableRowComponent}
          />
        </React.Fragment>
      ))}
    </>
  )
}

const TableHeaders = () => {
  const { getHeaderGroups } = useReactTableContext()
  const tableHeaders = getHeaderGroups()[0].headers

  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map((header) => (
          <TableHeaderCell key={header.id} header={header} />
        ))}
      </TableRow>
    </TableHead>
  )
}

const PagePicker = ({
  page,
  dataCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handlePageChange = (e, newPage) => onPageChange(newPage)

  const handleRowsPerPageChange = (e) => {
    const page = Number(e.target.value) || 10
    onRowsPerPageChange(page)
  }

  return (
    <TablePagination
      page={page}
      component={Paper}
      count={dataCount}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  )
}
const ReactTable = ({
  data,
  page,
  columns,
  dataCount,
  onEditRow,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  expandableRowComponent,
}) => {
  const [sorting, setSorting] = useState([])

  const computedHeaders = useMemo(
    () => [
      ...(expandableRowComponent ? [expanderColumn] : []),
      ...(onEditRow ? [editColumn] : []),
      ...columns,
    ],
    [columns, expandableRowComponent, onEditRow]
  )
  const ReactTable = useReactTable({
    state: {
      sorting,
    },
    data,
    columns: computedHeaders,
    debugTable: true, //TODO: REMOVE
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => !!expandableRowComponent,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Box>
      <ReactTableProvider ReactTable={ReactTable}>
        <TableContainer component={Paper}>
          <Table>
            <TableHeaders />
            <TableBody>
              <TableRows
                onEditRow={onEditRow}
                expandableRowComponent={expandableRowComponent}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <PagePicker
          page={page}
          dataCount={dataCount}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      </ReactTableProvider>
    </Box>
  )
}

export default ReactTable
