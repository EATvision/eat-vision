import useSWR from 'swr'

import { useParams } from 'react-router-dom'

import fetcher from 'api/fetcher'
import { useV1KitchenById } from 'hooks/kitchens'

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

  const { kitchen } = useV1KitchenById(kitchenId)

  const getComponentLabel = (c) =>
    (kitchen?.locale === 'he-IL' ? c?.translation_heb : c?.name) || c?.name
  return getComponentLabel
}
