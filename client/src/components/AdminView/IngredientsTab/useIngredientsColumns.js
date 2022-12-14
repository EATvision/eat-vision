import React, { useMemo } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import BlockIcon from '@mui/icons-material/Block'

const useIngredientsColumns = () =>
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
        accessorKey: 'translation_heb',
        header: 'In hebrew',
      },
      {
        accessorKey: 'isSearchable',
        header: 'is Searchable',
        renderCellValue: ({ row }) =>
          row?.original?.isSearchable ? <DoneIcon /> : <BlockIcon />,
      },
    ],
    []
  )

export default useIngredientsColumns
