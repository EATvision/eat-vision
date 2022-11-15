import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import fetcher from '../api/fetcher'
import { useKitchenById } from './kitchens'

export const useIngredients = (q) => {
  const { data, error } = useSWR(q ? `/api/ingredients?q=${q}` : '/api/ingredients', fetcher)

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useIngredientsByIds = (ids = []) => {
  const { data, error } = useSWR(`/api/ingredients?ids=${ids.join(',')}`, fetcher)

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useGetComponentLabel = () => {
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  const getComponentLabel = (c) => (kitchen?.locale === 'he-IL' ? c.translation_heb : c.name) || c.name
  return getComponentLabel
}
