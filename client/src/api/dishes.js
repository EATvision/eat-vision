import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useDishes = () => {
  const { data, error, ...rest } = useSWR('/api/dishes', fetcher)

  return {
    dishes: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useDishById = (id) => {
  const { data, error, ...rest } = useSWR(id && `/api/dishes/${id}`, fetcher)

  return {
    dish: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
