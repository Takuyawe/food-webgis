import { useCustomContext } from "@/app/_context/context";
import { getStars } from "@/app/_features/maps/utils/getStars";
import { Suspense } from "react";
import LoadingComponent from "@/app/_features/maps/utils/LoadingComponent";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

import {
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import Image from "next/image";
import { Fragment, useState } from "react";

import {
  getIsOpen,
  getOpenStatusColor,
  getPriceLevel,
  getRating,
  priceLevelToNumber,
} from "@/app/_features/maps/utils/restaurnatCard";
import { Restaurant } from "@/app/_types";

const orderList = ["rating", "price", "distance"];

const RestaurantCards = () => {
  const { restaurantsList } = useCustomContext();
  const [isOrderButtonOpen, setIsOrderButtonOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState("distance");

  const showOrderButton = () =>
    isOrderButtonOpen && (
      <div
        className={`absolute top-4 right-28 h-8 w-28 m-0 bg-transparent ${
          isOrderButtonOpen
            ? "animate-fadeInMoveRight"
            : "animate-fadeOutMoveLeft"
        }`}
      >
        <List disablePadding className="flex justify-around items-center">
          {orderList.map((order) => (
            <Fragment key={order}>
              {order !== currentOrder && (
                <ListItem
                  disablePadding
                  onClick={() => {
                    setCurrentOrder(order);
                    setIsOrderButtonOpen(false);
                  }}
                >
                  <ListItemButton className="text-gray-700 p-0 m-0">
                    <Typography
                      variant="subtitle2"
                      className="text-white hover:text-gray-200"
                    >
                      {order}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              )}
            </Fragment>
          ))}
        </List>
      </div>
    );

  const sortedRestaurants = [...restaurantsList].sort(
    (a: Restaurant, b: Restaurant) => {
      switch (currentOrder) {
        case "rating": {
          return b.rating - a.rating; // Higher ratings first
        }
        case "priceLevel": {
          return (
            priceLevelToNumber(a.priceLevel) - priceLevelToNumber(b.priceLevel)
          ); // Lower price levels first
        }
        case "distance": {
          return a.distance - b.distance; // Smaller distances first
        }
        default: {
          return 0;
        }
      }
    },
  );

  return (
    <div className="h-full w-full">
      <AppBar position="sticky" className="flex justify-center h-1/6">
        <Toolbar className="flex justify-between">
          <Typography variant="subtitle1" className="text-white">
            Restaurants
          </Typography>
          <div className="flex">
            <Typography variant="subtitle2" className="text-white">
              {currentOrder}
            </Typography>
            <IconButton
              className="p-0 ml-2"
              onClick={() => setIsOrderButtonOpen(!isOrderButtonOpen)}
            >
              <UnfoldMoreRoundedIcon className="text-white" />
            </IconButton>
            {showOrderButton()}
          </div>
        </Toolbar>
      </AppBar>
      {restaurantsList.length !== 0 ? (
        <Swiper
          spaceBetween={10} // Space between cards
          slidesPerView={"auto"} // Number of slides per view
          freeMode={true} // Free mode for non-fixed positions
        >
          <div className="flex h-5/6 w-full">
            {sortedRestaurants.map((restaurant) => (
              <div
                className="relative min-w-[70%] bg-white hover:bg-gray-100 border border-gray-400 shadow-md"
                key={`${restaurant.name}-card`}
              >
                <Grid container>
                  <Grid item xs={7} className="ml-2 mt-3">
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body1" color="black">
                        {restaurant.name}
                      </Typography>
                      {/* todo: button to display on the map */}
                      <div className="flex">
                        {restaurant.categories.map((category, i) => (
                          <Typography
                            variant="body2"
                            className="text-gray-700"
                            key={`${category.alias}-${i}`}
                          >
                            #{category.title} &nbsp;
                          </Typography>
                        ))}
                      </div>
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
                        <Typography className="text-gray-700" variant="body1">
                          Opening Status: &nbsp;
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color={getOpenStatusColor(
                            getIsOpen(restaurant.isClosed),
                          )}
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
                  <Grid item xs={4} className="mt-4 ml-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                      <Image
                        src={restaurant.image || "/image_not_available.png"}
                        alt={restaurant.name || "Restaurant Image"}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            ))}
          </div>
        </Swiper>
      ) : (
        <div className="h-5/6 bg-white">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};

export default RestaurantCards;
