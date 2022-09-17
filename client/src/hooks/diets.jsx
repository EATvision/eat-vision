import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

// eslint-disable-next-line import/prefer-default-export
export const useDiets = () => {
  const { data, error } = useSWR('/api/diets', fetcher)

  return {
    diets: data,
    isLoading: !error && !data,
    isError: error,
  }
}
