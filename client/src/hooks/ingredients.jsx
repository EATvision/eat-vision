import React from 'react'
import useSWR from 'swr'
import _keyBy from 'lodash/keyBy'

import fetcher from 'api/fetcher'
import { useLanguage } from 'contexts/language'

export const useV1Ingredients = (q) => {
  const { data, error, ...rest } = useSWR(
    q ? `/api/v1/ingredients?q=${q}` : '/api/v1/ingredients',
    fetcher
  )
  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useV1IngredientsByIds = (ids = [], options) => {
  const { data, error, ...rest } = useSWR(
    `/api/v1/ingredients?ids=${ids.join(',')}`,
    fetcher,
    options
  )

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useIngredientById = (id) => {
  const { data, error, ...rest } = useSWR(
    id && `/api/v2/ingredients/${id}`,
    fetcher
  )

  return {
    ingredient: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useIngredientsByIds = (ids = [], options) => {
  const { data, error, ...rest } = useSWR(
    `/api/v2/ingredients?id=${ids.join(',')}`,
    fetcher,
    options
  )

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useGetComponentLabel = () => {
  const { language } = useLanguage()

  const getComponentLabel = (c) =>
    (language === 'he-IL' ? c?.translation_heb : c?.name) || c?.name
  return getComponentLabel
}

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

export const useIngredients = ({
  page = 0,
  search = '',
  rowsPerPage = 15,
  mapById = false,
  lookUpIngredients = false,
} = {}) => {
  const [ingredients, setIngredients] = React.useState([])
  const [amountOfIngredients, setAmountOfIngredients] = React.useState(0)

  const query = getQuery({ page, search, rowsPerPage, lookUpIngredients })

  const { data, error, ...rest } = useSWR(
    `/api/v2/ingredients/${query}`,
    fetcher
  )

  const isLoading = !error && !data

  React.useEffect(() => {
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
