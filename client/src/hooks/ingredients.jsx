import useSWR from 'swr'
import fetcher from '../api/fetcher'

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
