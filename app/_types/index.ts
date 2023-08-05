export type Position = {
  lat: number;
  lng: number;
};

export type WeatherDataType = {
  date: string;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  weather: string;
  icon: string;
  rainChance: number;
};

export type WeatherData = WeatherDataType[];

export type CuisineType = {
  alias: string;
  title: string;
};

export type Restaurant = {
  name: string;
  id: string;
  coordinates: Position;
  displayPhone: string;
  distance: number;
  image: string;
  categories: CuisineType[];
  isClosed: boolean;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  url: string;
};

export type RestaurantData = Restaurant[];
