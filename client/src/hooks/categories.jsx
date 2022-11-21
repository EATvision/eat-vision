import { useMemo } from 'react'
import useSWR from 'swr'
import fetcher from 'api/fetcher'
import _keyBy from 'lodash/keyBy'

export const useCategories = ({ search, kitchens, mapById = false } = {}) => {
  const options = []
  if (search) {
    options.push(`search=${search}`)
  }
  if (kitchens) {
    options.push(`kitchen=${kitchens.join(',')}`)
  }
  const { data, error, ...rest } = useSWR(
    `/api/v2/categories?${options.join('&')}`,
    fetcher
  )

  const categories = useMemo(() => {
    if (!mapById) return data
    return _keyBy(data, 'id')
  }, [data, mapById])

  return {
    categories,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useCategoriesByKitchenId = (kitchenId) => {
  const { data, error, ...rest } = useSWR(
    `/api/v2/categories?kitchens=${kitchenId}`,
    fetcher
  )

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useDishById = (id) => {
  const { data, error, ...rest } = useSWR(
    id && `/api/v2/categories/${id}`,
    fetcher
  )

  return {
    category: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
