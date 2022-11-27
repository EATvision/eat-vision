import { useEffect, useState } from 'react'

const { default: useSWR } = require('swr')

const { default: fetcher } = require('api/fetcher')

const getQuery = (page, searchQuery, rowsPerPage) => {
  const query = []

  if (page) query.push(`page=${page}`)
  if (rowsPerPage) query.push(`limit=${rowsPerPage}`)
  if (searchQuery) query.push(`searchQuery=${searchQuery}`)

  return query.length === 0 ? '' : `?${query.join('&')}`
}

const useCustomers = ({ page = 0, searchQuery = '', rowsPerPage }) => {
  const [customers, setCustomers] = useState([])
  const [amountOfCustomers, setAmountOfCustomers] = useState(0)

  const query = getQuery(page, searchQuery, rowsPerPage)

  const { data, error, ...rest } = useSWR(
    `/api/v2/admin/customers/${query}`,
    fetcher
  )

  const isLoading = !error && !data

  useEffect(() => {
    if (!isLoading && data) {
      setCustomers(data.customers)
      setAmountOfCustomers(data.amountOfCustomers)
    }
  }, [isLoading, data])

  return {
    ...rest,
    customers,
    amountOfCustomers,
    isLoading,
    isError: error,
  }
}

export default useCustomers
