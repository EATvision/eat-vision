import useSWR from 'swr'

import fetcher from 'api/fetcher'

export const useV1FoodGroups = (q) => {
  const { data, error, ...rest } = useSWR(
    q ? `/api/v1/foodGroups?q=${q}` : '/api/v1/foodGroups',
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
    `/api/v1/foodGroups?ids=${ids.join(',')}`,
    fetcher
  )

  return {
    foodGroups: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
