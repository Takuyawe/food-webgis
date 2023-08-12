"use client";

import { useCustomContext } from "../_context/context";
import Geocoding from "../_features/maps/components/Geocoding";
import MapComponent from "../_features/maps/components/MapComponent";
import RestaurantDetailCard from "./Mobile/RestaurantDetailCard";
import BottomMenuBar from "./Mobile/BottomMenuBar";
import RestaurantCards from "./Mobile/RestaurantCards";
import { Fragment, useEffect, useState } from "react";
import WeatherBox from "../_features/maps/components/WeatherBox";
import FilterComponent from "./Mobile/FilterComponent";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@mui/material";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import SlideMenu from "./Mobile/SlideMenu";

const MobileComponent = () => {
  const { isFoodBoxOpen, isDetailBoxOpen } = useCustomContext();

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      <div className="flex-grow">
        <MapComponent />
      </div>
      {isFoodBoxOpen && (
        <Fragment>
          <SlideMenu component="weather" />
          <SlideMenu component="filter" />
        </Fragment>
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
