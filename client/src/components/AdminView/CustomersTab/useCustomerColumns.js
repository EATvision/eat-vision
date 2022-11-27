import React, { useMemo } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import BlockIcon from '@mui/icons-material/Block'

const useCustomerColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'id',
      },
      {
        accessorKey: 'name',
        header: 'name',
      },
      {
        accessorKey: 'isSuspended',
        header: 'is Suspended',
        renderCellValue: ({ row }) =>
          row?.original?.isSuspended ? <DoneIcon /> : <BlockIcon />,
      },
    ],
    []
  )

export default useCustomerColumns
