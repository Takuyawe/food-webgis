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
