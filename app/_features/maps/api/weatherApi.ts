import axios from "axios";

export const fetchWeatherData = async (
  setWeatherData: (data: any) => void,
  lat?: number,
  lng?: number,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/weather/${lat},${lng}`,
    );
    const data = response.data;
    console.log(data);
    const weatherData = data.forecast.forecastday.map((day: any) => ({
      date: day.date,
      avgTemp: day.day.avgtemp_c,
      minTemp: day.day.mintemp_c,
      maxTemp: day.day.maxtemp_c,
      weather: day.day.condition.text,
      icon: day.day.condition.icon,
      rainChance: day.day.daily_chance_of_rain,
    }));
    setWeatherData(weatherData);
  } catch (error) {
    console.error(error);
  }
};
