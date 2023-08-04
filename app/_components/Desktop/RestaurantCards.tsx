import { useCustomContext } from "@/app/_context/context";
import { getStars } from "@/app/_features/maps/utils/getStars";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";

const getPhotoUrl = (restaurant: google.maps.places.PlaceResult) => {
  return restaurant.photos ? restaurant.photos[0].getUrl() : "";
};

const getIsOpen = (restaurant: google.maps.places.PlaceResult) => {
  if (restaurant.opening_hours === undefined) return "Unknown";
  //   todo: it's always closed
  return restaurant.opening_hours?.isOpen() ? "Open" : "Closed";
};

const getOpenStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "green";
    case "Closed":
      return "red";
    default:
      return "gray";
  }
};

// todo: rating add .0 if no decimal

const RestaurantCards = () => {
  const { restaurantsList } = useCustomContext();

  //   todo: nothing to show if no restaurants

  return (
    <Fragment>
      {/* todo: app bar and order button */}
      {restaurantsList.map((restaurant) => (
        <div
          className="h-[20vh] w-full bg-white hover:bg-gray-100 border border-gray-400 shadow-md"
          key={restaurant.name}
        >
          <Grid container className="mt-8">
            <Grid item xs={7} className="ml-9">
              <Box display="flex" flexDirection="column">
                <Typography variant="subtitle1" color="black">
                  {restaurant.name}
                </Typography>
                <Box display="flex">
                  <Typography variant="body2" color="gray">
                    {restaurant.rating}
                  </Typography>
                  {getStars(restaurant.rating)}
                  <Typography variant="body2" color="gray">
                    ({restaurant.user_ratings_total})
                  </Typography>
                </Box>
                <Typography variant="body2" color="gray">
                  {restaurant.price_level}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={getOpenStatusColor(getIsOpen(restaurant))}
                >
                  {getIsOpen(restaurant)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                <Image
                  src={getPhotoUrl(restaurant)}
                  alt={restaurant.name || "Restaurant Image"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      ))}
    </Fragment>
  );
};

export default RestaurantCards;
