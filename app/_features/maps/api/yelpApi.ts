import axios from "axios";
import { RestaurantData } from "@/app/_types/index";

export const fetchRestaurantsData = async (
  setRestaurantsList: (restaurant: RestaurantData) => void,
  lat: number,
  lng: number,
) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/restaurants/${lat},${lng}`,
    );
    const data = response.data;
    console.log(data);
    const restaurantsData = data.businesses.map((restaurant: any) => ({
      name: restaurant.name,
      id: restaurant.id,
      coordinates: {
        lat: restaurant.coordinates.latitude,
        lng: restaurant.coordinates.longitude,
      },
      displayPhone: restaurant.display_phone,
      distance: restaurant.distance,
      image: restaurant.image_url,
      categories: restaurant.categories,
      isClosed: restaurant.is_closed,
      rating: restaurant.rating,
      reviewCount: restaurant.review_count,
      priceLevel: restaurant.price,
      url: restaurant.url,
    }));
    console.log("restaurantsData", restaurantsData);
    setRestaurantsList(restaurantsData);
  } catch (error) {
    console.error(error);
  }
};
