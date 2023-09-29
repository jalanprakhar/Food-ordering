import RestaurantCard from "./RestaurantCard";
import { SWIGGY_API } from "../utils/constants";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
let allRestaurants = [];
const Body = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleFilterBtnClick = () => {
    // console.log("hii");
    setData(data.filter((d) => d.info.avgRating > 3.5));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const jsonData = await data.json();
    const requiredJson = jsonData.data.cards;
    const currentRestaurants = requiredJson.filter(
      (c) => c?.card?.card?.id === "restaurant_grid_listing"
    )[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    allRestaurants = currentRestaurants;
    setData(currentRestaurants);
  };
  if (data?.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <input
          type="text"
          className="searchBox"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const filteredRestaurants = allRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            console.log(allRestaurants);
            setData(filteredRestaurants);
          }}
        >
          Search
        </button>

        <button className="filter-btn" onClick={handleFilterBtnClick}>
          Filter Top Rated Restaurants
        </button>
      </div>
      <div className="restaurant-container">
        {data?.map((restaurant) => (
          <Link
            to={`/restaurants/${restaurant.info.id}`}
            key={restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
