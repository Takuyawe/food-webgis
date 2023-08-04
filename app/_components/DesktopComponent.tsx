"use client";

import MapComponent from "../_features/maps/components/MapComponent";

import { Grid } from "@mui/material";
import SideMenuBar from "./Desktop/SideMenuBar";
import { useCustomContext } from "../_context/context";
import FoodMenuComponent from "./Desktop/FoodMenuComponent";
import Geocoding from "../_features/maps/components/Geocoding";

const DesktopComponent = () => {
  const { mapRef, setCurrentPosition, isFoodBoxOpen, setIsFoodBoxOpen } =
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
        <div className="absolute top-4 left-24">
          <Geocoding />
        </div>
      </Grid>
    </Grid>
  );
};

export default DesktopComponent;
