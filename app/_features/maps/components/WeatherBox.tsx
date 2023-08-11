import { useCustomContext } from "@/app/_context/context";
import { WeatherDataType } from "@/app/_types";
import { Typography, Divider } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Image from "next/image";

const getDate = (data: string) => {
  const date = new Date(data);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const dayShortName = dayName.slice(0, 3);

  const formattedDate = `${month}/${day} (${dayShortName})`;

  return formattedDate;
};

const getTemp = (temp: number) => {
  return Math.round(temp);
};

const WeatherBox = () => {
  const { weatherData } = useCustomContext();

  console.log(weatherData);
  // todo: suspense

  return (
    <div className="flex justify-around items-center mt-1">
      {weatherData &&
        weatherData.map((data: WeatherDataType) => (
          <div className="flex flex-col items-center" key={data.date}>
            <Typography className="text-gray-700" variant="body2">
              {getDate(data.date)}
            </Typography>
            <Image
              src={`https:${data.icon}`}
              alt="weather icon"
              width={40}
              height={40}
            />
            <Typography className="text-gray-700 text-center" variant="body2">
              {data.weather}
            </Typography>
            <div className="flex">
              <WaterDropIcon
                className="text-blue-700 mt-1 mr-1"
                sx={{ fontSize: "0.75rem" }}
              />
              <Typography className="text-gray-700" variant="body2">
                {data.rainChance}%
              </Typography>
            </div>
            {/* <Typography className="text-gray-700" variant="body2">
              {data.avgTemp}
            </Typography> */}
            <div className="flex">
              <Typography className="text-red-700 mr-2" variant="body2">
                {getTemp(data.maxTemp)}°C
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography className="text-blue-700 ml-2" variant="body2">
                {getTemp(data.minTemp)}°C
              </Typography>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WeatherBox;
