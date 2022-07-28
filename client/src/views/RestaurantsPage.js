import React from "react"
import { Link } from 'react-router-dom'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const useRestaurants = () => {
  const { data, error } = useSWR('/api/restaurants', fetcher)

  return {
    restaurants: data,
    isLoading: !error && !data,
    isError: error
  }
}

const RestaurantsPage = () => {

  const { restaurants, isLoading, isError } = useRestaurants()

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>
  return (
    <>
      <main>
        <h2>Restaurants list</h2>

        {
          restaurants.map(restaurant => (
            <Link
              style={{ display: "block", margin: "1rem 0" }}
              to={`/restaurants/${restaurant.r_id}`}
              key={restaurant.r_id}
            >
              {restaurant.display_name}
            </Link>
          ))
        }


      </main>

    </>
  );
}

export default RestaurantsPage;