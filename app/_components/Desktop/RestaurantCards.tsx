import { useCustomContext } from "@/app/_context/context";
import { getStars } from "@/app/_features/maps/utils/getStars";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const getPhotoUrl = (restaurant: google.maps.places.PlaceResult) => {
  return restaurant.photos ? restaurant.photos[0].getUrl() : "";
};

const getIsOpen = (isClosed: boolean) => {
  return isClosed ? "Closed" : "Open";
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

const getPriceLevel = (priceLevel: string | undefined) => {
  switch (priceLevel) {
    case "$":
      return "$";
    case "$$":
      return "$$";
    case "$$$":
      return "$$$";
    case "$$$$":
      return "$$$$";
    default:
      return "Unknown";
  }
};

const getRating = (rating: number | undefined) => {
  return rating ? rating.toFixed(1) : "Unknown";
};

// todo: rating add .0 if no decimal

const RestaurantCards = () => {
  const { restaurantsList } = useCustomContext();

  //   todo: nothing to show if no restaurants

  // todo: filter restaurants

  return (
    <Fragment>
      {/* todo: app bar and order button */}
      {restaurantsList.map((restaurant) => (
        <div
          className="min-h-[20vh] w-full bg-white hover:bg-gray-100 border border-gray-400 shadow-md"
          key={restaurant.name}
        >
          <Grid container>
            <Grid item xs={7} className="ml-9 mt-2">
              <Box display="flex" flexDirection="column">
                <Typography variant="subtitle1" color="black">
                  {restaurant.name}
                </Typography>
                <Box display="flex">
                  <Typography
                    className="text-gray-600 mt-1 mr-1"
                    variant="body2"
                    color="gray"
                  >
                    {getRating(restaurant.rating)}
                  </Typography>
                  <div>{getStars(restaurant.rating)}</div>
                  <Typography
                    className="text-gray-600 mt-1 ml-1"
                    variant="body2"
                  >
                    ({restaurant.reviewCount})
                  </Typography>
                </Box>
                <Typography variant="body2" color="gray">
                  Price Level: {getPriceLevel(restaurant.priceLevel)}
                </Typography>
                <div className="flex">
                  <Typography className="text-gray-700" variant="subtitle2">
                    Opening Status: &nbsp;
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color={getOpenStatusColor(getIsOpen(restaurant.isClosed))}
                  >
                    {getIsOpen(restaurant.isClosed)}
                  </Typography>
                </div>
                <Typography variant="body2" className="text-gray-700">
                  {restaurant.displayPhone}
                </Typography>
                <div>
                  <a
                    href={restaurant.url}
                    className="text-blue-600 hover:text-blue-400 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Restaurant URL
                  </a>
                </div>
              </Box>
            </Grid>
            <Grid item xs={4} className="mt-8">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                <Image
                  src={restaurant.image}
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
