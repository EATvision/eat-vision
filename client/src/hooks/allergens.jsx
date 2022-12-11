import useSWR from 'swr'
import fetcher from '../api/fetcher'

export const useAllergens = () => {
  const { data, error } = useSWR('/api/allergens', fetcher)

  return {
    allergens: data,
    isLoading: !error && !data,
    isError: error,
  }
}
