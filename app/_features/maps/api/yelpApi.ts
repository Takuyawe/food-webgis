import axios from "axios";
import { RestaurantData } from "@/app/_types/index";

const formatRestaurantData = (data: any): RestaurantData => {
  return data.businesses.map((restaurant: any) => ({
    name: restaurant.name,
    id: restaurant.id,
    coordinates: {
      lat: restaurant.coordinates.latitude,
      lng: restaurant.coordinates.longitude,
    },
    displayPhone: restaurant.display_phone,
    displayAddress: restaurant.location.display_address.join(),
    distance: restaurant.distance,
    image: restaurant.image_url,
    categories: restaurant.categories,
    isClosed: restaurant.is_closed,
    rating: restaurant.rating,
    reviewCount: restaurant.review_count,
    priceLevel: restaurant.price,
    url: restaurant.url,
  }));
};

export const fetchRestaurantsData = async (
  setRestaurantsList: (restaurant: RestaurantData) => void,
  lat: number,
  lng: number,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants/${lat},${lng}`,
    );
    const data = response.data;
    console.log(data);
    const restaurantsData = formatRestaurantData(data);
    console.log("restaurantsData", restaurantsData);
    setRestaurantsList(restaurantsData);
  } catch (error) {
    console.error(error);
  }
};
