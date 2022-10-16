import useSWR from 'swr'
import fetcher from '../api/fetcher'

// eslint-disable-next-line import/prefer-default-export
export const useDiets = () => {
  const { data, error } = useSWR('/api/diets', fetcher)

  return {
    diets: data,
    isLoading: !error && !data,
    isError: error,
  }
}
