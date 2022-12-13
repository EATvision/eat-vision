import { useMemo, useState } from 'react'

const useTableSettings = () => {
  const [page, setPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(10)

  return useMemo(
    () => ({
      page,
      setPage,
      rowsPerPage,
      searchQuery,
      setSearchQuery,
      setRowsPerPage,
    }),
    [page, rowsPerPage, searchQuery]
  )
}

export default useTableSettings
