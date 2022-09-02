import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

// eslint-disable-next-line import/prefer-default-export
export const useIngredients = (q) => {
  const { data, error } = useSWR(q ? `/api/ingredients?q=${q}` : '/api/ingredients', fetcher)

  return {
    ingredients: data,
    isLoading: !error && !data,
    isError: error,
  }
}
