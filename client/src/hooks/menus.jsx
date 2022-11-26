import useSWR from 'swr'
import fetcher from 'api/fetcher'

export const useMenus = () => {
  const { data, error, ...rest } = useSWR('/api/v2/menus', fetcher)

  return {
    menus: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useMenuById = (menuId) => {
  const { data, error, ...rest } = useSWR(
    menuId && `/api/v2/menus/${menuId}`,
    fetcher
  )

  return {
    menu: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useMenusByKitchenId = (kitchenId) => {
  const { data, error, ...rest } = useSWR(
    kitchenId && `/api/v2/menus?kitchens=${kitchenId}`,
    fetcher
  )

  return {
    menus: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
