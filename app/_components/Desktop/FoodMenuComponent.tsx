import { useCustomContext } from "@/app/_context/context";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import RestaurantCards from "./RestaurantCards";
import WeatherBox from "./WeatherBox";
import FilterComponent from "./FilterComponent";

const FoodMenuComponent = () => {
  const { targetedPlace } = useCustomContext();

  console.log(targetedPlace);

  const photoUrl = targetedPlace.photos ? targetedPlace.photos[0].getUrl() : "";

  return (
    <Box
      bgcolor="#ffffff"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" height="8.9%" width="100%">
        {photoUrl && (
          <Image
            src={photoUrl || "/restaurant.png"}
            alt={targetedPlace.name || "Place image"}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>
      <Box position="relative" height="15%" width="100%">
        <WeatherBox />
      </Box>

      <Box position="relative" height="30%" width="100%">
        <FilterComponent />
      </Box>
      <Box
        position="relative"
        height="40%"
        width="100%"
        sx={{
          overflowY: "auto", // This will make the Box scrollable vertically
        }}
      >
        <RestaurantCards />
      </Box>
    </Box>
  );
};

export default FoodMenuComponent;
