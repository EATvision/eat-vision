import useSWR from 'swr'
import fetcher from '../api/fetcher'

export const useDiets = () => {
  const { data, error } = useSWR('/api/v1/diets', fetcher)

  return {
    diets: data,
    isLoading: !error && !data,
    isError: error,
  }
}
