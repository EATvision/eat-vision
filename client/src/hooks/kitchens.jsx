import useSWR from 'swr'
import fetcher from '../api/fetcher'

export const useV1Kitchens = () => {
  const { data, error, ...rest } = useSWR('/api/kitchens', fetcher)

  return {
    kitchens: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useV1KitchenById = (kitchenId) => {
  const { data, error, ...rest } = useSWR(
    kitchenId && `/api/kitchens/${kitchenId}`,
    fetcher
  )

  return {
    kitchen: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useKitchens = () => {
  const { data, error, ...rest } = useSWR('/api/v2/kitchens', fetcher)

  return {
    kitchens: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useKitchenById = (kitchenId) => {
  const { data, error, ...rest } = useSWR(
    kitchenId && `/api/v2/kitchens/${kitchenId}`,
    fetcher
  )

  return {
    kitchen: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useKitchenMenusById = (kitchenId) => {
  const { data, error, ...rest } = useSWR(
    kitchenId && `/api/kitchens/${kitchenId}/menus`,
    fetcher
  )

  return {
    menus: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useKitchenCategoriesByMenu = (kitchenId, menuId) => {
  const { data, error, ...rest } = useSWR(
    `/api/kitchens/${kitchenId}/menus/${menuId}/categories`,
    fetcher
  )

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
