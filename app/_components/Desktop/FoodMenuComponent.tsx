import { useCustomContext } from "@/app/_context/context";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import RestaurantCards from "./RestaurantCards";
import WeatherBox from "../../_features/maps/components/WeatherBox";
import FilterComponent from "./FilterComponent";

const FoodMenuComponent = () => {
  const { targetedPlace } = useCustomContext();

  console.log(targetedPlace);

  if (!targetedPlace) return null;

  const photoUrl = targetedPlace.photos ? targetedPlace.photos[0].getUrl() : "";

  console.log("image", photoUrl);

  return (
    <Box
      bgcolor="#ffffff"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" height="9.3%" width="100%">
        <Image
          src={photoUrl || "/image_not_available.png"}
          alt={targetedPlace.name || "Place image"}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box position="relative" height="15%" width="100%">
        <WeatherBox />
      </Box>

      <Box position="relative" height="25%" width="100%">
        <FilterComponent />
      </Box>
      <Box
        position="relative"
        height="55%"
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
