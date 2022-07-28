import { useParams } from "react-router-dom";


const RestaurantPage = () => {
  let params = useParams();

  return <h2>restaurant {params.restaurantId}</h2>;
}

export default RestaurantPage