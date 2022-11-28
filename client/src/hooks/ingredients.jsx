import { useMemo } from 'react'
import useSWR from 'swr'
import _keyBy from 'lodash/keyBy'
import { useParams } from 'react-router-dom'

import fetcher from 'api/fetcher'
import { useKitchenById } from 'hooks/kitchens'

export const useV1Ingredients = (q) => {
  const { data, error, ...rest } = useSWR(
    q ? `/api/ingredients?q=${q}` : '/api/ingredients',
    fetcher
  )
  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useV1IngredientsByIds = (ids = []) => {
  const { data, error, ...rest } = useSWR(
    `/api/ingredients?ids=${ids.join(',')}`,
    fetcher
  )

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useIngredients = ({ search, mapById = false } = {}) => {
  const options = []
  if (search) {
    options.push(`search=${search}`)
  }
  const { data, error, ...rest } = useSWR(
    `/api/v2/ingredients?${options.join('&')}`,
    fetcher
  )
  const ingredients = useMemo(() => {
    if (!mapById) return data
    return _keyBy(data, 'id')
  }, [data, mapById])

  return {
    ingredients,
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

export const useIngredientsByIds = (ids = []) => {
  const { data, error, ...rest } = useSWR(
    `/api/v2/ingredients?id=${ids.join(',')}`,
    fetcher
  )

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useGetComponentLabel = () => {
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  const getComponentLabel = (c) =>
    (kitchen?.locale === 'he-IL' ? c?.translation_heb : c?.name) || c?.name
  return getComponentLabel
}
