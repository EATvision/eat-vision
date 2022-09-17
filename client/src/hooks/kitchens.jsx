import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useKitchens = () => {
  const { data, error } = useSWR('/api/kitchens', fetcher)

  return {
    kitchens: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useKitchenById = (kitchenId) => {
  const { data, error } = useSWR(kitchenId && `/api/kitchens/${kitchenId}`, fetcher)

  return {
    kitchen: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useKitchenMenusById = (kitchenId) => {
  const { data, error } = useSWR(kitchenId && `/api/kitchens/${kitchenId}/menus`, fetcher)

  return {
    menus: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useKitchenDishesCategories = (kitchenId) => {
  const { data, error } = useSWR(`/api/kitchens/${kitchenId}/categories`, fetcher)

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  }
}
