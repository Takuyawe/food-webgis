"use client";

import MapComponent from "../_features/maps/components/MapComponent";

import { Grid } from "@mui/material";
import SideMenuBar from "./Desktop/SideMenuBar";
import { useCustomContext } from "../_context/context";
import FoodMenuComponent from "./Desktop/FoodMenuComponent";
import Geocoding from "../_features/maps/components/Geocoding";
import RestaurantDetailCard from "./Desktop/RestaurantDetailCard";
import SearchThisArea from "../_features/maps/components/SearchThisArea";

const DesktopComponent = () => {
  const { mapRef, isFoodBoxOpen, isDetailBoxOpen, showSearchButton } =
    useCustomContext();

  return (
    <Grid container>
      <Grid item xs={0.5}>
        <SideMenuBar />
      </Grid>
      <Grid item xs={11.5}>
        <MapComponent />
        {isFoodBoxOpen && (
          <div className="absolute top-0 left-[3.5rem] h-screen w-1/3">
            <FoodMenuComponent />
          </div>
        )}
        {isDetailBoxOpen && (
          <div className="absolute top-32 left-[35rem] h-4/5 w-1/4">
            <RestaurantDetailCard />
          </div>
        )}
        <div className="absolute top-4 left-24">
          <Geocoding />
        </div>
        {showSearchButton && (
          <div className="absolute top-12 right-96">
            <SearchThisArea />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default DesktopComponent;
