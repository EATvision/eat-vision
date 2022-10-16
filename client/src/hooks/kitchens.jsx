import useSWR from 'swr'
import fetcher from '../api/fetcher'

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

export const useKitchenCategoriesByMenu = (kitchenId, menuId) => {
  const { data, error } = useSWR(`/api/kitchens/${kitchenId}/menus/${menuId}/categories`, fetcher)

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  }
}
