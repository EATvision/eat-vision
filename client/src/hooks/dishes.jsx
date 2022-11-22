import useSWR from 'swr'
import fetcher from 'api/fetcher'

export const useDishes = ({ search, kitchens }) => {
  const options = []
  if (search) {
    options.push(`search=${search}`)
  }
  if (kitchens) {
    options.push(`kitchen=${kitchens.join(',')}`)
  }
  const { data, error, ...rest } = useSWR(
    `/api/v2/dishes?${options.join('&')}`,
    fetcher
  )

  return {
    dishes: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useDishesByKitchenId = (kitchenId) => {
  const { data, error, ...rest } = useSWR(
    `/api/v2/dishes?kitchen=${kitchenId}`,
    fetcher
  )

  return {
    dishes: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useDishById = (id) => {
  const { data, error, ...rest } = useSWR(id && `/api/v2/dishes/${id}`, fetcher)

  return {
    dish: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
