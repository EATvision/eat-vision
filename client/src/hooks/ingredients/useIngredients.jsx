import { useEffect, useState } from 'react'
import useSWR from 'swr'

import _keyBy from 'lodash/keyBy'

const { default: fetcher } = require('api/fetcher')

const getQuery = ({ page, search, rowsPerPage, lookUpIngredients }) => {
  const query = []

  if (page) {
    query.push(`skip=${page * rowsPerPage}`)
    query.push(`limit=${rowsPerPage}`)
  }
  if (rowsPerPage) query.push(`limit=${rowsPerPage}`)
  if (search) query.push(`search=${search}`)
  if (lookUpIngredients) query.push('lookUpSubIngredients=true')
  return query.length === 0 ? '' : `?${query.join('&')}`
}

const useIngredients = ({
  page = 0,
  search = '',
  rowsPerPage = 15,
  mapById = false,
  lookUpIngredients = false,
} = {}) => {
  const [ingredients, setIngredients] = useState([])
  const [amountOfIngredients, setAmountOfIngredients] = useState(0)

  const query = getQuery({ page, search, rowsPerPage, lookUpIngredients })

  const { data, error, ...rest } = useSWR(
    `/api/v2/ingredients/${query}`,
    fetcher
  )

  const isLoading = !error && !data

  useEffect(() => {
    if (!isLoading && data) {
      setIngredients(!mapById ? data.ingredients : _keyBy(data, 'id'))
      setAmountOfIngredients(data.amountOfIngredients)
    }
  }, [isLoading, data, mapById])

  return {
    ...rest,
    ingredients,
    isLoading: !error && !data,
    isError: error,
    amountOfIngredients,
  }
}

export default useIngredients
