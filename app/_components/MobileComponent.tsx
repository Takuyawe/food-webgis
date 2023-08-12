"use client";

import { useCustomContext } from "../_context/context";
import Geocoding from "../_features/maps/components/Geocoding";
import MapComponent from "../_features/maps/components/MapComponent";
import RestaurantDetailCard from "./Mobile/RestaurantDetailCard";
import BottomMenuBar from "./Mobile/BottomMenuBar";
import RestaurantCards from "./Mobile/RestaurantCards";
import { Fragment, useState } from "react";
import WeatherBox from "../_features/maps/components/WeatherBox";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { IconButton } from "@mui/material";
import Draggable from "react-draggable";

const MobileComponent = () => {
  const { isFoodBoxOpen, isDetailBoxOpen } = useCustomContext();

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      <div className="flex-grow">
        <MapComponent />
      </div>
      {isFoodBoxOpen && (
        <Draggable axis="x" bounds={{ left: 0, right: window.innerWidth - 45 }}>
          <div className="absolute top-20 left-0 h-36 w-full flex">
            <div className="relative top-0 h-1/3 w-12 bg-white flex justify-center items-center rounded-r-full">
              <IconButton>
                <WbSunnyIcon className="text-gray-700" />
              </IconButton>
            </div>
            <div className="relative top-0 -left-full h-full w-full bg-white">
              <WeatherBox />
            </div>
          </div>
        </Draggable>
      )}
      {isDetailBoxOpen && (
        <Fragment>
          <div className="absolute top-0 bottom-0 my-auto left-0 h-1/3 w-2/3">
            <RestaurantDetailCard />
          </div>
        </Fragment>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-1/3">
        {isFoodBoxOpen && (
          <div className="relative h-5/6 w-full">
            <RestaurantCards />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/6">
          <BottomMenuBar />
        </div>
      </div>
      <div className="absolute top-4 left-0 right-0 mx-auto">
        <Geocoding />
      </div>
    </div>
  );
};

export default MobileComponent;
