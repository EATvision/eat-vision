import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useRestaurants = () => {
  const { data, error } = useSWR('/api/restaurants', fetcher)

  return {
    restaurants: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useRestaurantById = (restaurantId) => {
  const { data, error } = useSWR(restaurantId && `/api/restaurants/${restaurantId}`, fetcher)

  return {
    restaurant: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useRestaurantMenusById = (restaurantId) => {
  const { data, error } = useSWR(restaurantId && `/api/restaurants/${restaurantId}/menus`, fetcher)

  return {
    menus: data,
    isLoading: !error && !data,
    isError: error,
  }
}
