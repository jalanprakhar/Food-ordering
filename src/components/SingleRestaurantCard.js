import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { SINGLE_RESTAURANT_API } from "../utils/constants";
function SingleRestaurantCard() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetchRestaurant();
  }, []);
  const fetchRestaurant = async () => {
    const jsonData = await fetch(`${SINGLE_RESTAURANT_API}${id}`);
    const d = await jsonData.json();
    // console.log(data);
    setData(d);
  };
  if (data === null) return <Shimmer />;
  console.log(data);
  const { name } = data?.data?.cards[0]?.card?.card?.info;
  console.log(name);
  const menu =
    data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards;
  console.log(menu);
  const getMenu = (item) => ({
    name: item?.card?.info?.name,
    price: item.card.info.price / 100,
  });
  return (
    <div>
      <h1>{name}</h1>
      <h4>Menu</h4>
      <ul>
        {menu.map((item) => {
          return <li>{`${getMenu(item).name} - ${getMenu(item).price}`}</li>;
        })}
      </ul>
    </div>
  );
}

export default SingleRestaurantCard;
