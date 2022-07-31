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
  const { data, error } = useSWR(`/api/restaurants/${restaurantId}`, fetcher)

  return {
    restaurant: data,
    isLoading: !error && !data,
    isError: error,
  }
}

// export const useDishes = (restaurantId, menuId, filters) => {
//   const { data, error } = useSWR('/api/restaurants', fetcher)

//   return {
//     restaurants: data,
//     isLoading: !error && !data,
//     isError: error,
//   }
// }
