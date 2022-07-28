import React from "react"

const RestaurantsPage = () => {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <main>
        <h2>Restaurants list</h2>
        {
          data ?
            data.map(restaurant => (
              <div>{restaurant.display_name}</div>
            ))
            : <div>LOADING</div>
        }
      </main>

    </>
  );
}

export default RestaurantsPage;