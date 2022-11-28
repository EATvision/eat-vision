import useSWR from 'swr'

import fetcher from 'api/fetcher'

export const useV1FoodGroups = (q) => {
  const { data, error, ...rest } = useSWR(
    q ? `/api/foodGroups?q=${q}` : '/api/foodGroups',
    fetcher
  )
  return {
    foodGroups: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useV1FoodGroupsByIds = (ids = []) => {
  const { data, error, ...rest } = useSWR(
    `/api/foodGroups?ids=${ids.join(',')}`,
    fetcher
  )

  return {
    foodGroups: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
