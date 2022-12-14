import useSWR from 'swr'
import fetcher from '../api/fetcher'

export const useAllergens = () => {
  const { data, error } = useSWR('/api/v1/allergens', fetcher)

  return {
    allergens: data,
    isLoading: !error && !data,
    isError: error,
  }
}
