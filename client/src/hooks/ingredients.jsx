import useSWR from 'swr'
import fetcher from '../api/fetcher'

// eslint-disable-next-line import/prefer-default-export
export const useIngredients = (q) => {
  const { data, error } = useSWR(q ? `/api/ingredients?q=${q}` : '/api/ingredients', fetcher)

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
  }
}
